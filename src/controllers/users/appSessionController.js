const { createAppSessionService  } = require("../../services/users/appSessionService");

const appSessionController = async (req, res) => {
    try {
        const {
            user_id,
            start_time,
            end_time
        } = req.body;
        console.log(req.body);
        const appSession = await createAppSessionService({ user_id, start_time, end_time });
        res.status(200).json(appSession);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports = {appSessionController };