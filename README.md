# Khurai Jewels

A modern e-commerce website for fine handcrafted jewelry, built with the MERN stack (MongoDB, Express, React/Next.js, Node.js).

## About

**Khurai Jewels** is a premium jewelry e-commerce platform based in Kochi, Kerala, India. We offer handcrafted jewelry pieces at fair prices by partnering directly with wholesale dealers.

- **Founder**: Thasni Hameed
- **Est**: 2026
- **Location**: Kochi, Kerala

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- Swagger API Documentation

### Frontend
- Next.js 16
- TypeScript
- Tailwind CSS

### Features
- Product catalog with categories & filters
- Shopping cart (localStorage)
- Wishlist
- Customer accounts & guest checkout
- Order management (admin)
- Order history (customers)
- Cash on Delivery
- Razorpay payment gateway
- Email notifications

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yasarhameed391/khurai-jewels.git
cd khurai-jewels
```

2. **Setup Backend**
```bash
cd server
npm install
```

3. **Configure Environment**
```bash
cp server/.env.example server/.env
# Edit .env with your values
```

Required environment variables:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/khurai-jewels
JWT_SECRET=your-secret-key
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
CLIENT_URL=http://localhost:3000
```

4. **Setup Frontend**
```bash
cd frontend
npm install
```

### Running the App

**Backend** (Port 3001):
```bash
cd server
npm start
# or for development
npm run dev
```

**Frontend** (Port 3000):
```bash
cd frontend
npm run dev
```

Open http://localhost:3000

## Admin Access

- URL: http://localhost:3000/admin
- Email: thasnihameed.0305@gmail.com
- Password: admin123

## API Documentation

Swagger docs available at: http://localhost:3001/api-docs

## Project Structure

```
khurai-jewels/
├── server/
│   ├── src/
│   │   ├── config/         # Configuration
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/   # Auth middleware
│   │   ├── models/      # Mongoose models
│   │   ├── repositories/
│   │   ├── routes/      # API routes
│   │   ├── services/   # Email, etc.
│   │   └── utils/
│   └── uploads/        # Product images
├── frontend/
│   ├── src/
│   │   ├── app/        # Next.js pages
│   │   ├── components/
│   │   └── lib/       # API functions
│   └── public/        # Static assets
└── README.md
```

## License

ISC