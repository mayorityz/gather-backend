import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Artisan from '../models/artisan.js';

// to send emails
import sendMail from '../config/email.js';

dotenv.config();

// create artisan
export const signupArtisan = async (req, res) => {
    const { 
        name, email, phone_number, profession, company_name, company_website, state, lga, password, confirmPassword
    } = req.body;

    const sender_email = 'Seun <taiwoluwaseun8@gmail.com>';
    const receiver_email = email;
    const email_subject = 'Blockchain Lab got You';
    const email_body = 'Welcome to Blockchain Lab';

    sendMail(sender_email, receiver_email, email_subject, email_body);

    try {
        const existingArtisan = await Artisan.findOne({ email });

        if (existingArtisan) return res.status(400).json({ message: "Artisan already exists." });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newArtisan = await Artisan.create({
            name,
            email,
            phone_number,
            profession,
            company_name,
            company_website,
            state,
            lga,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: newArtisan._id, profession: newArtisan.profession }, 
            process.env.TOKEN_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({ newArtisan, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

// login artisan
export const signinArtisan = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingArtisan = await Artisan.findOne({ email });

        if (!existingArtisan) return res.status(404).json({ message: "Artisan doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingArtisan.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign(
            { id: existingArtisan._id, profession: existingArtisan.profession }, 
            process.env.TOKEN_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({ existingArtisan, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

// find artisan by state or lga
export const getArtisansBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const state = new RegExp(searchQuery, 'i');
        const lga = new RegExp(searchQuery, 'i');

        const searchedArtisans = await Artisan.find({ $or: [ { state }, { lga } ] });

        res.json({ data: searchedArtisans });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// find artisan
export const getArtisan = async (req, res) => {
    const { id } = req.params;

    try {
        const artisan = await Artisan.findById(id);

        res.status(200).json(artisan);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// update artisan
export const updateArtisan = async (req, res) => {
    const { id } = req.params;
    const artisan = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No artisan with that id');

    const updatedArtisan = await Artisan.findByIdAndUpdate(id, { ...artisan, id }, { new: true });

    res.json(updatedArtisan);
}

export const customerReview = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const artisan = await Artisan.findById(id);

    artisan.customer_reviews.push(value);

    const updatedArtisan = await Artisan.findByIdAndUpdate(id, artisan, { new: true });

    res.json(updatedArtisan);
}

export const getCustomerReviewsByArtisan = async (req, res) => {
    const { id } = req.params;

    try {
        const artisan = await Artisan.findById(id);

        res.status(200).json(artisan.customer_reviews);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const rateArtisan = async (req, res) => {
    const { id } = req.params;
    const { star } = req.body;

    const artisan = await Artisan.findById(id);

    artisan.rating.push({ customer: req.user.id, star });

    const ratedArtisan = await Artisan.findByIdAndUpdate(id, artisan, { new: true });

    res.json(ratedArtisan);
}

export const updateCurrentRating = async (req, res) => {
    const { id } = req.params;

    const artisan = await Artisan.findByIdAndUpdate(
        id, 
        [{ $set: { current_rating: { $round: [{ $avg: "$rating.star" }] } } }],
        { new: true }
    );

    res.json(artisan.current_rating);
}
