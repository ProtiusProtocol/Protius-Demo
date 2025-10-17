/*
document.addEventListener('DOMContentLoaded', () => {
    
    // Fetch projects from the database 
    async function fetchProjects() {
      const res = await fetch('http://localhost:4000/api/get-all-projects', {
      //const res = await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/get-all-projects', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      return data.projects || [];
    }

    // Populate dropdown menu with projects
    async function populateDropdown(prjcts) {
      const dropdown = document.getElementById('projects-to-invest');
      prjcts.forEach(project => {
        const opt = document.createElement('option');
        opt.value = project.id;
        opt.textContent = project.project_name;

        try{
            dropdown.appendChild(opt);
        }catch (err){
            console.error(err)
        }
        
      });
    }

    function displayProjectDetails(projects, selectedId) {
        const project = projects.find(p => p.id == selectedId);

        const portfolioItem = document.getElementById('project-container');
        portfolioItem.innerHTML = '';
        const container = document.createElement('div');
        container.className = "portfolio-element";
        container.innerHTML = `
            <div class="photo_card">
                <img src="../images/pexels-shottrotter-735468.jpg"> 
                <h4> ${project.project_name} </h4>
                <p> <strong> ID: </strong> ${project.id} </p>
                <p> <strong> Developer: </strong> ${project.developer} </p>
                <p> <strong> Status: </strong> ${project.status} </p>
                <p><strong>Financing Target:</strong> ${project.finance}</p>
                <p><strong>Developer Contribution:</strong> ${project.dev_contribution}</p>
            </div>`;
        //portfolioItem.appendChild(container);
        try{
            portfolioItem.appendChild(container);
        }catch (err){
            console.error(err)
        }
    }

    // Call the above functions
    async function init() {
      try {
        const projects = await fetchProjects();
        await populateDropdown(projects);

        const dropdown = document.getElementById('projectToInvest');
        dropdown.addEventListener('change', (e) => {
            displayProjectDetails(projects, e.target.value);
        });
      } catch (err) {
        alert('Error loading projects: ' + err.message);
      }
    }
    init();
});
*/
//alert('test')
//import { ethers } from "ethers";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/dist/ethers.min.js";

document.addEventListener('DOMContentLoaded', () => {
  const waitMessage = document.getElementById('please-wait-messsage');
  const stakeInput = document.getElementById('tokenInput');
  const submitButton = document.getElementById('submit-stake-button');
  const cancelButton = document.getElementById('cancelStakeButton');

  const CONTRACT_ADDRESS = "0x24D82d4A281e01D4D82b0a2Ca7005169F733b47f";
  const USDC_ADDRESS = "0x14D8a1F039161bEd7FeEefE5a87527Cc23634BfA"; 

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

  let signer;
  let walletAddress;

  async function connectWallet() {
    if (!window.ethereum) throw new Error("No wallet detected");

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    walletAddress = accounts[0];

    const provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    return { walletAddress, signer };
  }

  // Approve USDC if needed
  async function approveUSDC(amount) {
    const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
    const decimals = await usdc.decimals();
    const amountParsed = ethers.parseUnits(amount, decimals);

    const allowance = await usdc.allowance(walletAddress, CONTRACT_ADDRESS);
    if (allowance < amountParsed) {
      const txApprove = await usdc.approve(CONTRACT_ADDRESS, amountParsed);
      await txApprove.wait();
    }
  }

  // Main staking flow
  async function stakeTokens(rawValue) {
    try {
      await connectWallet();

      if (!rawValue || isNaN(rawValue)) {
        alert("Enter a valid number of tokens");
        return;
      }

      // 1. Ask backend to prepare the staking transaction
      //const res = await fetch('http://localhost:4000/api/prepare-stake', {
      const res = await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/prepare-stake', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: walletAddress, amount: rawValue })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      // 2. Approve USDC if needed
      if (!data.allowanceOk) {
        await approveUSDC(rawValue);
      }

      // 3. Build transaction from backend-provided data
      const tx = {
        to: data.to,
        data: data.txData,
        value: 0
      };

      // 4. Sign & send
      const txResponse = await signer.sendTransaction(tx);
      await txResponse.wait();

      alert("Stake successful!");
      location.reload();

    } catch (err) {
      console.error(err);
      alert(err.message || "Transaction failed");
    }
  }

  submitButton.addEventListener("click", () => {
    console.log('Button clicked on stake')
    waitMessage.textContent = 'Please wait while your stake is processed. You will receive prompts from your wallet.'
    stakeTokens(stakeInput.value)
    
  });


  cancelButton.addEventListener("click", () => {
    alert("Process cancelled!");
    location.reload();
  });

});
