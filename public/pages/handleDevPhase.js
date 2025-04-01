
document.addEventListener('DOMContentLoaded', () => {
    let landTenure = document.getElementById('LandTenure');
    let servitueLeeway = document.getElementById('ServitudeLeeway');
    let resourceStudy = document.getElementById('ResourceStudy');
    let gridConnection = document.getElementById('GridConnection');
    let gridConnectionAgreement = document.getElementById('GridConnectionAgreement');
    let environmentalReview = document.getElementById('EnvironmentalReview');
    let publicParticipation = document.getElementById('PublicParticipation');
    let permits = document.getElementById('Permits');
    let powerPurchaseAgreemnet = document.getElementById('PowerPurchaseAgreemnet');
    let plantDesign = document.getElementById('PlantDesign');
    let ePC = document.getElementById('EPC');
    let debtProvider = document.getElementById('DebtProvider');
    let equityProvider = document.getElementById('EquityProvider');
    let financialModel = document.getElementById('FinancialModel');
    let financialModelAudit = document.getElementById('FinancialModelAudit');
    let equipmentSupplier = document.getElementById('EquipmentSupplier');
    let roadsLogisticsPlan = document.getElementById('RoadsLogisticsPlan');
    let taxPlan = document.getElementById('TaxPlan');
    let stakeholders = document.getElementById('Stakeholders');
    let communityEngagementPlan = document.getElementById('CommunityEngagementPlan');
    let accDevelopmentSpendOnBudget = document.getElementById('AccDevelopmentSpendOnBudget');
    let submitButton = document.getElementById('submitPhaseButton');
    let cancelButton = document.getElementById('cancelPhaseButton');
    let htmlInput = document.getElementById('fileInput');
    let title = document.getElementById('titleSelect');

    function sendData ({ title, input }){

        fetch('http://localhost:4000/api/devphase', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ title, input })
        })

    }


    // Event listener for the SUBMIT button on HTML page
    submitButton.addEventListener('click', function () {
        let inputTitle = title.value;
        let userInput = htmlInput.value;

        sendData( inputTitle, userInput );
        console.log('LandTenure', userInput );
        alert('Submitted');

    });


    // Event listener for the CANCEL button on HTML page
    cancelButton.addEventListener('click', function () {
        console.log('Process cancelled!');
        alert('Process cancelled!');
        
    });

});