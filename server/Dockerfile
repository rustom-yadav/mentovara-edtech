# ==========================================
# 0. BASE STAGE
# ==========================================
FROM node:24-alpine AS base
# Enable pnpm across all stages
RUN corepack enable pnpm

# ==========================================
# 1. DEPENDENCIES STAGE
# ==========================================
FROM base AS deps
WORKDIR /app

# Copy workspace configuration and lockfiles
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json server/
COPY client/package.json client/

# Install dependencies specifically for the server (and its workspace dependencies if any).
# Note: --prod is removed to accommodate future TypeScript compilation requirements.
RUN pnpm install --frozen-lockfile --filter server...

# ==========================================
# 2. PRODUCTION RUNNER STAGE
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security best practices
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy only the installed node_modules and pnpm store from the deps stage
COPY --from=deps --chown=expressjs:nodejs /app ./

# Copy ONLY the server source code.
# This completely ignores the client source code, keeping the server image lightweight.
COPY --chown=expressjs:nodejs server/ ./server/

# Move into the server directory
WORKDIR /app/server

# Ensure temp directory exists for Multer uploads and give ownership to expressjs user
RUN mkdir -p public/temp && chown -R expressjs:nodejs public/temp

USER expressjs

EXPOSE 8000
ENV PORT=8000

# Run the server directly using Node (bypassing pnpm overhead)
CMD ["node", "index.js"]
