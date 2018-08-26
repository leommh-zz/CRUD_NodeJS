
const { Tarefa } = require('../models');

const cadastro = (request, response) => {

	const { body:{ titulo, descricao }, usuarioLogado: { id } } = request;

	//const usuarioId = request.usuarioLogado.id;

	Tarefa.create({
        titulo, descricao, usuarioId:id
    })
    .then( tarefa => {
        response.status(201).json(tarefa)
    })
    .catch( ex => {
        console.error(ex);
        response.status(412).send('não foi possível incluir o registro')
    })

}

const listagem = (request, response) => {

	const { usuarioLogado: { id }} = request

	Tarefa.findAll({
	where: {
		usuarioId: id
	}
	}).then(tarefa => {
		if(!tarefa){
			response.status(404).send('nenhuma tarefa encontrada')
		}else{
			response.status(200).json(tarefa);
		}
	})
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

const buscaPorId = (request, response) => {

	const { params:{tarefaId} } = request

    Tarefa.findById(tarefaId)
    .then(tarefa => {
        if (!tarefa){
            response.status(404).send('tarefa não encontrada')
        }else{
            response.status(200).json(tarefa)
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

const editar = (request, response) => {
	const { params:{ tarefaId }, body:{ titulo, descricao }} = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send('tarefa não encontrada')
        }else{
            return tarefa.update({
                titulo, descricao
            })
            .then(()=>{
                response.status(200).json(tarefa)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })
}

const remocao = (request, response) => {

    const { params:{tarefaId} } = request;

    Tarefa.destroy({
        where: {
            id: tarefaId
        }
    })
    .then( deletados => {
        if(deletados > 0)
        {
            response.status(204).send()
        }
        else
        {
            response.status(404).send('Tarefa deletada')
        }
    })
    .catch(ex => {
        console.error(ex)
        response.status(412).send('Não foi possivel deletar a tarefa')
    })

}

const marcarConcluida = (request, response) => {

	const { params:{ tarefaId }, body:{ titulo, descricao }} = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send('tarefa não encontrada')
        }else{
            return tarefa.update({
                concluida: 1
            })
            .then(()=>{
                response.status(200).json(tarefa)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

const desmarcarConcluida = (request, response) => {

	const { params:{ tarefaId }, body:{ titulo, descricao }} = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send('tarefa não encontrada')
        }else{
            return tarefa.update({
                concluida: 0
            })
            .then(()=>{
                response.status(200).json(tarefa)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    editar,
    remocao,
    marcarConcluida,
    desmarcarConcluida,
};
