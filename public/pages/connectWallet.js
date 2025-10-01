
function initializeWalletConnect() {
    const walletButton = document.getElementById('connectWalletButton');
    //const navMenu = document.querySelector('.nav-container');
    const disconnectButton = document.getElementById('disconnectWalletButton');

    /*
    if (!walletButton ){ //|| !navMenu) {
        console.error('Wallet or menu elements not found.');
        return;
    }
    */

    const walletDisplays = document.querySelectorAll('#walletAddress, .walletAddress');

    function updateWalletDisplays(text) {
        walletDisplays.forEach(el => el.innerText = text);
    }

    // Create disconnect button
    //let disconnectButton = document.getElementById('disconnectWalletButton');
    /*
    if (!disconnectButton) {
        disconnectButton = document.createElement('button');
        disconnectButton.id = 'disconnectWalletButton';
        disconnectButton.innerText = 'Disconnect';
        walletButton.parentElement.appendChild(disconnectButton);
    }
    */

    /*
    function toggleMenuVisibility(isConnected) {
        const menuItems = navMenu.querySelectorAll('li, .nav-container');
        menuItems.forEach(item => {
            item.style.display = isConnected ? 'block' : 'none';
        });
        walletButton.style.display = 'block';
        disconnectButton.style.display = isConnected ? 'block' : 'none';
    }
    */

    async function checkWalletConnection() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    const walletAddress = accounts[0];
                    updateWalletDisplays(`Connected: ${walletAddress}`)
                    localStorage.setItem('connectedWallet', walletAddress);
                    //toggleMenuVisibility(true);
                    return;
                }
            } catch (err) {
                console.error('Error checking wallet connection:', err);
            }
        }
        localStorage.removeItem('connectedWallet');
        updateWalletDisplays('Wallet Not Connected');
        //toggleMenuVisibility(false);
    }

    checkWalletConnection();

    walletButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const walletAddress = accounts[0];
                updateWalletDisplays(`Connected: ${walletAddress}`)
                localStorage.setItem('connectedWallet', walletAddress);
                //toggleMenuVisibility(true);
                alert("Web3 Wallet Connected");
            } catch (err) {
                console.error('Connection failed:', err);
                alert('Wallet connection failed.');
            }
        } else {
            alert('MetaMask or another Web3 wallet is not installed.');
        }
    });

    disconnectButton.addEventListener('click', () => {
        localStorage.removeItem('connectedWallet');
        updateWalletDisplays('Wallet Not Connected');
        //toggleMenuVisibility(false);
        alert("Wallet Disconnected");
    });

    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                localStorage.removeItem('connectedWallet');
                updateWalletDisplays('Wallet Not Connected');
                //toggleMenuVisibility(false);
            } else {
                const walletAddress = accounts[0];
                updateWalletDisplays(`Connected: ${walletAddress}`)
                localStorage.setItem('connectedWallet', walletAddress);
                //toggleMenuVisibility(true);
            }
        });
    }
}

window.initializeWalletConnect = initializeWalletConnect;

