const socket = new WebSocket('ws://localhost:5000'); // Connect to blockchain core

// Event: When WebSocket connection opens
socket.onopen = () => {
    console.log('Connected to Blockchain WebSocket server');

    // Example: Send a transaction request
    socket.send(JSON.stringify({
        type: 'transaction',
        payload: {
            senderWallet: 'User1',
            receiverWallet: 'User2',
            transactionAmount: 10
        }
    }));
};

// Event: When message is received from blockchain core
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Message from Blockchain:', data);
};

// Event: When WebSocket connection closes
socket.onclose = () => {
    console.log('WebSocket disconnected');
};

// Event: When an error occurs
socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
};
