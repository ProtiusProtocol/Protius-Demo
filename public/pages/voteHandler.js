let currentIndex = 0;

//alert("Link working");
const words = document.querySelectorAll('.word');

document.addEventListener('DOMContentLoaded', () => {
    let yesButton = document.getElementById('yesButton');
    let noButton = document.getElementById('noButton');
    let undecidedButton = document.getElementById('undecidedButton');

    function voteProcess( userVote ){
        console.log('User voted:', userVote, 'to Proposal');

        // For all Dapps, this fetch should connect to blockchain backend
        //fetch('https://ahtiso-dios-test-network-02d729532570.herokuapp.com/api/vote', {
        fetch('http://localhost:4000/api/vote', {
                method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ userVote })
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







