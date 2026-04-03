export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  action: string;
  timestamp: Date;
  cropName?: string;
  voiceUrl?: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  riskLevel: AlertSeverity;
  prediction: string;
}

export interface CropStatus {
  id: string;
  cropName: string;
  health: number;
  soilMoisture: number;
  pestRisk: AlertSeverity;
  lastUpdated: Date;
}

export interface MarketData {
  cropName: string;
  currentPrice: number;
  forecast: PriceForecast[];
  bestTimeToSell: {
    date: string;
    confidence: number;
    reason: string;
  };
  historicalData: {
    date: string;
    price: number;
  }[];
}

export interface PriceForecast {
  date: string;
  price: number;
  confidence: number;
}

export interface FinanceData {
  income: number;
  expenses: number;
  monthlyData: {
    month: string;
    income: number;
    expenses: number;
  }[];
  forecast: {
    month: string;
    projected: number;
  }[];
  creditSuggestions: {
    amount: number;
    interestRate: number;
    term: number;
  }[];
}

export interface GreenScore {
  overallScore: number;
  soilHealth: {
    score: number;
    metrics: { label: string; value: number }[];
  };
  waterUsage: {
    score: number;
    metrics: { label: string; value: number }[];
  };
  pesticideImpact: {
    score: number;
    metrics: { label: string; value: number }[];
  };
  recommendations: string[];
  trend: { date: string; score: number }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isVoice: boolean;
}

export interface User {
  id: string;
  name: string;
  location: string;
  language: string;
  crops: string[];
  farmSize: number;
}

// Climate Resilience Types
export interface ClimateVulnerability {
  regionId: string;
  regionName: string;
  overallScore: number; // 0-100
  droughtRisk: number;
  floodRisk: number;
  temperatureStressRisk: number;
  pestPressureRisk: number;
  diseaseRisk: number;
  forecastTrend: 'improving' | 'stable' | 'worsening';
  historicalData: { date: string; score: number }[];
}

export interface ClimateSmartAdvisoryItem {
  id: string;
  cropName: string;
  strategy: string;
  description: string;
  impact: string;
  implementationCost: number;
  expectedYieldImprovement: number;
  timeToImplement: string;
  resilientVarieties?: string[];
}

// IoT Sensor Data Types
export type SensorType = 'soil-moisture' | 'temperature' | 'humidity' | 'ph' | 'nutrient' | 'rainfall';

export interface IoTSensor {
  id: string;
  name: string;
  type: SensorType;
  location: string;
  currentValue: number;
  unit: string;
  optimalRange: { min: number; max: number };
  lastReading: Date;
  status: 'healthy' | 'warning' | 'critical';
  batteryLevel: number;
}

export interface SensorReading {
  sensorId: string;
  timestamp: Date;
  value: number;
  status: 'normal' | 'anomaly' | 'critical';
}

// GIS & Regional Risk Mapping
export interface RegionalClimateRisk {
  regionId: string;
  regionName: string;
  coordinates: { lat: number; lng: number };
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  primaryThreats: string[];
  affectedPopulation: number;
  recommendedActions: string[];
  historicalImpact: { year: number; damage: string }[];
}

// Renewable Energy Integration
export interface RenewableEnergyData {
  id: string;
  type: 'solar' | 'biogas' | 'wind' | 'hybrid';
  installedCapacity: number; // kW
  currentGeneration: number; // kW
  dailyGeneration: number; // kWh
  monthlyGeneration: number; // kWh
  energySavings: number; // INR
  co2Offset: number; // kg
  efficiencyRate: number; // %
  maintenanceStatus: 'good' | 'needs-service' | 'critical';
  generationTrend: { date: string; generation: number }[];
}

// Crop Breeding & Variety Recommendations
export interface CropVariety {
  id: string;
  name: string;
  parentCrop: string;
  climateResilience: {
    drought: number;
    flood: number;
    heat: number;
    pest: number;
    disease: number;
  };
  yieldPotential: number; // kg/hectare
  maturityPeriod: number; // days
  waterRequirement: number; // mm
  soilTypeRequirement: string;
  marketDemand: 'high' | 'medium' | 'low';
  price: number; // per kg
  certifications: string[];
  suitableRegions: string[];
}

// Precision Agriculture Metrics
export interface PrecisionAgricultureData {
  fieldId: string;
  fieldName: string;
  cropName: string;
  areaSize: number; // hectares
  currentYield: number; // kg/hectare
  targetYield: number; // kg/hectare
  optimizationScore: number; // 0-100
  recommendations: {
    practice: string;
    potentialYieldGain: number; // %
    resources: string[];
    timeline: string;
  }[];
  yieldVariabilityMap: {
    zone: string;
    yield: number;
  }[];
  inputEfficiency: {
    waterEfficiency: number; // liters/kg
    fertiliserEfficiency: number; // units/kg
    pesticideEfficiency: number; // units/kg
  };
}

// Green Score Enhancement - Climate Component
export interface ClimateComponentScore extends GreenScore {
  climateAdaptation: {
    score: number;
    metrics: { label: string; value: number }[];
  };
  renewableEnergyUsage: {
    score: number;
    metrics: { label: string; value: number }[];
  };
}
