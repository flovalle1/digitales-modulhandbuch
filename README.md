# Digitales Modulhandbuch

## Project Description

The **Digitales Modulhandbuch** is a web-based application designed to manage and display information about courses, lecturers, and users in an academic environment. It provides an intuitive dashboard for administrators and lecturers to manage data. The project is built with Next.js, TypeScript, and Material-UI.

## Features

- **Course Management**: View and manage course details.
- **Lecturer Management**: Add, edit, and delete lecturer information.
- **User Management**: Manage user accounts and their associated roles.
- **Role-Based Access Control**: Different views and permissions for administrators and lecturers.

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v20 or higher)
- **npm** (v8 or higher)
- **Docker & Docker Compose** (for containerized deployment)

```bash
sudo apt update 
sudo apt install -y nodejs docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Developing locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd digitales-modulhandbuch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Build the project:
   ```bash
   npm run dev
   ```

> **Database Access**: In order to render the application a postgres database connection is needed. Specify the postgres database variables in the `.env` file. There is a template in `template.env`. Without Database connection the app can be build, but will display an application error.

---

### Deployment with Docker

1. Build the Docker image:
   ```bash
   docker build -t digitales-modulhandbuch .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 digitales-modulhandbuch
   ```

3. Access the application at:
   ```
   http://localhost:3000
   ```


---

## Testing

Run linting and type-checking to ensure code quality:

```bash
npm run lint
npm run typecheck
```

---

## License

This project is licensed under the [ISC License](LICENSE).


