# 🎓 Mentovara - EdTech Platform

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

Welcome to **Mentovara** — A modern EdTech platform where instructors create structured video courses and students learn with real-time progress tracking.

This is a monorepo containing two services:

- **[`client/`](./client/)** (📝 [Read Client Docs](./client/README.md)) — A Next.js 16.1 (App Router) + React 19.2 + Tailwind CSS 4.3 frontend.
- **[`server/`](./server/)** (📝 [Read Server Docs](./server/README.md)) — A Node.js v24 + Express 5.2 + MongoDB backend API.

Both are orchestrated together via **Docker Compose** or **pnpm** concurrently for a seamless developer experience.

---

## ✨ Features

- **🎓 Interactive Learning** — Watch high-quality video courses with real-time progress tracking.
- **💳 Secure Payments** — Seamless course enrollment powered by **Razorpay** integration.
- **👨‍🏫 Instructor Dashboard** — Comprehensive tools for instructors to create, manage, and track their courses.
- **📁 Media Management** — Optimized image and video handling via **Cloudinary**.
- **📧 Email Verification** — Robust authentication with SMTP-based email verification using **Nodemailer**.
- **🐳 One-Command Setup** — Spin up the entire application with a single `docker compose` or `pnpm` command.

---

## 🏛️ Architecture

```text
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│   client    │──────▶│   server    │──────▶│   MongoDB   │
│  (Next.js)  │  HTTP  │  (Express)  │  TCP   │ (Database)  │
│    :3000    │        │    :8000    │        │   :27017    │
└─────────────┘        └──────┬──────┘        └─────────────┘
                              │
                    ┌─────────┴─────────┐
                    │    Cloudinary     │
                    │     Razorpay      │
                    └───────────────────┘
```

The `client` talks only to the `server` via HTTP (direct or Next.js proxy). The `server` handles all business logic, media uploads to Cloudinary, payment verification with Razorpay, and data persistence in MongoDB.

---

## 🚀 Getting Started

Follow these step-by-step instructions to get Mentovara running on your machine (Local or VPS).

### 📥 1. Clone the Repository

First, clone the code to your machine and open the folder. This step is required for all methods:

```bash
git clone https://github.com/rustom-yadav/mentovara-edtech.git
cd mentovara-edtech
```

---

### 🐳 Option A: Running with Docker (Production/Testing)

**Prerequisites:**
- **Docker** ([install guide](https://docs.docker.com/get-docker/))

#### Step 1: Environment Setup
Create the required environment files for the Root, Server, and Client:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

Now configure all three files:

| File | What to set |
| :--- | :---------- |
| `server/.env` | **Cloud MongoDB URI** (Atlas) — mandatory, as this Docker setup does not run a local DB container. Also set Cloudinary, Razorpay, SMTP, and JWT secrets. |
| `.env` (Root) | Set `NEXT_PUBLIC_BACKEND_URL` and `NEXT_PUBLIC_RAZORPAY_KEY_ID`. These are injected into the client container at build time. |
| `client/.env.local` | Set `NEXT_PUBLIC_BACKEND_URL` and `NEXT_PUBLIC_RAZORPAY_KEY_ID` (same values as Root `.env`). |

#### Step 2: Start the App
To run the fully containerized stack:

```bash
docker compose up -d --build
```

This single command will start the API (port 8000) and Client (port 3000). Once it's up, open **http://localhost:3000** in your browser!

To stop everything:

```bash
docker compose down
```

---

### 🛠️ Option B: Running with pnpm (Manual Dev Mode)

**Prerequisites:**
- **Node.js** (v24 LTS)
- **pnpm** (v12.x)
- **Docker** (For local MongoDB, optional)

#### Step 1: Environment Setup
Create the environment files for the Server and Client (Root `.env` is not needed for local development — it is only used by Docker Compose):

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

Edit `server/.env` with your actual keys (Cloudinary, Razorpay, SMTP, JWT secrets). For the database, choose one of the two modes described in Step 3 below.

#### Step 2: Install Dependencies
We have a single setup command that installs all dependencies for the entire project (Root, Client, and Server) at once. Run this from the root directory:

```bash
pnpm install
```

#### Step 3: Start the App
You can run the app in two modes from the project root:

**Mode 1: With Local Docker MongoDB** (Uses `docker-compose.dev.yml`)
Ensure `MONGO_URI` in `server/.env` is set to `mongodb://root:secret@127.0.0.1:27017/?authSource=admin`.
```bash
pnpm dev:mongoDB
```

**Mode 2: With Cloud MongoDB Atlas**
Ensure `MONGO_URI` in `server/.env` points to your live Atlas cluster.
```bash
pnpm dev
```
_These commands use `concurrently` to start both the Next.js frontend and Express backend side-by-side._

#### Step 4: Access the App
Open **http://localhost:3000** in your browser!

---

## 🏗️ Tech Stack

| Layer        | Technology                                  | Purpose                                     |
| ------------ | ------------------------------------------- | ------------------------------------------- |
| **Frontend** | Next.js 16.1 + React 19.2                     | Core framework built on the App Router      |
| **Frontend** | Tailwind CSS 4.3 + Shadcn UI                  | Utility-first, premium styling & components |
| **Frontend** | Redux Toolkit                                 | Global state management                     |
| **Backend**  | Node.js v24 + Express 5.2                     | REST API and HTTP server                    |
| **Backend**  | MongoDB + Mongoose 9.10                       | NoSQL database and ODM                      |
| **Security** | JWT (JSON Web Tokens)                         | Authentication and session management       |
| **Services** | Cloudinary                                    | Image and video media management            |
| **Services** | Razorpay                                      | Secure payment gateway integration          |
| **Infra**    | Docker Compose                                | One-command orchestration of all services   |
| **Tooling**  | pnpm 12.6                                     | Fast, efficient package manager             |

---

## 📁 Project Structure

```text
.
├── client/                   # Next.js frontend
│   ├── src/
│   ├── Dockerfile
│   └── .env.example
├── server/                   # Express backend API
│   ├── src/
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml        # Orchestrates client & server for production
├── docker-compose.dev.yml    # Orchestrates local MongoDB for development
├── .env.example              # Root environment variable reference
└── README.md                 # You are here
```

---

## Author

**Rustom Yadav**

[rustomyadav@outlook.com](mailto:rustomyadav@outlook.com)
