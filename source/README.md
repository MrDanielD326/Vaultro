# Node.js + TypeScript + Express.js +  MySQL Setup

This project is a boilerplate setup for building a backend application using Node.js, TypeScript, Express, and MySQL with JWT authentication and password hashing.

**To know how to install and run this project: [click here](/README.md)**

---

## 🛠️ Global & Local Package Installation

##### Install Global Packages
```bash
npm install -g typescript nodemon ts-node
```

##### Install Local Dependencies
```bash
npm install express body-parser dotenv mysql bcryptjs jsonwebtoken
```

##### Install Dev Dependencies (Type Definitions)
```bash
npm install --save-dev @types/express @types/body-parser @types/dotenv @types/mysql @types/jsonwebtoken @types/bcryptjs
```

---

### 📦 Package Descriptions
#### 🔹 Global Packages
**typescript:** Adds TypeScript support for writing strongly-typed code.

**nodemon:** Restarts server automatically on file changes.

**ts-node:** Runs TypeScript files directly in Node.js.

#### 🔹 Local Packages
**express:** Fast, minimalist web framework for Node.js.

**body-parser:** Parses JSON and URL-encoded data in incoming requests.

**dotenv:** Loads environment variables from .env into process.env.

**mysql:** MySQL client for Node.js to run queries and manage DB connection.

**bcryptjs:** Secure password hashing and verification.

**jsonwebtoken:** JWT token creation and validation for authentication.

#### 🔹 Dev Dependencies (Type Definitions)
**@types/express:** TypeScript types for Express.

**@types/body-parser:** Types for body-parser.

**@types/dotenv:** Types for dotenv.

**@types/mysql:** Types for MySQL client.

**@types/jsonwebtoken:** Types for JWT.

**@types/bcryptjs:** Types for bcryptjs.

#### ✅ Ready to Build
You now have a ready-to-go backend environment using Node.js, TypeScript, MySQL, and JWT-based authentication.
**Note:** make sure your MySQL Workbench is running.

---
