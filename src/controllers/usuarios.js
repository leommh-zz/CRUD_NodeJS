const { Usuario } = require ('../models');
const bcrypt = require('bcryptjs');

//Importações internas
const { gerarToken } = require('../utils/token');
const { mensagens } = require('../utils/customMensagens');

const cadastro = (request, response) =>  {

    const { body: { nome, email, cpf, nascimento, senha } } = request;

    //Senha Criptografada
    const senhaSegura = bcrypt.hashSync(senha, bcrypt.genSaltSync(10))

    Usuario.create({
        nome, email, cpf, nascimento, senhaSegura
    })
    .then( usuario => {
        response.status(201).json(usuario)
    })
    .catch( ex => {
        console.error(ex)
        response.status(412).send(mensagens.falhaDB)
    })
}

const buscaPorId = (request, response) =>  {
    
    const { params: { usuarioId } } = request;

    Usuario.findById(usuarioId)
    .then(usuario => {
        if (!usuario){
            response.status(404).send(mensagens.usuarioSumiu)
        }else{
            response.status(200).json(usuario)
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send(mensagens.falhaDB)
    })

}

const editar = (request, response) =>  {

    const { params:{ usuarioId }, body:{ nome, email, cpf, nascimento, senha } } = request;

    Usuario.findById(usuarioId)
    .then( usuario => {
        if (!usuario){
            response.status(404).send(mensagens.usuarioSumiu)
        }else{
            return usuario.update({
                nome, email, cpf, nascimento, senha
            })
            .then(()=>{
                response.status(200).json(usuario)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send(mensagens.falhaDB)
    })
}

const login = (request, response) =>  {
    
    const { body:{ email, senha } } = request;

    Usuario.findOne({
        where:{
            email,
            senha
        }
    })
    .then(usuario=>{
        if(usuario !== null){

            const token = gerarToken(usuario)
            response.status(200).cookie('token',token).send(mensagens.sucesso)

        }else{

            response.status(401).send(mensagens.autenticaçãoFalha)

        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send(mensagens.falhaDB)
    })
}

const validarUsuario = (request, response) => {
    response.json(request.usuarioLogado)
}

const logout = (request, response) => {
    request.usuarioLogado = null
    response.status(200).cookie('token',null).send(mensagens.falha)
}

module.exports = {
    cadastro,
    buscaPorId,
    validarUsuario,
    editar,
    login,
    logout
}
