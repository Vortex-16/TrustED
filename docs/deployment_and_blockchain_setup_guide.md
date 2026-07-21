# VerifyEd v2.0 - Environment Setup, Blockchain Deployment & Production Guide

This guide provides step-by-step instructions to configure the environment, compile & deploy Solidity smart contracts onto EVM blockchains (Polygon Amoy Testnet / Sepolia), migrate PostgreSQL database schemas, and deploy the production services.

---

## 1. Environment Setup

### Prerequisites
- **Node.js**: v20.x LTS or higher
- **Docker & Docker Compose**: v24.x+
- **PostgreSQL**: v16+ (or Neon / Supabase free tier connection string)
- **Redis**: v7+
- **MetaMask Wallet**: Funded with testnet POL (Polygon Amoy) or Sepolia ETH

### Quick Setup Steps
1. Clone the repository and copy the environment file:
   ```bash
   cp .env.example .env
   ```
2. Fill in `.env` credentials (DATABASE_URL, POLYGON_AMOY_RPC_URL, DEPLOYER_PRIVATE_KEY, PINATA_JWT).
3. Install dependencies across the workspace:
   ```bash
   npm install
   ```

---

## 2. Database Setup & Prisma Migration

1. Start local PostgreSQL & Redis containers (if running locally):
   ```bash
   docker-compose up -d postgres redis
   ```
2. Generate Prisma Client and apply migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

---

## 3. Blockchain Smart Contract Compilation & Deployment

### Step 3.1: Compile Solidity Contracts
```bash
cd packages/blockchain
npx hardhat compile
```

### Step 3.2: Deploy to Polygon Amoy Testnet
1. Ensure your deployer wallet has testnet POL from the official faucet: `https://faucet.polygon.technology/`
2. Run the automated Hardhat deployment script:
   ```bash
   npx hardhat run scripts/deploy.js --network polygonAmoy
   ```
3. Copy the 3 generated smart contract addresses printed in your terminal and update `.env`:
   ```env
   NEXT_PUBLIC_UNIVERSITY_REGISTRY_ADDRESS="0x..."
   NEXT_PUBLIC_CERTIFICATE_REGISTRY_ADDRESS="0x..."
   NEXT_PUBLIC_CERTIFICATE_REVOCATION_ADDRESS="0x..."
   ```

### Step 3.3: Verify Contracts on Polygonscan
```bash
npx hardhat verify --network polygonAmoy <DEPLOYED_CONTRACT_ADDRESS>
```

---

## 4. IPFS & Pinata Storage Setup

1. Create a free account at `https://pinata.cloud`
2. Generate an API Key with `pinFileToIPFS` permissions.
3. Paste `PINATA_JWT` or `PINATA_API_KEY` + `PINATA_SECRET_API_KEY` into `.env`.

---

## 5. Production Deployment

### Frontend Deployment (Vercel)
1. Import repository to Vercel.
2. Set Build Command: `npm run build`
3. Add Environment Variables from `.env`.
4. Deploy!

### Backend & Database Deployment (Render / Neon)
1. Provision a PostgreSQL database on Neon (`https://neon.tech`).
2. Deploy `Dockerfile.api` on Render or AWS ECS.
3. Set environment variable `DATABASE_URL` pointing to Neon connection string.

---

## 6. Running with Docker Compose (Single Command)

To run the entire enterprise stack (PostgreSQL, Redis, NestJS API, Next.js Web App) locally with a single command:

```bash
docker-compose up --build -d
```

Verify service status:
- Web App: `http://localhost:3000`
- API Gateway: `http://localhost:4000`
- Database: `localhost:5432`
- Redis: `localhost:6379`
