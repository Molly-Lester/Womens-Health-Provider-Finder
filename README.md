# Women's Health Clinic Finder

## Project Overview

This project was created to make it easier for women and adolescent girls to find the healthcare services they need. We recognised that while there are many clinics and specialist services available across the UK, it can be difficult to find the right provider, especially when trying to compare NHS and private options or search for support relating to a specific health concern.

The website allows users to enter their postcode, choose the type of care they're looking for (such as fertility, menopause support, pregnancy and maternity care, sexual health, family planning and contraception, or general women's health), and select whether they would like NHS-funded or private services. It then returns relevant healthcare providers nearby, helping users quickly find services that meet their needs.

Although there are existing healthcare directories, many focus primarily on services in England and don't always make it easy to search by women's health conditions or funding type. Our aim was to create a simple, user-friendly platform that brings this information together in one place. In the future, the aim would be to expand the database to include more providers across Wales, Scotland, and rural communities, making women's healthcare more accessible across the UK.

## Features

- Search for healthcare providers using a UK postcode.
- Filter results by women's healthcare category.
- Choose between NHS-funded, private providers or all.
- View nearby services that match the selected criteria.

## Technologies Used

- Frontend: React, Vite, Mantine UI, React Router
- Backend: Node.js, Express.js
- Database: MySQL, MySQL2
- Development Tools: dotenv, CORS, ESLint, Git & GitHub, Postman

## Requirements

Before running this project, ensure you have the following installed:

- Node.js
- MySQL Server (for the database)
- Git (for cloning the repository)

## Recommended
- DBeaver or another database management tool (optional, for viewing and managing the database)

## Installation & Setup

1. Download the project

You first need to copy the project onto your computer.

Open a terminal and run:
git clone https://github.com/destinyiyamu13/CFG-Group-5.git

Then move into the project folder:
cd CFG-Group-5

2. Install backend dependencies

Go into the backend folder:
cd backend/

Install dependencies:
npm install

3. Set up environment variables (backend)
Inside the backend folder, create a file called:
.env

Add the following (replace values with your own MySQL details):
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=clinics_database
DB_PORT=3306

4. Set up the database (MySQL)
Make sure MySQL is running on your machine.

Import the provided .sql file:
Open the file in your database tool
Run it to create the database (clinics_database), create tables and insert data

Once this is done, your database is ready.

5. Start the backend server
In the backend folder, run:
npm start

If successful, you should see something like:

Server running on http://localhost:3000
Connected to MySQL database

6. Install frontend dependencies
The frontend is located in the project root.

Open a new terminal window and check that you're in the project root (keep backend terminal running):
cd CFG-Group-5

Install dependencies:
npm install

7. Start the frontend application
Run: npm run dev

You will see something like:

Local: http://localhost:5173/

Open that link in your browser.

8. Using the application

Once both servers are running:

Backend: http://localhost:3000
Frontend: http://localhost:5173

You can now:

- Enter a UK postcode
- Select a healthcare category
- Filter by NHS or private care
- View nearby providers

## Team Member contributions

### Destiny Iyamu Omoragbon
- Worked on building and improving the main search experience for the application. This included developing the category selection system, search form, and form validation to ensure users provide all required inputs before searching. Expanded the functionality by adding a provider filter (NHS, private, or all services) and ensured all search parameters were correctly passed through the application.

- Also helped connect the frontend to the backend API, handling the flow of search data (postcode, radius, category, and provider type) and integrating postcode geocoding using the Postcodes.io API. Built and improved the results page to display clinic data clearly, including handling empty states, no search scenarios, and showing key clinic information such as name, address, and provider type. Set up core routing between pages so the user can move smoothly between the home and results views.

### Molly Lester
- Contributed to the initial project setup using Vite, including structuring the application and setting up base pages. Worked on improving the overall UI, particularly the category selection section, by using Mantine components and custom CSS. Redesigned category cards to make them more interactive and user-friendly, adding hover and selected states, and refining category labels for clarity and consistency.

- Focused on styling and improving the search interface, including the search form, inputs, dropdowns, and category selection UI. Used Mantine components alongside custom styling to improve layout, spacing, and visual cohesiveness across the application. Enhanced the provider type section by converting it into interactive selectable cards with clearer user feedback.

- Developed the backend using Node.js and Express, creating API routes for retrieving and filtering clinic data. Connected the application to a MySQL database and implemented logic for handling user search inputs. Integrated postcode-to-coordinates conversion using an external API and used the Haversine formula to calculate distances, enabling location-based filtering of nearby clinics based on category and provider type.

- Created and structured the project README file, including the project overview, features, setup instructions, and documentation to help users run the application.

### Saamiya Kudah
- Responsible for creating the project presentation slides and contributed to the styling of the results page. This included improving the layout and visual presentation of the results section to ensure the clinic information was clear, readable, and user-friendly. 

### Danielle Brereton-Smith
- Designed and built the MySQL database for the project, including setting up the schema, tables, and relationships. Also researched and collected real data from 20 women’s healthcare clinics and manually entered it into the database to ensure the application had accurate, realistic data to work with.

- Helped complete the final connection between the frontend and backend so that user searches return real clinic results. Linked the search form to the API using query parameters (postcode, radius, category, and provider type) and ensured the data flows correctly through the app. Updated the category system to use consistent IDs for filtering. Built out the results page to handle different states including no search, no results, and successful results. Displayed clinic information clearly, including name, address, contact details, and website links, so users can easily view and access nearby services.

### Tapiwa Chibagidi
- Responsible for project documentation and testing. This included writing and maintaining clear written documentation of the project and ensuring the process was clearly explained for both technical and non-technical readers. In addition, Tapiwa developed unit tests using Jest to test frontend components, helping to check that the application behaved as expected and reducing the likelihood of bugs.

### Tia Benvenuti
- Responsible for developing the original concept for the project, including defining the initial idea and overall direction. She also created wireframes that were used as guidance for the design, styling decisions, and user flow throughout the application. These wireframes helped shape how the interface was structured and how users navigate through the system.
