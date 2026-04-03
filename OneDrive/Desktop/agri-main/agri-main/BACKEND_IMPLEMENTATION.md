# Backend Implementation Guide

This guide shows backend developers what endpoints to implement and what data format to return.

## 🚀 Quick Start

### 1. Base API URL Setup
```
http://localhost:5000/api
```

### 2. Response Format (All Endpoints)
```json
{
  "success": true,
  "data": {
    // endpoint-specific data
  }
}
```

---

## 📡 Endpoint Implementations

### Alerts API

#### GET `/alerts`
**Purpose**: Get all farm alerts

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "severity": "critical",
      "title": "Heavy Rain Expected",
      "description": "Severe rainfall expected in next 48 hours",
      "action": "Check drainage",
      "timestamp": "2024-04-03T10:00:00Z",
      "cropName": "Rice",
      "voiceUrl": "/audio/alert-1.mp3"
    }
  ]
}
```

#### GET `/alerts/{id}`
**Purpose**: Get specific alert

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "severity": "critical",
    "title": "Heavy Rain Expected",
    "description": "Severe rainfall expected in next 48 hours",
    "action": "Check drainage",
    "timestamp": "2024-04-03T10:00:00Z",
    "cropName": "Rice"
  }
}
```

---

### Weather API

#### GET `/weather`
**Purpose**: Get current weather data

**Response**:
```json
{
  "success": true,
  "data": {
    "temp": 32,
    "condition": "Partly Cloudy",
    "humidity": 65,
    "windSpeed": 12,
    "riskLevel": "medium",
    "prediction": "Heavy rain expected in 48 hours"
  }
}
```

#### GET `/weather/forecast`
**Purpose**: Get weather forecast (7-14 days)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-04-03",
      "high": 35,
      "low": 25,
      "condition": "Sunny",
      "precipitation": 0,
      "windSpeed": 10
    }
  ]
}
```

---

### Crop Status API

#### GET `/crops/status`
**Purpose**: Get status of all farmer's crops

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "cropName": "Rice",
      "health": 85,
      "soilMoisture": 72,
      "pestRisk": "medium",
      "lastUpdated": "2024-04-03T10:00:00Z"
    }
  ]
}
```

#### GET `/crops/{id}`
**Purpose**: Get detailed crop information

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "cropName": "Rice",
    "variety": "Basmati",
    "plantedDate": "2023-06-01",
    "expectedHarvestDate": "2023-10-15",
    "area": 2.5,
    "health": 85,
    "soilMoisture": 72,
    "pestRisk": "medium",
    "diseases": [],
    "notes": "Growing well"
  }
}
```

#### GET `/crops/varieties`
**Purpose**: Get all available crop varieties

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "v1",
      "name": "IR-64",
      "parentCrop": "Rice",
      "maturityPeriod": 120,
      "yieldPotential": 6000,
      "price": 25,
      "waterRequirement": 1000,
      "soilTypeRequirement": "Loamy",
      "climateResilience": {
        "drought": 60,
        "flood": 80,
        "heat": 70,
        "pest": 65,
        "disease": 75
      },
      "certifications": ["Organic"]
    }
  ]
}
```

---

### Market API

#### GET `/market`
**Purpose**: Get market data for all crops

**Response**:
```json
{
  "success": true,
  "data": {
    "rice": {
      "cropName": "Rice",
      "currentPrice": 2400,
      "bestTimeToSell": {
        "date": "2024-04-15",
        "confidence": 85,
        "reason": "Expected price spike due to supply shortage"
      },
      "forecast": [
        {
          "date": "2024-04-04",
          "price": 2410,
          "confidence": 90
        }
      ],
      "historicalData": [
        {
          "date": "2024-03-01",
          "price": 2300
        }
      ]
    }
  }
}
```

#### GET `/market/{crop}`
**Purpose**: Get market data for specific crop

**Response**:
```json
{
  "success": true,
  "data": {
    "cropName": "Rice",
    "currentPrice": 2400,
    "bestTimeToSell": {
      "date": "2024-04-15",
      "confidence": 85,
      "reason": "Expected price spike"
    },
    "forecast": [
      {
        "date": "2024-04-04",
        "price": 2410,
        "confidence": 90
      }
    ],
    "historicalData": [
      {
        "date": "2024-03-01",
        "price": 2300
      }
    ]
  }
}
```

#### GET `/market/forecast`
**Purpose**: Get price forecasts for all crops

**Response**: Same as `/market`

---

### Finance API

#### GET `/finance`
**Purpose**: Get farmer's financial data

**Response**:
```json
{
  "success": true,
  "data": {
    "income": 150000,
    "expenses": 45000,
    "monthlyData": [
      {
        "month": "March",
        "income": 50000,
        "expenses": 15000
      }
    ],
    "forecast": [
      {
        "month": "April",
        "projected": 55000
      }
    ],
    "creditSuggestions": [
      {
        "amount": 25000,
        "interestRate": 4.5,
        "term": 12
      }
    ]
  }
}
```

---

### Sustainability API

#### GET `/sustainability/green-score`
**Purpose**: Get environmental sustainability metrics

**Response**:
```json
{
  "success": true,
  "data": {
    "overallScore": 75,
    "soilHealth": {
      "score": 80,
      "metrics": [
        {"label": "Organic Matter", "value": 65},
        {"label": "pH Level", "value": 85}
      ]
    },
    "waterUsage": {
      "score": 70,
      "metrics": [
        {"label": "Efficiency", "value": 70}
      ]
    },
    "pesticideImpact": {
      "score": 75,
      "metrics": [
        {"label": "Chemical Reduction", "value": 75}
      ]
    },
    "recommendations": [
      "Increase organic matter by 10%",
      "Optimize irrigation timing"
    ],
    "trend": [
      {"date": "2024-01-01", "score": 70},
      {"date": "2024-04-03", "score": 75}
    ]
  }
}
```

---

### IoT Sensors API

#### GET `/iot/sensors`
**Purpose**: Get all IoT sensor data

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "s1",
      "name": "Soil Moisture Sensor",
      "location": "Field A",
      "currentValue": 65,
      "unit": "%",
      "status": "healthy",
      "optimalRange": {"min": 50, "max": 80},
      "threshold": 60
    }
  ]
}
```

#### GET `/iot/sensors/{id}`
**Purpose**: Get specific sensor data

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "s1",
    "name": "Soil Moisture Sensor",
    "location": "Field A",
    "currentValue": 65,
    "unit": "%",
    "status": "healthy",
    "optimalRange": {"min": 50, "max": 80},
    "timestamp": "2024-04-03T10:00:00Z"
  }
}
```

---

### Climate API

#### GET `/climate/advisor`
**Purpose**: Get climate-smart agriculture recommendations

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "strategy": "Mulching",
      "cropName": "Wheat",
      "description": "Apply organic mulch to retain soil moisture",
      "impact": "20% water savings",
      "recommendedVarieties": ["HD-2967"],
      "implementation": {
        "timeline": "Spring",
        "cost": 5000,
        "difficulty": "Easy"
      }
    }
  ]
}
```

#### GET `/climate/vulnerabilities`
**Purpose**: Get climate vulnerability assessment

**Response**:
```json
{
  "success": true,
  "data": {
    "droughtRisk": 60,
    "floodRisk": 45,
    "temperatureStress": 55,
    "pestsAndDiseases": 50,
    "overallVulnerability": 52,
    "recommendedAdaptations": [
      "Switch to drought-resistant varieties",
      "Install drip irrigation"
    ]
  }
}
```

---

### Voice Query API

#### POST `/voice/query`
**Purpose**: Send voice query and get response

**Request** (multipart form data):
```
audio: <WAV/MP3 file>
language: "en"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "query": "What is the weather today?",
    "response": "Current weather is partly cloudy with 32°C temperature",
    "responseAudio": "base64_encoded_audio",
    "language": "en"
  }
}
```

---

### Chat API

#### POST `/assistant/chat`
**Purpose**: Send chat message to AI assistant

**Request**:
```json
{
  "message": "How should I prepare my field?",
  "conversationId": "conv123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "msg123",
    "sender": "assistant",
    "text": "Here are the field preparation steps...",
    "timestamp": "2024-04-03T10:00:00Z"
  }
}
```

---

## 🔧 Database Schema Suggestions

### alerts table
```sql
CREATE TABLE alerts (
  id TEXT PRIMARY KEY,
  severity TEXT,
  title TEXT,
  description TEXT,
  action TEXT,
  timestamp DATETIME,
  crop_name TEXT,
  farmer_id TEXT,
  voice_url TEXT
);
```

### crop_status table
```sql
CREATE TABLE crop_status (
  id TEXT PRIMARY KEY,
  farmer_id TEXT,
  crop_name TEXT,
  health INT,
  soil_moisture INT,
  pest_risk TEXT,
  last_updated DATETIME
);
```

### market_data table
```sql
CREATE TABLE market_data (
  id TEXT PRIMARY KEY,
  crop_name TEXT,
  current_price DECIMAL,
  best_sell_date DATE,
  confidence INT,
  timestamp DATETIME
);
```

---

## ✅ Testing Checklist

- [ ] All endpoints return proper response format
- [ ] CORS headers are set correctly
- [ ] Timeout handling works (respects 30s limit)
- [ ] Error responses include error message
- [ ] Data types match TypeScript interfaces in `lib/types.ts`
- [ ] Timestamp fields are ISO 8601 format
- [ ] Numeric fields are numbers (not strings)
- [ ] Arrays are returned as arrays (not objects)

---

## 🚀 Deployment

### Environment Variables (Backend)
```
DATABASE_URL=
API_PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## 📞 Questions?

Refer to:
- Frontend types: `lib/types.ts`
- Hook usage: `hooks/use-api.ts`
- API service: `lib/api.ts`
