const RejectionService = require('../../services/ticket/rejectionService');

class RejectionController {
  async getAll(req, res) {
    try {
      const rejections = await RejectionService.getAllRejections();
      res.json(rejections);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const rejection = await RejectionService.getRejectionById(req.params.id);
      if (!rejection) return res.status(404).json({ error: 'Rejection not found' });

      res.json(rejection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const rejection = await RejectionService.createRejection(req.body);
      res.status(201).json(rejection);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const rejection = await RejectionService.updateRejection(req.params.id, req.body);
      res.json(rejection);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await RejectionService.deleteRejection(req.params.id);
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new RejectionController();
