import dotenv from 'dotenv';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

dotenv.config({ path: "../config.env" });

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const MAILING_LIST_DOMAIN = process.env.MAILING_LIST_DOMAIN;
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });

const createMailingList = async () => {
    try {
        const newList = await client.lists.create({
            address: `wegatherdey@${DOMAIN}`,
            name: "wegatherdey",
            description: "list of subscribers"
        });
        console.log('newList', newList);
    } catch (error) {
        console.error(error);        
    }
};

// createMailingList();

export const addMember = async (email) => {
    try {
        const data = {
            address: email,
            subscribed: 'yes'
        };
    
        const newMember = await client.lists.members.createMember(MAILING_LIST_DOMAIN, data);
        
        console.log('newMember', newMember);
    } catch (error) {
        console.error(error);
    }
};
