
document.addEventListener('DOMContentLoaded', () => {
    let stakeInput = document.getElementById('tokenInput');
    let submitButton = document.getElementById('submitStakeButton');
    let cancelButton = document.getElementById('cancelStakeButton');

    // Capture null errors
    if (!stakeInput || !submitButton || !cancelButton) {
        console.error("one or more elements not found!");
        return;
    }

    // Function to capture stake input and send to API
    function tokenStake ( tokens ) {
        console.log('First point of log',tokens)
        
        // Fetch data from HTML and send to transact API 
        fetch('https://ahtiso-dios-test-network-02d729532570.herokuapp.com/api/staketoken', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ tokens })
        })
    }


    // Event listener for the SUBMIT button on HTML page
    submitButton.addEventListener('click', function () {
        tokenStake( stakeInput.value );
        console.log('Second point of log', stakeInput.value );

    });


    // Event listener for the CANCEL button on HTML page
    cancelButton.addEventListener('click', function () {
        console.log('Transaction Canceled');
        alert('File uploaded successfully!');
        })


})