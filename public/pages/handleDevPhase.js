
document.addEventListener('DOMContentLoaded', () => {
    let submitButton = document.getElementById('submitPhaseButton');
    let cancelButton = document.getElementById('cancelPhaseButton');
    let htmlInput = document.getElementById('fileInput');
    let title = document.getElementById('titleSelect');
    let projectName = document.getElementById('devphaseProjectName');

    function sendData ( pname, title ){

        fetch('http://localhost:4000/api/devphase', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ pname, title })
        })
    }


    // Event listener for the SUBMIT button on HTML page
    submitButton.addEventListener('click', function () {
        let inputName = projectName.value;
        let inputTitle = title.value;

        if (!inputName || !inputTitle) {
            alert("Please complete all fields.");
            return;
        }
        
        sendData( inputName, inputTitle );
        console.log(inputName, inputTitle );
        alert('Submitted');
        location.reload();
    });


    // Event listener for the CANCEL button on HTML page
    cancelButton.addEventListener('click', function () {
        console.log('Process cancelled!');
        alert('Process cancelled!');
        location.reload();
    });

});