# Protius Protocol Proof of Concept

This is a proof-of-concept (PoC) implementation of the **Protius Protocol**, demonstrating the core functionalities of a Decentralized Finance Application for the Renewable Energy Industry. The application is built with Node.js and Express and integrates with the Stellar Testnet for publishing data.

---

## 📚 Table of Contents
1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup Instructions](#setup-instructions)
5. [API Endpoints](#api-endpoints)
6. [Routes](#routes)
7. [Stellar Testnet Integration](#stellar-testnet-integration)
8. [Configuration](#configuration)
9. [Notes](#notes)
10. [Roadmap](#roadmap)
11. [License](#license)
12. [Authors](#authors)

## 📁 Project Structure

```bash
protius-protocol-poc/
├── public/                     # Frontend static files
│   └── pages/                  # HTML pages served for different routes
├── src/
│   ├── publishData.js         # Handles publishing data to the Stellar testnet
│   ├── devphase.js            # Defines project development phases
│   ├── projectPool.js         # Project pool management
│   └── sampleProject.js       # Sample project used for simulation
├── server.js                  # Main Express server
├── package.json               # Project metadata and dependencies
└── README.md                  # You're here!
```

---

## 🚀 Features

- 📁 **Project Creation and On-Chaining**: This allows users to initialize new RE projects On-Chain, launching the development phase of each project.
- 🔁 **Development Tracking**: Upload documents and mark project phases as completed.
- 📡 **Network Publishing**: Broadcast updates to the Stellar testnet.
- 🌐 **Static Web Pages**: Navigate project lifecycle pages such as DAO (for joint ownership of projects), Development (for the development phase of projects), Trade (for energy trading on-chain), and Investment (for energy investment on-chain).
- 🧠 **In-Memory Project Pool**: Simulates project data storage and updates.

---

## 🧰 Tech Stack

- **Backend**: Node.js + Express
- **Live Dev Reloading**: Nodemon
- **File Uploads**: Multer
- **Blockchain Publishing**: Stellar Testnet (via custom `publishData`)
- **Frontend**: Static HTML served from Express

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ProtiusProtocol/Protius-Demo.git
cd C:\path-to-the-project-on-your-system\Protius-Demo
```

### 2. Install Dependencies

```bash
npm i
```

### 3. Run the App

#### Production

```bash
node server.js
```

#### Development (auto-restart with changes)

```bash
nodemon server.js
```

### 4. Visit the Application

Navigate to: [http://localhost:4000]

---

## 📌 API Endpoints

### `POST /api/createproject`

Creates a new project and publishes this to the network.

**Request Body:**
```json
{
  "newName": "Project A",
  "newDeveloper": "Project Developer A"
}
```

**Response:** Adds to the project pool and publishes to Stellar.

---

### `POST /api/devphase`

Allows users to upload documents or give manual text input which then mark a stage in the project development phase as completed.

**Form Data:**
- `document` (file)
- `title` (string): The name of the project phase to mark as completed (this is gotten from the HTML page as a list option).

**Response:** Updates the sample project and broadcasts it to the network.

---

## 🌍 Routes

| Route          | Description                     |
|----------------|---------------------------------|
| `/`            | Home page                       |
| `/create`      | Create new project              |
| `/dao`         | DAO information and controls    |
| `/development` | Development phase tracker       |
| `/trade`       | Simulated token trade           |
| `/invest`      | Investment and funding portal   |

---

## 🌐 Stellar Testnet Integration

Projects and updates are broadcast to the **Stellar testnet** for simulation of decentralized publishing. Modify `publishData.js` to point to your own Stellar test account or sandbox environment.

---

## 🔧 Configuration

Ensure you have Node.js v20.17 or higher (as specified in `package.json`):

```bash
node -v
```

If you're using `nvm`:
```bash
nvm install 20.17
nvm use 20.17
```

---

## 📎 Notes

- **Security:** This PoC does not include authentication or production-grade security. Additional security measures are being designed and will be integrated for further testing.
- **Persistence:** Currently uses in-memory data (no DB). 

---

## 🛠️ Roadmap 

- # Protius Protocol – Software Development Roadmap

The Protius Protocol is a decentralized platform for funding, building, and transacting renewable energy assets. This roadmap is divided into two layers:

1. **Project-Level Functionality** – tools for funding and launching individual energy projects
2. **Platform-Level Infrastructure** – infrastructure to scale Protius as a public protocol

---

## 🚧 PART 1: Project-Level Functionality

### 📌 Q2 2025: Phase 1 – Tokenization of Early-Stage Funding

🎯 Enable crypto staking for project development  
- [ ] Define utility token and staking mechanics 
- [ ] Define KYC and AML mechanics
- [ ] Smart contract for crypto staking + escrow  
- [ ] Development premium payout logic for stakers  
- [ ] Off-ramp mechanism to fiat for developers  
- [ ] MVP frontend for staking interface  
- [ ] Internal smart contract audit  
- [ ] Launch on testnet (Stellar Soroban, or EVM-compatible chain)

---

### 📌 Q3 2025: Phase 2 – Tokenization of Equity &/ or Debt as appropriate and as the platform matures

🎯 Automate capital deployment and post-COD returns  
- [ ] Smart contracts for equity tokenization  
- [ ] Tokenized debt (green bonds, loans) with repayment triggers 
 -[ ] Smart contract development for technology choices across solar/ wind/ hydrogen
- [ ] Smart contract logic for construction drawdowns  
- [ ] Dividends and loan repayment automation  
- [ ] Project milestone-linked performance oracles  
- [ ] External smart contract audit  
- [ ] Soul Bound Tokens (SBT) validator voting for new projects

---

### 📌 Q4 2025: Phase 3 – Tokenization of Energy Sales for renewable energy off-take/ kilogram off-take for hydrogen projects (Smart off-take agreements/ PPA/ HSA)

🎯 Decentralize kWh sales and energy buyer contracts ad kg hydrogen sales and molecule buyer contracts   
- [ ] Smart PPA design and implementation  
- [ ] Oracle integration for metered production data  
- [ ] Buyer-seller PPA/ HSA matching system  
- [ ] Carbon and REC tagging logic per kWh  
- [ ] Fiat and crypto payment integrations  
- [ ] Pilot with operational renewable plant  
- [ ] Feedback loop with off-takers and aggregators

---

### 🧱 Infrastructure Tasks (Ongoing)

- [ ] Backend API and DB for project data  
- [ ] React-based frontend dashboard  
- [ ] SBT issuance system for community roles  
- [ ] Performance and impact dashboard for stakeholders  
- [ ] Federated learning engine (Dream Catcher AI integration)

---

## 🛠️ PART 2: Platform-Level Infrastructure

### 📌 Platform Core Development

🎯 Make Protius the infrastructure layer for RE + derivatives of the kWh such as carbon/ CDRs/ RECs  
- [ ] Modular smart contract library for projects to fork/use  
- [ ] Public APIs for developers and data services  
- [ ] Launchpad interface for tokenizing new energy projects  
- [ ] SDK for energy developers to integrate token models  
- [ ] Multi-chain and L2 deployment architecture (e.g. rollups, zkEVM, Stellar + EVM bridge)  
- [ ] Decentralized identity + KYC modules for compliance

---

### 🌍 Ecosystem Growth

🎯 Enable network effects, developer adoption, and Platform maturity  
- [ ] Platform governance, for SBT Governor level community engagement, for protocol upgrades and fee policies  
- [ ] Developer grants and incentive pools  
- [ ] Staking rewards and protocol fee-sharing model  
- [ ] SBT-based reputation and voting weight  
- [ ] Community-verified project registry  
- [ ] Aggregator layer for grid-level coordination and energy storage integration

---

### ♻️ Carbon/ RECs & Registry Integrations

🎯 Bridge on-chain data with real-world impact verification  
- [ ] MRV (monitoring, reporting, verification) integration for carbon  
- [ ] Registry bridges to I-REC, Verra, or national bodies  
- [ ] Open standards for carbon data tagging  
- [ ] Protius as a recognized digital carbon infrastructure layer

---

### 🔐 Security & Compliance

- [ ] Bug bounty and testnet hackathons  
- [ ] Multi-sig treasury and protocol-controlled vaults  
- [ ] Compliance APIs for institutional users  
- [ ] Legal entity framework for Platform/ DAO (?) governance

---

## 🗓️ Long-Term (2026+)

- [ ] Mobile app for investor and developer access  
- [ ] Geographic forks for regional energy markets  
- [ ] Real-time market for carbon/kWh bundles  
- [ ] “Protius-as-a-Service” offering for utilities and cooperatives  
- [ ] Use of ZK-proofs for privacy-preserving project performance claims

---

🏗️ All development tracked in Issues and Milestones. Contributions welcome.

---

## 📜 License

MIT License

---

## 👨‍💻 Authors
- Peter Oldacre - Co-Founder and CEO
- Giorgio Mauro - Co-Founder and COO
- Dr Ugo Ikpeazu – CTO 
