/**
 * API Service - Centralized API client for all backend requests
 */

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000');

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Generic GET request
 */
export async function apiGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  // Skip API call if API_URL is not configured
  if (!API_URL || API_URL.length === 0) {
    return {
      success: false,
      error: 'API not configured - using mock data',
    };
  }

  try {
    const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(`API GET Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generic POST request
 */
export async function apiPost<T>(
  endpoint: string,
  body: any
): Promise<ApiResponse<T>> {
  // Skip API call if API_URL is not configured
  if (!API_URL || API_URL.length === 0) {
    return {
      success: false,
      error: 'API not configured - using mock data',
    };
  }

  try {
    const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(`API POST Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generic PUT request
 */
export async function apiPut<T>(
  endpoint: string,
  body: any
): Promise<ApiResponse<T>> {
  // Skip API call if API_URL is not configured
  if (!API_URL || API_URL.length === 0) {
    return {
      success: false,
      error: 'API not configured - using mock data',
    };
  }

  try {
    const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(`API PUT Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generic DELETE request
 */
export async function apiDelete<T>(endpoint: string): Promise<ApiResponse<T>> {
  // Skip API call if API_URL is not configured
  if (!API_URL || API_URL.length === 0) {
    return {
      success: false,
      error: 'API not configured - using mock data',
    };
  }

  try {
    const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(`API DELETE Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
