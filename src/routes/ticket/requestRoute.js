const express = require('express');
const { submitRequest , updateRequest } = require('../../controllers/ticket/requestController');
const upload = require('./../../middlewares/uploadMiddleware');
const router = express.Router();

router.post('/solicitudes', upload,submitRequest);
// Ruta para actualizar is_aproved y attention_time
router.put('/update/:request_id/:user_id', updateRequest);

module.exports = router;
