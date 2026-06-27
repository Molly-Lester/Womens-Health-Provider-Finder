# (App name) 

# Women's Healthcare Finder

## Project Overview

This project was created to make it easier for women and adolescent girls to find the healthcare services they need. We recognised that while there are many clinics and specialist services available across the UK, it can be difficult to find the right provider, especially when trying to compare NHS and private options or search for support relating to a specific health concern.

The website allows users to enter their postcode, choose the type of care they're looking for (such as fertility, menopause support, pregnancy and maternity care, sexual health, family planning and contraception, or general women's health), and select whether they would like NHS-funded or private services. It then returns relevant healthcare providers nearby, helping users quickly find services that meet their needs.

Although there are existing healthcare directories, many focus primarily on services in England and don't always make it easy to search by women's health conditions or funding type. Our aim was to create a simple, user-friendly platform that brings this information together in one place. In the future, the aim would be to expand the database to include more providers across Wales, Scotland, and rural communities, making women's healthcare more accessible across the UK.

## Features

- Search for healthcare providers using a UK postcode.
- Filter results by women's healthcare category.
- Choose between NHS-funded and private providers.
- View nearby services that match the selected criteria.

## Technologies Used

- **Frontend:** React, Vite, Mantine UI, React Router
- **Backend:** Node.js, Express.js
- **Database:** MySQL, MySQL2
- **Development Tools:** dotenv, CORS, ESLint, Git & GitHub

Requirements

Before running this project, ensure you have the following installed:

- Node.js
- MySQL Server (for the database)
- Git (for cloning the repository)

Recommended
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
DB_NAME=women_healthcare
DB_PORT=3306

4. Set up the database (MySQL)
Make sure MySQL is running on your machine.

Then:
Open your database tool (e.g. MySQL Workbench or DBeaver)
Create a new database:
CREATE DATABASE clinics_database;

Then: 
USE clinics_database;

Import the provided .sql file:
Open the file in your database tool
Run it to create tables and insert data

Once this is done, your database is ready.

5. Start the backend server
In the backend folder, run:
npm start

If successful, you should see something like:

Server running on http://localhost:3000
Connected to MySQL database

6. Install frontend dependencies

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


### Molly Lester
- About me: I'm 28 years old and I grew up in North Yorkshire. 
- Hobbies: I love music, travelling and spending time with my miniature dachshund called Percy! 

### Saamiya Kudah
- About me: I am 26 years old, grew up in the UK. 
- Hobbies: I love reading, travelling and baking. 

## Danielle Brereton-Smith
- About me: I am 28 years old, from London.
- Hobbies: I like to swim, knit, read, play sims and watch TV

##  Tapiwa Chibagidi
- About me: I am 25 years old, live in Birmingham
- Hobbies: I love reading classic novels, weight lifting in the gym and enjoy a good British series :) 
