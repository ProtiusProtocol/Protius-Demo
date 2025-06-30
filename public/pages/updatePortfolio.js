document.addEventListener('DOMContentLoaded', () => {

    const projectOwner = localStorage.getItem('connectedWallet');

    // Fetch projects from the database 
    async function fetchProjects(walletAddress) {
      const res = await fetch('http://localhost:4000/api/getProjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress })
      });
      const data = await res.json();
      return data.projects || [];
    }

    // Populate dropdown menu with projects
    async function createPortfolio(project) {
        const portfolioItem = document.getElementById('portfolio-container');
        const container = document.createElement('div');
        container.className = "portfolio-element";
        container.innerHTML = `
            <div class="photo_card">
                <img src="../images/pexels-shottrotter-735468.jpg"> 
                <h3> ${project.projectName} </h3>
                <p> ID: ${project.projectID} </p>
                <p> Developer: ${project.projectDeveloper} </p>
                <p> Status: ${project.projectStatus} </p>
                <p> Finance Needs: ${project.projectFinance} </p>
                <p> Developer Contribution: ${project.developerContribution} </p>
            </div>`;

        portfolioItem.appendChild(container);
    };

    // Call the above functions
    async function init() {
        const projects = await fetchProjects(projectOwner);
        const container = document.getElementById("portfolio-container");
        projects.forEach(p => {
            container.appendChild(createPortfolio(p));
        });
    }
    init();
})