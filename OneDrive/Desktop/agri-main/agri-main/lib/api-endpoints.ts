/**
 * API Endpoint Constants
 * Central reference for all backend endpoints
 */

export const API_ENDPOINTS = {
  // Alerts
  alerts: '/alerts',
  alertsById: (id: string) => `/alerts/${id}`,

  // Weather
  weather: '/weather',
  weatherForecast: '/weather/forecast',

  // Crops
  crops: {
    status: '/crops/status',
    byId: (id: string) => `/crops/${id}`,
    varieties: '/crops/varieties',
    varietiesForCrop: (cropId: string) => `/crops/${cropId}/varieties`,
  },

  // Market
  market: {
    all: '/market',
    byCrop: (crop: string) => `/market/${crop}`,
    forecast: '/market/forecast',
    priceHistory: (crop: string) => `/market/${crop}/history`,
  },

  // Finance
  finance: '/finance',
  financeMonthly: '/finance/monthly',

  // Sustainability
  sustainability: {
    greenScore: '/sustainability/green-score',
    soilHealth: '/sustainability/soil-health',
    waterUsage: '/sustainability/water-usage',
  },

  // IoT
  iot: {
    sensors: '/iot/sensors',
    sensorData: (sensorId: string) => `/iot/sensors/${sensorId}`,
    sensorHistory: (sensorId: string) => `/iot/sensors/${sensorId}/history`,
  },

  // Climate
  climate: {
    advisor: '/climate/advisor',
    vulnerabilities: '/climate/vulnerabilities',
    riskByRegion: (region: string) => `/climate/risk/${region}`,
  },

  // GIS Map
  gis: {
    map: '/gis/map',
    regions: '/gis/regions',
  },

  // Precision Agriculture
  precision: '/precision-agriculture',

  // Voice/Chat
  voice: {
    query: '/voice/query',
    history: '/voice/history',
  },

  // Renewable Energy
  renewable: '/renewable-energy',

  // Alerts
  assistantChat: '/assistant/chat',
} as const;

/**
 * Helper to build API URLs
 */
export function buildApiUrl(endpoint: string, query?: Record<string, any>): string {
  let url = endpoint;
  if (query && Object.keys(query).length > 0) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    });
    url += `?${params.toString()}`;
  }
  return url;
}
