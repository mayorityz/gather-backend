import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// schemas
import Artisan from '../models/artisan.js';

dotenv.config({ path: "./config.env" });

// create artisan
export const signupArtisan = async (req, res) => {
    const { 
        name, email, phone_number, profession, company_name, company_website, state, lga, password, confirmPassword
    } = req.body;

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

        res.status(200).json(newArtisan);
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

        const token = jwt.sign({ 
            _id: existingArtisan._id, 
            profession: existingArtisan.profession 
            }, 
            process.env.TOKEN_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({ existingArtisan, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}
