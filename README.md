# TODO App Backend

This is the backend service for the Tasks Todo App, a simple task management application. The backend is built using Node.js and Express, and it provides a RESTful API for managing tasks.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/fahadBSTech/todo-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd tasks-app-backend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Project

1. Start the development server:
   ```sh
   npm start
   ```
2. The server will be running at `http://localhost:3000`.

### API Endpoints

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a specific task
- `DELETE /tasks/:id` - Delete a specific task

### Database Initialization

To initialize the database using Prisma, follow these steps:

1. Install Prisma CLI as a development dependency:

   ```sh
   npm install @prisma/cli --save-dev
   ```

2. Initialize Prisma in your project:

   ```sh
   npx prisma init
   ```

3. Configure your database connection in the `.env` file created by Prisma:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
   ```

4. Define your data model in the `prisma/schema.prisma` file. For example:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Task {
     id          Int      @id @default(autoincrement())
     title       String
     description String?
     completed   Boolean  @default(false)
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
   }
   ```

5. Run the Prisma migration to create the database tables:

   ```sh
   npx prisma migrate dev --name init
   ```

6. Generate the Prisma Client:
   ```sh
   npx prisma generate
   ```

Your database is now initialized and ready to use with Prisma.
