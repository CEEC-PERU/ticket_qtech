const express = require('express');
const router = express.Router();
const RejectionController = require('../../controllers/ticket/rejectionController');

router.get('/', RejectionController.getAll);
router.get('/:id', RejectionController.getById);
router.post('/', RejectionController.create);
router.put('/:id', RejectionController.update);
router.delete('/:id', RejectionController.delete);

module.exports = router;
