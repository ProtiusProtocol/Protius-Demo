
document.addEventListener('DOMContentLoaded', () =>{
    let projectNameHTML = document.getElementById('projName');
    let projectLocationHTML = document.getElementById('projLoc');
    let projectDistanceHTML = document.getElementById('projDis');
    let projectCapacityHTML = document.getElementById('projCap');
    let projectLandOwnershipHTML = document.getElementById('projLand1');
    let projectLandZoningHTML = document.getElementById('projLand2');
    let projectDebtEquityHTML = document.getElementById('projDER');
    let projectEquityHTML = document.getElementById('projEq');
    let projectCODHTML = document.getElementById('projCod');
    let projectOEHTML = document.getElementById('projOE');
    let projectDeveloperHTML = document.getElementById('projDev');
    let projectFinanceHTML = document.getElementById('projFin');
    let devContributionHTML = document.getElementById('devFinanceInput');
    let createButton = document.getElementById('createProjectButton');
    let cancelButton = document.getElementById('cancelButton');


    // Capture null errors
    if (
        !projectNameHTML ||
        !projectDeveloperHTML ||
        !projectFinanceHTML ||
        !devContributionHTML ||
        !projectLocationHTML ||
        !projectDistanceHTML ||
        !projectCapacityHTML ||
        !projectLandOwnershipHTML ||
        !projectLandZoningHTML ||
        !projectDebtEquityHTML ||
        !projectEquityHTML ||
        !projectCODHTML ||
        !projectOEHTML ||
        !createButton ||
        !cancelButton
    ) {
        console.error("One or more elements not found!");
        return;
    }

        // Function to send user towards project creation
        function handleProjectCreation(
            owner,
            newName,
            newDeveloper,
            finance,
            devContribute,
            location,
            distance,
            capacity,
            landOwnership,
            landZoning,
            debtEquity,
            equity,
            cod,
            oeContracted
        ) {
            fetch('https://protius-demo-v1-3ec4758d01ce.herokuapp.com/api/create-project', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    owner,
                    newName,
                    newDeveloper,
                    finance,
                    devContribute,
                    location,
                    distance,
                    capacity,
                    landOwnership,
                    landZoning,
                    debtEquity,
                    equity,
                    cod,
                    oeContracted
                })
            });
        }

    // Event listener for the SUBMIT button on HTML page
    createButton.addEventListener('click', function () {
        const projectOwner = localStorage.getItem('connectedWallet');

        if (!projectOwner) {
            console.error("Project Owner not found, connect a wallet!");
            return;
        }

        handleProjectCreation(
            projectOwner,
            projectNameHTML.value,
            projectDeveloperHTML.value,
            projectFinanceHTML.value,
            devContributionHTML.value,
            projectLocationHTML.value,
            projectDistanceHTML.value,
            projectCapacityHTML.value,
            projectLandOwnershipHTML.value,
            projectLandZoningHTML.value,
            projectDebtEquityHTML.value,
            projectEquityHTML.value,
            projectCODHTML.value,
            projectOEHTML.value
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