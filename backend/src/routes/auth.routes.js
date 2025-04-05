const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { autenticar } = require('../middlewares/auth');

//Rotas de autenticação
router.post('/login', AuthController.login);

module.exports = router;