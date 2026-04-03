# ⚡ Backend Integration - Quick Reference

## 🚀 5-Minute Setup

```bash
# 1. Configure backend URL
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# 2. Start frontend (if not already running)
npm run dev

# 3. Verify backend connection in browser DevTools
# Network tab → Check for API calls
```

---

## 📍 Where Everything Is

| What | Where | Purpose |
|------|-------|---------|
| **API Client** | `lib/api.ts` | Handles HTTP requests |
| **React Hooks** | `hooks/use-api.ts` | Use in components |
| **Endpoints** | `lib/api-endpoints.ts` | All API paths |
| **Types** | `lib/types.ts` | Data structures |
| **Config** | `.env.local` | Backend URL |
| **Mock Data** | `lib/constants.ts` | Fallback data |

---

## 🪝 Using Hooks in Components

```typescript
import { useAlerts, useWeather, useCropStatus } from '@/hooks/use-api';

export function Dashboard() {
  const { data: alerts, loading, error } = useAlerts();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {alerts?.map(alert => (
        <div key={alert.id}>{alert.title}</div>
      ))}
    </div>
  );
}
```

---

## 📡 Available Hooks

```typescript
import { 
  useAlerts,
  useWeather,
  useCropStatus,
  useMarketData,
  useMarketDataForecast,
  useFinanceData,
  useGreenScore,
  useIoTSensors,
  useSendVoiceQuery,
  useRefreshableData
} from '@/hooks/use-api';
```

---

## 🔧 Backend Requirements

### Response Format
```json
{
  "success": true,
  "data": {
    // your data
  }
}
```

### CORS Headers
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Endpoints to Implement
- `GET /alerts` → `Alert[]`
- `GET /weather` → `WeatherData`
- `GET /crops/status` → `CropStatus[]`
- `GET /market` → `Record<string, MarketData>`
- `GET /finance` → `FinanceData`
- (See `BACKEND_IMPLEMENTATION.md` for all 20+ endpoints)

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| App shows mock data | Backend not responding, check .env.local |
| CORS error | Enable CORS in backend |
| API 404 | Wrong endpoint, check `lib/api-endpoints.ts` |
| Timeout error | Backend slow, increase `NEXT_PUBLIC_API_TIMEOUT` |

---

## 📚 Full Guides

- **Setup & Connection**: `API_CONNECTION_GUIDE.md`
- **Integration Details**: `BACKEND_INTEGRATION.md`
- **What to Implement**: `BACKEND_IMPLEMENTATION.md`
- **Complete Summary**: `INTEGRATION_SUMMARY.md`

---

## 🎯 Updates Made

✅ Created API service layer (`lib/api.ts`)
✅ Created React hooks (`hooks/use-api.ts`)
✅ Created endpoint configuration (`lib/api-endpoints.ts`)
✅ Updated components to use hooks (Dashboard, Alerts, Market, Finance)
✅ Added environment configuration (`.env.local`, `.env.example`)
✅ Created comprehensive documentation

---

## 🚀 Next

1. Implement backend with endpoints from `BACKEND_IMPLEMENTATION.md`
2. Update `.env.local` with backend URL
3. Test in browser DevTools Network tab
4. Deploy to production

**That's it! Your frontend is backend-ready.** 🎉
