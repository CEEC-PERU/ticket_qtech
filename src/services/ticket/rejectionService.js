const Rejection = require('../../models/Rejection');
const Request = require('../../models/Request');
const User = require('../../models/User');

class RejectionService {
  async getAllRejections() {
    return await Rejection.findAll({
      include: [
        { model: Request, as: 'request' },
        { model: User, as: 'user' }
      ]
    });
  }

  async getRejectionById(rejectionId) {
    return await Rejection.findByPk(rejectionId, {
      include: [
        { model: Request, as: 'request' },
        { model: User, as: 'user' }
      ]
    });
  }

  async createRejection(data) {
    return await Rejection.create(data);
  }

  async updateRejection(rejectionId, data) {
    const rejection = await Rejection.findByPk(rejectionId);
    if (!rejection) throw new Error('Rejection not found');

    await rejection.update(data);
    return rejection;
  }

  async deleteRejection(rejectionId) {
    const rejection = await Rejection.findByPk(rejectionId);
    if (!rejection) throw new Error('Rejection not found');

    await rejection.destroy();
    return { message: 'Rejection deleted successfully' };
  }
}

module.exports = new RejectionService();
