
document.addEventListener('DOMContentLoaded', () =>{
    let projectNameHTML = document.getElementById('projName');
    let projectDeveloperHTML = document.getElementById('projDev');
    let projectFinanceHTML = document.getElementById('projFin');
    let devContributionHTML = document.getElementById('devFinanceInput');
    let createButton = document.getElementById('createProjectButton');
    let cancelButton = document.getElementById('cancelButton');

    // Capture null errors
    if (!projectNameHTML || !projectDeveloperHTML || !projectFinanceHTML || !devContributionHTML || !createButton || !cancelButton) {
        console.error("one or more elements not found!");
        return;
    }

    // Function to send user towards project creation
    function handleProjectCreation( owner, newName, newDeveloper, finance, devContribute ){

        //fetch('http://localhost:4000/api/create-project', {
        fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/create-project', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ owner, newName, newDeveloper, finance, devContribute })
            })

        /*
        fetch("http://localhost:4000/api/newevent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "Frontend Event,",
                event: "Project Created,",
                user: owner,
                payload: { newName, newDeveloper, finance },
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
                })
            });
            */
        
    };
        

    // Event listener for the SUBMIT button on HTML page
    createButton.addEventListener('click', function () {
        const projectOwner = localStorage.getItem('connectedWallet');

        if ( !projectOwner ) {
            console.error("Project Owner not found, connect a wallet!");
            return;
        }

        handleProjectCreation( 
            projectOwner, 
            projectNameHTML.value, 
            projectDeveloperHTML.value,
            projectFinanceHTML.value, 
            devContributionHTML.value
        );
        location.reload();

    });

    
    // Event listener for the CANCEL button on HTML page
    cancelButton.addEventListener('click', function () {
        console.log('Process cancelled!');
        alert('Process cancelled!');
        location.reload();
    });

})