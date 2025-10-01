# WEBLAB: Technologie-Radar

This project is part of the HSLU course WEBLAB. For the assignment, I chose the proposed  _[Technologie Radar](https://github.com/web-programming-lab/web-programming-lab-projekt/blob/main/Technologie-Radar.md)_ outline.

## Contents

- [Architecture documentation](./docs/architecture.md)
- [Kanban Board](https://github.com/users/ruttingerhslu/projects/2)
- [Work journal](./docs/work-journal.md)

## Tech Stack
The [MERN](https://www.geeksforgeeks.org/mern/understand-mern-stack/) tech stack was chosen for this project:
- MongoDB: Non-Relational Database
- Express: NodeJS web server
- React: JavaScript Frontend Library
- Node: JavaScript Web Server

## Setup

1. Clone this repository
2. Copy `.env.example` to `.env`
3. Fill in the values:
   - `MONGO_URI` → your MongoDB connection
   - `JWT_SECRET` → any random string
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD` → credentials for the admin account
4. Start the backend:
   -  `cd backend`
   -  `npm i` 
   -  `npm start`
5. Start the frontend: 
   - `cd frontend`
   - `npm i`
   - `npm start`
6. Visit `http://localhost:3000`
7. Log in with the admin credentials you set in `.env`