const express = require('express');
const router = express.Router();
const validateSchema = require('./validateSchema');

//Importações Internas
const controller = require('../controllers/usuarios');
const { autenticarToken } = require('../utils/token');
const { isCPF, isDate } = require('../utils/customValidators');

//Variável com as configurações de validação
const validateBody = {
    nome: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Nome inválido, por favor informe novamente!"
    },
    email: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Email inválido, por favor informe novamente!"
    },
    cpf: {
        in: "body",
        isString: true,
        notEmpty: true,
        custom: {
            options: (value => isCPF(value))
        },
        errorMessage: "CPF inválido, por favor informe novamente!"
    },
    senha: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Senha inválida, por favor informe novamente!"
    },
    nascimento: {
        in: "body",
        isString: true,
        notEmpty: true,
        custom: {
            options: (value => isDate(value, "YYYY-MM-DD"))
        },
        errorMessage: "Data de nascimento inválida, por favor informe novamente!"
    }
}

//Testa se o usuário está logado e mostra caso esteja
router.get('/', autenticarToken, controller.validarUsuario)

//Cadastra um usuário
router.post('/', validateSchema(validateBody), controller.cadastro)

//Busca um usuário
router.get('/:usuarioId', controller.buscaPorId)

//Edita um usuário
router.put('/:usuarioId', validateSchema(validateBody), autenticarToken, controller.editar)

//Faz o login do usuário
router.post('/login', controller.login)

//Faz o logout do usuário
router.get('/logout', autenticarToken, controller.logout)

module.exports = router;
