import NaijaStates from 'naija-state-local-government';

export const getLgasByState = async (req, res) => {
    const { state } = req.body;

    try {
        const stateLgas = await NaijaStates.lgas(state);

        res.status(200).json(stateLgas.lgas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
