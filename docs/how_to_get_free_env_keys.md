# How to Obtain All Environment Keys For FREE - Step-by-Step Guide

This guide provides exact step-by-step instructions for getting every single API key, database connection, Firebase credential, IPFS token, and testnet wallet required in `.env.example` **100% FOR FREE**, without spending any money.

---

## Quick Summary of Required Free Keys

| Service | Key Name | Provider / Portal | Free Tier Limit |
| :--- | :--- | :--- | :--- |
| **Database** | `DATABASE_URL` | [Neon.tech](https://neon.tech) / [Supabase](https://supabase.com) | 500 MB Free Cloud Postgres |
| **Authentication** | `NEXT_PUBLIC_FIREBASE_*` | [Firebase Console](https://console.firebase.google.com) | 50k MAU Free Authentication |
| **IPFS Storage** | `PINATA_JWT`, `PINATA_API_KEY` | [Pinata Cloud](https://pinata.cloud) | 1 GB Free IPFS Storage |
| **Blockchain RPC** | `POLYGON_AMOY_RPC_URL` | Public RPC / [Alchemy](https://alchemy.com) | 300 Million Free Compute Units |
| **Block Explorer API** | `ETHERSCAN_POLYGON_API_KEY` | [PolygonScan](https://polygonscan.com) | 5 calls/sec Free API |
| **Redis Queue/Cache** | `REDIS_URL` | [Upstash](https://upstash.com) or Local Docker | 10,000 free commands/day |

---

## 1. Step-by-Step: PostgreSQL Database (`DATABASE_URL`)

### Option A: Neon.tech (Recommended - Takes 1 Minute)
1. Go to **[https://neon.tech](https://neon.tech)** and click **Sign Up** (Sign in with GitHub).
2. Click **Create Project** -> Name your project `verifyed-db` -> Select region closest to you.
3. Once created, you will see a connection string modal. Select **Prisma** or **Node.js**.
4. Copy the connection URL. It looks like:
   ```env
   DATABASE_URL="postgresql://neondb_owner:npg_xY123abc@ep-cool-pool-a5xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```
5. Paste this URL into your `.env` file under `DATABASE_URL`.

### Option B: Local Docker Database (Zero Sign-up Required)
If you have Docker installed, simply run:
```bash
docker-compose up -d postgres
```
Your local connection string is:
```env
DATABASE_URL="postgresql://verifyed_admin:verifyed_secret_password@localhost:5432/verifyed_production?schema=public"
```

---

## 2. Step-by-Step: Firebase Authentication Credentials

### Step 2.1: Create Firebase Project & Get Web SDK Keys
1. Open **[Firebase Console](https://console.firebase.google.com/)** and sign in with your Google account.
2. Click **Add Project** -> Enter Project Name `verifyed-app` -> Click **Continue** (Analytics optional).
3. Once the project is ready, click on the **Web Icon (`</>`)** to register your web application.
4. Enter app nickname `VerifyEd Web` and click **Register app**.
5. Copy the configuration values displayed on screen:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyA..."
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="verifyed-app.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="verifyed-app"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="verifyed-app.appspot.com"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
   NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef"
   ```
6. Enable Authentication methods:
   - In left sidebar, click **Build** -> **Authentication** -> **Get Started**.
   - Under **Sign-in method** tab, enable **Email/Password** and **Google**.

### Step 2.2: Get Firebase Admin SDK Private Keys (Backend)
1. In Firebase Console, click the **Gear Icon (⚙️)** next to Project Overview -> **Project settings**.
2. Go to **Service accounts** tab.
3. Click **Generate new private key** -> Confirm by clicking **Generate key**.
4. A JSON file will download. Open the JSON file and copy:
   - `client_email` -> Paste as `FIREBASE_CLIENT_EMAIL`
   - `private_key` -> Paste as `FIREBASE_PRIVATE_KEY`

---

## 3. Step-by-Step: Pinata IPFS Credentials (`PINATA_JWT`, `PINATA_API_KEY`)

1. Go to **[https://pinata.cloud](https://pinata.cloud)** and click **Start Building Free**.
2. Sign up for a free account.
3. On the dashboard sidebar, click **API Keys**.
4. Click **New Key** button:
   - Enable **Admin** permissions or toggle `pinFileToIPFS` & `pinJSONToIPFS` to **Enabled**.
   - Name your key `VerifyEd Key`.
   - Click **Generate Key**.
5. Copy the 3 keys displayed:
   - **API Key** -> Paste into `PINATA_API_KEY`
   - **API Secret** -> Paste into `PINATA_SECRET_API_KEY`
   - **JWT Token** (long string) -> Paste into `PINATA_JWT`

---

## 4. Step-by-Step: Polygon Amoy Blockchain & Faucet Tokens

### Step 4.1: Public Amoy RPC URL (Free, No Registration)
Use the official free public RPC node:
```env
POLYGON_AMOY_RPC_URL="https://rpc-amoy.polygon.technology/"
```
*(Optional)* For higher speed, sign up at **[https://alchemy.com](https://alchemy.com)** (Free plan) -> Create App -> Copy Polygon Amoy RPC URL.

### Step 4.2: Polygonscan API Key (Free)
1. Go to **[https://polygonscan.com/register](https://polygonscan.com/register)** and create a free account.
2. Sign in -> Go to **API Keys** in dashboard.
3. Click **Add Key** -> Copy API Key and paste as `ETHERSCAN_POLYGON_API_KEY`.

### Step 4.3: Create Testnet Wallet & Get Free Testnet POL Coins
1. Open **MetaMask browser extension** (or install from [metamask.io](https://metamask.io)).
2. Create a new test wallet account named `VerifyEd Deployer`.
3. Export Private Key: Click **Account Details** -> **Show Private Key** -> Enter password -> Copy string.
4. Paste string into `.env` under `DEPLOYER_PRIVATE_KEY` (make sure it starts with `0x`).
5. **Get FREE Testnet POL coins**:
   - Open **[https://faucet.polygon.technology/](https://faucet.polygon.technology/)**
   - Select **Polygon Amoy Testnet** and **POL Token**.
   - Paste your MetaMask wallet public address and click **Submit**.
   - You will receive 0.2 to 1.0 free POL in 30 seconds for smart contract deployments!

---

## 5. Step-by-Step: Redis Connection (`REDIS_URL`)

### Option A: Upstash Serverless Redis (Free Cloud)
1. Go to **[https://upstash.com](https://upstash.com)** and sign in with GitHub.
2. Click **Create Database** -> Name `verifyed-redis` -> Select region.
3. Scroll to **Node.js / Redis URL** -> Copy connection string:
   ```env
   REDIS_URL="rediss://default:your_password@your-endpoint.upstash.io:6379"
   ```

### Option B: Local Docker Redis (Zero Sign-up)
Run Docker command:
```bash
docker-compose up -d redis
```
Connection URL:
```env
REDIS_URL="redis://localhost:6379"
```

---

## 6. Step-by-Step: Generate Secure JWT Secrets

To generate strong 256-bit secret keys for `JWT_SECRET` and `REFRESH_TOKEN_SECRET` without signing up anywhere, run this command in your VS Code terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated random hex strings and set them as:
```env
JWT_SECRET="a4f9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9"
REFRESH_TOKEN_SECRET="7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e"
```

---

## Complete `.env` Checklist

Once you complete the steps above, your final `.env` file should look like this:

```env
# Node & Server Ports
NODE_ENV=development
PORT=4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# 1. Neon Cloud Database
DATABASE_URL="postgresql://neondb_owner:npg_xY123abc@ep-cool-pool-a5xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"

# 2. Redis Connection
REDIS_URL="redis://localhost:6379"

# 3. Firebase Web Auth Keys
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyA..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="verifyed-app.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="verifyed-app"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="verifyed-app.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@verifyed-app.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"

# 4. Polygon Blockchain RPC & Wallet
POLYGON_AMOY_RPC_URL="https://rpc-amoy.polygon.technology/"
ETHERSCAN_POLYGON_API_KEY="YOUR_POLYGONSCAN_KEY"
DEPLOYER_PRIVATE_KEY="0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

# Smart Contract Addresses (Populated automatically after running npx hardhat run scripts/deploy.js --network polygonAmoy)
NEXT_PUBLIC_UNIVERSITY_REGISTRY_ADDRESS="0x1111111111111111111111111111111111111111"
NEXT_PUBLIC_CERTIFICATE_REGISTRY_ADDRESS="0x2222222222222222222222222222222222222222"
NEXT_PUBLIC_CERTIFICATE_REVOCATION_ADDRESS="0x3333333333333333333333333333333333333333"

# 5. Pinata IPFS Keys
PINATA_API_KEY="your_pinata_api_key"
PINATA_SECRET_API_KEY="your_pinata_secret_key"
PINATA_JWT="your_pinata_jwt"
NEXT_PUBLIC_IPFS_GATEWAY="https://gateway.pinata.cloud/ipfs/"

# 6. JWT Secrets
JWT_SECRET="a4f9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9"
JWT_EXPIRATION="15m"
REFRESH_TOKEN_SECRET="7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e"
REFRESH_TOKEN_EXPIRATION="7d"
```

---
*Happy Coding! All resources used above are 100% free forever for developers.*
