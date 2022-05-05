import { addMember } from "../config/mailingList.js";

export const subscribe = async (req, res) => {
    const { email } = req.body;

    await addMember(email);
}
