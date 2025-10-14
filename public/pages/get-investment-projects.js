
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('projects-to-invest');


  let selectedId = null;

  async function fetchProjects() {
    const res = await fetch('http://localhost:4000/api/get-approved-projects');
    //const res = await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/get-all-projects');
    const data = await res.json();
    return data.projects || [];
  }


  function populateDropdown(projects) {
    dropdown.innerHTML = '<option value="">Select a project</option>';
    projects.forEach(project => {
      const opt = document.createElement('option');
      opt.value = project.id;
      opt.textContent = project.project_name;
      dropdown.appendChild(opt);
    });
  }

  function displayProjectDetails(projects, selectedId) {
        const project = projects.find(p => p.id == selectedId);

        const portfolioItem = document.getElementById('approved-project-details');
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

  async function init() {
        const projects = await fetchProjects();
        populateDropdown(projects);
        if (selectedId) {
            displayProjectDetails(projects, selectedId);
        }

        dropdown.addEventListener('change', (e) => {
            selectedId = e.target.value;
            if (selectedId) {
            displayProjectDetails(projects, selectedId);
            }
        });
    }

  init();

});

