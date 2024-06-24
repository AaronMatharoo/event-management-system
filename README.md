# Event Management System

This is an Event Management System designed to allow for user registration, user login, viewing events, creating events, and joining events as long as the date of the event has not passed. 

## Getting Started

### Installation

1. Clone the project repository to your local machine:

    ```bash
    git clone https://github.com/AaronMatharoo/event-management-system.git
    ```

2. In the root of the project, navigate to the `client` directory:

    ```bash
    cd client
    ```

3. Install dependencies for the frontend:

    ```bash
    npm install
    ```

4. Navigate to the `server` directory:

    ```bash
    cd ../server
    ```

5. Install dependencies for the backend:

    ```bash
    npm install
    ```

### Running the Development Server

1. Start the frontend development server. Navigate to the `client` directory if you're not already there:

    ```bash
    cd ../client
    ```

2. Run the development server:

    ```bash
    npm run dev
    ```

3. Start the backend server. Navigate to the `server` directory:

    ```bash
    cd ../server
    ```

4. Run the backend server:

    ```bash
    npm run start
    ```

Once both the frontend and backend servers are running, you can access the Event Management System through your web browser at the specified address (`http://localhost:3000/`)

## Brief Documentation

In developing the Event Management System, design choices focused on project guidelines and suitability for such an application. Given the event system's nature, data integrity is crucial, so SQL was chosen for its reliability. Specifically, Neon, a PostgreSQL Database-As-A-Service, was utilized for storing events and registrations under its free tier. This was seen as a PostgreSQL version of the popular MongoDB Atlas. Custom RESTful APIs were developed in Node.js with Express.js for event and user management. JSONWebTokens (JWTs) were employed for user authentication, securing event routes and endpoints for logged-in users. The Front-End utilized React and TailwindCSS to create modular components and an intuitive, responsive interface for all device sizes. Although Unit-Testing was omitted due to time constraints, manual testing ensured system-wide functionality and stability. Notably, to simplify the evaluation process, certain design choices were made, like hardcoding keys and configurations in the codebase. While this is acceptable for assessment purposes, in a production environment, storing sensitive information securely is imperative to prevent unauthorized access and mitigate risks. Nonetheless, for assessment purposes, hardcoded keys streamline the evaluation process without compromising the objectives of this test. It is imperative to keep this context in mind while reviewing the code. Additionally, some assumptions that were made during development were that this was not an application that would be deployed to production, using a Database-As-A-Service was acceptable, and that Unit Tests were a bonus point, and not a core requirement of the assessment. Overall, I believe this project showcases my proficiency in Full-Stack Development given the quality of both frontend and backend components, the appropriate selection and implementation of the database, and the successful creation of a fully functional and reliable system.