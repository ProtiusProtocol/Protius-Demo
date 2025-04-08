const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');

// Generate a random keypair
const pair = StellarSdk.Keypair.random();
console.log("Public Key:", pair.publicKey());
console.log("Secret Key:", pair.secret());

// Request test XLM from Friendbot to fund the account
const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`;

fetch(friendbotUrl)
  .then(res => res.json())
  .then((response) => {
    console.log("Account successfully funded! Response:", response);
  })
  .catch(console.error);
