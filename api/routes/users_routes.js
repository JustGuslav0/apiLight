const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

// Rota para criar um usuário
router.post('/register', usersController.registerUser);
// Rota para fazer login
router.get('/', usersController.getUser)
// Rota para buscar todos os usuários
router.post('/login', usersController.loginUser);
// Rota para deletar um usuário específico
router.delete('/:id', usersController.deleteUser)

module.exports = router  