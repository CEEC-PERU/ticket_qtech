const AppSession = require("../../models/AppSession")
                                                                                                                                                                                                                                                                                                                                                                                                                                

const createAppSessionService = async (appSession) => {
    try {
        const newAppSession = await AppSession.create(appSession);
        return newAppSession;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



module.exports = { createAppSessionService };