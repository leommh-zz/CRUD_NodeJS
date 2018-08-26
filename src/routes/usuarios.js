const express = require('express');
const router = express.Router();

const validateSchema = require('./validateSchema');
const controller = require('../controllers/usuarios');

const { autenticarToken } = require('../utils/token');

const { isCPF, isDate } = require('../utils/customValidators');

/*******
 * TODO: Definição das rotas do CRUD de Usuários e Login.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   controller.cadastro
 * );
 *******/

const validateBody = {
    nome: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Informe o nome do usuário."
    },
    email: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Informe o email."
    },
    cpf: {
        in: "body",
        isString: true,
        notEmpty: true,
        custom: {
            options: (value => isCPF(value))
        },
        errorMessage: "CPF Inválido"
    },
    senha: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Senha Inválida"
    },
    nascimento: {
        in: "body",
        isString: true,
        notEmpty: true,
        custom: {
            options: (value => isDate(value, "YYYY-MM-DD"))
        },
        errorMessage: "Nascimento Inválido"
    }
}

router.get('/', autenticarToken, controller.usuario)
router.post('/', validateSchema(validateBody), controller.cadastro)
router.post('/login', controller.login)
router.get('/logout', autenticarToken, controller.logout)
router.get('/:usuarioId', controller.buscaPorId)
router.put('/:usuarioId', autenticarToken, controller.editar)

module.exports = router;
