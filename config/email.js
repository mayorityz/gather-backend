import dotenv from 'dotenv';
import mailgun from 'mailgun-js';

dotenv.config({ path: "./config.env" });

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mg = mailgun ({ apiKey: API_KEY, domain: DOMAIN });

const sendMail = async (sender_email, receiver_email, email_subject, email_body) => {
    const data = {
        "from": sender_email,
        "to": receiver_email,
        "subject": email_subject,
        "text": email_body
    };

    await mg.messages().send(data, (error, body) => {
        if (error) console.log(error)
        else console.log(body);
    });
};

export default sendMail;
