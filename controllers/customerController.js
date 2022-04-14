import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Customer from '../models/customer.js';

// to send emails
import sendMail from '../config/email.js';

dotenv.config({ path: "./config.env" });

// create customer
export const signupCustomer = async (req, res) => {
    const { name, email, phone_number, state, lga, password, confirmPassword } = req.body;

    const sender_email = 'Seun <taiwoluwaseun8@gmail.com>';
    const receiver_email = email;
    const email_subject = 'Blockchain Lab got You';
    const email_body = 'Welcome to Blockchain Lab';

    sendMail(sender_email, receiver_email, email_subject, email_body);

    try {
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) return res.status(400).json({ message: "Customer already exists." });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newCustomer = await Customer.create({ name, email, phone_number, state, lga, password: hashedPassword });

        res.status(200).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

// login customer
export const signinCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ email });

        if (!existingCustomer) return res.status(404).json({ message: "Customer doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingCustomer.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign(
            { _id: existingCustomer._id, email: existingCustomer.email }, 
            process.env.TOKEN_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({ existingCustomer, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}
