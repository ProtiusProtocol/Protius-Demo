
function initializeWalletConnect() {
    const walletButton = document.getElementById('connectWalletButton');
    const walletDisplay = document.getElementById('walletAddress');

    if (!walletButton || !walletDisplay) {
        console.error('Wallet elements not found.');
        return;
    }

    walletButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const walletAddress = accounts[0];
                walletDisplay.innerText = `Connected: ${walletAddress}`;
                alert("Web3 Wallet Connected");
            } catch (err) {
                console.error('Connection failed:', err);
                alert('Wallet connection failed.');
            }
        } else {
            alert('MetaMask or another Web3 wallet is not installed.');
        }
    });
}

