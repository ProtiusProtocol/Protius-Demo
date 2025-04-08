
document.addEventListener('DOMContentLoaded', () => {
let submitButton = document.getElementById('submitPhaseButton');
    let cancelButton = document.getElementById('cancelPhaseButton');
    let htmlInput = document.getElementById('fileInput');
    let title = document.getElementById('titleSelect');

    function sendData ( title, input ){

        fetch('http://localhost:4000/api/devphase', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify( {title, input} )
        })

    }


    // Event listener for the SUBMIT button on HTML page
    submitButton.addEventListener('click', function () {
        let inputTitle = title.value;
        let userInput = htmlInput.value;

        sendData( inputTitle, userInput );
        console.log(inputTitle, userInput );
        alert('Submitted');
    });


    // Event listener for the CANCEL button on HTML page
    cancelButton.addEventListener('click', function () {
        console.log('Process cancelled!');
        alert('Process cancelled!');
    });

});