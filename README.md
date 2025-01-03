# TEAM ONTORPONTHIK

## Project - EasyBanglish 🌍

![Logo](https://i.ibb.co.com/d4VgQTn/Screenshot-20250104-020436-Expo-Go.jpg)

> Our Banglish to Bangla Conversion App 'EasyBanglish' is designed to bridge the gap between convenience and authenticity in digital communication. As many people use Banglish—Bengali written in the English alphabet—our app offers a seamless and accurate solution to convert it into proper Bangla. With advanced features like chatbots, translation systems, and continuous learning, the app enhances the user experience, making it ideal for content creators, learners, and everyday users. By preserving the essence of the Bengali language, the app empowers users to communicate effectively and authentically in the digital world.
## Team Members 👥

-   **Arfatul Islam Asif** [![Email](https://img.shields.io/badge/email-awakicde@gmail.com-blue)](mailto:awakicde@gmail.com)
-   **Unayes Ahmed Khan** [![Email](https://img.shields.io/badge/email-unayeskhan.0808@gmail.com-blue)](mailto:unayeskhan.0808@gmail.com)
-   **Mutaher Ahmed Shakil** [![Email](https://img.shields.io/badge/email-mutaher.shakil@gmail.com-blue)](mailto:mutaher.shakil@gmail.com)

[![Meet Our Team](https://i.ibb.co/64Dz6kB/Green-Yellow-Professional-Gardening-Presentation-2.png)](https://ibb.co/GVCygqT)

## Technologies Used 💻

### Frontend

-   ![HTML](https://img.icons8.com/color/48/000000/html-5.png) **HTML**: To structure the web content.
-   ![CSS](https://img.icons8.com/color/48/000000/css3.png) **CSS**: For styling the web project.
-   ![Tailwind](https://img.icons8.com/color/48/000000/tailwindcss.png) **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   ![JavaScript](https://img.icons8.com/color/48/000000/javascript.png) **JavaScript**: For adding interactivity to the web project.
-   ![React](https://img.icons8.com/color/48/000000/react-native.png) **React**: To build the frontend of the web project.
-   ![React Router](https://i.ibb.co/19d5sDG/react-router-svg.png) **React Router**: For declarative routing in React applications.
-   ![Recharts](https://i.ibb.co/KmJfYmC/image-2.png) **Recharts**: A composable charting library built on React components.
-   ![NextUI](https://img.icons8.com/ios/50/000000/nextjs.png) **NextUI**: A modern React UI library designed for building beautiful and responsive web applications with minimal effort.

### Backend

-   ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png) **Node.js**: To manage the backend and API calls.
-   ![Express.js](https://cdn.icon-icons.com/icons2/2699/PNG/48/expressjs_logo_icon_169185.png) **Express.js**: For building the backend services and APIs.
-   ![dotenv](https://i.ibb.co/myKkQ4t/image-8.png) **dotenv**: For loading environment variables.
-   ![cors](https://i.ibb.co/44PvKWw/image.jpg) **cors**: For enabling cross-origin resource sharing.
-   ![express-rate-limit](https://i.ibb.co/2hfbCSP/image-9.png) **express-rate-limit**: For rate limiting to enhance security.
-   ![nodemailer](https://i.ibb.co/KzyKbvM/image-10.png) **nodemailer**: For sending emails.

### Database

-   ![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png) **PostgreSQL**: A powerful, open-source relational database system.
-   ![Prisma](https://img.icons8.com/color/48/000000/prisma.png) **Prisma**: A modern ORM for Node.js and TypeScript, used to interact with the database.


### Authentication

-   ![bcryptjs](https://i.ibb.co/gM8Kn7Q/image-11.png) **bcryptjs**: For hashing passwords.
-   ![JWT](https://img.icons8.com/?size=48&id=rHpveptSuwDz&format=png) **JSON Web Token (JWT)**: For secure authorization.

### Utilities

-   ![Axios](https://i.ibb.co/PwYcWwj/image-5.png) **Axios**: For making HTTP requests from the frontend.

## Core Features

### 1. **Authentication**  
- **Login & Registration**: Secure login and registration for user-specific experiences.  
- **Secure API Calling**: Protect all API endpoints with robust security to ensure authorized access.

### 2. **Banglish to Bangla Conversion**  
- **Translation System**: Develop a model for converting Banglish to Bangla with high accuracy.

### 3. **Content Management**  
- **Content Creation**: Text editor for users to write in Banglish and convert to Bangla.  
- **PDF Export**: Export content as PDFs, with public or private settings from user profiles.  
- **Caption Generation**: Automatically generate title and caption for PDFs using AI.

### 4. **Search Functionality**  
- **App-Wide Search**: Search PDFs and user profiles in both Bangla and Banglish.

### 5. **Chatbot Integration**  
- **Banglish Chatbot**: A chatbot that understands and responds in Banglish/Bangla.  
- **PDF-Based Query Handling**: Chatbot to access and reference content from user-uploaded PDFs.

### 6. **Translation System Improvement**  
- **Training with Continuous Learning**: Users contribute Banglish and Bangla pairs for model improvement, verified by admins.

### 7. **User Interface and Experience**  
- **Comprehensive UI/UX**: A clean and intuitive interface for a seamless user experience.

### 8. **Backend and Infrastructure**  
- **Database Integration**: Scalable backend to manage user data, translations, and files.  
- **Environment File**: Maintain an `.env` file for consistent development, testing, and deployment.


## Bonus Features

### 1. **Voice Interaction**  
- **Hands-free Content Generation**: Embed voice functionality for users to input text using voice in both Bangla and English, with content in Bangla.  
- **Voice Assistant**: Enable the chatbot to respond with voice outputs in Bangla, offering a hands-free, interactive experience.

### 2. **Smart Editor**  
- **Auto-Correction for Banglish Inputs**: Enhance the translation system by detecting and correcting common Banglish typing errors.

### 3. **Analytics Dashboard**  
- **User Insights and Metrics**: Provide an analytics dashboard displaying metrics such as words translated, stories written, chatbot interactions, and other engagement statistics.

### 4. **Customizable Bangla Fonts for PDFs**  
- **Font Selection**: Allow users to choose from various Bangla fonts when generating PDFs.

### 5. **Dockerization**  
- **Containerized Deployment**: Dockerize the application to ensure consistent environments across development, testing, and production, improving the portability and scalability of the application.


## Role-based Access Control 🚪

EasyBanglish implements role-based access control (RBAC) to manage user permissions effectively:

- **Administrator**: Has full access to maximum features and functionalities of the system, including user management, contribution verification, and view analytics.
- **User**: Limited access to view data and reports.


## Getting Started 🚀

### Using Docker 🐳

Clone the repository and run the following command:

```sh
docker-compose up --build
```

-   Frontend: Runs on port `5173`
-   Backend: Runs on port `8000`

### Manual Setup 🧑‍💻

If Docker isn't working, run the system manually:

Backend:

```sh
cd backend
npm install
npm start
```

Frontend:

```sh
cd frontend
npm install
npm run dev
```

## Credentials 🔑

You can use our system with the following credentials:

### Admin:

1.  email: mutaher.shakil@gmail.com

    -   password: `123456`

### User:

1.  email: user@user.com

    -   password: `123456`

## Security Notice 🔒

-   **Single Active Session:** For security purposes, controlled by JWT, a user is restricted to a single active session. If login attempts are made from multiple devices using the same credentials, the most recent login is prioritized, and other sessions are invalidated, requiring those users to return to the login page.

## Preferred Browser: 🌐

-   Chrome

## Diagrams and Workflows 📊

### Entity Relationship Diagram

[![Entity Relationship Diagram](https://i.ibb.co.com/6yb9FRd/Schema.png)
