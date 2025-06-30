
document.addEventListener('DOMContentLoaded', () => {
    let projectNameInput = document.getElementById('projName');
    let developerNameInput = document.getElementById('projDev');
    let submitButton = document.getElementById('createProjectButton');
    let cancelButton = document.getElementById('cancelButton');

    if ( !projectNameInput || !developerNameInput || !submitButton || !cancelButton) {
        console.error("one or more elements not found!");
        return;
    };

    // Function to updated specified contract template and download for audit
    async function updateAndDownloadContract(projName, devName) {
        const response = await fetch('/smartcontracts/newproject.sol');       

        let contractSource = await response.text();

        // Updating template with required information
        contractSource = contractSource.replace(/_NAMEPLACEHOLDER_/g, `"${projName}"`);
        contractSource = contractSource.replace(/_DEVNAME_/g, `"${devName}"`);

        // Create and trigger download
        const blob = new Blob([contractSource], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'NewProjectContract_Custom.sol';
        a.click();
        //URL.revokeObjectURL(url)        
    };

    
    submitButton.addEventListener('click', async () => {
        const projName = projectNameInput.value.trim();
        const devName = developerNameInput.value.trim();

        if (!projName || !devName) {
            alert('Please fill in a project name and/or developer name');
            return;
        }

        await updateAndDownloadContract(projName, devName);
        alert('Project created!');
    });


    cancelButton.addEventListener('click', function () {
        console.log('Transaction Canceled');
        alert('Process cancelled!');
    });
});

