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

const getAppSessions = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const currentPage = parseInt(page);
        const currentDate = new Date();
        const startDate = startOfWeek(currentDate);
        const startDatePage = subWeeks(startDate, currentPage);
        const endDatePage = endOfWeek(startDatePage);
        const appSessions = await getSessionStatistics({
            startDate: startDatePage,
            endDate: endDatePage,
        });

        const sessionsWithDay = appSessions.map(session => {
            const sessionDate = new Date(session.session_day);
            sessionDate.setDate(sessionDate.getDate() + 1);

            return {
                ...session,
                day: sessionDate
                    .toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() +
                    sessionDate
                        .toLocaleDateString('es-ES', { weekday: 'long' }).slice(1),
            };
        });

        const startOfWeekDate = startDatePage.toLocaleDateString('es-ES');
        const endOfWeekDate = endDatePage.toLocaleDateString('es-ES');

        const result = {
            sessionsWithDay,
            startOfWeek: startOfWeekDate,
            endOfWeek: endOfWeekDate,
        };
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

}

module.exports = {appSessionController , getAppSessions};