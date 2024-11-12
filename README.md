# Library Management System

## Project Description

The Library Management System is a backend API that facilitates library operations. It allows you to manage books, track borrow records, and handle member information. The system allows users to borrow and return books, track overdue items, and manage inventory.

## Live URL

[Library Management System Backend](https://library-management-system-server-eight.vercel.app)

## Technology Stack & Packages

- **Prisma ORM**: For database modeling and easy database interactions.
- **Node.js**: JavaScript runtime for executing server-side code.
- **PostgreSQL**: Relational database for storing data securely.
- **Express.js**: Web framework for building RESTful APIs.
- **TypeScript**: Type-safe language for improved code quality.
- **Zod**: Validation library for input schema and error handling.

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd library-management-system

   ```

2. **Install dependencies:**

   ```bash
   yarn install

   ```

3. **Set up environment variables:**

   ```bash
   DATABASE_URL=your_database_url
   DIRECT_URL=your_direct_url

   ```

4. **Run migrations:**

   ```bash
   npx prisma migrate deploy

   ```

5. **Start the development server:**
   ```bash
   yarn dev
   ```

The server will be running on http://localhost:3000 by default.

## Key Features & Functionality

- Book Management: Add, update, delete, and view information about books in the library collection.
- Member Management: Add new members, update their information, delete and view their membership details.
- Borrow & Return System: Members can borrow books depending on avaiability and return book
- Overdue Tracking: Determine overdue books based on a 14-day borrowing policy, including details on overdue days.
- Validation and error handling: Zod provides robust validation to ensure data integrity and clear error responses.
