import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });

const artisanAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access Denied" });

        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifiedToken;
        
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid/Expired Token" });
    }
}

export default artisanAuth;
