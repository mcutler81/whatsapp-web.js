const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client();

// Display QR code in terminal when prompted
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Notify when the client is ready
client.once('ready', () => {
    console.log('Client is ready!');
});

// Listen for messages
client.on('message_create', message => {
    if (message.body === '!ping') {
        // send back "pong" to the chat the message was sent in
        client.sendMessage(message.from, 'pong');
    }
});


// Start the client
client.initialize();
