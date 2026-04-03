/**
 * Multi-language translations for all pages
 */

export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'mr';

export interface Translations {
  [key: string]: string;
}

export type TranslationDict = {
  [key in LanguageCode]: Translations;
};

export const translations: TranslationDict = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.alerts': 'Alerts',
    'nav.assistant': 'Assistant',
    'nav.climateAdvisor': 'Climate Advisor',
    'nav.cropBreeding': 'Crop Breeding',
    'nav.finance': 'Finance',
    'nav.gisMap': 'GIS Map',
    'nav.market': 'Market',
    'nav.precisionAgriculture': 'Precision Ag',
    'nav.sustainability': 'Sustainability',

    // Home Page
    'home.title': 'KrishiNetra',
    'home.subtitle': 'Empowering Farmers with AI-Driven Agricultural Insights',
    'home.cta': 'Get Started',
    'home.learnMore': 'Learn More',
    'home.features': 'Features',
    'home.featureWeather': 'Real-time Weather Data',
    'home.featureAlerts': 'Smart Alerts',
    'home.featureMarket': 'Market Intelligence',
    'home.featureGIS': 'GIS Mapping',
    'home.footer': 'Empowering Indian Agriculture with Technology',
    'home.copyright': '© 2024 KrishiNetra. All rights reserved.',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.weather': 'Weather',
    'dashboard.alerts': 'Alerts',
    'dashboard.crops': 'Crop Status',
    'dashboard.yourCrops': 'Your Crops',
    'dashboard.health': 'Health',
    'dashboard.soilMoisture': 'Soil Moisture',
    'dashboard.market': 'Market Data',
    'dashboard.marketPriceForecast': 'Market Price Forecast',
    'dashboard.monthlyFlowCashFlow': 'Monthly Cash Flow',
    'dashboard.finance': 'Finance Overview',
    'dashboard.temperature': 'Temperature',
    'dashboard.humidity': 'Humidity',
    'dashboard.rainfall': 'Rainfall',
    'dashboard.windSpeed': 'Wind Speed',
    'dashboard.noAlerts': 'No active alerts',
    'dashboard.cropHealth': 'Crop Health',
    'dashboard.yield': 'Yield Forecast',
    'dashboard.marketPrice': 'Market Price',
    'dashboard.revenue': 'Revenue',    'dashboard.currentWeatherRisk': 'Current Weather & Risk',
    'dashboard.price': 'Price',
    'dashboard.income': 'Income',
    'dashboard.expenses': 'Expenses',
    'dashboard.date': 'Date',
    'dashboard.month': 'Month',

    // Weather conditions
    'weather.partlyCloudy': 'Partly Cloudy',
    'weather.sunny': 'Sunny',
    'weather.rainy': 'Rainy',
    'weather.cloudy': 'Cloudy',
    'weather.stormy': 'Stormy',

    // Risk levels
    'risk.low': 'Low',
    'risk.medium': 'Medium',
    'risk.high': 'High',
    'risk.critical': 'Critical',

    // Alerts
    'alert.heavyRainTitle': 'Heavy Rain Expected',
    'alert.heavyRainDesc': 'Severe rainfall expected in next 48 hours. Ensure field drainage systems are operational.',
    'alert.armywormTitle': 'Armyworm Outbreak Detected',
    'alert.armywormDesc': 'Fall armyworm presence confirmed in neighboring farms. Immediate inspection recommended.',
    'alert.soilPHTitle': 'Soil pH Imbalance',
    'alert.soilPHDesc': 'Soil acidity levels have shifted. Consider adding lime to stabilize pH.',
    'alert.irrigationTitle': 'Irrigation Schedule Adjustment',
    'alert.irrigationDesc': 'Optimal window for irrigation in the next 2 days based on weather forecast.',
    'alert.fertilizerTitle': 'Fertilizer Application Reminder',
    'alert.fertilizerDesc': 'Second round of nitrogen fertilization is due this week.',
    'alert.waterStressTitle': 'Water Stress Warning',
    'alert.waterStressDesc': 'Soil moisture levels dropping. Increase irrigation frequency slightly.',

    // Crop names
    'crop.rice': 'Rice',
    'crop.maize': 'Maize',
    'crop.wheat': 'Wheat',
    'crop.cotton': 'Cotton',
    'crop.tomato': 'Tomato',

    // UI labels
    'ui.krishiNetra': 'KrishiNetra',
    'ui.farmer': 'Farmer',
    'ui.voiceButton': 'Voice Button',
    // Alerts Page
    'alerts.title': 'Farm Alerts',
    'alerts.description': 'Monitor and manage all farm alerts',
    'alerts.filterAll': 'All Alerts',
    'alerts.currentPrice': 'Current Price',
    'alerts.change30Day': '30-Day Change',
    'alerts.recommendation': 'Recommendation',
    'alerts.view': 'View',

    // Market Page
    'market.title': 'Market Intelligence',
    'market.description': 'AI-powered price predictions and market insights',
    'market.selectCrop': 'Select Crop',
    'market.priceTitle': 'Price',
    'market.currentPrice': 'Current Price',
    'market.change30Day': '30-Day Change',
    'market.monthlyChart': 'Monthly Price Trend',
    'market.recommendation': 'Market Recommendation',

    // Finance Page
    'finance.title': 'Financial Overview',
    'finance.description': 'Manage your farm finances and plan for growth',
    'finance.totalIncome': 'Total Income',
    'finance.fromAllCrops': 'From all crops and sales',
    'finance.totalExpenses': 'Total Expenses',
    'finance.seedsAndLabor': 'Seeds, water, labor, equipment',
    'finance.netProfit': 'Net Profit',
    'finance.profitMargin': 'Profit margin',
    'finance.monthlyChart': 'Monthly Income vs Expenses',
    'finance.forecast': 'Forecast',

    // Sustainability Page
    'sustainability.title': 'Sustainability',
    'sustainability.description': 'Track and improve your farm environmental impact',
    'sustainability.carbonFootprint': 'Carbon Footprint',
    'sustainability.waterUsage': 'Water Usage',
    'sustainability.renewableEnergy': 'Renewable Energy',

    // Precision Agriculture Page
    'precision.title': 'Precision Agriculture',
    'precision.description': 'Optimize your farm operations with data-driven insights',
    'precision.soilMoisture': 'Soil Moisture',
    'precision.nitrogenLevel': 'Nitrogen Level',
    'precision.recommendations': 'Recommendations',

    // Climate Advisor Page
    'climate.title': 'Climate Advisor',
    'climate.description': 'Get AI-powered climate and weather guidance',
    'climate.vulnerability': 'Vulnerability Score',
    'climate.droughtRisk': 'Drought Risk',
    'climate.floodRisk': 'Flood Risk',
    'climate.recommendations': 'Recommendations',

    // GIS Map Page
    'gis.title': 'GIS Map',
    'gis.description': 'Visualize your farm with geospatial data',
    'gis.fieldOverlay': 'Field Overlay',
    'gis.soilMap': 'Soil Map',
    'gis.cropMap': 'Crop Map',

    // Crop Breeding Page
    'cropBreeding.title': 'Crop Breeding',
    'cropBreeding.description': 'Discover improved variety recommendations',
    'cropBreeding.selectCrop': 'Select Crop',
    'cropBreeding.varieties': 'Varieties',

    // Assistant Page
    'assistant.title': 'AI Assistant',
    'assistant.description': 'Chat with our AI-powered farming expert',
    'assistant.askQuestion': 'Ask a question',
    'assistant.send': 'Send',

    // Navigation
    'nav.home': 'Home',
    'alerts.critical': 'Critical',
    'alerts.high': 'High',
    'alerts.medium': 'Medium',
    'alerts.low': 'Low',
    'alerts.noAlerts': 'No alerts',
    'alerts.checkDrainage': 'Check drainage',
    'alerts.inspectFields': 'Inspect fields',
    'alerts.adjustSoilPH': 'Adjust soil pH',

    // Market Page
    'market.title': 'Market Intelligence',
    'market.price': 'Price',
    'market.demand': 'Demand',
    'market.supply': 'Supply',
    'market.trend': 'Trend',
    'market.forecast': 'Forecast',

    // Finance Page
    'finance.title': 'Finance',
    'finance.totalRevenue': 'Total Revenue',
    'finance.expenses': 'Expenses',
    'finance.profit': 'Profit',
    'finance.breakdown': 'Expense Breakdown',

    // Climate Advisor
    'climate.title': 'Climate Advisor',
    'climate.vulnerability': 'Vulnerability Score',
    'climate.droughtRisk': 'Drought Risk',
    'climate.floodRisk': 'Flood Risk',
    'climate.recommendations': 'Recommendations',

    // GIS Map
    'gis.title': 'GIS Map',
    'gis.fieldOverlay': 'Field Overlay',
    'gis.soilMap': 'Soil Map',
    'gis.cropMap': 'Crop Map',

    // Precision Agriculture
    'precision.title': 'Precision Agriculture',
    'precision.soilMoisture': 'Soil Moisture',
    'precision.nitrogenLevel': 'Nitrogen Level',
    'precision.phLevel': 'pH Level',
    'precision.optimization': 'Optimization',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.profile': 'Profile',
    'common.logout': 'Logout',
    'common.language': 'Language',

    // CTA Section
    'cta.title': 'Ready to Transform Your Farm?',
    'cta.description': 'Join thousands of farmers using KrishiNetra to increase yield, reduce costs, and ensure sustainability',
    'cta.startTrial': 'Start Free Trial',
    'cta.voiceInterface': 'Voice-first Interface',
    'cta.realTimeAlerts': 'Real-time Alerts',
    'cta.marketPredictions': 'Market Predictions',

    // Footer
    'footer.description': 'AI-powered agriculture for every farmer in India',
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.copyright': '© 2026 KrishiNetra. All rights reserved.',

    // Sustainability Page - Additional Keys
    'sustainability.greenScore': 'Green Score',
    'sustainability.soilHealth': 'Soil Health',
    'sustainability.waterUsage': 'Water Usage',
    'sustainability.pesticideImpact': 'Pesticide Impact',
    'sustainability.yourFarmPerfoming': 'Your farm is performing',
    'sustainability.excellently': 'excellently',
    'sustainability.well': 'well',
    'sustainability.needsImprovement': 'needs improvement',
    'sustainability.inSustainablePractices': 'in sustainable practices',

    // Climate Page - Additional Keys
    'climate.regionalClimateRiskAnalysis': 'Regional Climate Risk Analysis',
    'climate.vulnerabilityScore': 'Vulnerability Score',
    'climate.worsening': 'Worsening',
    'climate.improving': 'Improving',
    'climate.droughtRiskLabel': 'Drought Risk',
    'climate.floodRiskLabel': 'Flood Risk',
    'climate.heatStress': 'Heat Stress',
    'climate.pestPressure': 'Pest Pressure',
    'climate.diseaseRisk': 'Disease Risk',
    'climate.vulnerabilityTrend': 'Vulnerability Trend (6 Months)',
    'climate.primaryThreats': 'Primary Threats',
    'climate.priorityActions': 'Priority Actions',
    'climate.severeeDroughtRisk': 'Severe drought risk',
    'climate.highTemperatureStress': 'High temperature stress',
    'climate.increasedPestPressure': 'Increased pest pressure',
    'climate.promoteResistantVarieties': 'Promote drought-resistant varieties',
    'climate.buildWaterHarvesting': 'Build water harvesting infrastructure',
    'climate.strengthenWarning': 'Strengthen early warning systems',
    'climate.adaptiveStrategies': 'Climate-Smart Adaptive Strategies',
    'climate.implementationRoadmap': 'Implementation Roadmap',
    'climate.phase1Immediate': 'Phase 1: Immediate (This Month)',
    'climate.phase2ShortTerm': 'Phase 2: Short-term (3 Months)',
    'climate.phase3MediumTerm': 'Phase 3: Medium-term (6 Months)',
    'climate.phase4LongTerm': 'Phase 4: Long-term (12 Months)',
    'climate.phase5Maintenance': 'Phase 5: Maintenance & Review',

    // Precision Agriculture Page - Additional Keys
    'precision.iotSensorNetwork': 'IoT Sensor Network',
    'precision.realTimeData': 'Real-time IoT sensor data and yield optimization insights',
    'precision.yieldOptimization': 'Yield Optimization',
    'precision.fieldAnalysis': 'Field Analysis & Recommendations',

    // Assistant Page - Additional Keys
    'assistant.startChat': 'Start chatting with your agricultural expert',
    'assistant.suggestedQuestions': 'Suggested Questions',
    'assistant.type': 'Type your question here...',

    // GIS Page - Additional Keys
    'gis.climateRiskMap': 'Climate Risk Map',
    'gis.regionRiskProfile': 'Region Risk Profile',
    'gis.lowRisk': 'Low Risk',
    'gis.mediumRisk': 'Medium Risk',
    'gis.highRisk': 'High Risk',
    'gis.criticalRisk': 'Critical Risk',

    // Crop Breeding Page - Additional Keys
    'cropBreeding.resilienceComparison': 'Resilience Comparison',
    'cropBreeding.yieldPotential': 'Yield Potential Comparison',
    'cropBreeding.plantingRecommendation': 'Planting Recommendation',
    'cropBreeding.variety': 'Variety',
    'cropBreeding.yieldPotentialLabel': 'Yield Potential',
    'cropBreeding.waterRequirement': 'Water Requirement',
    'cropBreeding.selectThisVariety': 'Select This Variety',

    // Common Labels
    'common.select': 'Select',
    'common.viewAll': 'View All',
    'common.moreInfo': 'More Info',
    'common.backToDashboard': 'Back to Dashboard',
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.alerts': 'सतर्कताएं',
    'nav.assistant': 'सहायक',
    'nav.climateAdvisor': 'जलवायु सलाहकार',
    'nav.cropBreeding': 'फसल प्रजनन',
    'nav.finance': 'वित्त',
    'nav.gisMap': 'जीआईएस मानचित्र',
    'nav.market': 'बाजार',
    'nav.precisionAgriculture': 'सटीक कृषि',
    'nav.sustainability': 'स्थिरता',

    // Home Page
    'home.title': 'कृषिनेत्र',
    'home.subtitle': 'कृत्रिम बुद्धिमत्ता के साथ किसानों को सशक्त बनाना',
    'home.cta': 'शुरू करें',
    'home.learnMore': 'अधिक जानें',
    'home.features': 'विशेषताएं',
    'home.featureWeather': 'वास्तविक समय मौसम डेटा',
    'home.featureAlerts': 'स्मार्ट अलर्ट',
    'home.featureMarket': 'बाजार बुद्धिमत्ता',
    'home.featureGIS': 'जीआईएस मानचित्रण',
    'home.footer': 'प्रौद्योगिकी के साथ भारतीय कृषि को सशक्त बनाना',
    'home.copyright': '© 2024 कृषिनेत्र। सभी अधिकार सुरक्षित।',

    // Dashboard
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.weather': 'मौसम',
    'dashboard.alerts': 'सतर्कताएं',
    'dashboard.crops': 'फसल की स्थिति',
    'dashboard.yourCrops': 'आपकी फसलें',
    'dashboard.health': 'स्वास्थ्य',
    'dashboard.soilMoisture': 'मिट्टी की नमी',
    'dashboard.market': 'बाजार डेटा',
    'dashboard.marketPriceForecast': 'बाजार मूल्य पूर्वानुमान',
    'dashboard.monthlyFlowCashFlow': 'मासिक नकद प्रवाह',
    'dashboard.finance': 'वित्त सारांश',
    'dashboard.temperature': 'तापमान',
    'dashboard.humidity': 'आर्द्रता',
    'dashboard.rainfall': 'वर्षा',
    'dashboard.windSpeed': 'हवा की गति',
    'dashboard.noAlerts': 'कोई सक्रिय सतर्कता नहीं',
    'dashboard.cropHealth': 'फसल का स्वास्थ्य',
    'dashboard.yield': 'उपज पूर्वानुमान',
    'dashboard.marketPrice': 'बाजार मूल्य',
    'dashboard.revenue': 'राजस्व',    'dashboard.currentWeatherRisk': 'वर्तमान मौसम और जोखिम',
    'dashboard.price': 'कीमत',
    'dashboard.income': 'आय',
    'dashboard.expenses': 'खर्च',
    'dashboard.date': 'दिनांक',
    'dashboard.month': 'महीना',

    // Weather conditions
    'weather.partlyCloudy': 'आंशिक रूप से बादल',
    'weather.sunny': 'धूप',
    'weather.rainy': 'बारिश',
    'weather.cloudy': 'बादल',
    'weather.stormy': 'तूफानी',

    // Risk levels
    'risk.low': 'कम',
    'risk.medium': 'मध्यम',
    'risk.high': 'उच्च',
    'risk.critical': 'गंभीर',

    // Alerts
    'alert.heavyRainTitle': 'भारी बारिश की उम्मीद',
    'alert.heavyRainDesc': 'अगले 48 घंटों में तेज बारिश की उम्मीद है। सुनिश्चित करें कि खेत की जल निकासी प्रणाली काम कर रही है।',
    'alert.armywormTitle': 'आर्मीवर्म प्रकोप की खोज',
    'alert.armywormDesc': 'पड़ोसी खेतों में फॉल आर्मीवर्म की पुष्टि की गई है। तत्काल निरीक्षण की सिफारिश की जाती है।',
    'alert.soilPHTitle': 'मिट्टी के pH में असंतुलन',
    'alert.soilPHDesc': 'मिट्टी की अम्लता में बदलाव हुआ है। pH को स्थिर करने के लिए चूना मिलाने पर विचार करें।',
    'alert.irrigationTitle': 'सिंचाई अनुसूची समायोजन',
    'alert.irrigationDesc': 'मौसम पूर्वानुमान के आधार पर अगले 2 दिनों में सिंचाई के लिए सर्वोत्तम समय।',
    'alert.fertilizerTitle': 'उर्वरक आवेदन अनुस्मारक',
    'alert.fertilizerDesc': 'इस सप्ताह नाइट्रोजन उर्वरक का दूसरा दौर देय है।',
    'alert.waterStressTitle': 'जल तनाव चेतावनी',
    'alert.waterStressDesc': 'मिट्टी की नमी का स्तर कम हो रहा है। सिंचाई की आवृत्ति को थोड़ा बढ़ाएं।',

    // Crop names
    'crop.rice': 'चावल',
    'crop.maize': 'मकई',
    'crop.wheat': 'गेहूं',
    'crop.cotton': 'कपास',
    'crop.tomato': 'टमाटर',

    // UI labels
    'ui.krishiNetra': 'कृषिनेत्र',
    'ui.farmer': 'किसान',
    'ui.voiceButton': 'वॉयस बटन',
    // Alerts Page
    'alerts.title': 'सतर्कताएं',
    'alerts.critical': 'महत्वपूर्ण',
    'alerts.high': 'उच्च',
    'alerts.medium': 'मध्यम',
    'alerts.low': 'निम्न',
    'alerts.noAlerts': 'कोई सतर्कता नहीं',
    'alerts.checkDrainage': 'ड्रेनेज जांचें',
    'alerts.inspectFields': 'खेत का निरीक्षण करें',
    'alerts.adjustSoilPH': 'मिट्टी का पीएच समायोजित करें',

    // Market Page
    'market.title': 'बाजार बुद्धिमत्ता',
    'market.price': 'कीमत',
    'market.demand': 'मांग',
    'market.supply': 'आपूर्ति',
    'market.trend': 'प्रवृत्ति',
    'market.forecast': 'पूर्वानुमान',

    // Finance Page
    'finance.title': 'वित्त',
    'finance.totalRevenue': 'कुल राजस्व',
    'finance.expenses': 'व्यय',
    'finance.profit': 'लाभ',
    'finance.breakdown': 'व्यय विभाजन',

    // Climate Advisor
    'climate.title': 'जलवायु सलाहकार',
    'climate.vulnerability': 'असुरक्षा स्कोर',
    'climate.droughtRisk': 'सूखे का जोखिम',
    'climate.floodRisk': 'बाढ़ का जोखिम',
    'climate.recommendations': 'सिफारिशें',

    // GIS Map
    'gis.title': 'जीआईएस मानचित्र',
    'gis.fieldOverlay': 'खेत ओवरले',
    'gis.soilMap': 'मिट्टी का मानचित्र',
    'gis.cropMap': 'फसल का मानचित्र',

    // Precision Agriculture
    'precision.title': 'सटीक कृषि',
    'precision.soilMoisture': 'मिट्टी की नमी',
    'precision.nitrogenLevel': 'नाइट्रोजन स्तर',
    'precision.phLevel': 'पीएच स्तर',
    'precision.optimization': 'अनुकूलन',

    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफल',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.profile': 'प्रोफ़ाइल',
    'common.logout': 'लॉग आउट',
    'common.language': 'भाषा',

    // CTA Section
    'cta.title': 'अपने खेत को बदलने के लिए तैयार हैं?',
    'cta.description': 'कृषिनेत्र का उपयोग करने वाले हजारों किसानों से जुड़ें उपज बढ़ाने, खर्च कम करने और स्थिरता सुनिश्चित करने के लिए',
    'cta.startTrial': 'निःशुल्क परीक्षण शुरू करें',
    'cta.voiceInterface': 'आवाज-प्रथम इंटरफेस',
    'cta.realTimeAlerts': 'वास्तविक समय सतर्कताएं',
    'cta.marketPredictions': 'बाजार की भविष्यवाणी',

    // Footer
    'footer.description': 'भारत के हर किसान के लिए कृत्रिम बुद्धिमत्ता संचालित कृषि',
    'footer.product': 'उत्पाद',
    'footer.features': 'विशेषताएं',
    'footer.pricing': 'मूल्य निर्धारण',
    'footer.company': 'कंपनी',
    'footer.about': 'परिचय',
    'footer.contact': 'संपर्क करें',
    'footer.legal': 'कानूनी',
    'footer.privacy': 'गोपनीयता',
    'footer.terms': 'शर्तें',
    'footer.copyright': '© 2026 कृषिनेत्र। सभी अधिकार सुरक्षित।',
  },
  te: {
    // Navigation
    'nav.dashboard': 'డ్యాష్‌బోర్డ్',
    'nav.alerts': 'హెచ్చరికలు',
    'nav.assistant': 'సహాయకుడు',
    'nav.climateAdvisor': 'వాతావరణ సలహాదారు',
    'nav.cropBreeding': 'పంట సంవర్ధన',
    'nav.finance': 'ఫైన్యాన్స్',
    'nav.gisMap': 'జీఐఎస్ మ్యాప్',
    'nav.market': 'మార్కెట్',
    'nav.precisionAgriculture': 'ఖచ్చిత వ్యవసాయం',
    'nav.sustainability': 'సంతకత',

    // Home Page
    'home.title': 'కృషినేత్ర',
    'home.subtitle': 'కృత్రిమ బుద్ధిమత్తతో రైతులను శక్తివంతం చేయడం',
    'home.cta': 'ఆరంభించండి',
    'home.learnMore': 'మరింత తెలుసుకోండి',
    'home.features': 'ఫీచర్‌లు',
    'home.featureWeather': 'రియల్-టైమ్ వాతావరణ డేటా',
    'home.featureAlerts': 'స్మార్ట్ హెచ్చరికలు',
    'home.featureMarket': 'మార్కెట్ ఇంటెలిజెన్స్',
    'home.featureGIS': 'జీఐఎస్ మ్యాపింగ్',
    'home.footer': 'నాంద్యుతితో భారతీయ వ్యవసాయను శక్తివంతం చేయడం',
    'home.copyright': '© 2024 కృషినేత్ర. అన్ని హక్కులు సংరక్షితం.',

    // Dashboard
    'dashboard.title': 'డ్యాష్‌బోర్డ్',
    'dashboard.weather': 'వాతావరణం',
    'dashboard.alerts': 'హెచ్చరికలు',
    'dashboard.crops': 'పంట స్థితి',
    'dashboard.yourCrops': 'మీ పంటలు',
    'dashboard.health': 'ఆరోగ్యం',
    'dashboard.soilMoisture': 'నేల తేమ',
    'dashboard.market': 'మార్కెట్ డేటా',
    'dashboard.marketPriceForecast': 'మార్కెట్ ధర సూచన',
    'dashboard.monthlyFlowCashFlow': 'నెలవారీ నగదు ప్రవాహం',
    'dashboard.finance': 'ఫైన్యాన్స్ సారాంశం',
    'dashboard.temperature': 'ఉష్ణోగ్రత',
    'dashboard.humidity': 'ఆర్ద్రత',
    'dashboard.rainfall': 'వర్షపాతం',
    'dashboard.windSpeed': 'గాలి వేగం',
    'dashboard.noAlerts': 'క్రియాశీల హెచ్చరికలు లేవు',
    'dashboard.cropHealth': 'పంట ఆరోగ్యం',
    'dashboard.yield': 'దిగుబడి సూచన',
    'dashboard.marketPrice': 'మార్కెట్ ధర',
    'dashboard.revenue': 'రాజస్వం',

    // Alerts Page
    'alerts.title': 'హెచ్చరికలు',
    'alerts.critical': 'సమీక్ష',
    'alerts.high': 'ఎత్తు',
    'alerts.medium': 'మధ్యమ',
    'alerts.low': 'తక్క',
    'alerts.noAlerts': 'హెచ్చరికలు లేవు',
    'alerts.checkDrainage': 'ట్రెయిన్‌జ్ ను చెక్ చేయండి',
    'alerts.inspectFields': 'ఖేతాలను తనిఖీ చేయండి',
    'alerts.adjustSoilPH': 'నేల pH సర్దుబాటు చేయండి',

    // Market Page
    'market.title': 'మార్కెట్ ఇంటెలిజెన్స్',
    'market.price': 'ఖర్చు',
    'market.demand': 'డిమాండ్',
    'market.supply': 'సరఫరా',
    'market.trend': 'ట్రెండ్',
    'market.forecast': 'సూచన',

    // Finance Page
    'finance.title': 'ఫైన్యాన్స్',
    'finance.totalRevenue': 'మొత్తం రాజస్వం',
    'finance.expenses': 'ఖర్చులు',
    'finance.profit': 'లాభం',
    'finance.breakdown': 'ఖర్చు విభజన',

    // Climate Advisor
    'climate.title': 'వాతావరణ సలహాదారు',
    'climate.vulnerability': 'హాని స్కోర్',
    'climate.droughtRisk': 'కరవు ప్రమాదం',
    'climate.floodRisk': 'వరద ప్రమాదం',
    'climate.recommendations': 'సిఫారసులు',

    // GIS Map
    'gis.title': 'జీఐఎస్ మ్యాప్',
    'gis.fieldOverlay': 'ఫీల్డ్ ఓవర్‌లే',
    'gis.soilMap': 'నేల మ్యాప్',
    'gis.cropMap': 'పంట మ్యాప్',

    // Precision Agriculture
    'precision.title': 'ఖచ్చిత వ్యవసాయం',
    'precision.soilMoisture': 'నేల తేమ',
    'precision.nitrogenLevel': 'నైట్రోజన్ స్థాయి',
    'precision.phLevel': 'pH స్థాయి',
    'precision.optimization': 'ఆప్టిమైజేషన్',

    // Common
    'common.loading': 'లోడ్ చేస్తుంది...',
    'common.error': 'దోషం',
    'common.success': 'విజయం',
    'common.save': 'సేవ్ చేయండి',
    'common.cancel': 'రద్దు చేయండి',
    'common.delete': 'తొలగించండి',
    'common.edit': 'సవరణ చేయండి',
    'common.profile': 'ప్రొఫైల్',
    'common.logout': 'లాగ్ అవుట్',
    'common.language': 'భాష',

    // CTA Section
    'cta.title': 'మీ చేთను రూపాంతరం చేయడానికి సిద్ధమైనారా?',
    'cta.description': 'కృష్ణినేత్రను ఉపయోగించి దిగుబడిని పెంచుటకు, ఖర్చులను తగ్గించటకు మరియు సంతకతని నిశ్చితం చేయటకు వేల మందిలో చేరండి',
    'cta.startTrial': 'ఫ్రీ ట్రయల్ ప్రారంభించండి',
    'cta.voiceInterface': 'వాయిస్-ఫర్స్ట్ ఇంటర్‌ఫేస్',
    'cta.realTimeAlerts': 'రియల్-టైమ్ అలర్ట్‌లు',
    'cta.marketPredictions': 'మార్కెట్ ప్రిడిక్షన్‌లు',

    // Footer
    'footer.description': 'భారతదేశంలో ప్రతి చేతికి AI-ఆధారిత వ్యవసాయం',
    'footer.product': 'ఉత్పత్తి',
    'footer.features': 'ఫీచర్‌లు',
    'footer.pricing': 'ధర నిర్ణయం',
    'footer.company': 'కంపెనీ',
    'footer.about': 'గురించి',
    'footer.contact': 'సంపర్కం',
    'footer.legal': 'చట్టపరమైన',
    'footer.privacy': 'గోప్యతా',
    'footer.terms': 'నిబంధనలు',
    'footer.copyright': '© 2026 కృష్ణినేత్ర. అన్ని హక్కులు మాత్రమే.',
  },
  ta: {
    // Navigation
    'nav.dashboard': 'டேஷ்போர்டு',
    'nav.alerts': 'எச்சரிக்கைகள்',
    'nav.assistant': 'সহায়ক',
    'nav.climateAdvisor': 'காலநிலை ஆலோசகர்',
    'nav.cropBreeding': 'பயிர் இனப்பெருக்கம்',
    'nav.finance': 'நிதி',
    'nav.gisMap': 'ஜीআईএஸ் வரைபடம்',
    'nav.market': 'சந்தை',
    'nav.precisionAgriculture': 'துல்லியமான விவசாயம்',
    'nav.sustainability': 'நிலைத்தன்மை',

    // Home Page
    'home.title': 'கிருஷிநேத்ர',
    'home.subtitle': 'கலை நுண்ணறிவுடன் விவசாயীகளை ஆற்றல்படுத்துவது',
    'home.cta': 'தொடங்க',
    'home.learnMore': 'மேலும் அறிக',
    'home.features': 'அம்சங்கள்',
    'home.featureWeather': 'நிகழ்நிலை வானிலை தரவு',
    'home.featureAlerts': 'ஸ்மார்ட் எச்சரிக்கைகள்',
    'home.featureMarket': 'சந்தை நுண்ணறிவு',
    'home.featureGIS': 'ஜீআईএஸ் வரைபடம்',
    'home.footer': 'தொழில்நுட்பத்துடன் இந்திய விவசாயத்தை ஆற்றல்படுத்துதல்',
    'home.copyright': '© 2024 கிருஷிநேத்ர. அனைத்து உரிமைகளும் உபயோக்தவ்.',

    // Dashboard
    'dashboard.title': 'டேஷ்போர்டு',
    'dashboard.weather': 'வானிலை',
    'dashboard.alerts': 'எச்சரிக்கைகள்',
    'dashboard.crops': 'பயிர் நிலை',
    'dashboard.yourCrops': 'உங்கள் பயிர்கள்',
    'dashboard.health': 'ஆரோக்கியம்',
    'dashboard.soilMoisture': 'மண் ஈரப்பதம்',
    'dashboard.market': 'சந்தை தரவு',
    'dashboard.marketPriceForecast': 'சந்தை விலை முன்னறிவிப்பு',
    'dashboard.monthlyFlowCashFlow': 'மாதாந்திர பணப்புழக்கம்',
    'dashboard.finance': 'நிதி சுருக்கம்',
    'dashboard.temperature': 'வெப்பநிலை',
    'dashboard.humidity': 'ஈரப்பதம்',
    'dashboard.rainfall': 'மழைப்பொழிவு',
    'dashboard.windSpeed': 'காற்றின் வேகம்',
    'dashboard.noAlerts': 'செயல்படும் எச்சரிக்கைகள் இல்லை',
    'dashboard.cropHealth': 'பயிர் ஆரோக்கியம்',
    'dashboard.yield': 'விளைச்சல் முன்னறிவிப்பு',
    'dashboard.marketPrice': 'சந்தை விலை',
    'dashboard.revenue': 'வருவாய்',
    'dashboard.currentWeatherRisk': 'தற்போதைய வானிலை & ஆபத்து',
    'dashboard.price': 'விலை',
    'dashboard.income': 'வருமானம்',
    'dashboard.expenses': 'செலவுகள்',
    'dashboard.date': 'தேதி',
    'dashboard.month': 'மாதம்',

    // Weather conditions
    'weather.partlyCloudy': 'பகுதியளவு மேகமூட்டம்',
    'weather.sunny': 'சூரியன்',
    'weather.rainy': 'மழை',
    'weather.cloudy': 'மேகமூட்டம்',
    'weather.stormy': 'புயல்',

    // Risk levels
    'risk.low': 'குறைவு',
    'risk.medium': 'நடுத்தர',
    'risk.high': 'உচ்சம்',
    'risk.critical': 'முக்கியமான',

    // Alerts
    'alert.heavyRainTitle': 'கடுமையான மழை எதிர்பார்க்கப்படுகிறது',
    'alert.heavyRainDesc': 'அடுத்த 48 மணி நேரத்தில் கடுமையான மழை எதிர்பார்க்கப்படுகிறது. வயல் நீர்வடிகால் அமைப்பு செயல்படுகிறது என்பதை உறுதிசெய்யவும்.',
    'alert.armywormTitle': 'ராணுவ புழு வெடிப்பு கண்டறியப்பட்டது',
    'alert.armywormDesc': 'அருகிலுள்ள விவசாய வயல்களில் ஆண்ட மற்றும் ராணுவ புழுவின் இருப்பு உறுதிசெய்யப்பட்டது. உடனடி ஆய்வு பரிந்துரைக்கப்படுகிறது.',
    'alert.soilPHTitle': 'மண் pH சமநிலையின்மை',
    'alert.soilPHDesc': 'மண்ணின் அமிலத்தன்மை அளவுகள் மாறிவிட்டன. pH ஐ நிலைப்படுத்த சுண்ணாம்பு சேர்க்க பரிசீலிக்கவும்.',
    'alert.irrigationTitle': 'பாசன அட்டவணை சரிசெய்தல்',
    'alert.irrigationDesc': 'வானிலை முன்னறிவிப்பின் அடிப்படையில் அடுத்த 2 நாட்களில் பாசனத்திற்கான உறுதிப்படுத்தல்.',
    'alert.fertilizerTitle': 'சுரண்டை பயன்பாட்டு நினைவூட்டல்',
    'alert.fertilizerDesc': 'இந்த வாரம் நைட்ரஜன் சுரண்டையின் இரண்டாம் சுற்று கடமையாக உள்ளது.',
    'alert.waterStressTitle': 'நீர் அழுத்த எச்சரிக்கை',
    'alert.waterStressDesc': 'மண்ணின் ஈரப்பதம் அளவுகள் குறைந்து வருகின்றன. பாசன அதிர்வெண்ணை சற்று அதிகரிக்கவும்.',

    // Crop names
    'crop.rice': 'நெல்',
    'crop.maize': 'மக்காச்சோளம்',
    'crop.wheat': 'கோதுமை',
    'crop.cotton': 'பருத்தி',
    'crop.tomato': 'தக்காளி',

    // UI labels
    'ui.krishiNetra': 'கிரிஷிநேத்ர',
    'ui.farmer': 'விவசாயி',
    'ui.voiceButton': 'குரல் பொத்தான்',

    // Alerts Page
    'alerts.title': 'எச்சரிக்கைகள்',
    'alerts.critical': 'முக்கியமான',
    'alerts.high': 'உயர்',
    'alerts.medium': 'நடுத்தர',
    'alerts.low': 'தாழ்ந்த',
    'alerts.noAlerts': 'எச்சரிக்கைகள் இல்லை',
    'alerts.checkDrainage': 'வடிகாலை சரிபார்க்கவும்',
    'alerts.inspectFields': 'வயல்களை ஆய்வு செய்யவும்',
    'alerts.adjustSoilPH': 'மண் pH சரிசெய்யவும்',

    // Market Page
    'market.title': 'சந்தை நுண்ணறிவு',
    'market.price': 'விலை',
    'market.demand': 'கோரிக்கை',
    'market.supply': 'விநியோகம்',
    'market.trend': 'போக்கு',
    'market.forecast': 'முன்னறிவிப்பு',

    // Finance Page
    'finance.title': 'நிதி',
    'finance.totalRevenue': 'மொத்த வருவாய்',
    'finance.expenses': 'செலவுகள்',
    'finance.profit': 'லாभ',
    'finance.breakdown': 'செலவு விநியோகம்',

    // Climate Advisor
    'climate.title': 'காலநிலை ஆலோசகர்',
    'climate.vulnerability': 'பாதிப்புத்திறன் மதிப்பெண்',
    'climate.droughtRisk': 'வறட்சி ஆபத்து',
    'climate.floodRisk': 'வெள்ளம் ஆபத்து',
    'climate.recommendations': 'பரிந்துரைகள்',

    // GIS Map
    'gis.title': 'ஜீআईஎஸ் வரைபடம்',
    'gis.fieldOverlay': 'வயல் மேலெழுத்து',
    'gis.soilMap': 'மண் வரைபடம்',
    'gis.cropMap': 'பயிர் வரைபடம்',

    // Precision Agriculture
    'precision.title': 'துல்லியமான விவசாயம்',
    'precision.soilMoisture': 'மண் ஈரப்பதம்',
    'precision.nitrogenLevel': 'நைட்ரஜன் மட்டம்',
    'precision.phLevel': 'பி.எச் மட்டம்',
    'precision.optimization': 'உகந்தமாக்குதல்',

    // Common
    'common.loading': 'ஏற்றுதல் ...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.save': 'சேமிக்கவும்',
    'common.cancel': 'ரத்துசெய்க',
    'common.delete': 'நீக்கவும்',
    'common.edit': 'சொல்லவும்',
    'common.profile': 'சுயவிவரம்',
    'common.logout': 'வெளியேறு',
    'common.language': 'மொழி',

    // CTA Section
    'cta.title': 'உங்கள் பண்ணையை மாற்ற தயாரா?',
    'cta.description': 'கிருஷிநேத்ரவைப் பயன்படுத்தும் ஆயிரக்கணக்கான விவசாயிகளுடன் சேரவும் விளைச்சல் அதிகரிக்க, செலவுகளை குறைக்க மற்றும் நிலைத்தன்மையை உறுதி செய்ய',
    'cta.startTrial': 'இலவச சோதனை தொடங்கவும்',
    'cta.voiceInterface': 'குரல்-முதல் இடைமுகம்',
    'cta.realTimeAlerts': 'நிகழ்நிலை அறிவிப்புகள்',
    'cta.marketPredictions': 'சந்தை முன்னறிவிப்புகள்',

    // Footer
    'footer.description': 'இந்தியாவின் ஒவ்வொரு விவசாயிக்கும் AI-ஆல் இயக்கப்படும் விவசாயம்',
    'footer.product': 'பொருள்',
    'footer.features': 'பண்புகள்',
    'footer.pricing': 'விலை நிர்ணயம்',
    'footer.company': 'நிறுவனம்',
    'footer.about': 'பற்றி',
    'footer.contact': 'தொடர்பு',
    'footer.legal': 'சட்டப்பூர்வ',
    'footer.privacy': 'தனிமை',
    'footer.terms': 'நிபந்தனைகள்',
    'footer.copyright': '© 2026 கிருஷிநேத்ர. எல்லா உரிமைகளும் সংরক্ষিত.',
  },
  kn: {
    // Navigation
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.alerts': 'ಎಚ್ಚರಿಕೆಗಳು',
    'nav.assistant': 'ಸಹಾಯಕ',
    'nav.climateAdvisor': 'ಜಲವಾಯು ಸಲಹೆದಾರ',
    'nav.cropBreeding': 'ಬೆಳೆ ತಳಿ ಸಂವರ್ಧನೆ',
    'nav.finance': 'ಹಣತಂತ್ರ',
    'nav.gisMap': 'ಜಿಐಎಸ್ ನಕ್ಷೆ',
    'nav.market': 'ಮಾರುಕಟ್ಟೆ',
    'nav.precisionAgriculture': 'ನಿಖಿಲ ಕೃಷಿ',
    'nav.sustainability': 'ನಿರಂತರತೆ',

    // Home Page
    'home.title': 'ಕೃಷಿನೇತ್ರ',
    'home.subtitle': 'ಕೃತ್ರಿಮ ಬುದ್ಧಿಮತ್ತೆಯಿಂದ ಕೃಷಿಕರನ್ನು ಸಕ್ತಗೊಳಿಸುವುದು',
    'home.cta': 'ಪ್ರಾರಂಭಿಸಿ',
    'home.learnMore': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'home.features': 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    'home.featureWeather': 'ನೈಜ ಸಮಯ ಹವಾಮಾನ ಡೇಟಾ',
    'home.featureAlerts': 'ಸ್ಮಾರ್ಟ್ ಎಚ್ಚರಿಕೆಗಳು',
    'home.featureMarket': 'ಮಾರುಕಟ್ಟೆ ಬುದ್ಧಿಮತ್ತೆ',
    'home.featureGIS': 'ಜಿಐಎಸ್ ಮ್ಯಾಪಿಂಗ್',
    'home.footer': 'ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಭಾರತೀಯ ಕೃಷಿಯನ್ನು ಸಕ್ತಗೊಳಿಸುವುದು',
    'home.copyright': '© 2024 ಕೃಷಿನೇತ್ರ. ಎಲ್ಲಾ ಅಧಿಕಾರಗಳನ್ನು ಸಂರಕ್ಷಿತಗೊಳಿಸಲಾಗಿದೆ.',

    // Dashboard
    'dashboard.title': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'dashboard.weather': 'ಹವಾಮಾನ',
    'dashboard.alerts': 'ಎಚ್ಚರಿಕೆಗಳು',
    'dashboard.crops': 'ಬೆಳೆ ಸ್ಥಿತಿ',
    'dashboard.yourCrops': 'ನಿಮ್ಮ ಬೆಳೆ',
    'dashboard.health': 'ಆರೋಗ್ಯ',
    'dashboard.soilMoisture': 'ಮೃತ್ತಿಕೆ ತೇವಾಂಶ',
    'dashboard.market': 'ಮಾರುಕಟ್ಟೆ ಡೇಟಾ',
    'dashboard.marketPriceForecast': 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮುನ್ನೋಲ್ಲೆ',
    'dashboard.monthlyFlowCashFlow': 'ಮಾಸಿಕ ನಗದು ಹರಿವು',
    'dashboard.finance': 'ಹಣತಂತ್ರ ಸಾರಾಂಶ',
    'dashboard.temperature': 'ತಾಪಮಾನ',
    'dashboard.humidity': 'ಆರ್ದ್ರತೆ',
    'dashboard.rainfall': 'ಮಳೆ',
    'dashboard.windSpeed': 'ಗಾಳಿ ವೇಗ',
    'dashboard.noAlerts': 'ಯಾವುದೇ ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ',
    'dashboard.cropHealth': 'ಬೆಳೆ ಆರೋಗ್ಯ',
    'dashboard.yield': 'ಇಳುವರಿ ಮುನ್ನೋಲ್ಲೆ',
    'dashboard.marketPrice': 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
    'dashboard.revenue': 'ರಾಜಸ್ವ',
    'dashboard.currentWeatherRisk': 'ಪ್ರಸ್ತುತ ಹವಾಮಾನ & ಅಪಾಯ',
    'dashboard.price': 'ಬೆಲೆ',
    'dashboard.income': 'ತುಂಬು',
    'dashboard.expenses': 'ಖರ್ಚು',
    'dashboard.date': 'ದಿನಾಂಕ',
    'dashboard.month': 'ತಿಂಗಳು',

    // Weather conditions
    'weather.partlyCloudy': 'ಆಂಶಿಕವಾಗಿ ಮೇಘಾವೃತ',
    'weather.sunny': 'ಸೂರ್ಯೋದಯ',
    'weather.rainy': 'ಮಳೆ',
    'weather.cloudy': 'ಮೇಘಾವೃತ',
    'weather.stormy': 'ಝಡಪ್ರವಾಹ',

    // Risk levels
    'risk.low': 'ಕಡಿಮೆ',
    'risk.medium': 'ಮಧ್ಯಮ',
    'risk.high': 'ಅಧಿಕ',
    'risk.critical': 'ತಾತ್ಕಾಲಿಕ',

    // Alerts
    'alert.heavyRainTitle': 'ಬಿರುಸಿನ ಮಳೆ ನಿರೀಕ್ಷಿತ',
    'alert.heavyRainDesc': 'ಮುಂದಿನ 48 ಗಂಟೆಯಲ್ಲಿ ತೀವ್ರ ಮಳೆ ನಿರೀಕ್ಷಿತ. ಹೊಲ ಜಲ ಸರಳೀಕರಣ ವ್ಯವಸ್ಥೆ ಕಾರ್ಯಚಿಹ್ನವೆಂದು ಖಚಿತಪಡಿಸಬೇಕು.',
    'alert.armywormTitle': 'ಸೈನ್ಯದ ಕೀಟ ಪ್ರಕೋಪ ಪತ್ತೆ',
    'alert.armywormDesc': 'ಸಾಮೀಪ್ಯದ ಹೊಲಗಳಲ್ಲಿ ಪತನ ಸೈನ್ಯದ ಕೀಟದ ಉಪಸ್ಥಿತಿ ಖಚಿತಪಡಿಸಲಾಗಿದೆ. ತಕ್ಷಣ ತಪಾಸಣೆ ಸೂಚಿಸಲಾಗಿದೆ.',
    'alert.soilPHTitle': 'ಮಣ್ಣಿನ pH ಅಸಮರ್ಥತೆ',
    'alert.soilPHDesc': 'ಮಣ್ಣಿನ ಅಮ್ಲತೆ ಮಾತ್ರೆಗಳು ಜಾರುತ್ತವೆ. pH ಅನ್ನು ಸ್ಥಿರೀಕರಿಸಲು ಸುಣ್ಣ ಸೇರಿಸಲು ವಿವೇಚನೆ ನೀಡಿ.',
    'alert.irrigationTitle': 'ನೀರಾವರಣ ವೇಳಾಪಟ್ಟಿ ಸರಿಹೊಂದಿಸು',
    'alert.irrigationDesc': 'ಹವಾಮಾನ ಪೂರ್ವಾಭಾಸಿತವನ್ನು ಆಧರಿಸಿ ಮುಂದಿನ 2 ದಿನಗಳಲ್ಲಿ ನೀರಾವರಣಕ್ಕೆ ಅನುಕೂಲ ಮಾಡುವ ಸರಿಸಲಾಗಿದೆ.',
    'alert.fertilizerTitle': 'ಲೋಟ ಅನ್ವಯ ನೆನಪಾಗಮನೆ',
    'alert.fertilizerDesc': 'ಈ ವಾರ ನೈಟ್ರೋಜನ್ ಲೋಟದ ಎರಡನೇ ಸುತ್ತು ಮುಕ್ತವಾಗಿದೆ.',
    'alert.waterStressTitle': 'ನೀರಿನ ಒತ್ತಡ ಎಚ್ಚರಿಕೆ',
    'alert.waterStressDesc': 'ಮಣ್ಣಿನ ಆರ್ದ್ರತೆ ಮಾತ್ರೆ ಕುಸಿತವಾಗುತ್ತವೆ. ನೀರಾವರಣ ಗಾತ್ರತೆ ಸ್ವಲ್ಪ ಹೆಚ್ಚಿಸಿ.',

    // Crop names
    'crop.rice': 'ಅಕ್ಕಿ',
    'crop.maize': 'ಜೋಳ',
    'crop.wheat': 'ಗೋಧಿ',
    'crop.cotton': 'ನೇರಿ',
    'crop.tomato': 'ಲೋಟ',

    // UI labels
    'ui.krishiNetra': 'ಕೃಷಿನೇತ್ರ',
    'ui.farmer': 'ರೈತ',
    'ui.voiceButton': 'ಧ್ವನಿ ಬಟನ್',

    // Alerts Page
    'alerts.title': 'ಎಚ್ಚರಿಕೆಗಳು',
    'alerts.critical': 'ಸಮಾಲೋಚನೀಯ',
    'alerts.high': 'ಹೆಚ್ಚು',
    'alerts.medium': 'ಮಧ್ಯಮ',
    'alerts.low': 'ಕೆಳ',
    'alerts.noAlerts': 'ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ',
    'alerts.checkDrainage': 'ನಿರ್ಗಮನ ಪರೀಕ್ಷಿಸಿ',
    'alerts.inspectFields': 'ಹೋಲಿಕೆ ಪರಿದರ್ಶನ ಮಾಡಿ',
    'alerts.adjustSoilPH': 'ಮೃತ್ತಿಕೆ pH ಸರಿಹೊಂದಿಸಿ',

    // Market Page
    'market.title': 'ಮಾರುಕಟ್ಟೆ ಬುದ್ಧಿಮತ್ತೆ',
    'market.price': 'ಬೆಲೆ',
    'market.demand': 'ಬೇಡಿಕೆ',
    'market.supply': 'ತಾರತಮ್ಯ',
    'market.trend': 'ಪ್ರವೃತ್ತಿ',
    'market.forecast': 'ಮುನ್ನೋಲ್ಲೆ',

    // Finance Page
    'finance.title': 'ಹಣತಂತ್ರ',
    'finance.totalRevenue': 'ಒಟ್ಟು ರಾಜಸ್ವ',
    'finance.expenses': 'ವೆಚ್ಚಗಳು',
    'finance.profit': 'ಲಾಭ',
    'finance.breakdown': 'ವೆಚ್ಚ ವಿಭಜನೆ',

    // Climate Advisor
    'climate.title': 'ಜಲವಾಯು ಸಲಹೆದಾರ',
    'climate.vulnerability': 'ದುರ್ಬಲತೆ ಸ್ಕೋರ್',
    'climate.droughtRisk': 'ಬರ ಝುಂಬು',
    'climate.floodRisk': 'ಪ್ರವಾಹ ಝುಂಬು',
    'climate.recommendations': 'ಸೂಚನೆಗಳು',

    // GIS Map
    'gis.title': 'ಜಿಐಎಸ್ ನಕ್ಷೆ',
    'gis.fieldOverlay': 'ಹೋಲಿಕೆ ಅವಿವರಣ',
    'gis.soilMap': 'ಮೃತ್ತಿಕೆ ನಕ್ಷೆ',
    'gis.cropMap': 'ಬೆಳೆ ನಕ್ಷೆ',

    // Precision Agriculture
    'precision.title': 'ನಿಖಿಲ ಕೃಷಿ',
    'precision.soilMoisture': 'ಮೃತ್ತಿಕೆ ಪ್ರಮಾಣ',
    'precision.nitrogenLevel': 'ನೈಟ್ರೋಜನ್ ಮಟ್ಟ',
    'precision.phLevel': 'pH ಮಟ್ಟ',
    'precision.optimization': 'ಗರಿಷ್ಠೀಕರಣ',

    // Common
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.error': 'ದೋಷ',
    'common.success': 'ಸಫಲ',
    'common.save': 'ಉಳಿಸಿ',
    'common.cancel': 'ರದ್ದುಮಾಡಿ',
    'common.delete': 'ಅಳಿಸಿ',
    'common.edit': 'ತಿದ್ದುವ',
    'common.profile': 'ಪ್ರೊಫೈಲ್',
    'common.logout': 'ಲಾಗ್ ಔಟ್',
    'common.language': 'ಭಾಷೆ',

    // CTA Section
    'cta.title': 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಪರಿವರ್ತಿಸಲು ಸಿದ್ಧರಾ?',
    'cta.description': 'ಕೃಷಿನೇತ್ರವನ್ನು ಬಳಸುವ ಸಾವಿರಾರು ರೈತರೊಂದಿಗೆ ಸೇರಿ ಇಳುವರಿ ಹೆಚ್ಚಿಸಿ, ಖರ್ಚುಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ ಮತ್ತು ಸ್ಥಿರತೆಯನ್ನು ಖಚಿತಪಡಿಸಿ',
    'cta.startTrial': 'ಉಚಿತ ಪ್ರಯೋಗವನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    'cta.voiceInterface': 'ವಾಯ್ಸ್-ಫಸ್ಟ್ ಇಂಟರ್‌ಫೇಸ್',
    'cta.realTimeAlerts': 'ನೈಜ-ಸಮಯ ಎಚ್ಚರಿಕೆಗಳು',
    'cta.marketPredictions': 'ಮಾರುಕಟ್ಟೆ ಭವಿಷ್ಯವಾಣಿಗಳು',

    // Footer
    'footer.description': 'ಭಾರತದ ಪ್ರತಿಯೊಬ್ಬ ರೈತನಿಗೆ AI-ಶಕ್ತಿಯುಕ್ತ ಕೃಷಿ',
    'footer.product': 'ಉತ್ಪನ್ನ',
    'footer.features': 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    'footer.pricing': 'ಬೆಲೆ ನಿಧಾರಣೆ',
    'footer.company': 'ಕಂಪನಿ',
    'footer.about': 'ಸುಮಾರು',
    'footer.contact': 'ಸಂಪರ್ಕ',
    'footer.legal': 'ಕಾನೂನು',
    'footer.privacy': 'ಗೌಪ್ಯತೆ',
    'footer.terms': 'ನಿಯಮಗಳು',
    'footer.copyright': '© 2026 ಕೃಷಿನೇತ್ರ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಪಾಡಲಾಗಿದೆ.',
  },
  mr: {
    // Navigation
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.alerts': 'सतर्कता',
    'nav.assistant': 'सहायक',
    'nav.climateAdvisor': 'जलवायु सल्लागार',
    'nav.cropBreeding': 'पीक प्रजनन',
    'nav.finance': 'वित्त',
    'nav.gisMap': 'जीआईएस नकाशा',
    'nav.market': 'बाजार',
    'nav.precisionAgriculture': 'अचूक कृषी',
    'nav.sustainability': 'स्थायित्व',

    // Home Page
    'home.title': 'कृषिनेत्र',
    'home.subtitle': 'कृत्रिम बुद्धिमत्तेने शेतकरीं सक्षम करणे',
    'home.cta': 'सुरुवात करा',
    'home.learnMore': 'अधिक जाणून घ्या',
    'home.features': 'वैशिष्ट्ये',
    'home.featureWeather': 'रीयल-टाइम हवामान डेटा',
    'home.featureAlerts': 'स्मार्ट सतर्कता',
    'home.featureMarket': 'बाजार बुद्धिमत्ता',
    'home.featureGIS': 'जीआईएस मॅपिंग',
    'home.footer': 'तंत्रज्ञानातून भारतीय कृषीला सक्षम करणे',
    'home.copyright': '© 2024 कृषिनेत्र. सर्व हक्क राखीव.',

    // Dashboard
    'dashboard.title': 'डॅशबोर्ड',
    'dashboard.weather': 'हवामान',
    'dashboard.alerts': 'सतर्कता',
    'dashboard.crops': 'पीक स्थिती',
    'dashboard.yourCrops': 'तुमची पीके',
    'dashboard.health': 'आरोग्य',
    'dashboard.soilMoisture': 'मातीचा ओलावणीपणा',
    'dashboard.market': 'बाजार डेटा',
    'dashboard.marketPriceForecast': 'बाजार किंमत अंदाज',
    'dashboard.monthlyFlowCashFlow': 'मासिक रोख प्रवाह',
    'dashboard.finance': 'वित्त विहंगावलोकन',
    'dashboard.temperature': 'तापमान',
    'dashboard.humidity': 'आर्द्रता',
    'dashboard.rainfall': 'पाऊस',
    'dashboard.windSpeed': 'वारा गती',
    'dashboard.noAlerts': 'कोणत्याही सक्रिय सतर्कता नाही',
    'dashboard.cropHealth': 'पीक आरोग्य',
    'dashboard.yield': 'उपज अंदाज',
    'dashboard.marketPrice': 'बाजार किंमत',
    'dashboard.revenue': 'महसूल',
    'dashboard.currentWeatherRisk': 'वर्तमान हवामान & जोखीम',
    'dashboard.price': 'किंमत',
    'dashboard.income': 'उत्पन्न',
    'dashboard.expenses': 'खर्च',
    'dashboard.date': 'तारीख',
    'dashboard.month': 'महीना',

    // Weather conditions
    'weather.partlyCloudy': 'अंशतः मेघाच्छन्न',
    'weather.sunny': 'धूप',
    'weather.rainy': 'पाऊस',
    'weather.cloudy': 'मेघाच्छन्न',
    'weather.stormy': 'तूफानी',

    // Risk levels
    'risk.low': 'कम',
    'risk.medium': 'मध्यम',
    'risk.high': 'उच्च',
    'risk.critical': 'महत्वपूर्ण',

    // Alerts
    'alert.heavyRainTitle': 'भारी बारिश की उम्मीद',
    'alert.heavyRainDesc': 'अगले 48 घंटे में भारी बारिश की उम्मीद है। सुनिश्चित करें कि खेत की वाटर ड्रेनेज सिस्टम काम कर रहा है।',
    'alert.armywormTitle': 'आर्मीवर्म कीट की खोज',
    'alert.armywormDesc': 'आसपास के खेतों में गिरने वाले आर्मीवर्म की मौजूदगी की पुष्टि की गई है। तुरंत निरीक्षण की सिफारिश की जाती है।',
    'alert.soilPHTitle': 'मिट्टी के pH में असंतुलन',
    'alert.soilPHDesc': 'मिट्टी की अम्लता का स्तर बदल गया है। pH को स्थिर करने के लिए चूना मिलाने पर विचार करें।',
    'alert.irrigationTitle': 'सिंचाई अनुसूची समायोजन',
    'alert.irrigationDesc': 'मौसम पूर्वानुमान के आधार पर अगले 2 दिनों में सिंचाई के लिए इष्टतम समय।',
    'alert.fertilizerTitle': 'खाद आवेदन अनुस्मारक',
    'alert.fertilizerDesc': 'इस सप्ताह नाइट्रोजन खाद का दूसरा दौर देय है।',
    'alert.waterStressTitle': 'जल तनाव चेतावनी',
    'alert.waterStressDesc': 'मिट्टी की नमी का स्तर कम हो रहा है। सिंचाई की आवृत्ति को थोड़ा बढ़ाएं।',

    // Crop names
    'crop.rice': 'चावल',
    'crop.maize': 'मकई',
    'crop.wheat': 'गेहूं',
    'crop.cotton': 'कपास',
    'crop.tomato': 'टमाटर',

    // UI labels
    'ui.krishiNetra': 'कृषिनेत्र',
    'ui.farmer': 'किसान',
    'ui.voiceButton': 'वॉयस बटन',

    // Alerts Page
    'alerts.title': 'सतर्कता',
    'alerts.critical': 'गंभीर',
    'alerts.high': 'उच्च',
    'alerts.medium': 'मध्यम',
    'alerts.low': 'कमी',
    'alerts.noAlerts': 'कोणत्याही सतर्कता नाही',
    'alerts.checkDrainage': 'ड्रेनेज तपासा',
    'alerts.inspectFields': 'शेतांची तपासणी करा',
    'alerts.adjustSoilPH': 'मातीचा पीएच समायोजित करा',

    // Market Page
    'market.title': 'बाजार बुद्धिमत्ता',
    'market.price': 'किंमत',
    'market.demand': 'मागणी',
    'market.supply': 'पुरवठा',
    'market.trend': 'प्रवृत्ती',
    'market.forecast': 'अंदाज',

    // Finance Page
    'finance.title': 'वित्त',
    'finance.totalRevenue': 'एकूण महसूल',
    'finance.expenses': 'खर्च',
    'finance.profit': 'नफा',
    'finance.breakdown': 'खर्च विभाजन',

    // Climate Advisor
    'climate.title': 'जलवायु सल्लागार',
    'climate.vulnerability': 'असुरक्षितता स्कोर',
    'climate.droughtRisk': 'दुष्काळ जोखीम',
    'climate.floodRisk': 'बाढ जोखीम',
    'climate.recommendations': 'शिफारशी',

    // GIS Map
    'gis.title': 'जीआईएस नकाशा',
    'gis.fieldOverlay': 'शेत ओव्हरले',
    'gis.soilMap': 'माती नकाशा',
    'gis.cropMap': 'पीक नकाशा',

    // Precision Agriculture
    'precision.title': 'अचूक कृषी',
    'precision.soilMoisture': 'माती ओलावणीपणा',
    'precision.nitrogenLevel': 'नायट्रोजन स्तर',
    'precision.phLevel': 'पीएच स्तर',
    'precision.optimization': 'अनुकूलन',

    // Common
    'common.loading': 'लोड होत आहे...',
    'common.error': 'त्रुटी',
    'common.success': 'यशस्वी',
    'common.save': 'जतन करा',
    'common.cancel': 'रद्द करा',
    'common.delete': 'हटवा',
    'common.edit': 'संपादित करा',
    'common.profile': 'प्रोफाईल',
    'common.logout': 'लॉग आउट',
    'common.language': 'भाषा',

    // CTA Section
    'cta.title': 'आपले शेत बदलण्यास तयार आहात?',
    'cta.description': 'कृषिनेत्र वापरणाऱ्या हजारो शेतकरीसाठी उपज वाढवा, खर्च कमी करा आणि स्थिरता सुनिश्चित करा',
    'cta.startTrial': 'विनामूल्य चाचणी सुरू करा',
    'cta.voiceInterface': 'व्हॉईस-प्रथम इंटरफेस',
    'cta.realTimeAlerts': 'रीयल-टाइम सतर्कता',
    'cta.marketPredictions': 'बाजार सूचक',

    // Footer
    'footer.description': 'भारतातील प्रत्येक शेतकर्यांसाठी AI-शक्तिचलित कृषी',
    'footer.product': 'उत्पादन',
    'footer.features': 'वैशिष्ट्ये',
    'footer.pricing': 'मूल्य निर्धारण',
    'footer.company': 'कंपनी',
    'footer.about': 'बद्दल',
    'footer.contact': 'संपर्क',
    'footer.legal': 'कायदेशीर',
    'footer.privacy': 'गोपनीयता',
    'footer.terms': 'अटी',
    'footer.copyright': '© 2026 कृषिनेत्र. सर्व हक्क राखीव.',
  },
};

/**
 * Get translated text
 */
export function t(key: string, language: LanguageCode): string {
  return translations[language]?.[key] || translations['en'][key] || key;
}
