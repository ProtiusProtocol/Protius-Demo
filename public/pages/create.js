
document.addEventListener('DOMContentLoaded', () =>{
    let projectNameHTML = document.getElementById('projName');
    let projectDeveloperHTML = document.getElementById('projDev');
    let createButton = document.getElementById('createProjectButton');
    let cancelButton = document.getElementById('cancelButton');

    // Capture null errors
    if (!projectNameHTML || !projectDeveloperHTML || !createButton || !cancelButton) {
        console.error("one or more elements not found!");
        return;
    }

    // Function to send user towards project creation
    function handleProjectCreation( newName, newDeveloper ){

        fetch('http://localhost:4000/api/createproject', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ newName, newDeveloper })
            })
        }
    
    // Event listener for the SUBMIT button on HTML page
    createButton.addEventListener('click', function () {
        handleProjectCreation( projectNameHTML.value, projectDeveloperHTML.value );
        alert('Data addedd successfully');
    });

    // Event listener for the CANCEL button on HTML page
    cancelButton.addEventListener('click', function () {
        console.log('Process cancelled!');
        alert('Process cancelled!');
        
    });

})