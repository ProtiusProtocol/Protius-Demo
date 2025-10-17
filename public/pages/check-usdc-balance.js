
document.addEventListener('DOMContentLoaded', async () => {
    const balanceDiv = document.getElementById('usdc-balance-info');
    const checkBalance = document.getElementById('request-usdc-balance');

    //Notify if no wallet is connected
    if (!window.ethereum){
        balanceDiv.textContent = "No Wallet Detected.";
        return
    }

    async function getWallet() {
      if (!window.ethereum) throw new Error("No wallet detected");

      const [walletAddress] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      return { walletAddress, signer };
    }

    async function showBalance() {
      try {
        const { walletAddress } = await getWallet();
        //const res = await fetch(`http://localhost:4000/api/balance/${walletAddress}`);
        const res = await fetch(`https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/balance/${walletAddress}`);
        const data = await res.json();
        balanceDiv.textContent = `USDC Balance: ${data.balance}`;
      } catch (err) {
        console.error(err);
        balanceDiv.textContent = "Error fetching balance";
      }
    }

    checkBalance.addEventListener('click', () => {
      showBalance();
    });

});

