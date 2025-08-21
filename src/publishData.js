const StellarSdk = require('stellar-sdk');

// Public and Secret Keys only for test purposes
const publicKey = 'GDDRUPVK73LQXFBADDSNFUUQENROMZLJXBKHLXJRON357SPGJUDQV4YN'; // Only for testing, a different implementation will be used for production
const secretKey = 'SCIRH5WOAANW7WMCHPBN6N4A3UZITJPD3WG62SD77DONLY274VLX7TJU'; // Only for testing, a different implementation will be used for production

function publishStellar(dataValue){
    // Initializing the keypair
    const pair = StellarSdk.Keypair.fromSecret(secretKey);

    // Server instance for Stellar Testnet
    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

    // data and key to publish
    const dataKey = 'message';  

    server.loadAccount(publicKey)
    .then(account => {

        const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE, 
        networkPassphrase: StellarSdk.Networks.TESTNET 
        })
        .addOperation(StellarSdk.Operation.manageData({
            name: dataKey,  
            value: dataValue 
        }))
        .setTimeout(100) 
        .build();  

        transaction.sign(pair);

        return server.submitTransaction(transaction);
        })
        .then(result => {
            console.log("Transaction successful!", result._links.transaction.href);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}


//module.exports = {publishStellar};