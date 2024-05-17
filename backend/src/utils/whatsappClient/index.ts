const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');    
const fs = require('fs');

interface Message {
    body: string;
    from: string;
    text: string;
    media?: string;
    hasMedia?: boolean;
    downloadMedia?: () => Promise<string>;
}

interface Configuration {
    production: {
        puppeteer: {
            headless: boolean;
            args: string[];
            authStrategy: any;
        };
    };
    development: {
        authStrategy: any;
    };
}

const configuration: Configuration = {
    production: {
        puppeteer: {
            headless: true,
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
            ],
            authStrategy: new LocalAuth(),
          },
    },
    development: {
        authStrategy: new LocalAuth()
    }
}

const whatsapp = new Client(configuration[(process.env.ENVIRONMENT || 'production') as keyof Configuration]);

whatsapp.on('qr', (qr: any) => {
    if (process.env.ENVIRONMENT === 'development') {
        const qrcode = require('qrcode-terminal');
        qrcode.generate(qr, {small: true});
    } else {
        process.env.QR_CODE = qr;
        console.log('QR Code generated');
    }
});

whatsapp.on('ready', () => {
    console.log('Client is ready from Javascript');
});

const extract_numbers = (phone_number: string) => {
    return phone_number.replace(/[^0-9]/g, '');
}

const send_message = (phone_number: string, message: Message | string) => {
    if (message && phone_number.length < 21) { // 21 is the max length of a phone number in whatsapp else will be a WhatsApp Group
        if (typeof message === 'string'){
            whatsapp.sendMessage(phone_number, message).then(() => {
                console.log(`Mensaje enviado a ${extract_numbers(phone_number)}`);
            }).catch((error: any) => {
                console.error(`Error al enviar el mensaje a ${extract_numbers(phone_number)}: ${error}`);
            });
        }
        else if (message.media) {
            const media = new MessageMedia('image/png', message.media, { caption: message.text });
            whatsapp.sendMessage(phone_number, media).then(() => {
                console.log(`Mensaje enviado a ${extract_numbers(phone_number)}`);
            }).catch((error: any) => {
                console.error(`Error al enviar el mensaje a ${extract_numbers(phone_number)}: ${error}`);
            });
        } else {
            whatsapp.sendMessage(phone_number, message.text).then(() => {
                console.log(`Mensaje enviado a ${extract_numbers(phone_number)}`);
            }).catch((error: any) => {
                console.error(`Error al enviar el mensaje a ${extract_numbers(phone_number)}: ${error}`);
            });
        }
    }
}


whatsapp.on('message', async (message: Message) => {
    const user_phone_number = message.from;
    if (message.from === 'status@broadcast') return;

    if (message.body.toUpperCase() === 'WORKING?') {
        send_message(user_phone_number, 'Yes, I am working!');
        return;
    }
});

module.exports = { whatsappClient: whatsapp, send_message };
