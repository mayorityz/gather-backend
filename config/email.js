import dotenv from 'dotenv';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

dotenv.config();

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: API_KEY });

const sendMail = (sender_email, receiver_email, email_subject, email_body) => {
    const data = {
        "from": sender_email,
        "to": receiver_email,
        "subject": email_subject,
        "text": email_body
    };

    mg.messages.create(DOMAIN, data)
       .then(msg => console.log(msg))
       .catch(err => console.log(err));
};

export default sendMail;
