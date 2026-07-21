<div align="center">
  <h1>🎓 VerifyEd v2.0</h1>
  <p><b>Enterprise Blockchain Academic Certificate Verification Platform</b></p>
  <p><i>Smart India Hackathon (SIH 2025) National Credential Vault</i></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 15">
    <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
    <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity">
    <img src="https://img.shields.io/badge/Polygon_Amoy-8247E5?style=for-the-badge&logo=polygon&logoColor=white" alt="Polygon">
    <img src="https://img.shields.io/badge/IPFS-65C2CB?style=for-the-badge&logo=ipfs&logoColor=white" alt="IPFS">
    <img src="https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Auth">
    <img src="https://img.shields.io/badge/Prisma_PostgreSQL-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  </p>
</div>

---

## 📌 Executive Summary

Document forgery costs global enterprise HR departments and university accreditation boards over $20 Billion annually. Legacy verification processes rely on manual email exchanges, notary seals, and slow registry queries that take between 5 to 21 business days.

**VerifyEd v2.0** solves academic certificate fraud through a zero-trust, hybrid blockchain-IPFS infrastructure combined with a 9-criteria AI document intelligence pipeline. By executing cryptographic hashing of academic credentials at issuance, storing records immutably on EVM blockchains (Polygon & Ethereum), and processing uploaded documents with Google Genkit multimodal vision models, VerifyEd delivers sub-second, tamper-proof credential verification.

---

## ✨ Key Enterprise Features

- **🎨 Skeuomorphic UI/UX Design System**: High-trust, tactile 3D UI featuring realistic dual shadows, debossed inset input fields, pill controls, and subtle metallic status badges matching reference UI standards.
- **⚡ Sub-Second Verification Engine**: Upload any diploma PDF or image to execute instant client-side SHA-256 hashing, Tesseract OCR, and Polygon RPC lookup.
- **🤖 Genkit Multimodal AI Fraud Inspection**: Evaluates document authenticity using Google Gemini vision models across 9 criteria (font consistency, layout grid alignment, watermark integrity, EXIF edits, and hash consistency).
- **⛓️ Merkle Tree Batch Rollups**: Supports bulk degree issuance (up to 100,000 certificates per batch) with 99.4% gas savings by anchoring Merkle Roots on Polygon.
- **🏛️ 5-Portal Unified Ecosystem**:
  1. **Student Portal**: Decentralized credential portfolio & QR code sharing.
  2. **University Registrar Portal**: Batch issuance, KYC management, & revocation controls.
  3. **Employer Portal**: Instant candidate certificate scans & batch ATS reporting.
  4. **Government Audit Portal**: System-wide accreditation monitoring & fraud heatmaps.
  5. **Admin Platform Suite**: Institution onboarding approvals & live RPC telemetry.

---

## 🛠️ Technology Stack

### Frontend & UI
- **Framework**: Next.js 15 (App Router, Standalone Build)
- **UI Core**: React 19, TypeScript, TailwindCSS
- **Design Language**: Custom Skeuomorphic & Neumorphic CSS Engine
- **Icons & Charts**: Lucide Icons, Recharts

### Blockchain & Decentralized File System
- **Smart Contracts**: Solidity 0.8.24, OpenZeppelin UUPS Upgradeable Proxies
- **Network**: Polygon Amoy Testnet & Ethereum Sepolia
- **Decentralized Storage**: IPFS pinned via Pinata Enterprise Gateway
- **Development Tooling**: Hardhat, Ethers.js

### Backend & AI Intelligence Engine
- **ORM & Database**: Prisma ORM, PostgreSQL (Neon Cloud / Supabase)
- **AI Framework**: Google Genkit AI (`@genkit-ai/googleai`, Gemini 2.5 Flash)
- **OCR Parser**: Tesseract OCR
- **Cache & Queue**: Redis (Upstash)

### Infrastructure & Deployment
- **Containerization**: Single & Multi-stage Docker, Docker Compose
- **Cloud Hosting**: Render (Web Service & Docker Blueprint), Vercel

---

## 📁 Repository Monorepo Structure

```text
TrustED/
├── apps/                        # Web and API applications
├── docs/                        # Enterprise Master Architecture Specs
│   ├── enterprise_architecture_master_spec.md    # 37-chapter master blueprint & 12 Mermaid diagrams
│   ├── deployment_and_blockchain_setup_guide.md # Step-by-step deployment guide
│   └── how_to_get_free_env_keys.md             # Free API key acquisition guide
├── packages/
│   └── blockchain/              # Solidity Smart Contracts & Hardhat suite
│       ├── contracts/           # UniversityRegistry, CertificateRegistry, CertificateRevocation
│       └── scripts/             # Hardhat deployment scripts
├── prisma/                      # Database Schema & Migrations
│   └── schema.prisma            # PostgreSQL Prisma relational models
├── public/                      # Static assets
├── src/
│   ├── ai/                      # Genkit AI Flows & Prompts
│   ├── app/                     # Next.js 15 App Router pages & portals
│   ├── components/              # Skeuomorphic UI components & Header
│   ├── hooks/                   # Custom Auth hooks (useAuth)
│   ├── lib/                     # Firebase, OCR, AI Fraud & Blockchain verifiers
│   └── styles/                  # Skeuomorphic CSS tokens & utilities
├── Dockerfile                   # Single-container production Docker build
├── docker-compose.yml           # Local dev orchestrator (Postgres, Redis, Web)
├── render.yaml                  # 1-Click Render Infrastructure Blueprint
├── hardhat.config.js            # Polygon Hardhat configuration
└── package.json
```

---

## 🚀 Getting Started (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Vortex-16/TrustED.git
cd TrustED
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` or `.env.local`:
```bash
cp .env.example .env.local
```
> 💡 *Need free keys? Read our step-by-step guide: [how_to_get_free_env_keys.md](docs/how_to_get_free_env_keys.md)*

### 3. Run Database Migrations
```bash
npx prisma generate
npx prisma db push
```

### 4. Start Local Development Server
```bash
npm run dev
```
Open **[http://localhost:9002](http://localhost:9002)** in your browser.

---

## 🐳 Docker Deployment

### Run Locally via Docker Compose
```bash
docker-compose up --build -d
```

### 1-Click Render Production Deployment
1. Push repository to GitHub.
2. Open **[Render Dashboard](https://dashboard.render.com)** -> **New +** -> **Blueprints**.
3. Connect `TrustED` repository (`render.yaml` and `Dockerfile` will auto-deploy).

---

## 📖 Documentation & Specifications

- **[Master Architecture Specification](docs/enterprise_architecture_master_spec.md)** (37 Technical Chapters + 12 Mermaid Diagrams)
- **[Free Keys Acquisition Guide](docs/how_to_get_free_env_keys.md)**
- **[Deployment & Blockchain Setup Guide](docs/deployment_and_blockchain_setup_guide.md)**

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">
  <p>Built for <b>Smart India Hackathon (SIH 2025)</b></p>
</div>