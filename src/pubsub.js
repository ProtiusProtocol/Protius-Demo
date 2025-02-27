const PubNub = require ('pubnub');

// Set the credentials and pubnub keys based on project in pubnub
const credentials = {
    publishKey: 'pub-c-cc5440a1-b25e-47bf-9298-a422c225af89',
    subscribeKey: 'sub-c-7e7b371f-5c6a-43b7-9769-c3b7293ba817',
    secretKey: 'sec-c-Y2YzZWZhNGMtZGMwOC00MDE3LWFkNTQtYWQ5YmQ4ODViNzVi',
    userId: 'user-12345'        //update with actual implementation
};

// Set the channels for the blockchain to listen on
const CHANNELS = {
    DAO: 'DAO'
}

// PubSub class that contains the logic of how messages are sent and received on the blockchainb
class PubSub {
    constructor({ }){
        this.pubnub = new PubNub(credentials);
        this.listener();
        this.subscribeToChannels();
        }
        

    // Subcribe to channels
    subscribeToChannels(){
        Object.values(CHANNELS).forEach(channel => {
            this.pubnub.subscribe({ channels: [channel] });
        });
    } 

    
    // Listens for messages on the set channels and if there is a new chain, updates the chain
    listener(){
        this.pubnub.addListener({
            message: (messageObject) => {
                const {channel, message} = messageObject;
                console.log(`PubSub received message on channel ${channel}:`, message);
                
                if (channel === CHANNELS.DAO) {
                    const daoVote = json.parse(message);
                    console.log('Vote message:', daoVote);
                }
            }
        })
    }    


    // Publish a message to a channel
    publish({ channel, message }) {
        const messages = Array.isArray(message) ? message : [message];

        messages.forEach(msg => {
            this.pubnub.publish(
                {
                    channel: channel,
                    message: msg
                },
                (status, response) => {
                    if (status.error) {
                        console.log("Publish failed:", status);
                    } else {
                        console.log("Message published successfully:", response);
                    }
            })
        })
    };
    

}


module.exports = PubSub;
