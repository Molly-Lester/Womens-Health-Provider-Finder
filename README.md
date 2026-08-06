# Women's Healthcare Finder

## Overview

Women's Healthcare Finder is a full-stack web application designed to make it easier for women and adolescent girls to find the health services they need.

Finding the right healthcare support can be difficult, especially when comparing different services, locations, and provider types. This project aims to simplify that process by allowing users to search for nearby women's healthcare providers based on their postcode, the type of support they need, and whether they're looking for NHS or private services.

Users can search for services including fertility support, menopause care, pregnancy and maternity services, sexual health, family planning and contraception, and general women's health.

This project was originally created as part of the Code First Girls Full-Stack Development course by a team of six developers. Since completing the course, I've continued developing it independently by improving the application structure, expanding the provider dataset, migrating the database from MySQL to PostgreSQL with PostGIS, introducing Redux for state management, and continuing to refine the overall user experience and maintainability.

---

## Screenshot

![Homepage](./docs/images/homepage.png)

---

## Features

Users can:

* Search for women's healthcare providers using a UK postcode.
* Choose the type of healthcare support they're looking for.
* Filter providers by NHS, private, or all available providers.
* Find nearby healthcare providers within a selected search radius (5, 10, 25, 50 miles, or anywhere in the UK).
* View provider details, including:

  * Provider name
  * Address
  * Contact information
  * Website

---

## Tech Stack

### Frontend

* React
* Vite
* Redux Toolkit
* React Router
* Mantine UI
* CSS Modules

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* PostGIS

### APIs

* Postcodes.io API

### Testing

* Vitest
* React Testing Library
* jsdom

### Development Tools

* ESLint
* Postman
* Git & GitHub

---

## What's Changed

Since the original Code First Girls project, I've continued developing the application by:

* Refactoring the backend into controllers, routes, database, and utility modules.
* Moving the frontend into its own dedicated folder.
* Migrating the database from MySQL to PostgreSQL with PostGIS.
* Expanding the healthcare provider dataset.
* Introducing Redux for state management.
* Improving the overall project structure, documentation, and maintainability.

---

## Project Structure

```text
Womens-Health-Provider-Finder/
│
├── backend/
│   ├── controllers/        # Backend logic
│   ├── db/                 # Database setup
│   ├── routes/             # API routes
│   ├── utils/              # Helper functions
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Redux features
│   │   ├── pages/          # Application pages
│   │   ├── tests/          # Frontend tests
│   │   ├── store.js
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Getting Started

## Prerequisites

Before running the project, make sure you have the following installed:

* Node.js
* PostgreSQL
* Git

This project also uses the PostGIS extension for PostgreSQL to support location-based searching.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Molly-Lester/Womens-Health-Provider-Finder.git

cd Womens-Health-Provider-Finder
```

---

## Backend Setup

### 1. Navigate to the backend folder

From the project root, run:

```bash
cd backend
```

Install the backend dependencies:

```bash
npm install
```

---

## Database Setup

This project uses PostgreSQL with the PostGIS extension to support location-based searching.

### 1. Install PostgreSQL

If you don't already have PostgreSQL installed, you can download it from:

https://www.postgresql.org/download/

During installation, make a note of:

* Your PostgreSQL username
* Your PostgreSQL password
* The port number (the default is usually `5432`)

---

### 2. Create a PostgreSQL database

Open PostgreSQL using a database tool such as DBeaver or pgAdmin.

Create a new empty database.

For example:

```text
clinics_database
```

The database name should match the value you add to your `.env` file.

---

### 3. Enable PostGIS

Connect to your new database and run:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

This enables the location features used to calculate distances between users and healthcare providers.

---

### 4. Configure environment variables

Inside the `backend` folder, create a file called:

```text
.env
```

Add your PostgreSQL connection details:

```env
DB_HOST=localhost
DB_USER=your_postgres_username
DB_PASSWORD=your_password
DB_NAME=clinics_database
DB_PORT=5432
```

Replace the placeholder values with your own PostgreSQL details.

---

### 5. Create the database tables

Open the SQL file located at:

```text
backend/db/databasehealthclinics_postgres.sql
```

Copy the contents of the file.

In DBeaver (or another PostgreSQL database tool):

1. Open the database you created.
2. Open a new SQL Editor.
3. Paste the contents of the SQL file.
4. Run the script.

This will:

* Create all of the required tables.
* Set up the database relationships.
* Add the healthcare provider data used by the application.

---

### 6. Start the backend server

From the `backend` folder, run:

```bash
npm start
```

If everything has been set up correctly, you should see:

```text
Server running on http://localhost:3000
Connected to PostgreSQL database
```

---

## Frontend Setup

Open a new terminal window and navigate to the frontend folder:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

---

## Running the Application

### Start the backend

From the `backend` folder, run:

```bash
npm start
```

The backend will be available at:

```text
http://localhost:3000
```

---

### Start the frontend

From the `frontend` folder, run:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## Running Tests

Frontend tests are written using Vitest and React Testing Library.

From the `frontend` folder, run:

```bash
npm test
```

---

## Future Improvements

There are still plenty of ideas I'd like to explore as I continue developing the project:

* Add a resources page with trusted information on women's health conditions.
* Increase test coverage for different search scenarios and API responses.
* Continue refining the user interface and accessibility.

---

## Contributors

This project was originally created as part of the Code First Girls Full-Stack Development course by:

* Molly Lester
* Destiny Iyamu Omoragbon
* Danielle Brereton-Smith
* Saamiya Kudah
* Tapiwa Chibagidi
* Tia Benvenuti

Since completing the course, I've continued developing the project independently by improving the application's architecture, expanding the provider dataset, migrating the database from MySQL to PostgreSQL with PostGIS, introducing Redux for state management, and continuing to refine the user experience and overall maintainability.

### Team Contributions

**Molly Lester**

* Built the backend API, including provider search, postcode geocoding, and distance-based filtering.
* Helped develop the frontend, focusing on the user interface, search experience, error handling, and overall usability.
* Continued developing the project independently after the bootcamp by refactoring the codebase, migrating the database to PostgreSQL with PostGIS, expanding the provider dataset, adding Redux for state management, and improving the project documentation.

**Destiny Iyamu Omoragbon**

* Built key parts of the search experience, including category selection, provider filtering, API integration, and the results page.

**Danielle Brereton-Smith**

* Designed the original database, gathered the healthcare provider data, and helped connect the frontend and backend.

**Saamiya Kudah**

* Contributed to the styling of the results page and created the project presentation.

**Tapiwa Chibagidi**

* Worked on the project documentation and wrote frontend tests using Vitest and React Testing Library.

**Tia Benvenuti**

* Came up with the original project idea and created the wireframes that guided the application's design and user flow.
