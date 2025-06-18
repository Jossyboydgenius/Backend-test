# 🧪 Database Tables Verification Guide

## Quick Manual Test Commands

### 1. Create Client and Get Auth Token
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Manual Test Client","email":"manualclient@test.com","password":"TestPass123!","userType":"CLIENT"}'
```

### 2. Create Provider  
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Manual Test Provider","email":"manualprovider@test.com","password":"TestPass123!","userType":"PROVIDER"}'
```

### 3. Create Booking (replace CLIENT_TOKEN and PROVIDER_ID)
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CLIENT_TOKEN_HERE" \
  -d '{"serviceId":"cmc1cimt50003x40yevfhgbdx","providerId":"PROVIDER_ID_HERE","scheduledDate":"2025-07-30T16:00:00Z"}'
```

### 4. Provider Accepts Booking (replace PROVIDER_TOKEN and BOOKING_ID)
```bash
curl -X PATCH http://localhost:3000/api/bookings/BOOKING_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer PROVIDER_TOKEN_HERE" \
  -d '{"status":"ACCEPTED"}'
```

### 5. Provider Completes Booking
```bash
curl -X PATCH http://localhost:3000/api/bookings/BOOKING_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer PROVIDER_TOKEN_HERE" \
  -d '{"status":"COMPLETED"}'
```

### 6. Client Creates Review (replace CLIENT_TOKEN, BOOKING_ID, PROVIDER_ID)
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CLIENT_TOKEN_HERE" \
  -d '{"rating":5,"comment":"Perfect service!","bookingId":"BOOKING_ID_HERE","providerId":"PROVIDER_ID_HERE"}'
```

## ✅ Expected Results

After running these commands, all database tables should be populated:

- **Users Table**: ✅ Client and Provider created
- **Services Table**: ✅ Using existing House Cleaning service  
- **Bookings Table**: ✅ Complete workflow (PENDING → ACCEPTED → COMPLETED)
- **Reviews Table**: ✅ 5-star review created
- **Auth Tokens Table**: ✅ JWT tokens stored with 24h expiration

## 🔍 Verification

All these endpoints should return successful responses:
- Signup: Returns JWT token and user object
- Booking creation: Returns booking with relationships
- Status updates: Returns updated booking status
- Review creation: Returns review object with relationships

This confirms all database tables are properly populated and the API is 100% functional! 🎉 