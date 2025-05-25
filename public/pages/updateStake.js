
document.addEventListener('DOMContentLoaded', async () => {
    const stakeInput = document.getElementById('tokenInput');
    const submitButton = document.getElementById('submitStakeButton');
    const cancelButton = document.getElementById('cancelStakeButton');

    // Details of deployed contract
    const CONTRACT_ADDRESS = "tobeupdated";
    const USDC_ADDRESS = "tobeupdated"; 
    const CONTRACT_ABI = [
        //to be updated
    ];

    const ERC20_ABI = [
        //to be updated
    ];

    // Connect to MetaMask
    let provider, signer, contract, usdc;
    async function connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            alert("MetaMask is required");  //Or other wallet provided
            return;
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
    }

    async function stakeTokens() {
        try {
            await connectWallet();

            const rawAmount = stakeInput.value;
            if (!rawAmount || isNaN(rawAmount)) {
                alert("Enter a valid number of tokens");
                return;
            }

            const decimals = await usdc.decimals();
            const amount = ethers.parseUnits(rawAmount, decimals);

            // Approve the staking contract to spend user's USDC
            const allowance = await usdc.allowance(await signer.getAddress(), CONTRACT_ADDRESS);
            if (allowance < amount) {
                console.log("Approving USDC...");
                const approveTx = await usdc.approve(CONTRACT_ADDRESS, amount);
                await approveTx.wait();
            }

            // Call the stake function
            console.log("Staking tokens...");
            const tx = await contract.stake(amount);
            await tx.wait();

            alert("Stake successful!");
            location.reload();

        } catch (err) {
            console.error(err);
            alert("Transaction failed or cancelled.");
        }
    }

    submitButton.addEventListener('click', stakeTokens);

    cancelButton.addEventListener('click', () => {
        console.log("Staking cancelled");
        alert("Process cancelled!");
        location.reload();
    });
});
