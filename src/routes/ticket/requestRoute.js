const express = require('express');
const { submitRequest } = require('../../controllers/ticket/requestController');
const upload = require('./../../middlewares/uploadMiddleware');
const router = express.Router();

router.post('/solicitudes', upload,submitRequest);

module.exports = router;
