const express = require('express');
const upload = require('./../../middlewares/uploadMiddleware');
const { updateDetailRequestController } = require('../../controllers/ticket/detailRequestController');

const router = express.Router();


// Route to update DetailRequest and upload files
router.put('/update-detail/:requestId',  upload, updateDetailRequestController); // 'files' is the field name for the files

module.exports = router;
