// FlowMind Data Collector - Content Script
// Tracks behavioral signals only. No keystrokes content, no URLs, no personal data.
// Data is written to chrome.storage.local every 5s so the background alarm can upload
// it even if the service worker was asleep when this interval fired.

class BehaviorTracker {
  constructor() {
    this.keystrokeCount = 0;
    this.scrollVelocity = 0;
    this.lastScrollTime = 0;
    this.lastScrollPosition = 0;
    this.lastMouseMoveTime = Date.now();
    this.tabSwitchCount = 0;
    this.isTabActive = !document.hidden;

    this.init();
  }

  init() {
    if (window.location.protocol === 'chrome:' ||
        window.location.protocol === 'chrome-extension:') return;

    console.log('[FlowMind Collector] Content script injected on', window.location.hostname);

    document.addEventListener('keydown', () => this.keystrokeCount++, true);

    window.addEventListener('scroll', () => {
      const now = Date.now();
      const scrollTop = window.scrollY;
      if (this.lastScrollTime > 0) {
        const timeDelta = (now - this.lastScrollTime) / 1000;
        const pixelDelta = Math.abs(scrollTop - this.lastScrollPosition);
        this.scrollVelocity = timeDelta > 0 ? pixelDelta / timeDelta : 0;
      }
      this.lastScrollTime = now;
      this.lastScrollPosition = scrollTop;
    }, true);

    setInterval(() => {
      if (Date.now() - this.lastScrollTime > 2000) this.scrollVelocity = 0;
    }, 2000);

    document.addEventListener('mousemove', () => {
      this.lastMouseMoveTime = Date.now();
    }, true);

    document.addEventListener('visibilitychange', () => {
      this.isTabActive = !document.hidden;
      if (!document.hidden) this.tabSwitchCount++;
    }, true);

    // Write data to storage every 5 seconds — background alarm picks it up
    setInterval(() => this.saveData(), 5000);
  }

  getIdleTime() {
    return Math.floor((Date.now() - this.lastMouseMoveTime) / 1000);
  }

  saveData() {
    if (!chrome.runtime?.id) return;

    const entry = {
      keystrokes:     this.keystrokeCount,
      scroll_speed:   parseFloat(this.scrollVelocity.toFixed(2)),
      mouse_idle_time: this.getIdleTime(),
      tab_switches:   this.tabSwitchCount,
      tab_active:     this.isTabActive,
      timestamp:      new Date().toISOString(),
      url:            window.location.hostname,
    };

    console.log('[FlowMind Collector] Buffering:', entry);

    // Append to pending queue in storage — background will drain it
    chrome.storage.local.get(['pendingRows'], (r) => {
      const pending = r.pendingRows || [];
      pending.push(entry);
      // Cap queue at 200 rows to avoid storage bloat
      const capped = pending.slice(-200);
      chrome.storage.local.set({ pendingRows: capped });
    });

    // Reset counters
    this.keystrokeCount = 0;
    this.tabSwitchCount = 0;
    this.scrollVelocity = 0;
  }
}

new BehaviorTracker();
