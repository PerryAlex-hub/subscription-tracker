# Subscription Tracker API

A Node.js/Express REST API for managing and tracking subscriptions with automated reminder workflows. The API helps users monitor their subscription services, track renewal dates, and receive timely email notifications.

## Features

- User authentication with JWT tokens
- Subscription management (create, read, update, delete operations)
- Automatic email reminders before subscription renewals
- Subscription categorization (entertainment, utilities, software, education, health, other)
- Multiple currency support (USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NZD)
- Flexible billing frequency (monthly, yearly)
- Subscription status tracking (active, canceled, expired)
- Workflow automation using Upstash QStash
- Security features with Arcjet rate limiting
- MongoDB database for data persistence

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB account (for database)
- Upstash account (for workflow management)
- Arcjet account (for security/rate limiting)
- SMTP email service (for sending reminders)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd subscription-tracker
```

2. Install dependencies:

```bash
npm install
```

## Environment Setup

1. Create a `.env.development.local` file in the project root directory:

```
PORT=5500
SERVER_URL=http://localhost:5500
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<app-name>
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_qstash_token
QSTASH_CURRENT_SIGNING_KEY=your_current_signing_key
QSTASH_NEXT_SIGNING_KEY=your_next_signing_key
EMAIL_PASSWORD=your_email_password
```

2. For production environment, create a `.env.production.local` file with appropriate values:

```
PORT=your_production_port
SERVER_URL=your_production_url
DB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRES_IN=1d
ARCJET_KEY=your_production_arcjet_key
ARCJET_ENV=production
QSTASH_URL=your_production_qstash_url
QSTASH_TOKEN=your_production_qstash_token
QSTASH_CURRENT_SIGNING_KEY=your_production_signing_key
QSTASH_NEXT_SIGNING_KEY=your_production_next_signing_key
EMAIL_PASSWORD=your_production_email_password
```

## Running the Application

### Development Mode

Run the application with nodemon for automatic restart on file changes:

```bash
npm run dev
```

The API will be available at http://localhost:5500

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication Endpoints

#### Sign Up

- Endpoint: `POST /api/auth/sign-up`
- Description: Register a new user
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-04-22T10:30:00Z"
      }
    }
  }
  ```

#### Sign In

- Endpoint: `POST /api/auth/sign-in`
- Description: Authenticate user and get JWT token
- Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "User signed in successfully",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  }
  ```

#### Sign Out

- Endpoint: `POST /api/auth/sign-out`
- Description: Sign out user (implementation in progress)
- Authentication: Required
- Response: Status 200 OK

### User Endpoints

#### Get All Users

- Endpoint: `GET /api/users`
- Description: Retrieve all users (public endpoint)
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-04-22T10:30:00Z"
      }
    ]
  }
  ```

#### Get User by ID

- Endpoint: `GET /api/users/:id`
- Description: Retrieve a specific user by ID
- Authentication: Required (JWT token)
- Path Parameters:
  - `id` (string): The user's MongoDB ObjectId
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-04-22T10:30:00Z"
    }
  }
  ```

#### Create User

- Endpoint: `POST /api/users`
- Description: Create a new user (placeholder endpoint)
- Response: Status 200 with placeholder response

#### Update User

- Endpoint: `PUT /api/users/:id`
- Description: Update user information (placeholder endpoint)
- Path Parameters:
  - `id` (string): The user's MongoDB ObjectId
- Response: Status 200 with placeholder response

#### Delete User

- Endpoint: `DELETE /api/users/:id`
- Description: Delete a user (placeholder endpoint)
- Path Parameters:
  - `id` (string): The user's MongoDB ObjectId
- Response: Status 200 with placeholder response

### Subscription Endpoints

#### Get All Subscriptions

- Endpoint: `GET /api/subscriptions`
- Description: Get all subscriptions (placeholder endpoint)
- Response: Status 200 with placeholder response

#### Get Subscription by ID

- Endpoint: `GET /api/subscriptions/:id`
- Description: Get a specific subscription (placeholder endpoint)
- Path Parameters:
  - `id` (string): The subscription's MongoDB ObjectId
- Response: Status 200 with placeholder response

#### Create Subscription

- Endpoint: `POST /api/subscriptions`
- Description: Create a new subscription with automated reminder workflow
- Authentication: Required (JWT token)
- Request Body:
  ```json
  {
    "name": "Netflix",
    "price": 15.99,
    "currency": "USD",
    "frequency": "monthly",
    "category": "entertainment",
    "paymentMethod": "Credit Card",
    "status": "active",
    "startDate": "2024-04-01T00:00:00Z",
    "renewalDate": "2024-05-01T00:00:00Z"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Netflix",
      "price": 15.99,
      "currency": "USD",
      "frequency": "monthly",
      "category": "entertainment",
      "paymentMethod": "Credit Card",
      "status": "active",
      "startDate": "2024-04-01T00:00:00Z",
      "renewalDate": "2024-05-01T00:00:00Z",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2024-04-22T10:30:00Z"
    },
    "workflowRunId": "workflow_run_id_123"
  }
  ```

#### Get User Subscriptions

- Endpoint: `GET /api/subscriptions/user/:id`
- Description: Get all subscriptions for a specific user
- Authentication: Required (JWT token)
- Path Parameters:
  - `id` (string): The user's MongoDB ObjectId
- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Netflix",
        "price": 15.99,
        "currency": "USD",
        "frequency": "monthly",
        "category": "entertainment",
        "paymentMethod": "Credit Card",
        "status": "active",
        "startDate": "2024-04-01T00:00:00Z",
        "renewalDate": "2024-05-01T00:00:00Z",
        "user": "507f1f77bcf86cd799439011"
      }
    ]
  }
  ```

#### Update Subscription

- Endpoint: `PUT /api/subscriptions/:id`
- Description: Update subscription information (placeholder endpoint)
- Authentication: Required (JWT token)
- Path Parameters:
  - `id` (string): The subscription's MongoDB ObjectId
- Response: Status 200 with placeholder response

#### Delete Subscription

- Endpoint: `DELETE /api/subscriptions/:id`
- Description: Delete a subscription (placeholder endpoint)
- Path Parameters:
  - `id` (string): The subscription's MongoDB ObjectId
- Response: Status 200 with placeholder response

#### Cancel Subscription

- Endpoint: `PUT /api/subscriptions/:id/cancel`
- Description: Cancel an active subscription (placeholder endpoint)
- Path Parameters:
  - `id` (string): The subscription's MongoDB ObjectId
- Response: Status 200 with placeholder response

#### Get Upcoming Renewals

- Endpoint: `GET /api/subscriptions/upcoming-renewals`
- Description: Get subscriptions with upcoming renewal dates (placeholder endpoint)
- Response: Status 200 with placeholder response

### Workflow Endpoints

#### Send Subscription Reminders

- Endpoint: `POST /api/workflow/subscriptions/reminder`
- Description: Trigger automated reminder workflow for subscriptions
- Request Body:
  ```json
  {
    "subscriptionId": "507f1f77bcf86cd799439012"
  }
  ```
- Response: Status 200 OK
- Notes: Automatically triggered when a subscription is created. Sends email reminders 7, 5, 2, and 1 day(s) before renewal.

## Database Schema

### User Model

```
{
  _id: ObjectId (primary key)
  name: String (required, 2-50 characters)
  email: String (required, unique, lowercase)
  password: String (required, hashed with bcryptjs, min 6 characters)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-updated)
}
```

### Subscription Model

```
{
  _id: ObjectId (primary key)
  name: String (required, 2-100 characters)
  price: Number (required, positive)
  currency: String (enum: USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NZD, default: USD)
  frequency: String (enum: monthly, yearly)
  category: String (enum: entertainment, utilities, software, education, health, other)
  paymentMethod: String (required)
  status: String (enum: active, canceled, expired, default: active)
  startDate: Date (required, cannot be in future)
  renewalDate: Date (calculated from startDate and frequency)
  user: ObjectId (reference to User, required, indexed)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-updated)
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. When a user signs up or signs in, they receive a JWT token in the response
2. To access protected endpoints, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

3. The token expires based on the `JWT_EXPIRES_IN` environment variable (default: 1 day)

### Protected Endpoints

The following endpoints require authentication:

- `GET /api/users/:id`
- `POST /api/subscriptions`
- `GET /api/subscriptions/user/:id`
- `PUT /api/subscriptions/:id`

## Error Handling

The API returns standardized error responses with appropriate HTTP status codes:

- 400: Bad Request (validation error, missing required fields)
- 401: Unauthorized (invalid credentials, expired token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource does not exist)
- 409: Conflict (duplicate email, user already exists)
- 500: Internal Server Error

Error Response Format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Technologies Used

- Node.js: JavaScript runtime
- Express.js: Web framework
- MongoDB: NoSQL database
- Mongoose: MongoDB object modeling
- JWT: JSON Web Token for authentication
- bcryptjs: Password hashing
- Upstash QStash: Workflow automation for reminders
- Arcjet: Rate limiting and security
- Nodemailer: Email sending
- Day.js: Date manipulation
- Morgan: HTTP request logging
- Cookie Parser: Cookie parsing middleware
- ESLint: Code linting
- Nodemon: Development server with auto-reload

## Development Workflow

### Code Style

The project uses ESLint for code quality. Configuration is in `eslint.config.js`.

### Project Structure

```
subscription-tracker/
├── config/                 # Configuration files
│   ├── env.js             # Environment variables
│   ├── arcjet.js          # Arcjet security configuration
│   ├── upstash.js         # Upstash workflow configuration
│   └── nodemailer.js      # Email configuration
├── controllers/            # Business logic
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── subscription.controller.js
│   └── workflow.controller.js
├── middlewares/            # Express middleware
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── arcjet.middleware.js
├── models/                 # MongoDB schemas
│   ├── user.model.js
│   ├── subscription.model.js
│   └── auth.model.js
├── routes/                 # API routes
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── subscription.routes.js
│   └── workflow.routes.js
├── utils/                  # Utility functions
│   └── send-email.js
├── database/               # Database connection
│   └── mongodb.js
├── app.js                  # Express app setup
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Testing API Endpoints

You can test the API using tools like:

- Postman: Visual API testing platform
- cURL: Command-line tool for making HTTP requests
- Thunder Client: VS Code extension
- REST Client: VS Code extension

Example cURL request:

```bash
# Sign up
curl -X POST http://localhost:5500/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"securePassword123"}'

# Sign in
curl -X POST http://localhost:5500/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securePassword123"}'

# Create subscription (requires token)
curl -X POST http://localhost:5500/api/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"name":"Netflix","price":15.99,"currency":"USD","frequency":"monthly","category":"entertainment","paymentMethod":"Credit Card","startDate":"2024-04-01T00:00:00Z"}'
```

## Security Considerations

1. Passwords are hashed using bcryptjs before storage
2. JWT tokens are used for session management
3. Arcjet middleware provides rate limiting and DDoS protection
4. Sensitive fields (passwords) are excluded from responses where appropriate
5. Email addresses are stored in lowercase for consistency
6. Input validation is performed on all user inputs

## Common Issues and Solutions

### MongoDB Connection Error

- Ensure MongoDB URI in environment file is correct
- Verify network access is allowed in MongoDB Atlas
- Check database credentials

### JWT Token Expired

- The token expires after 1 day by default
- Request a new token by signing in again
- Update JWT_EXPIRES_IN in environment file if needed

### Email Reminders Not Sent

- Verify email configuration in environment file
- Check Upstash QStash configuration
- Ensure subscription renewal date is in the future
- Check email service logs for delivery issues

### Arcjet Rate Limiting

- Requests are rate-limited by Arcjet
- Wait and retry after rate limit is exceeded
- Contact Arcjet support to increase limits if needed

## Contributing

When contributing to this project:

1. Follow the existing code structure
2. Use the established naming conventions
3. Test your changes before committing
4. Write clear commit messages
5. Update documentation as needed

## Support

For issues, questions, or feature requests, please refer to the project repository or contact the development team.

## Version

Current Version: 0.0.1
