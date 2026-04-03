import type { 
  Alert, 
  CropStatus, 
  MarketData, 
  FinanceData, 
  GreenScore, 
  ChatMessage, 
  WeatherData,
  ClimateVulnerability,
  ClimateSmartAdvisoryItem,
  IoTSensor,
  RegionalClimateRisk,
  RenewableEnergyData,
  CropVariety,
  PrecisionAgricultureData
} from './types';

// Alerts Data
export const ALERTS: Alert[] = [
  {
    id: '1',
    severity: 'critical',
    title: 'Heavy Rain Expected',
    description: 'Severe rainfall expected in next 48 hours. Ensure field drainage systems are operational.',
    action: 'Check drainage',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    cropName: 'Rice',
    voiceUrl: '/audio/alert-1.mp3',
  },
  {
    id: '2',
    severity: 'high',
    title: 'Armyworm Outbreak Detected',
    description: 'Fall armyworm presence confirmed in neighboring farms. Immediate inspection recommended.',
    action: 'Inspect fields',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    cropName: 'Maize',
    voiceUrl: '/audio/alert-2.mp3',
  },
  {
    id: '3',
    severity: 'medium',
    title: 'Soil pH Imbalance',
    description: 'Soil acidity levels have shifted. Consider adding lime to stabilize pH.',
    action: 'Adjust soil pH',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    cropName: 'Wheat',
  },
  {
    id: '4',
    severity: 'low',
    title: 'Irrigation Schedule Adjustment',
    description: 'Optimal window for irrigation in the next 2 days based on weather forecast.',
    action: 'Plan irrigation',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    cropName: 'Cotton',
  },
  {
    id: '5',
    severity: 'high',
    title: 'Fertilizer Application Reminder',
    description: 'Second round of nitrogen fertilization is due this week.',
    action: 'Apply fertilizer',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    cropName: 'Rice',
  },
  {
    id: '6',
    severity: 'medium',
    title: 'Water Stress Warning',
    description: 'Soil moisture levels dropping. Increase irrigation frequency slightly.',
    action: 'Increase watering',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
    cropName: 'Tomato',
  },
];

// Weather Data
export const WEATHER: WeatherData = {
  temp: 32,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  riskLevel: 'medium',
  prediction: 'Heavy rain expected in 48 hours. Prepare drainage systems.',
};

// Crop Status Data
export const CROP_STATUS: CropStatus[] = [
  {
    id: '1',
    cropName: 'Rice',
    health: 85,
    soilMoisture: 72,
    pestRisk: 'medium',
    lastUpdated: new Date(),
  },
  {
    id: '2',
    cropName: 'Maize',
    health: 65,
    soilMoisture: 58,
    pestRisk: 'high',
    lastUpdated: new Date(),
  },
  {
    id: '3',
    cropName: 'Wheat',
    health: 78,
    soilMoisture: 68,
    pestRisk: 'low',
    lastUpdated: new Date(),
  },
  {
    id: '4',
    cropName: 'Cotton',
    health: 72,
    soilMoisture: 55,
    pestRisk: 'medium',
    lastUpdated: new Date(),
  },
];

// Market Intelligence Data
export const MARKET_DATA: Record<string, MarketData> = {
  rice: {
    cropName: 'Rice',
    currentPrice: 2450,
    forecast: [
      { date: 'Day 1', price: 2450, confidence: 92 },
      { date: 'Day 2', price: 2480, confidence: 88 },
      { date: 'Day 3', price: 2520, confidence: 85 },
      { date: 'Day 4', price: 2490, confidence: 82 },
      { date: 'Day 5', price: 2510, confidence: 78 },
      { date: 'Day 6', price: 2540, confidence: 75 },
      { date: 'Day 7', price: 2580, confidence: 72 },
    ],
    bestTimeToSell: {
      date: 'Day 6',
      confidence: 87,
      reason: 'Peak demand from millers + low supply',
    },
    historicalData: [
      { date: 'Day -30', price: 2200 },
      { date: 'Day -25', price: 2240 },
      { date: 'Day -20', price: 2280 },
      { date: 'Day -15', price: 2320 },
      { date: 'Day -10', price: 2380 },
      { date: 'Day -5', price: 2415 },
      { date: 'Today', price: 2450 },
    ],
  },
  wheat: {
    cropName: 'Wheat',
    currentPrice: 2100,
    forecast: [
      { date: 'Day 1', price: 2100, confidence: 90 },
      { date: 'Day 2', price: 2115, confidence: 87 },
      { date: 'Day 3', price: 2130, confidence: 84 },
      { date: 'Day 4', price: 2145, confidence: 81 },
      { date: 'Day 5', price: 2160, confidence: 78 },
      { date: 'Day 6', price: 2175, confidence: 75 },
      { date: 'Day 7', price: 2190, confidence: 72 },
    ],
    bestTimeToSell: {
      date: 'Day 7',
      confidence: 84,
      reason: 'Seasonal demand peak',
    },
    historicalData: [
      { date: 'Day -30', price: 1950 },
      { date: 'Day -25', price: 1980 },
      { date: 'Day -20', price: 2010 },
      { date: 'Day -15', price: 2040 },
      { date: 'Day -10', price: 2070 },
      { date: 'Day -5', price: 2085 },
      { date: 'Today', price: 2100 },
    ],
  },
  maize: {
    cropName: 'Maize',
    currentPrice: 1850,
    forecast: [
      { date: 'Day 1', price: 1850, confidence: 89 },
      { date: 'Day 2', price: 1865, confidence: 86 },
      { date: 'Day 3', price: 1880, confidence: 83 },
      { date: 'Day 4', price: 1895, confidence: 80 },
      { date: 'Day 5', price: 1910, confidence: 77 },
      { date: 'Day 6', price: 1925, confidence: 74 },
      { date: 'Day 7', price: 1940, confidence: 71 },
    ],
    bestTimeToSell: {
      date: 'Day 5',
      confidence: 82,
      reason: 'Good demand-supply balance',
    },
    historicalData: [
      { date: 'Day -30', price: 1750 },
      { date: 'Day -25', price: 1775 },
      { date: 'Day -20', price: 1800 },
      { date: 'Day -15', price: 1820 },
      { date: 'Day -10', price: 1835 },
      { date: 'Day -5', price: 1842 },
      { date: 'Today', price: 1850 },
    ],
  },
};

// Finance Data
export const FINANCE_DATA: FinanceData = {
  income: 285000,
  expenses: 152000,
  monthlyData: [
    { month: 'Jan', income: 45000, expenses: 18000 },
    { month: 'Feb', income: 38000, expenses: 16000 },
    { month: 'Mar', income: 52000, expenses: 22000 },
    { month: 'Apr', income: 48000, expenses: 20000 },
    { month: 'May', income: 42000, expenses: 19000 },
    { month: 'Jun', income: 60000, expenses: 25000 },
  ],
  forecast: [
    { month: 'Jul', projected: 55000 },
    { month: 'Aug', projected: 58000 },
    { month: 'Sep', projected: 62000 },
    { month: 'Oct', projected: 68000 },
    { month: 'Nov', projected: 72000 },
    { month: 'Dec', projected: 75000 },
  ],
  creditSuggestions: [
    { amount: 100000, interestRate: 8.5, term: 12 },
    { amount: 150000, interestRate: 9.2, term: 24 },
    { amount: 200000, interestRate: 9.8, term: 36 },
  ],
};

// Green Score Data
export const GREEN_SCORE: GreenScore = {
  overallScore: 72,
  soilHealth: {
    score: 78,
    metrics: [
      { label: 'Organic Matter', value: 85 },
      { label: 'Nitrogen', value: 72 },
      { label: 'Phosphorus', value: 68 },
      { label: 'Potassium', value: 82 },
    ],
  },
  waterUsage: {
    score: 68,
    metrics: [
      { label: 'Water Efficiency', value: 65 },
      { label: 'Runoff Prevention', value: 72 },
      { label: 'Irrigation Optimization', value: 68 },
    ],
  },
  pesticideImpact: {
    score: 72,
    metrics: [
      { label: 'Chemical Reduction', value: 70 },
      { label: 'Pest Management', value: 75 },
      { label: 'Biodiversity', value: 72 },
    ],
  },
  recommendations: [
    'Implement drip irrigation to improve water efficiency',
    'Add compost to increase organic matter by 15%',
    'Introduce companion planting for natural pest control',
    'Switch to organic fertilizers where possible',
  ],
  trend: [
    { date: 'Week 1', score: 58 },
    { date: 'Week 2', score: 62 },
    { date: 'Week 3', score: 67 },
    { date: 'Week 4', score: 70 },
    { date: 'Week 5', score: 72 },
  ],
};

// Chat Messages Data
export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'assistant',
    text: 'नमस्ते! मैं भूमि बाई हूँ, आपका कृषि सहायक। आप मुझसे कोई भी सवाल पूछ सकते हैं। (Hello! I am Bhumi Bai, your agricultural assistant. You can ask me any farming question.)',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    isVoice: false,
  },
];

export const SUGGESTED_QUESTIONS = [
  'बारिश के बाद मेरी फसल की देखभाल कैसे करूं?',
  'कपास की कीटों से रक्षा कैसे करें?',
  'अगले महीने गेहूं की बेहतर कीमत मिलेगी?',
  'मिट्टी की pH को कैसे संतुलित करूं?',
];

// Navigation Items
export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Alerts', href: '/dashboard/alerts', icon: 'Bell' },
  { label: 'Market', href: '/dashboard/market', icon: 'BarChart3' },
  { label: 'Finance', href: '/dashboard/finance', icon: 'Wallet' },
  { label: 'Sustainability', href: '/dashboard/sustainability', icon: 'Leaf' },
  { label: 'Precision Ag', href: '/dashboard/precision-agriculture', icon: 'Cpu' },
  { label: 'Climate Advisor', href: '/dashboard/climate-advisor', icon: 'Cloud' },
  { label: 'GIS Map', href: '/dashboard/gis-map', icon: 'Map' },
  { label: 'Crop Breeding', href: '/dashboard/crop-breeding', icon: 'Sprout' },
  { label: 'Assistant', href: '/dashboard/assistant', icon: 'MessageCircle' },
];

// Languages
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'मराठी' },
];

// Climate Vulnerability Data
export const CLIMATE_VULNERABILITY: ClimateVulnerability = {
  regionId: 'region-001',
  regionName: 'Karnataka - North Interior',
  overallScore: 65,
  droughtRisk: 72,
  floodRisk: 58,
  temperatureStressRisk: 68,
  pestPressureRisk: 62,
  diseaseRisk: 55,
  forecastTrend: 'worsening',
  historicalData: [
    { date: 'Jan', score: 58 },
    { date: 'Feb', score: 60 },
    { date: 'Mar', score: 62 },
    { date: 'Apr', score: 64 },
    { date: 'May', score: 65 },
    { date: 'Jun', score: 67 },
  ],
};

// Climate-Smart Advisory
export const CLIMATE_SMART_ADVISORIES: ClimateSmartAdvisoryItem[] = [
  {
    id: '1',
    cropName: 'Rice',
    strategy: 'Drought-Resistant Varieties',
    description: 'Switch to newly developed rice varieties that require 30% less water',
    impact: 'Reduces water demand and maintains yield',
    implementationCost: 5000,
    expectedYieldImprovement: 12,
    timeToImplement: '1 season',
    resilientVarieties: ['IR64-DHM', 'Swarna Sub1', 'MTU1010'],
  },
  {
    id: '2',
    cropName: 'Maize',
    strategy: 'Crop Diversification',
    description: 'Intercrop with pulses to improve soil nitrogen and reduce pest pressure',
    impact: 'Enhanced soil health and natural pest management',
    implementationCost: 3000,
    expectedYieldImprovement: 18,
    timeToImplement: '1 season',
  },
  {
    id: '3',
    cropName: 'Cotton',
    strategy: 'Rainwater Harvesting',
    description: 'Build small check dams and contour bunds to harvest monsoon water',
    impact: 'Sustainable water availability for 4-5 months post-monsoon',
    implementationCost: 15000,
    expectedYieldImprovement: 25,
    timeToImplement: '2-3 months',
  },
  {
    id: '4',
    cropName: 'Wheat',
    strategy: 'Climate-Resilient Mulching',
    description: 'Use crop residue mulching to maintain soil temperature and moisture',
    impact: 'Reduces irrigation needs by 20% and improves soil organic matter',
    implementationCost: 2000,
    expectedYieldImprovement: 15,
    timeToImplement: '2 weeks',
  },
];

// IoT Sensor Data
export const IOT_SENSORS: IoTSensor[] = [
  {
    id: 'sensor-001',
    name: 'Field A - Soil Moisture',
    type: 'soil-moisture',
    location: 'Field A (Northern plot)',
    currentValue: 52,
    unit: '%',
    optimalRange: { min: 45, max: 65 },
    lastReading: new Date(Date.now() - 5 * 60 * 1000),
    status: 'healthy',
    batteryLevel: 87,
  },
  {
    id: 'sensor-002',
    name: 'Field A - Temperature',
    type: 'temperature',
    location: 'Field A (Northern plot)',
    currentValue: 28.5,
    unit: '°C',
    optimalRange: { min: 25, max: 32 },
    lastReading: new Date(Date.now() - 3 * 60 * 1000),
    status: 'healthy',
    batteryLevel: 92,
  },
  {
    id: 'sensor-003',
    name: 'Field B - Soil Moisture',
    type: 'soil-moisture',
    location: 'Field B (Southern plot)',
    currentValue: 38,
    unit: '%',
    optimalRange: { min: 45, max: 65 },
    lastReading: new Date(Date.now() - 8 * 60 * 1000),
    status: 'warning',
    batteryLevel: 65,
  },
  {
    id: 'sensor-004',
    name: 'Field B - Soil pH',
    type: 'ph',
    location: 'Field B (Southern plot)',
    currentValue: 7.2,
    unit: 'pH',
    optimalRange: { min: 6.5, max: 7.5 },
    lastReading: new Date(Date.now() - 12 * 60 * 1000),
    status: 'healthy',
    batteryLevel: 78,
  },
  {
    id: 'sensor-005',
    name: 'Main Farm - Rainfall',
    type: 'rainfall',
    location: 'Farm Entrance',
    currentValue: 0,
    unit: 'mm',
    optimalRange: { min: 0, max: 100 },
    lastReading: new Date(Date.now() - 1 * 60 * 1000),
    status: 'healthy',
    batteryLevel: 95,
  },
  {
    id: 'sensor-006',
    name: 'Field C - Nutrient Levels',
    type: 'nutrient',
    location: 'Field C (East plot)',
    currentValue: 42,
    unit: 'mg/kg',
    optimalRange: { min: 50, max: 100 },
    lastReading: new Date(Date.now() - 15 * 60 * 1000),
    status: 'warning',
    batteryLevel: 58,
  },
];

// Regional Climate Risk Data
export const REGIONAL_CLIMATE_RISKS: RegionalClimateRisk[] = [
  {
    regionId: 'region-001',
    regionName: 'Karnataka North Interior',
    coordinates: { lat: 15.3173, lng: 75.7139 },
    riskLevel: 'high',
    primaryThreats: ['Drought (72%)', 'Heat stress (68%)', 'Pest pressure (62%)'],
    affectedPopulation: 450000,
    recommendedActions: [
      'Promote drought-resistant crop varieties',
      'Strengthen irrigation infrastructure',
      'Build water harvesting systems',
    ],
    historicalImpact: [
      { year: 2022, damage: '35% crop loss in cotton zone' },
      { year: 2021, damage: 'Moderate rainfall deficit' },
    ],
  },
  {
    regionId: 'region-002',
    regionName: 'Punjab - Eastern Region',
    coordinates: { lat: 31.1471, lng: 75.3412 },
    riskLevel: 'medium',
    primaryThreats: ['Waterlogging (55%)', 'Heavy rainfall (58%)', 'Soil salinity (48%)'],
    affectedPopulation: 680000,
    recommendedActions: [
      'Improve drainage systems',
      'Switch to water-resistant varieties',
      'Monitor soil salinity levels',
    ],
    historicalImpact: [
      { year: 2022, damage: 'Wheat yield reduced by 18%' },
    ],
  },
  {
    regionId: 'region-003',
    regionName: 'Gujarat - Coastal Region',
    coordinates: { lat: 21.1458, lng: 72.1939 },
    riskLevel: 'critical',
    primaryThreats: ['Salinity intrusion (78%)', 'Cyclones (65%)', 'Sea level rise (72%)'],
    affectedPopulation: 520000,
    recommendedActions: [
      'Build cyclone shelters and early warning systems',
      'Develop salt-resistant crops',
      'Implement coastal vegetation barriers',
    ],
    historicalImpact: [
      { year: 2023, damage: 'Severe cyclone - 40% crop loss' },
      { year: 2021, damage: 'Saltwater intrusion damaged 12,000 hectares' },
    ],
  },
];

// Renewable Energy Data
export const RENEWABLE_ENERGY_DATA: RenewableEnergyData[] = [
  {
    id: 're-001',
    type: 'solar',
    installedCapacity: 5,
    currentGeneration: 4.2,
    dailyGeneration: 28.5,
    monthlyGeneration: 820,
    energySavings: 32400,
    co2Offset: 985,
    efficiencyRate: 84,
    maintenanceStatus: 'good',
    generationTrend: [
      { date: 'Week 1', generation: 180 },
      { date: 'Week 2', generation: 210 },
      { date: 'Week 3', generation: 195 },
      { date: 'Week 4', generation: 235 },
    ],
  },
  {
    id: 're-002',
    type: 'biogas',
    installedCapacity: 8,
    currentGeneration: 6.5,
    dailyGeneration: 42,
    monthlyGeneration: 1260,
    energySavings: 50400,
    co2Offset: 3150,
    efficiencyRate: 81,
    maintenanceStatus: 'good',
    generationTrend: [
      { date: 'Week 1', generation: 280 },
      { date: 'Week 2', generation: 300 },
      { date: 'Week 3', generation: 310 },
      { date: 'Week 4', generation: 320 },
    ],
  },
];

// Crop Variety Data
export const CROP_VARIETIES: CropVariety[] = [
  {
    id: 'cv-001',
    name: 'IR64-DHM',
    parentCrop: 'Rice',
    climateResilience: {
      drought: 85,
      flood: 72,
      heat: 78,
      pest: 75,
      disease: 80,
    },
    yieldPotential: 5800,
    maturityPeriod: 125,
    waterRequirement: 1000,
    soilTypeRequirement: 'Clayey loam',
    marketDemand: 'high',
    price: 35,
    certifications: ['GOI certified', 'Organic approved'],
    suitableRegions: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh'],
  },
  {
    id: 'cv-002',
    name: 'Swarna Sub1',
    parentCrop: 'Rice',
    climateResilience: {
      drought: 70,
      flood: 95,
      heat: 72,
      pest: 78,
      disease: 82,
    },
    yieldPotential: 5200,
    maturityPeriod: 128,
    waterRequirement: 1100,
    soilTypeRequirement: 'Clayey loam',
    marketDemand: 'high',
    price: 38,
    certifications: ['Flood-tolerant certified'],
    suitableRegions: ['West Bengal', 'Odisha', 'Bihar'],
  },
  {
    id: 'cv-003',
    name: 'HM-4',
    parentCrop: 'Maize',
    climateResilience: {
      drought: 82,
      flood: 60,
      heat: 85,
      pest: 88,
      disease: 85,
    },
    yieldPotential: 8200,
    maturityPeriod: 110,
    waterRequirement: 450,
    soilTypeRequirement: 'Well-drained loam',
    marketDemand: 'high',
    price: 28,
    certifications: ['Heat-resistant certified', 'Hybrid variety'],
    suitableRegions: ['Maharashtra', 'Karnataka', 'Madhya Pradesh'],
  },
  {
    id: 'cv-004',
    name: 'Bt Cotton HC-43',
    parentCrop: 'Cotton',
    climateResilience: {
      drought: 80,
      flood: 55,
      heat: 88,
      pest: 92,
      disease: 80,
    },
    yieldPotential: 22,
    maturityPeriod: 180,
    waterRequirement: 700,
    soilTypeRequirement: 'Black soil',
    marketDemand: 'high',
    price: 120,
    certifications: ['Bt certified', 'Pest-resistant'],
    suitableRegions: ['Gujarat', 'Maharashtra', 'Telangana'],
  },
];

// Precision Agriculture Data
export const PRECISION_AGRICULTURE: PrecisionAgricultureData[] = [
  {
    fieldId: 'field-001',
    fieldName: 'Field A - North',
    cropName: 'Rice',
    areaSize: 2.5,
    currentYield: 5200,
    targetYield: 6500,
    optimizationScore: 72,
    recommendations: [
      {
        practice: 'Variable Rate Irrigation',
        potentialYieldGain: 18,
        resources: ['Smart irrigation controller', 'Soil moisture sensors'],
        timeline: '1 season',
      },
      {
        practice: 'Precision Fertilizer Application',
        potentialYieldGain: 12,
        resources: ['UAV fertilizer spreader', 'Soil nutrient maps'],
        timeline: '2 weeks',
      },
    ],
    yieldVariabilityMap: [
      { zone: 'North-West', yield: 5400 },
      { zone: 'Center', yield: 5200 },
      { zone: 'South-East', yield: 4950 },
    ],
    inputEfficiency: {
      waterEfficiency: 0.85,
      fertiliserEfficiency: 45,
      pesticideEfficiency: 12,
    },
  },
  {
    fieldId: 'field-002',
    fieldName: 'Field B - South',
    cropName: 'Maize',
    areaSize: 3.2,
    currentYield: 7100,
    targetYield: 8500,
    optimizationScore: 65,
    recommendations: [
      {
        practice: 'Drone Monitoring',
        potentialYieldGain: 15,
        resources: ['Agricultural drone', 'AI analysis software'],
        timeline: '1-2 weeks per cycle',
      },
    ],
    yieldVariabilityMap: [
      { zone: 'North', yield: 7400 },
      { zone: 'Center', yield: 7100 },
      { zone: 'South', yield: 6800 },
    ],
    inputEfficiency: {
      waterEfficiency: 0.78,
      fertiliserEfficiency: 52,
      pesticideEfficiency: 14,
    },
  },
];
