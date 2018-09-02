const express = require('express');
const router = express.Router();

//Importações Internas
const { autenticarToken } = require('../utils/token');
const validateSchema = require('./validateSchema');
const controller = require('../controllers/tarefas');

//Variável com as configurações de validação
const validateBody = {
    titulo: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Titulo inválido, por favor informe novamente!"
    },
    descricao: {
    	in: "body",
    	isString: true,
    	notEmpty: true,
    	errorMessage: "Descrição inválida, por favor informe novamente!"
    }
}

//Listar todas as tarefas
router.get('/', autenticarToken, controller.listagem);

//Cadastrar uma nova tarefa
router.post('/', autenticarToken, validateSchema(validateBody), controller.cadastro);

//Buscar uma tarefa por ID
router.get('/:tarefaId', autenticarToken, controller.buscaPorId);

//Editar uma tarefa
router.put('/:tarefaId', autenticarToken, validateSchema(validateBody), controller.editar);

//Deletar uma tarefa
router.delete('/:tarefaId', autenticarToken, controller.remover);

//Marcar uma tarefa como concluída
router.put('/:tarefaId/concluida', autenticarToken, controller.marcarConcluida);

//Desmarcar uma tarefa concluída
router.delete('/:tarefaId/concluida', autenticarToken, controller.desmarcarConcluida);

module.exports = router;
