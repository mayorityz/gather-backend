import { addMember } from "../config/mailingList.js";

export const subscribe = async (req, res) => {
    const { email } = req.body;

    await addMember(email);
}

export const unsubscribe = async (req, res) => {
    const { email } = req.params;

    await Subscriber.findOneAndRemove({ email });

    res.json({ message: 'unsubscribe successful' });
}

export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find();

        res.status(200).json({ subscribers });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}
