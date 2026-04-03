/**
 * Custom hooks for API calls with React patterns
 */

import { useState, useEffect, useCallback } from 'react';
import { apiGet, apiPost } from '@/lib/api';
import type {
  Alert,
  WeatherData,
  CropStatus,
  MarketData,
  FinanceData,
  GreenScore,
  IoTSensor,
} from '@/lib/types';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic hook for fetching data from API
 */
export function useApiGet<T>(endpoint: string | null) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: endpoint !== null,
    error: null,
  });

  useEffect(() => {
    if (!endpoint) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });
      const result = await apiGet<T>(endpoint);

      if (result.success && result.data) {
        setState({ data: result.data, loading: false, error: null });
      } else {
        setState({
          data: null,
          loading: false,
          error: result.error || 'Failed to fetch data',
        });
      }
    };

    fetchData();
  }, [endpoint]);

  return state;
}

/**
 * Hook for fetching alerts
 */
export function useAlerts() {
  return useApiGet<Alert[]>('/alerts');
}

/**
 * Hook for fetching weather data
 */
export function useWeather() {
  return useApiGet<WeatherData>('/weather');
}

/**
 * Hook for fetching crop status
 */
export function useCropStatus() {
  return useApiGet<CropStatus[]>('/crops/status');
}

/**
 * Hook for fetching market data
 */
export function useMarketData(crop?: string) {
  const endpoint = crop ? `/market/${crop}` : '/market';
  return useApiGet<MarketData>(endpoint);
}

/**
 * Hook for fetching market forecast for all crops
 */
export function useMarketDataForecast() {
  return useApiGet<Record<string, MarketData>>('/market/forecast');
}

/**
 * Hook for fetching finance data
 */
export function useFinanceData() {
  return useApiGet<FinanceData>('/finance');
}

/**
 * Hook for fetching green score
 */
export function useGreenScore() {
  return useApiGet<GreenScore>('/sustainability/green-score');
}

/**
 * Hook for fetching IoT sensor data
 */
export function useIoTSensors() {
  return useApiGet<IoTSensor[]>('/iot/sensors');
}

/**
 * Hook for sending voice queries
 */
export function useSendVoiceQuery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (audioBlob: Blob, language: string = 'en') => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('language', language);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/voice/query`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send voice query');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      setLoading(false);
      throw err;
    }
  }, []);

  return { send, loading, error };
}

/**
 * Hook for refetching data with manual control
 */
export function useRefreshableData<T>(endpoint: string | null) {
  const [refreshCount, setRefreshCount] = useState(0);
  const state = useApiGet<T>(endpoint ? `${endpoint}?_t=${refreshCount}` : null);

  const refresh = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
  }, []);

  return { ...state, refresh };
}
