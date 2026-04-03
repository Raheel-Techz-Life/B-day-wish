# Backend Integration Guide

This document explains how the KrishiNetra frontend is connected to the backend API.

## 📋 Overview

The frontend uses a centralized API service with React hooks for data fetching. All backend API calls go through a single service layer that handles:
- Error handling
- Request timeouts
- Request/Response formatting
- Fallback to mock data during development

## 🏗️ Architecture

### Files Structure

```
lib/
├── api.ts                 # Core API client (fetch functions)
├── api-endpoints.ts       # API endpoint constants
├── constants.ts           # Mock data (fallback)
└── types.ts              # TypeScript types

hooks/
└── use-api.ts            # Custom React hooks for API calls

.env.local               # Environment configuration
```

## 🔧 Configuration

### Environment Variables

Edit `.env.local` to configure your backend:

```env
# Backend API URL (default: http://localhost:5000/api)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# API request timeout in milliseconds (default: 30000)
NEXT_PUBLIC_API_TIMEOUT=30000
```

## 📡 API Service Layer

### Core Functions (`lib/api.ts`)

```typescript
// GET request
apiGet<T>(endpoint: string): Promise<ApiResponse<T>>

// POST request
apiPost<T>(endpoint: string, body: any): Promise<ApiResponse<T>>

// PUT request
apiPut<T>(endpoint: string, body: any): Promise<ApiResponse<T>>

// DELETE request
apiDelete<T>(endpoint: string): Promise<ApiResponse<T>>
```

### Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;           // On success
  error?: string;     // On error
  message?: string;
}
```

## 🪝 React Hooks

### Usage in Components

```typescript
'use client';

import { useAlerts, useWeather, useCropStatus } from '@/hooks/use-api';
import { ALERTS, WEATHER, CROP_STATUS } from '@/lib/constants';

export function MyComponent() {
  // Fetch data from API
  const { data: alerts, loading, error } = useAlerts();
  
  // Fallback to mock data
  const displayAlerts = alerts || ALERTS;
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Render with displayAlerts */}
    </div>
  );
}
```

### Available Hooks

```typescript
// Alerts
useAlerts()                      // → Alert[]

// Weather
useWeather()                     // → WeatherData

// Crops
useCropStatus()                 // → CropStatus[]

// Market
useMarketData(crop?: string)    // → MarketData
useMarketDataForecast()         // → Record<string, MarketData>

// Finance
useFinanceData()                // → FinanceData

// Sustainability
useGreenScore()                 // → GreenScore

// IoT
useIoTSensors()                 // → IoTSensor[]

// Voice
useSendVoiceQuery()             // → { send, loading, error }

// Manual refresh
useRefreshableData<T>(endpoint) // → { data, loading, error, refresh }
```

## 📍 API Endpoints

### Alerts
- `GET /alerts` - Get all alerts
- `GET /alerts/{id}` - Get alert by ID

### Weather
- `GET /weather` - Get current weather
- `GET /weather/forecast` - Get weather forecast

### Crops
- `GET /crops/status` - Get crop status
- `GET /crops/{id}` - Get crop details
- `GET /crops/varieties` - Get all crop varieties
- `GET /crops/{cropId}/varieties` - Get varieties by crop

### Market
- `GET /market` - Get all market data
- `GET /market/{crop}` - Get market data for specific crop
- `GET /market/forecast` - Get market forecasts
- `GET /market/{crop}/history` - Get price history

### Finance
- `GET /finance` - Get finance data
- `GET /finance/monthly` - Get monthly finance data

### Sustainability
- `GET /sustainability/green-score` - Get green score
- `GET /sustainability/soil-health` - Get soil health
- `GET /sustainability/water-usage` - Get water usage

### IoT
- `GET /iot/sensors` - Get all sensors
- `GET /iot/sensors/{id}` - Get sensor data
- `GET /iot/sensors/{id}/history` - Get sensor history

### Climate
- `GET /climate/advisor` - Get climate advice
- `GET /climate/vulnerabilities` - Get climate vulnerabilities
- `GET /climate/risk/{region}` - Get regional climate risk

### Voice/Chat
- `POST /voice/query` - Send voice query (multipart form data)
- `GET /voice/history` - Get voice query history
- `POST /assistant/chat` - Send chat message

## 🚀 Backend Requirements

### API Response Format

All endpoints should return data in this format:

```json
{
  "success": true,
  "data": {
    // Your data here
  }
}
```

Or for errors:

```json
{
  "success": false,
  "error": "Error message"
}
```

### CORS Configuration

The backend must support CORS requests from your frontend domain:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Data Types

See `lib/types.ts` for all TypeScript interfaces that define the expected data structures.

## 🧪 Testing

### During Development

1. If backend is not available, the app uses mock data from `lib/constants.ts`
2. Check browser console for API errors
3. Use browser DevTools Network tab to inspect API calls

### Mock Data

Mock data is available at:
```
lib/constants.ts  - Sample data for all endpoints
```

## 🔄 Making API Calls Without Hooks

For cases where you need more control:

```typescript
import { apiGet, apiPost } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

// Custom GET
const result = await apiGet<AlertType>(API_ENDPOINTS.alerts);
if (result.success && result.data) {
  // Use result.data
}

// Custom POST
const result = await apiPost('/voice/query', audioFormData);
```

## 📝 Adding New API Endpoints

### Step 1: Update `lib/api-endpoints.ts`

```typescript
export const API_ENDPOINTS = {
  // Add new endpoint
  newFeature: '/new-feature',
  newFeatureById: (id: string) => `/new-feature/${id}`,
};
```

### Step 2: Create Hook in `hooks/use-api.ts`

```typescript
export function useNewFeature() {
  return useApiGet<NewFeatureType>(API_ENDPOINTS.newFeature);
}
```

### Step 3: Use in Component

```typescript
import { useNewFeature } from '@/hooks/use-api';

export function MyComponent() {
  const { data, loading, error } = useNewFeature();
  // Use data...
}
```

## 🐛 Debugging

### Check API Health

```typescript
// In browser console
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(console.log)
```

### View API Calls

Open DevTools → Network tab → Filter by Fetch/XHR

### Enable Detailed Logging

Edit `lib/api.ts` to add more console.logs:

```typescript
console.log(`[API Request] ${method} ${url}`);
console.log(`[API Response] ${response.status}`, data);
```

## 🔐 Production Considerations

1. **Environment Variables**: Set `NEXT_PUBLIC_API_URL` to production backend URL
2. **Authentication**: Add auth headers in `lib/api.ts` if needed
3. **Error Handling**: Consider user-friendly error messages
4. **Rate Limiting**: Implement request throttling if needed
5. **Caching**: Use `useRefreshableData` for periodic updates

## 📞 Support

For issues with:
- **API Integration**: Check `lib/api.ts` and `hooks/use-api.ts`
- **Endpoints**: Update `lib/api-endpoints.ts`
- **Types**: Update `lib/types.ts`
- **Backend Connection**: Verify `NEXT_PUBLIC_API_URL` in `.env.local`
