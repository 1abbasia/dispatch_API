# Teacher-Dispatch API 🍎🚀

A high-performance logistics and staffing backend for STEMKidsNYC. This API manages the real-time dispatching of instructors to educational assignments, ensuring compliance and tracking financial impact through an automated pipeline.

## 🏗 Architecture
Built using the **MVC (Model-View-Controller)** pattern for enterprise-level scalability:
- **Models**: Data schemas for Instructors and Assignments.
- **Views**: Standardized JSON responses for seamless frontend integration.
- **Controllers**: Isolated business logic for authentication, dispatching, and analytics.
- **Middleware**: Security layers for JWT verification and fingerprint compliance.

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Security**: JWT & BcryptJS

## 🔒 The Dispatch Guard (Compliance)
The core of Teacher-Dispatch is the **Compliance Middleware**. Instructors cannot "claim" a dispatch unless they meet specific NYC DOE requirements:
- **Fingerprint Check**: Logic-gate that blocks unverified staff from sensitive assignments.
- **JWT Scoping**: Ensures dispatch logs are tied to the specific authenticated user.

## 📡 API Endpoints

### Dispatch Auth
- `POST /api/auth/register` - Create instructor credentials.
- `POST /api/auth/login` - Secure login and token issuance.

### Assignment Pipeline
- `GET /api/assignments/open` - View all unstaffed dispatch opportunities.
- `PATCH /api/assignments/claim/:id` - (**Secure**) Claim a dispatch for an instructor.

### Management Dashboard
- `GET /api/instructors/stats` - Real-time tracking of "Revenue at Risk" and staffing density.

## 🚀 Getting Started
1. Clone the repo.
2. Run `npm install`.
3. Configure your `.env` (MongoURI, JWT_SECRET).
4. Launch with `node server.js`.