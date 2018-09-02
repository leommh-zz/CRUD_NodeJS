const Sequelize = require('sequelize');

//Importações Internas
const { Tarefa } = require('../models');
const { mensagens } = require('../utils/customMensagens');

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
        response.status(412).send(mensagens.falha)
    })

}

const listagem = (request, response) => {

    const { usuarioLogado: { id }, query: { titulo } } = request;
    
    if (titulo){
        const tarefaQuery = { 
            where: { 
                titulo: { [Sequelize.Op.like]: `%${ titulo }%` }  
            }
        }
        Tarefa.findAll(tarefaQuery)
        .then(tarefas => {
            if(!tarefas){
                response.status(404).send('nenhuma tarefa encontrada')
            }else{
                response.status(200).send(tarefas)
            }
        })
    }else{
        Tarefa.findAll({
            where: {
                usuarioId: id
            }
            }).then(tarefa => {
                if(!tarefa){
                    response.status(404).send(mensagens.tarefaSumiu)
                }else{
                    response.status(200).json(tarefa)
                }
            })
            .catch(ex=>{
                console.error(ex)
                response.status(412).send(mensagens.falhaDB)
                
            })
    }

}

const buscaPorId = (request, response) => {

	const { params: { tarefaId } } = request;

    Tarefa.findById(tarefaId)
    .then(tarefa => {
        if (!tarefa){
            response.status(404).send(mensagens.tarefaSumiu)
        }else{
            response.status(200).json(tarefa)
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send(mensagens.falhaDB)
    })

}

const editar = (request, response) => {
	const { params: { tarefaId }, body: { titulo, descricao } } = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send(mensagens.tarefaSumiu)
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
        response.status(412).send(mensagens.falhaDB)
    })
}

const remover = (request, response) => {

    const { params: { tarefaId } } = request;

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
            response.status(404).send(mensagens.sucesso)
        }
    })
    .catch(ex => {
        console.error(ex)
        response.status(412).send(mensagens.falhaDB)
    })

}

const marcarConcluida = (request, response) => {

	const { params: { tarefaId } } = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send(mensagens.tarefaSumiu)
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
        response.status(412).send(mensagens.falhaDB)
    })

}

const desmarcarConcluida = (request, response) => {

	const { params: { tarefaId } } = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send(mensagens.tarefaSumiu)
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
        response.status(412).send(mensagens.falhaDB)
    })

}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    editar,
    remover,
    marcarConcluida,
    desmarcarConcluida,
};
