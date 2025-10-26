require('dotenv').config();
const express = require('express');
const { ethers } = require("ethers");
const path = require('path');
const multer = require('multer');
const cors = require('cors');
//const publishData = require('./src/publishData');
const ProjectDevelopmentPhase = require('./src/devphase');
const ProjectPool = require('./src/projectPool');
const { insertProjectAndPhases } = require('./src/updateDatabase');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const createProject = new ProjectDevelopmentPhase();
const newProjectPool = new ProjectPool();
const mysql = require('mysql2/promise');
const { insertNewEvent } = require('./src/eventsRouter');
//const { startChecking } = require("./src/poller");
const http = require("http");
const socketIO = require("socket.io");
const pool = require('./src/initializeDB');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 4000;
//const PORT = 4000;
//const allowedOrigins = ['http://localhost:4000'];


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/smartcontracts', express.static(path.join(__dirname, 'smartcontracts')));
/*
app.use(cors({ 
  origin: allowedOrigins,
  credentials: true,
}));
*/

//Web socket
io.on('connection', socket => {
    console.log("Client connected");
});

// Periodically check database for events
//startChecking(io);

const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/_HYTjEI8JHn2mlWryLOs_");
const USDC_ADDRESS = "0x14D8a1F039161bEd7FeEefE5a87527Cc23634BfA"; 

const contractAddress = "0x24D82d4A281e01D4D82b0a2Ca7005169F733b47f"; // target contract

// Contract ABI
const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_developer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_usdcToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_fundingGoal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minimumGoal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_stakingPeriodDays",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "developer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalRaised",
          "type": "uint256"
        }
      ],
      "name": "Funded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalPremium",
          "type": "uint256"
        }
      ],
      "name": "PremiumDistributed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Refunded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Staked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "Unstaked",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "claimReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "confirmThatFundingIsSuccessful",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "developer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "financialCloseReached",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fundingGoal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getStakerCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isFunded",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minimumGoal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "refund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "stakers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stakes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stakingDeadline",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalStaked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "premiumAmount",
          "type": "uint256"
        }
      ],
      "name": "triggerFinancialClose",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "unclaimedRewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdcToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];


const ERC20_ABI= [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);
const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);

//_____________GET Requests for User Facing frontend pages___________________________________________________
// GET Request to display the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
})

// GET Request to display the Admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/admin.html'));
})

// GET Request to display the smart contracts page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/contact.html'));
})

// GET Request to display the smart contracts page
app.get('/contracts', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/contracts.html'));
})

// GET Request to display the project page
app.get('/create-project', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/create-project.html'));
})

// GET Request to display the dashboard page
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/admin-dashboard.html'));
})

// GET Request to display the dashboard page
app.get('/user-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/user-dashboard.html'));
})

// GET Request to display the smart contracts page
app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/docs.html'));
})

// GET Request to display the trade page
app.get('/invest', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/invest.html'));
})


// GET Request to display the smart contracts page
app.get('/connect', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/connect.html'));
})


// GET Request to display the admin projects page
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/projects.html'));
})

// GET Request to display the trade page
app.get('/trade', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/trade.html'));
})

// GET Request to display the project development page
app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/update.html'));
})



//_____________GET Requests to serve smart contract templates___________________________________________________
// Contract Template: GET request to serve solidity file
app.get('/contracts/stake.sol', (req, res) => {
    res.sendFile(path.join(__dirname, 'contracts', 'stake.sol'));
  });

// Contract Template: GET request to serve solidity file
app.get('/contracts/newproject.sol', (req, res) => {
    res.sendFile(path.join(__dirname, 'contracts', 'newproject.sol'));
  });


// GET USDC Mock Contract Token Supply
app.get("/api/check-usdc-supply", async (req, res) => {
  try {
    const result = await contract.totalSupply();
    const network = await provider.getNetwork();
    console.log('Contract code:', network.name);
    res.json({ totalSupply: result.toString() });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET Blockchain Network
app.get("/api/check-network", async (req, res) => {
  try {
    const network = await provider.getNetwork();
    console.log('Contract code:', network.name);
    res.json({ networkCon: network.name });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET USDC Balance
app.get("/api/balance/:address", async (req, res) => {
  try {
    const { address } = req.params;

    // Validate Ethereum address
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }

    const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);

    const [balanceRaw, decimals] = await Promise.all([
      usdc.balanceOf(address),
      usdc.decimals()
    ]);

    // Convert BigInt to human-readable string
    const balance = ethers.formatUnits(balanceRaw, decimals);

    res.json({ balance });
  } catch (err) {
    console.error("Balance fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});



//_____________POST Requests/API Endpoints___________________________________________________
// POST request to test and ensure stakes are received 
app.post('/api/prepare-stake', async (req, res) => {
  try {
    const { wallet, amount } = req.body;

    if (!ethers.isAddress(wallet)) return res.status(400).json({ error: 'Invalid wallet address' });

    const decimals = await usdc.decimals();
    const amountParsed = ethers.parseUnits(amount, decimals);

    const [balanceRaw, allowanceRaw] = await Promise.all([
      usdc.balanceOf(wallet),
      usdc.allowance(wallet, contractAddress)
    ]);

    if (balanceRaw < amountParsed) return res.status(400).json({ error: 'Insufficient USDC balance' });

    // If allowance < amount, frontend must approve first
    const allowanceOk = allowanceRaw >= amountParsed;

    // Prepare raw transaction data for staking
    const txData = contract.interface.encodeFunctionData("stake", [amountParsed]);

    res.json({
      txData,
      to: contractAddress,
      value: "0",           // ERC20 stake uses token, no ETH needed
      allowanceOk
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// POST request to test and ensure votes are received 
app.post('/api/vote', (req, res) => {
    const { userVote } = req.body;
    console.log('Vote Received:', userVote);
})


// POST request to create new project
app.post('/api/create-project', async (req, res) => {
    const { owner, newName, newDeveloper, finance, devContribute } = req.body;

    if (!owner || !newName || !newDeveloper || !finance || !devContribute) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProject = createProject.createNewProject( owner, newName, newDeveloper, finance, devContribute );

    try{
        console.log(newProject);
        await insertProjectAndPhases(newProject);
        res.status(201).json({ message: 'Project created successfully', projectID: newProject.projectID });
    } catch (err) {
        console.error('Project creation failed:', err);
        res.status(500).json({ error: 'Failed to create project' });
    }
    
    //const updatedProjectPool = newProjectPool.addProject(newProject);
    //const announceProject = JSON.stringify(newName, newDeveloper);
    //console.log("New Project Initiated", newProject);   
    //console.log("Updated project pool", updatedProjectPool);

    /*Fetch block below is for publishing to local network via API
    fetch('http://localhost:3000/api/publish', { //This points to a local instance of another blockchain for dynamic testing
        method: 'POST',
        headers: {'content-type': 'application/json'},
        //body: JSON.stringify( newProject )
        body: JSON.stringify({ updatedProjectPool })
    }) */

    // Functionality to publish data (new projects) to the stellar testnet_____________
    /*
    try{
        publishData.publishStellar(JSON.stringify(announceProject));
    }catch(error){
        console.error("Error", error)
    }
    */
})


app.post('/api/create-project', async (req, res) => {
    const {
        owner,
        newName,
        newDeveloper,
        finance,
        devContribute,
        location,
        distance,
        capacity,
        landOwnership,
        landZoning,
        debtEquity,
        equity,
        cod,
        oeContracted
    } = req.body;

    if (
        !owner ||
        !newName ||
        !newDeveloper ||
        !finance ||
        !devContribute
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProject = createProject.createNewProject(
        owner,
        newName,
        newDeveloper,
        finance,
        devContribute,
        location,
        distance,
        capacity,
        landOwnership,
        landZoning,
        debtEquity,
        equity,
        cod,
        oeContracted
    );

    try {
        console.log(newProject);
        await insertProjectAndPhases(newProject);
        res.status(201).json({ message: 'Project created successfully', projectID: newProject.projectID });
    } catch (err) {
        console.error('Project creation failed:', err);
        res.status(500).json({ error: 'Failed to create project' });
    }
});



// POST request to retreive projects from database for a specific user
app.post('/api/get-wallet-assigned-projects', async (req, res) => {
    const { walletAddress } = req.body;
    
    if (!walletAddress) return res.status(400).json({error: "Wallet Address Required"});

    try {
        const query = `SELECT * FROM projects_table WHERE owner = $1`;
        const result = await pool.query(query, [walletAddress]);
        const rows = result.rows;
        return res.json({ projects: rows});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed'});
    }
        
});


// GET request to retreive All projects  (total) from database
app.get('/api/admin-get-all-projects', async (req, res) => {
    
    try {
        const result = await pool.query(`SELECT * FROM projects_table WHERE approval = 'pending'`);
        const rows = result.rows;
        return res.json({ projects: rows});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed'});
    }
});


// GET projects approved for investment
app.get('/api/get-approved-projects', async (req, res) => {
    
    try {
        const result = await pool.query(`SELECT * FROM projects_table WHERE approval = 'approved'`);
        const rows = result.rows;
        return res.json({ projects: rows});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed'});
    }
});


// GET request to retreive All projects  (total) from database
app.get('/api/get-all-projects', async (req, res) => {
    //console.log('[TEST] GET PROJECTS API WORKING')
    
    try {
        //const conn = await pool.connect();
        //const result = await conn.query(`SELECT * FROM projects_table`);
        const result = await pool.query(`SELECT * FROM projects_table WHERE approval = 'approved'`);
        const rows = result.rows;

        //conn.release();

        return res.json({ projects: rows});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed'});
    }
        
});


// GET request to retreive All project phases from database
app.post('/api/get-all-phases', async (req, res) => {
    const {projectID} = req.body;
    
    try {
        const query = `SELECT * FROM project_phases WHERE id =$1`;
        const result = await pool.query(query, [projectID])
        const rows = result.rows;
        return res.json({ phases: rows});
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed'});
    }
});


// POST request to update phases in a project 
app.post('/api/devphase', async (req, res) => {
    const { owner, pname, title } = req.body;

    if ( !owner || !pname || !title ) {
        return res.status(400).json({ message: 'Missing owner, title or name in request' });
    }

    try {
        const query =
            `UPDATE project_phases
            SET  ${title} = 'completed'
            WHERE id = $1`;

        const values = [pname];
        await pool.query(query, values);
        res.status(200).json({ message: 'Phase status updated to completed' });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed' });
    }
    //#######################################################################
    
    /*
    const matchingProject = newProjectPool.getAllProjects().find(project =>
        project.projectName.toLowerCase().includes(pname.toLowerCase())
    );

    

    if (!matchingProject) {
        return res.status(404).json({ message: 'Project not found in ProjectPool' });
    }

    if (!(title in matchingProject.projectPhases)) {
        return res.status(400).json({ message: `Invalid project phase: ${title}` });
    }

    matchingProject.projectPhases[title] = 'Completed';

    newProjectPool.updateProject(matchingProject.projectID, matchingProject); // replace existing

    console.log('Updated project:', matchingProject);
    console.log('Updated Project Pool:', newProjectPool.getAllProjects());
  
    const announceUpdate = JSON.stringify("Updated project:", matchingProject);
    
    // Push Updates to Stellar Testnet
    /*
    try{
        publishData.publishStellar(JSON.stringify(announceUpdate));
        res.json({ message: 'Project updated and published' });
    }catch(error){
        console.error("Error", error)
        res.status(500).json({ message: 'Publishing failed' });
    }
        */
});


//POST request to add a new event to the list
app.post('/api/newevent', async (req, res) => {
    const { type, event, user, payload, timestamp } = req.body;
    await insertNewEvent(type, event, user, JSON.stringify(payload), timestamp);
});

//POST request to get all events
/*
app.get('/api/events', async (req, res) => {
    const conn = await mysql.createConnection(dbconfig);
    
    try {
        const [rows] = await conn.execute("SELECT * FROM events ORDER BY timestamp DESC LIMIT 100");
        res.json(rows);
        //console.log(rows);
    } catch (err) {
        console.error("DB query failed:", err);
        res.status(500).send("DB query failed");
    }
        
});
*/

// POST request to record project decision
app.post('/api/project-decision', async (req, res) => {
    const { projectID, decision, apprvr } = req.body;

    try {
       
        const query =
            `UPDATE projects_table
            SET  approval = $2,
            approver = $3
            WHERE id = $1`;

        const values = [projectID, decision, apprvr];

        //await conn.query(query, values);
        await pool.query(query, values);

        //conn.release();     

        res.status(200).json({ message: 'Project Decision Updated' });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed' });
    }
});



// Listening on the right port
server.listen(PORT, () => {
    console.log(`Protius Server Listening on Localhost Port: ${PORT}`);
});

//require('./src/eventListener');