# Demonstration of Advanced Application Security Practices

This Secure Event Management System is designed with a focus on Application Security and Security-By-Design Development, ensuring safe user interactions and data integrity throughout the lifecycle of event management. The system supports secure user registration, authentication, event viewing, creation, and participation, all while enforcing stringent security practices.

## Key Security Features

- **React with Built-in Protections**: Leveraging React's inherent defense mechanisms, such as automatic escaping of potentially harmful data, reduces the risk of Cross-Site Scripting (XSS) attacks, providing a safer user experience.
- **Protected Routes and Endpoints**: Sensitive operations are guarded using Protected Routes in React, ensuring only authenticated users can access them. On the backend, endpoints are secured with JSON Web Tokens (JWTs) to prevent unauthorized access.
- **Secure Authentication with JWTs**: User sessions are managed with JWTs, which are securely generated and validated on every request to protect against tampering and session hijacking.
- **Data Integrity with SQL**: Utilizing a PostgreSQL Database-as-a-Service, we can ensure data integrity and reliability, with inherent protections against SQL Injection attacks.
- **Sensitive Data Handling**: Though some keys are hardcoded for this demonstration, in a production environment, secure storage practices such as environment variables and secret management tools would be employed.

## Getting Started

### Installation

1. Clone the secure project repository to your local machine:

    ```bash
    git clone https://github.com/AaronMatharoo/secure-event-management-system.git
    ```

2. Navigate to the `client` directory:

    ```bash
    cd client
    ```

3. Install dependencies for the secure frontend:

    ```bash
    npm install
    ```

4. Navigate to the `server` directory:

    ```bash
    cd ../server
    ```

5. Install dependencies for the secure backend:

    ```bash
    npm install
    ```

### Running the Development Server

1. Start the secure frontend development server. Navigate to the `client` directory if you're not already there:

    ```bash
    cd ../client
    ```

2. Run the development server:

    ```bash
    npm run dev
    ```

3. Start the secure backend server. Navigate to the `server` directory:

    ```bash
    cd ../server
    ```

4. Run the backend server:

    ```bash
    npm run start
    ```

Once both servers are running, the Secure Event Management System can be accessed through your web browser at `http://localhost:3000/`.

## Secure System Architecture

The Secure Event Management System has been architected with security as the top priority, incorporating industry best practices:

- **Frontend Security with React**: React's ecosystem naturally mitigates common web vulnerabilities like XSS. Every user input and dynamic content is automatically sanitized before rendering, reducing the risk of malicious script execution.
  
- **Backend Security with Express and JWTs**: The backend, built on Node.js with Express, is fortified with JWT-based authentication. Each request to protected endpoints is verified against an encrypted token, ensuring that only authenticated users can access sensitive data or actions.

- **Database Security**: Data persistence is handled by Neon, ensuring that all event and user data is stored in a secure, reliable SQL environment. SQL’s inherent protections are supplemented by prepared statements and query parameterization, defending against SQL injection attacks.

- **API Security**: Custom RESTful APIs are designed to validate and sanitize input, enforce strong authentication, and protect against common web vulnerabilities.

## Conclusion

This Secure Event Management System is a testament to Application Security, Security-By-Design Development, and Full-Stack Development. By emphasizing security from the ground up, this project demonstrates how to deliver secure and reliable software solutions, ensuring the protection of user data and integrity of operations.
