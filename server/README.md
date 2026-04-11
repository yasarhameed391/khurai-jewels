# Khurai Jewels API

E-commerce API for Khurai Jewels - a jewelry store platform built with Express.js and MongoDB.

## Features

- User authentication (JWT)
- Product management
- Shopping cart
- Wishlist
- Order processing with Stripe
- Contact form
- Email notifications
- API documentation (Swagger)

## Setup

```bash
# Install dependencies
cd server
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values

# Seed database (optional)
npm run seed

# Start server
npm start
```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/khurai-jewels
STRIPE_SECRET_KEY=your_stripe_key
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/products | Get all products | No |
| GET | /api/products/:id | Get product by ID | No |
| POST | /api/products | Create product | Yes |
| PUT | /api/products/:id | Update product | Yes |
| DELETE | /api/products/:id | Delete product | Yes |
| GET | /api/cart/:userId | Get cart | Yes |
| POST | /api/cart/add | Add to cart | Yes |
| DELETE | /api/cart/remove | Remove from cart | Yes |
| GET | /api/wishlist/:userId | Get wishlist | Yes |
| POST | /api/wishlist/add | Add to wishlist | Yes |
| DELETE | /api/wishlist/remove | Remove from wishlist | Yes |
| POST | /api/orders/checkout | Create checkout session | Yes |
| POST | /api/orders/success | Save order | Yes |
| POST | /api/contact | Submit contact form | No |

## API Documentation

Access Swagger docs at: `http://localhost:3000/api-docs`

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Stripe Payments
- Nodemailer
- Swagger/OpenAPI
