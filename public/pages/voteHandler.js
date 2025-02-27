let currentIndex = 0;

//alert("Link working");
const words = document.querySelectorAll('.word');

document.addEventListener('DOMContentLoaded', () => {
    let yesButton = document.getElementById('yesButton');
    let noButton = document.getElementById('noButton');
    let undecidedButton = document.getElementById('undecidedButton');

    function voteProcess( /*proposalNumber,*/ userVote ){
        let timeStamp = new Date().toLocaleString();
        console.log('User voted:', userVote, 'to Proposal');

        // For all Dapps, this fetch should connect to blockchain backend
        fetch('http://localhost:3000/vote', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ timeStamp, userVote })
        })
    }

    yesButton.addEventListener('click', function () {
        voteProcess('Yes');
    });
    
    noButton.addEventListener('click', function (){
        voteProcess('No');
    });
    
    undecidedButton.addEventListener('click', function (){
        voteProcess('Undecided');
    });
})







