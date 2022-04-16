import Subscriber from '../models/subscriber.js';

export const subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) return res.status(400).json({ message: "Subscriber already exists." });

        const newSubscriber = await Subscriber.create({ email });

        res.status(200).json(newSubscriber);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
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
