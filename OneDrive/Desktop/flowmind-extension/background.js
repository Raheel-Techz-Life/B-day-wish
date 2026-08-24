// FlowMind Data Collector - Background Service Worker
//
// DATA FLOW (MV3-reliable, Brave-compatible):
//   content.js ──(storage write)──► chrome.storage.local (pendingRows queue)
//                                          │
//                         chrome.alarms every 25s ──► background reads queue
//                                          │
//                              POST /api/collect ──► Supabase
//
// Using storage as a buffer means data is NEVER lost even if the service
// worker dies between content script writes and the next alarm fire.

const DASHBOARD_URL = 'https://flowmind.vishwadev.tech';
const COLLECT_ENDPOINT = `${DASHBOARD_URL}/api/collect`;

const BLOCKED_DOMAINS = [
  'instagram.com', 'facebook.com', 'tiktok.com',
  'twitter.com', 'reddit.com', 'youtube.com',
  'netflix.com', 'snapchat.com'
];

// ── Tab switch tracking (Chrome API — Brave-proof) ───────────────────────────
let bgTabSwitches = 0;
chrome.tabs.onActivated.addListener(() => { bgTabSwitches++; });

// ── Idle tracking (Chrome API — Brave-proof) ─────────────────────────────────
let bgIsIdle = false;
let bgIdleSeconds = 0;
chrome.idle.setDetectionInterval(30);
chrome.idle.onStateChanged.addListener((state) => {
  bgIsIdle = (state !== 'active');
  if (!bgIsIdle) bgIdleSeconds = 0;
});
setInterval(() => { if (bgIsIdle) bgIdleSeconds++; }, 1000);

// ── Alarms ───────────────────────────────────────────────────────────────────
// keepAlive  — fires every 20s to prevent SW from dying (MV3 limit ~30s idle)
// uploadTick — fires every 25s to drain the pendingRows queue and upload
chrome.alarms.create('keepAlive',  { periodInMinutes: 20 / 60 });
chrome.alarms.create('uploadTick', { periodInMinutes: 25 / 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'uploadTick') drainAndUpload();
  // keepAlive is a no-op — just wakes the SW
});

// ── One-time initialisation ──────────────────────────────────────────────────
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['participantId', 'collecting'], (result) => {
    const updates = {};
    if (!result.participantId) {
      updates.participantId = 'ANON_' + Math.random().toString(36).substr(2, 8).toUpperCase();
      console.log('[FlowMind] Generated new ID:', updates.participantId);
    } else if (result.participantId !== result.participantId.toUpperCase()) {
      updates.participantId = result.participantId.toUpperCase();
      console.log('[FlowMind] Normalized ID:', updates.participantId);
    }
    if (result.collecting === undefined || result.collecting === null) {
      updates.collecting = true;
    }
    if (Object.keys(updates).length > 0) {
      chrome.storage.local.set(updates, () =>
        console.log('[FlowMind] Storage initialised:', updates)
      );
    } else {
      console.log('[FlowMind] Already initialised — ID:', result.participantId, '| collecting:', result.collecting);
    }
  });
});

// ── Core upload function ─────────────────────────────────────────────────────
function drainAndUpload() {
  chrome.storage.local.get(['participantId', 'collecting', 'pendingRows', 'recordCount'], (result) => {
    if (result.collecting === false) return;
    if (!result.participantId) return;

    const pending = result.pendingRows || [];
    if (pending.length === 0) return;

    // Filter blocked domains and stale rows (older than 10 minutes)
    const cutoff = Date.now() - 10 * 60 * 1000;
    const rows = pending.filter(row => {
      if (BLOCKED_DOMAINS.some(d => (row.url || '').includes(d))) return false;
      if (new Date(row.timestamp).getTime() < cutoff) return false;
      return true;
    });

    if (rows.length === 0) {
      chrome.storage.local.set({ pendingRows: [] });
      return;
    }

    // Clear the queue immediately — if upload fails we log it, but we don't
    // retry stale data (avoids double-counting on retry).
    chrome.storage.local.set({ pendingRows: [] });

    console.log(`[FlowMind] Uploading ${rows.length} row(s) for ${result.participantId}`);

    let uploaded = 0;
    rows.forEach(row => {
      const payload = {
        participant_id:  result.participantId.toUpperCase(),
        keystrokes:      row.keystrokes      || 0,
        scroll_speed:    row.scroll_speed    || 0,
        mouse_idle_time: bgIsIdle ? bgIdleSeconds : (row.mouse_idle_time || 0),
        tab_switches:    bgTabSwitches + (row.tab_switches || 0),
        tab_active:      row.tab_active      ?? true,
        timestamp:       row.timestamp,
      };

      fetch(COLLECT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      .then(r => {
        if (r.ok) {
          uploaded++;
          const newCount = (result.recordCount || 0) + uploaded;
          chrome.storage.local.set({
            recordCount: newCount,
            lastUploadAt: new Date().toISOString(),
            lastUploadOk: true,
          });
          console.log(`[FlowMind] ✓ Uploaded row. Total in DB: ${newCount}`);
        } else {
          r.text().then(t => console.error('[FlowMind] ✗ API error:', r.status, t));
          chrome.storage.local.set({ lastUploadOk: false, lastUploadAt: new Date().toISOString() });
        }
      })
      .catch(e => {
        console.warn('[FlowMind] Network error:', e.message);
        chrome.storage.local.set({ lastUploadOk: false, lastUploadAt: new Date().toISOString() });
      });
    });

    // Reset background-level tab switch counter after consuming
    bgTabSwitches = 0;
  });
}

// ── Message listener (popup communication only) ──────────────────────────────
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_STATUS') {
    chrome.storage.local.get(
      ['participantId', 'collecting', 'recordCount', 'lastUploadAt', 'lastUploadOk'],
      sendResponse
    );
    return true;
  }

  if (request.type === 'TOGGLE_COLLECTING') {
    chrome.storage.local.set({ collecting: request.value });
    sendResponse({ ok: true });
    return true;
  }
});
