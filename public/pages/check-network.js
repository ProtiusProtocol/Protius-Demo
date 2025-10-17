document.addEventListener('DOMContentLoaded', async () => {
    const networkDiv = document.getElementById('connected-network');
    const checkBalance = document.getElementById('request-network-info');

    //Notify if no wallet is connected
    if (!window.ethereum){
        balanceDiv.textContent = "No Wallet Detected.";
        return
    }

    async function checkNetwork(){
      const res = await fetch('http://localhost:4000/api/check-network');
      //const res = await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/createproject', {

      const data = await res.json();
      console.log(data)
      return data.networkCon;
    }

    checkBalance.addEventListener('click', async () => {
      console.log('Button clicked')
      const info = await checkNetwork();
      networkDiv.textContent = `Network: ${info}`;
    })
});