# Gym Management System - Backend API

A complete Node.js + Express + MySQL backend for managing gym members, memberships, payments, and more.

## 🚀 Features

- **Member Management**: Add, view, update, delete members
- **Search Functionality**: Search members by name, phone, or email
- **Weight Tracking**: Update and track member weights
- **Payment Management**: Handle payments and calculate balances
- **Membership Renewal**: Renew memberships with new dates and plans
- **Expiring Members**: Get members whose memberships are expiring
- **Auto Status Updates**: Automatically calculate membership status based on dates

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup MySQL Database**
   - Create a MySQL database named `gym_management`
   - Run the SQL script in `database/schema.sql` to create tables and sample data

4. **Configure Environment Variables**
   - Copy `.env` file and update with your MySQL credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=gym_management
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Member Management
- `POST /api/members` - Add new member
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `PUT /api/members/:id` - Update member details
- `DELETE /api/members/:id` - Delete member

### Search & Filter
- `GET /api/members/search?q=searchterm` - Search members
- `GET /api/members/status/Active` - Get active members
- `GET /api/members/status/Expired` - Get expired members
- `GET /api/members/expiring?month=2025-08` - Get expiring members

### Specific Updates
- `PUT /api/members/:id/weight` - Update member weight
- `PUT /api/members/:id/payment` - Update payment status
- `PUT /api/members/:id/renew` - Renew membership

### Health Check
- `GET /api/health` - API health status
- `GET /` - API information and endpoints

## 📝 API Usage Examples

### Add New Member
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 28,
    "gender": "Male",
    "phone": "+1234567890",
    "email": "john@example.com",
    "weight": 75.5,
    "membership_plan": "Premium",
    "joining_date": "2024-01-15",
    "duration_months": 12,
    "total_price": 599.00,
    "amount_paid": 599.00,
    "payment_status": "Paid"
  }'
```

### Search Members
```bash
curl "http://localhost:5000/api/members/search?q=John"
```

### Update Weight
```bash
curl -X PUT http://localhost:5000/api/members/1/weight \
  -H "Content-Type: application/json" \
  -d '{"weight": 76.2}'
```

### Get Expiring Members
```bash
curl "http://localhost:5000/api/members/expiring?month=2025-08"
```

## 🗄️ Database Schema

### Members Table
```sql
CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male','Female','Other'),
    phone VARCHAR(20),
    email VARCHAR(100),
    weight FLOAT,
    membership_plan VARCHAR(50),
    joining_date DATE,
    duration_months INT,
    payment_status ENUM('Paid','Pending'),
    total_price DECIMAL(10,2),
    amount_paid DECIMAL(10,2),
    balance_amount DECIMAL(10,2),
    membership_status ENUM('Active','Expired')
);
```

## 🔧 Business Logic

### Automatic Calculations
- **Balance Amount**: `total_price - amount_paid`
- **Membership Status**: 
  - `Active` if current date ≤ joining_date + duration_months
  - `Expired` otherwise

### Status Updates
- Membership status is recalculated every time data is fetched
- Balance is automatically updated when payments are modified

## 🚦 Error Handling

All endpoints return consistent JSON responses:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {...},
  "count": 10
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🔗 Frontend Integration

The API is configured with CORS to work with React frontend running on:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (Create React App)

## 🧪 Testing

Test the API using:
- **Postman**: Import the endpoints and test manually
- **curl**: Use the examples provided above
- **Frontend**: Connect your React application

## 📁 Project Structure

```
backend/
├── server.js              # Main server file
├── config/
│   └── db.js              # Database configuration
├── routes/
│   └── memberRoutes.js    # API routes
├── controllers/
│   └── memberController.js # Business logic
├── models/
│   └── memberModel.js     # Database operations
├── database/
│   └── schema.sql         # Database schema
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md             # Documentation
```

## 🔒 Security Features

- Input validation for all endpoints
- SQL injection prevention using parameterized queries
- CORS configuration for frontend integration
- Error handling without exposing sensitive information

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2
3. Configure proper MySQL connection pooling
4. Set up proper logging
5. Use HTTPS in production

## 📞 Support

For issues or questions:
1. Check the API health endpoint: `GET /api/health`
2. Verify database connection
3. Check server logs for detailed error messages
4. Ensure all required fields are provided in requests

---

**Ready to integrate with your React frontend!** 🎉