# Protius Protocol Proof of Concept

This is a proof-of-concept (PoC) implementation of the **Protius Protocol**, demonstrating the core functionalities of a Decentralized Finance Application for the Renewable Energy Industry. The application is built with Node.js and Express and integrates with the Stellar Testnet for publishing data.

---

## 📚 Table of Contents
1. [Project Structure](#project-structure)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Setup Instructions](#setup-instructions)
5. [API Endpoints](##api-endpoints)
6. [Routes](#routes)
7. [Stellar Testnet Integration](#stellar-testnet-integration)
8. [Configuration](#configuration)
9. [Notes](#notes)
10. [Roadmap](#roadmap)
11. [Contributing](#contributing)
12. [License](#license)
13. [Authors](#authors)

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

## 🚀 Key Features

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

- ✅ Project creation and development tracking
- 📄 Add database integration 
- 🔐 Implement authentication 
- 🌉 Full blockchain interaction (token issuance, smart contracts)
- 📊 DAO and voting mechanisms
- 💬 Real-time updates 
- 📱 Updated GUI for user interactions

---

## 📜 License

MIT License

---

## 👨‍💻 Authors
- Peter Oscali - Co-Founder and CEO
- Giorgio Mauro - Co-Founder and COO
- Dr Ugo Ikpeazu – CTO 
