# 🎓 Mentovara — High-Performance EdTech Frontend

Mentovara is a premium, enterprise-grade learning management system frontend built with a **Zero-Logic Architecture**. It leverages **Next.js 16.1 (App Router)** and **React 19.2** to deliver a seamless, state-of-the-art educational experience.

---

## 🏗️ How the Code is Organized

We keep our code clean and easy to read by separating the UI from the business logic.

- **UI Components (`src/app` & `src/components`)**: These files only handle how things look. They don't do complex calculations.
- **Custom Hooks (`src/hooks`)**: These act as the "managers". They fetch data from the API and pass it to the UI components.
- **Logic Functions (`src/utilities`)**: All complex formatting and validations go here as simple JavaScript functions.
- **API Services (`src/services`)**: This folder handles all Axios setups and backend connections.
- **Global State (`src/store`)**: We use Redux Toolkit here to share data (like user login info) across the whole app.

---

## 🛡️ Key Features & Engineering Highlights

- **⚡ Next.js 16.1 & Turbo**: Utilizing the latest App Router patterns for optimized routing and layout persistence.
- **🎨 Tailwind CSS 4.3**: Ultra-modern, high-performance styling with zero-runtime overhead.
- **🔐 Advanced Auth**: Multi-role (Student/Instructor) flow with SMTP-based email verification and failed-request-queueing in Axios interceptors.
- **💸 Razorpay SDK**: Secure client-side payment orchestration with server-side signature verification.
- **📽️ Video Lifecycle**: Custom player with auto-save progress tracking and direct-to-backend video streaming to bypass serverless limits.
- **🧩 100% Component Modularity**: Complex page logic extracted into dedicated micro-components (`VideoUploadForm`, `CourseSidebar`) for supreme code readability.

---

## 📂 Targeted Directory Mapping

```text
client/
├── src/
│   ├── app/                # 🚀 ROUTES: Unified Next.js Pages & Layouts
│   │   ├── auth/           # Login, Register, & OTP Verification
│   │   ├── dashboard/      # Role-based secure views (Instructor/Student)
│   │   └── watch/          # Immersive Video Learning environment
│   ├── hooks/              # ⚓ HOOKS: 13 specialized hooks for state & logic
│   │   ├── useAuth.js      # Global Auth & Role orchestration
│   │   ├── useRazorpay.js  # Dynamic SDK loading & Payment flow
│   │   └── useWatchCourse.js# Video progress & synchronization
│   ├── utilities/          # 🧠 PURE LOGIC: Centralized Business Rules
│   │   ├── auth-utils.js   # Dynamic URL building & guard logic
│   │   ├── file-utils.js   # FormData orchestration & validation
│   │   └── index.js        # The official "Barrel File" for logic exports
│   ├── services/           # 🔌 SERVICES: API instance & Interceptors
│   ├── store/              # 📦 STATE: Redux Toolkit (Auth/Course domains)
│   └── lib/                # 🛠️ LOW-LEVEL: Design system primitives (CN)
└── next.config.mjs         # 🔄 PROXY: Integrated API rewrite bridge
```

---

## ⚙️ Development Standard Operating Procedures (SOP)

### 1. Adding New Logic

**NEVER** write logic inside components.

1. Create a pure function in `src/utilities/<module>.js`.
2. Export it via `src/utilities/index.js`.
3. Consume it inside a hook or component.

### 2. API Communication

1. Define the endpoint string in `src/services/endpoints.js`.
2. Use the `api` instance from `src/services/api.js`.
3. Wrap the call in a custom hook inside `src/hooks/`.

### 3. State Updates

- For UI-only state: Use `useState` within a custom hook.
- For Global state (User/Enrollments): Use `dispatch` to `authSlice` or `courseSlice`.

---

## 🚀 Getting Started

1. **Install Dependencies**: `pnpm install`
2. **Setup Env**: Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_BACKEND_URL` to `http://localhost:8000` (Local) or your live backend URL (Production).
3. **Run Dev**: `pnpm dev`
4. **Audit**: `pnpm lint`

> **Note on Docker Networking:** This Next.js app is configured to use a smart proxy in `next.config.mjs`. When running inside Docker Compose, it will automatically proxy `/api` requests to the internal Docker container using the `INTERNAL_BACKEND_URL` injected by the root orchestrator. When running locally via `pnpm dev`, it gracefully falls back to `NEXT_PUBLIC_BACKEND_URL`. No manual `.env` switching is required!

---

**License**: MIT | **Author**: Rustom Yadav
