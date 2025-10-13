
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('projectToInvest');
  const container = document.getElementById('projectDetails');
  const approveHTML = document.getElementById('approveProject');
  const rejectHTML = document.getElementById('rejectProject');

  let selectedId = null;

  async function fetchProjects() {
    //const res = await fetch('http://localhost:4000/api/get-all-projects');
    const res = await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/get-all-projects');
    const data = await res.json();
    return data.projects || [];
  }

  async function fetchPhases(projectID) {
    //const res = await fetch(`http://localhost:4000/api/getallphases?projectID=${encodeURIComponent(projectID)}`);
    const res = await fetch(`https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/getallphases?projectID=${encodeURIComponent(projectID)}`);
    const data = await res.json();
    return data.phases || [];
  }

  async function protiusReview ( projectID, decision ) {

    //await fetch('http://localhost:4000/api/projectdecision', {
    await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/projectdecision', {
        method: 'POST',
        headers: {'content-Type' : 'application/json'},
        body: JSON.stringify({ projectID, decision })
    });

    //await fetch("http://localhost:4000/api/newevent", {
    await fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/newevent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: "Frontend Event,",
            event: "Protius Project Decision,",
            user: "Protius Guardians",
            payload: { projectID, decision },
            timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
            })
        });
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

  function displayProjectDetails(project, phases) {
    container.innerHTML = `
      <div class="projectInfo">
        <h4>${project.project_name}</h4>
        <p><strong>ID:</strong> ${project.id}</p>
        <p><strong>Developer:</strong> ${project.developer}</p>
        <p><strong>Status:</strong> ${project.status}</p>
        <p><strong>Financing Target:</strong> ${project.finance}</p>
        <h4>Project Phases:</h4>
        ${phases.map((phase, idx) => `
          <div class="phase-block">
            <h5>Phase ${idx + 1}</h5>
            ${Object.entries(phase).map(([key, val]) => `<p>${key}: ${val ?? ''}</p>`).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }

  async function init() {
        const projects = await fetchProjects();
        populateDropdown(projects);

        dropdown.addEventListener('change', async (e) => {
        selectedId = e.target.value;
        const project = projects.find(p => p.id === selectedId);
            if (project) {
                try {
                    const phases = await fetchPhases(project.id);
                    //console.log('Phases fetched:', phases);
                    displayProjectDetails(project, phases);
                } catch (err) {
                    console.error('Error fetching phases:', err);
                }
            }
        });
    }

  init();

    approveHTML.addEventListener('click', function () {
        if (selectedId) {
            console.log("approved");
            protiusReview(selectedId, "approved")
        } else {
            console.warn("No project selected");
        }
        
    })

    rejectHTML.addEventListener('click', function () {
        if (selectedId) {
            console.log("rejected");
            protiusReview(selectedId, "rejected")
        } else {
            console.warn("No project selected");
        }
    })

});

