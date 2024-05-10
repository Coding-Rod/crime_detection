const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');    

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
        console.log('QR code sent');
        axios.post(`${process.env.API_URL}/pepr/whatsapp/qr`, {
            qr: qr
        }).then((response: any) => {
            console.log(response.data.message);
        }).catch((error: any) => {
            console.log(error.response ? error.response.data : error);
        });
    }
});

whatsapp.on('ready', () => {
    console.log('Client is ready from Javascript');
    axios.post(`${process.env.API_URL}/pepr/whatsapp/ready`).then((response: any) => {
        console.log(response.data.message);
    }).catch((error: any) => {
        console.log(error.response ? error.response.data : error);
    });
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

    const media = message.hasMedia && message.downloadMedia ? await message.downloadMedia() : null;
    if (user_phone_number === null) return;

    await axios.post(`${process.env.API_URL}/pepr/chat/${extract_numbers(user_phone_number)}`, {
        message: message.body,
        media: media
    }).then((response: any) => {
        if (typeof response.data.message === 'string')
            send_message(user_phone_number, response.data.message);
        else if (typeof(response.data.message) === 'object') {
            send_message(user_phone_number, response.data.message);
    }}).catch((error: any) => {
        console.log(error.response ? error.response.data : undefined)
        send_message(user_phone_number, 'Hay un error en el servidor, por favor intente en unos minutos...');
    });
});

module.exports = { whatsappClient: whatsapp, send_message };
