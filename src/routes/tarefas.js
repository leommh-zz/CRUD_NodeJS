const express = require('express');
const router = express.Router();

//const { authenticationMiddleware } = require('../utils/token');

const { autenticarToken } = require('../utils/token');

const validateSchema = require('./validateSchema');
const controller = require('../controllers/tarefas');

/*******
 * TODO: Definição das rotas do CRUD de Tarefas.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   authenticationMiddleware,
 *   controller.cadastro,
 * );
 *******/

const validateBody = {
    titulo: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Informe o titulo."
    },
    descricao: {
    	in: "body",
    	isString: true,
    	notEmpty: true,
    	errorMessage: "Informe a descrição."
    }
}


router.get('/',autenticarToken, controller.listagem);
router.post('/', autenticarToken, validateSchema(validateBody), controller.cadastro);
router.get('/:tarefaId', autenticarToken, controller.buscaPorId);
router.put('/:tarefaId', autenticarToken, controller.editar);
router.delete('/:tarefaId', autenticarToken, controller.remocao);
router.put('/:tarefaId/concluida', autenticarToken, controller.marcarConcluida);
router.delete('/:tarefaId/concluida', autenticarToken, controller.desmarcarConcluida);


module.exports = router;
