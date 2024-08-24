const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // Import the qrcode-terminal library

// Initialize the client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Runs in headless mode, so no browser window opens
    }
});

// Group chat ID to monitor
const groupChatId = 'JPDSdwssNxQIvgQgGozxTt@g.us';

client.on('qr', (qr) => {
    // Generate and display the QR code in the terminal
    qrcode.generate(qr, { small: true });
    console.log('Please scan the above QR code with your WhatsApp to authenticate.');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    // Only respond if the message is from the specific group
    if (msg.from === groupChatId) {
        console.log(`Message received in group ${groupChatId}: ${msg.body}`);

        // Respond to specific messages
        if (msg.body.toLowerCase() === 'hello') {
            msg.reply('Hello! How can I help you?');
        } else if (msg.body.toLowerCase() === 'ping') {
            msg.reply('pong');
        }
        // Add more conditions for other specific messages as needed
    }
});

// Start the client
client.initialize();
