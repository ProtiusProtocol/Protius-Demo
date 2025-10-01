
document.addEventListener('DOMContentLoaded', () => {
    let submitButton = document.getElementById('submitPhaseButton');
    let cancelButton = document.getElementById('cancelPhaseButton');
    let htmlInput = document.getElementById('fileInput');
    let title = document.getElementById('titleSelect');
    let projectName = document.getElementById('projectSelect');

    const projectOwner = localStorage.getItem('connectedWallet');
    
    // Fetch projects from the database 
    async function fetchProjects(walletAddress) {
      const res = await fetch('http://localhost:4000/api/get-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress })
      });
      const data = await res.json();
      //console.log('[API RESPONE]', data);
      //console.log('[API RESPONE2]', data.projects);

      return data.projects || [];
    }

    // Populate dropdown menu with projects
    function populateDropdown(prjcts) {
      const dropdown = document.getElementById('projectSelect');
      prjcts.forEach(project => {
        const opt = document.createElement('option');
        opt.value = project.id;
        opt.textContent = project.project_name;
        dropdown.appendChild(opt);
      });
    }

    // Call the above functions
    async function init() {
      try {
        const projects = await fetchProjects(projectOwner);
        console.log(['Fetch Project'], projects)
        populateDropdown(projects);
      } catch (err) {
        alert('Error loading projects: ' + err.message);
      }
    }
    init();

    //##########################################################################################################################


    // Send user selection to the API endpoint for updating project phases
    function sendData ( owner, pname, title ){

        fetch('http://localhost:4000/api/devphase', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ owner, pname, title })
        })

        /*
        fetch("http://localhost:4000/api/newevent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              type: "Frontend Event,",
              event: "Project Updated,",
              user: owner,
              payload: { pname, title },
              timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
              })
          });
          */
    }


    // Event listener for the SUBMIT button on HTML page
    submitButton.addEventListener('click', function () {
        const projectOwner = localStorage.getItem('connectedWallet');
        let inputName = projectName.value;
        let inputTitle = title.value;

        if ( !projectOwner || !inputName || !inputTitle) {
            alert("Please complete all fields.");
            return;
        }
        
        sendData( projectOwner, inputName, inputTitle );
        console.log(projectOwner, inputName, inputTitle );
        alert('Submitted');
        //location.reload();
    });


    // Event listener for the CANCEL button on HTML page
    cancelButton.addEventListener('click', function () {
        console.log('Process cancelled!');
        alert('Process cancelled!');
        location.reload();
    });

});

