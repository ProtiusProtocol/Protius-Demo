
const { JsonRpcProvider, Contract } = require('ethers');
const axios = require("axios");

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


const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const RPC_URL = "http://localhost:8545"; 

const provider = new JsonRpcProvider(RPC_URL);
const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

contract.removeAllListeners("Staked");
contract.on("Staked", async (staker, amount) => {
    console.log(`Stake Event Detected: ${staker} staked ${amount.toString()}`);
    
    try {
       await axios.post('http://localhost:4000/api/newevent', {
            type: "contract",
            event: "Staked",
            user: staker,
            payload: { amount: amount.toString() },
            timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
    } catch (err) {
        console.error("Failed to send event:", err);
    }
});
