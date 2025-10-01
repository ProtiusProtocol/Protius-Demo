
document.addEventListener('DOMContentLoaded', () => {
    
    // Fetch projects from the database 
    async function fetchProjects() {
      const res = await fetch('http://localhost:4000/api/get-all-projects', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      return data.projects || [];
    }

    // Populate dropdown menu with projects
    async function populateDropdown(prjcts) {
      const dropdown = document.getElementById('projectToInvest');
      prjcts.forEach(project => {
        const opt = document.createElement('option');
        opt.value = project.id;
        opt.textContent = project.project_name;
        dropdown.appendChild(opt);
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
        portfolioItem.appendChild(container);
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