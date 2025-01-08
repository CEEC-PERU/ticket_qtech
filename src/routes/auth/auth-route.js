const { Router } = require("express");
const { body } = require("express-validator");
const authController = require("../../controllers/auth/auth-controller");

const router = Router();

router.post("/signin", [
    body('email').isLength({ min: 8 }), // Asumiendo que el DNI tiene al menos 8 caracteres
    body('password').isLength({ min: 8 })
], authController.authUser);

module.exports = router;