import NaijaStates from 'naija-state-local-government';

export const getStates = async (req, res) => {
    try {
        const states = await NaijaStates.states();  

        res.status(200).json(states);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
