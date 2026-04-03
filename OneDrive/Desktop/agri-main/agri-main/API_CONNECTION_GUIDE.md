# 🔌 Backend Connection Setup Guide

## ⚡ Quick Setup (5 minutes)

### 1. Configure Environment
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your backend URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. Start the Frontend
```bash
npm run dev
# App runs on http://localhost:3000
```

### 3. Verify Connection
- Open browser DevTools (F12)
- Go to Network tab
- Perform an action in the app (view dashboard, alerts, etc.)
- You should see API calls to your backend

---

## 🚀 Production Setup

### Frontend Deployment
```bash
# Build for production
npm run build
npm start

# Set the production API URL
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### Environment Configuration

| Environment | API URL | Timeout |
|---|---|---|
| **Development** | `http://localhost:5000/api` | 30000ms |
| **Staging** | `https://staging-api.domain.com` | 30000ms |
| **Production** | `https://api.domain.com` | 30000ms |

**Update .env.local for each environment**

---

## 🔧 Backend Connection Points

### 1. API Service (`lib/api.ts`)
- Handles all HTTP requests (GET, POST, PUT, DELETE)
- Automatic timeout management
- Error handling and logging
- Request/response formatting

### 2. Custom Hooks (`hooks/use-api.ts`)
- React hooks for each API endpoint
- Automatic loading state management
- Error handling
- Fallback support

### 3. Configuration (`lib/api-endpoints.ts`)
- Centralized endpoint definitions
- Easy to maintain and update
- Type-safe endpoint building

---

## 📋 Checklist: Connect Your Backend

### Phase 1: Backend Setup
- [ ] API running on `http://localhost:5000` (or your port)
- [ ] CORS enabled for `http://localhost:3000`
- [ ] Database connected and populated with test data
- [ ] All endpoints return proper JSON responses

### Phase 2: Frontend Configuration
- [ ] Copy `.env.example` to `.env.local`
- [ ] Set `NEXT_PUBLIC_API_URL` to your backend
- [ ] Restart frontend dev server

### Phase 3: Testing
- [ ] [ ] Open browser DevTools Network tab
- [ ] [ ] Navigate to Dashboard page
- [ ] [ ] Verify API calls in Network tab
- [ ] [ ] Check for successful responses (200 status)
- [ ] [ ] If errors appear, check backend logs

### Phase 4: Debugging
- [ ] [ ] Browser console shows no API errors
- [ ] [ ] Network tab shows HTTP 200 responses
- [ ] [ ] Data is displayed correctly
- [ ] [ ] Mock data fallback works if API fails

---

## 🐛 Troubleshooting

### Issue: API calls failing - "ERR_CONNECTION_REFUSED"

**Solution:**
1. Verify backend is running
   ```bash
   curl http://localhost:5000/api/health
   ```
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify backend port matches (default 5000)

### Issue: CORS errors in console

**Solution:**
Backend must allow CORS from frontend origin:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Issue: Timeout errors (30 seconds)

**Solution:**
1. Check backend performance
2. Verify network latency
3. Increase timeout in `.env.local`:
   ```
   NEXT_PUBLIC_API_TIMEOUT=60000
   ```

### Issue: Wrong data returned

**Solution:**
1. Check `/lib/types.ts` for expected data structure
2. Verify backend response format matches
3. Check `/lib/api-endpoints.ts` for correct endpoint
4. Review `/BACKEND_IMPLEMENTATION.md` for response examples

### Issue: Fallback to mock data (not connecting to backend)

**Solution:**
Check browser console logs for API errors. Mock data is used as fallback when API fails.

---

## 🧪 Manual API Testing

### Using curl (Terminal/PowerShell)
```bash
# Test alerts endpoint
curl http://localhost:5000/api/alerts

# Test weather endpoint
curl http://localhost:5000/api/weather

# Test with POST
curl -X POST http://localhost:5000/api/assistant/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

### Using Browser Console
```javascript
// Quick API test
fetch('http://localhost:5000/api/alerts')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

---

## 📞 API Response Debugging

### Enable Detailed Logging

Edit `lib/api.ts` and uncomment:
```typescript
console.log(`[API Request] ${method} ${endpoint}`, body);
console.log(`[API Response]`, data);
```

### Check Response Format

All API responses should follow:
```json
{
  "success": true,
  "data": { /* your data */ }
}
```

Or on error:
```json
{
  "success": false,
  "error": "error message"
}
```

---

## 🔄 Data Flow

```
User Action
    ↓
React Component
    ↓
Custom Hook (use-api.ts)
    ↓
API Service (api.ts)
    ↓
Backend API
    ↓
Database
    ↓
[Response returned the same way back]
    ↓
Component re-renders with new data
```

---

## 📦 Docker Deployment

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
ENV NEXT_PUBLIC_API_URL=https://api.yourdomain.com

CMD ["npm", "start"]
```

### Docker Compose Example
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000/api

  backend:
    image: your-backend:latest
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=...
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - it's in `.gitignore`
2. **Use HTTPS in production** - API_URL should be https://
3. **Implement authentication** - Add auth headers in `lib/api.ts`
4. **Rate limiting** - Prevent API abuse
5. **Input validation** - Validate data before sending
6. **Error messages** - Don't expose sensitive info

---

## 📚 Additional Resources

- [Backend Integration Guide](./BACKEND_INTEGRATION.md) - Detailed integration info
- [Backend Implementation Guide](./BACKEND_IMPLEMENTATION.md) - Example responses
- [API Endpoints Reference](./lib/api-endpoints.ts) - All endpoint definitions
- [Type Definitions](./lib/types.ts) - Data structure reference

---

## ✅ Final Checklist

Before going to production:

- [ ] Backend fully implemented with all endpoints
- [ ] CORS properly configured
- [ ] `.env.local` configured with production API URL
- [ ] Frontend built and tested
- [ ] All API calls verified working
- [ ] Error handling tested (simulate backend down)
- [ ] Mock data fallback working
- [ ] Authentication/authorization implemented if needed
- [ ] Rate limiting configured
- [ ] Monitoring and logging set up
- [ ] Performance tested

---

Need help? Check the logs! 🔍
