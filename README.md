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

### Build the app locally with Docker

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
> **Database Access**: In order to render the application a postgres database connection is needed. Specify the postgres database variables in the `.env` file. There is a template in `template.env`. Without Database connection the app can be build, but will display an application error.

### Production CI/CD

The application can be deployed to a production environment using Docker Compose and an automated deployment server.

#### Architecture

- **Docker Compose**: Orchestrates the application and database containers
- **Deployment Script**: Automates the update process
- **Webhook Server**: Provides an endpoint to trigger deployments remotely

#### Prerequisites

1. Ensure Docker and Docker Compose are installed on your production server
2. Set up environment variables in a `.env` file on your production server. Use the `template.env` file as boilerplate. 

#### Deployment Steps

1. Clone the respository to your server:
   ```bash
   git clone https://github.com/flovalle1/digitales-modulhandbuch.git
   ```

2. Start the deployment webhook server:
   ```bash
   cd deployment
   node server.js
   ```
   
   It's recommended to use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "deployment-server"
   pm2 save
   pm2 startup
   ```

3. Trigger the initial deployment:
   - Manually: `./deploy.sh`
   - Via webhook: Send a POST request to `http://your-server:3002/deploy`


> The database doesn't contain a schema at this point. To initialize it you have to run the database migrations in the [`prisma/migrations`](prisma/migrations) directory. You can use the provided GitHub Actions workflow in the [`database-migrations.yaml`](.github/workflows/database-migrations.yaml) file. It allows you to deploy database schema changes to the production database. The workflow can be triggered manually via the GitHub Actions interface. It uses the `prisma migrate deploy` command to apply migrations. Ensure that the required secrets (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `DATABASE_HOST`, and `POSTGRES_DB`) are configured in the GitHub repository settings. This can as well be used for further database migrations.

4. Send a POST request to trigger a deployment.

---

## Testing

Run linting and type-checking to ensure code quality:

```bash
npm run lint
npm run typecheck
```

---



