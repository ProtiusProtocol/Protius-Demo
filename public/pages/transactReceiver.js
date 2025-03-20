//const { json } = require("body-parser");

document.addEventListener('DOMContentLoaded', () => {
    
    let sendWallet = document.getElementById('senderWalletID');
    let receiveWallet = document.getElementById('receiverWalletID');
    let txnAmount = document.getElementById('transactionAmountID');
    let submitButton = document.getElementById('submitTxnButton');
    let cancelButton = document.getElementById('cancelTxnButton');

    // Capture null errors
    if (!sendWallet || !receiveWallet || !txnAmount || !submitButton || !cancelButton) {
        console.error("one or more elements not found!");
        return;
    }

    // Function to receive the transaction data and send to the transact API 
    function financialTransaction( senderWallet, receiverWallet, transactionAmount ) {

        console.log('Financial Transaction Handler Working');
        
        // Fetch data from HTML and send to transact API 
        fetch('https://ahtiso-dios-test-network-02d729532570.herokuapp.com/transact', {
        //fetch('http://localhost:3000/api/transaction', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ senderWallet, receiverWallet, transactionAmount })
        })
    }

    // Event listener for the SUBMIT button on HTML page
    submitButton.addEventListener('click', function () {
        financialTransaction( sendWallet.value, receiveWallet.value, txnAmount.value );

    });

    // Event listener for the CANCEL button on HTML page
    cancelButton.addEventListener('click', function () {
        console.log('Transaction Canceled');
        alert('Transaction Canceled!');
    })

})