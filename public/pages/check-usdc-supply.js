document.addEventListener('DOMContentLoaded', async () => {
    const networkDiv = document.getElementById('connected-network');
    const checkBalance = document.getElementById('request-network-info');

    async function checkUSDCSupply(){
      //const res = await fetch('http://localhost:4000/api/check-usdc-supply');
      const res = await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/check-usdc-supply');

      const data = await res.json();
      console.log(data)
      return data.networkCon;
    }

    checkBalance.addEventListener('click', async () => {
      
      const info = await checkUSDCSupply();
      //networkDiv.textContent = `Network: ${info}`;
      console.log('USDC Supply:', info)

    })

    
});