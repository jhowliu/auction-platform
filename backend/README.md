# Auction Platform Backend

Backend API for an auction platform built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Auction management (create, view, update, delete)
- Bidding system
- Winner declaration with scheduling
- RESTful API endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Testing**: Mocha with Chai

## Getting Started

### Prerequisites

- Node.js 
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests with Mocha
- `npm run prod` - Start production server

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Auctions (Public)
- `GET /api/auctions` - Get all auctions
- `GET /api/auctions/:id` - Get auction by ID

### Bidding
- `POST /api/auctions/:id/bids` - Place bid on auction
- `GET /api/auctions/:id/bids` - Get auction bids

### User Auctions
- `GET /api/user/sauctions` - Get users' auctions
- `POST /api/users/auctions` - Create new auction (logged users)
- `PUT /api/users/auctions/:id` - Update auction (logged users)
- `DELETE /api/auctions/:id` - Delete auction (logged users)

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/           # Route controllers
│   ├── auctionController.js
│   ├── authController.js
│   ├── bidController.js
│   └── userAuctionController.js
├── middleware/           # Custom middleware
│   ├── authMiddleware.js
│   └── validation.js
├── models/              # Database models
│   ├── Auction.js
│   ├── Bid.js
│   ├── Task.js
│   └── User.js
├── routes/              # API routes
│   ├── auctionRoutes.js
│   ├── authRoutes.js
│   ├── bidRoutes.js
│   └── userAuctionRoutes.js
├── services/            # Business logic
│   └── auctionScheduler.js
├── test/               # Test files
│   └── auction_test.js
└── server.js           # Entry point
```

## Testing

Run the test suite:
```bash
npm test
```
