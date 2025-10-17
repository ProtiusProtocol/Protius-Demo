document.addEventListener('DOMContentLoaded', () => {

    const projectOwner = localStorage.getItem('connectedWallet');

    // Fetch projects from the database 
    async function fetchProjects(walletAddress) {
      //const res = await fetch('http://localhost:4000/api/get-wallet-assigned-projects', {
      const res = await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/get-wallet-assigned-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress })
      });
      const data = await res.json();
      return data.projects || [];
    }

    // Update Page with Portfolio Details 
    function createPortfolio(project) {
        const portfolioItem = document.getElementById('users-portfolio-container');
        const container = document.createElement('div');
        container.className = "users-portfolio-element";
        container.innerHTML = `
            <div class="photo_card" style=width:30vw>
                <img src="../images/pexels-shottrotter-735468.jpg"> 
                <h3> ${project.project_name} </h3>
                <p> ID: ${project.id} </p>
                <p> Developer: ${project.developer} </p>
                <p> Finance Needs: ${project.finance} </p>
                <p> Developer Contribution: ${project.dev_contribution} </p>
                <p> Status: ${project.status} </p>
            </div>`;
        try{
            portfolioItem.appendChild(container);
        }catch (err){
            console.error(err)
        }
        
    };

    // Call the above functions
    async function init() {
        const projects = await fetchProjects(projectOwner);
        //console.log(['FRONTEND'], projects[0])
        const container = document.getElementById('portfolio-container');
        projects.forEach(p => {
            createPortfolio(p);
            //container.appendChild(createPortfolio(p));
            console.log(['TEST'], p)
        });
    }
    init();
})