const { Usuario } = require ('../models');
const {gerarToken} = require('../utils/token');


const cadastro = (request, response) =>  {

    const { body } = request;
    const { nome, email, cpf, nascimento, senha} = body

    Usuario.create({
        nome, email, cpf, nascimento, senha
    })
    .then( usuario => {
        response.status(201).json(usuario)
    })
    .catch( ex => {
        console.error(ex);
        response.status(412).send('não foi possível incluir o registro')
    })
}

const buscaPorId = (request, response) =>  {
    
    const { params:{usuarioId} } = request

    Usuario.findById(usuarioId)
    .then(usuario => {
        if (!usuario){
            response.status(404).send('usuário não encontrado')
        }else{
            response.status(200).json(usuario)
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

const editar = (request, response) =>  {

    const {params:{usuarioId}, body:{nome, email, cpf, nascimento, senha}} = request

    Usuario.findById(usuarioId)
    .then( usuario => {
        if (!usuario){
            response.status(404).send('usuário não encontrado')
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
        response.status(412).send('não foi possível consultar o banco de dados')
    })
}

const login = (request, response) =>  {
    
    const {body:{ email, senha }} = request

    Usuario.findOne({
        where:{
            email,
            senha
        }
    })
    .then(usuario=>{
        if(usuario !== null){

            const token = gerarToken(usuario);
            response.status(200).cookie('token',token).send('usuário logado')

        }else{

            response.status(401).send('E-mail ou senha inválidos')

        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possivel consultar o banco de dados')
    })
}

const usuario = (request, response) => {
    response.json(request.usuarioLogado);
}

const logout = (request, response) => {
    request.usuarioLogado = null;
    response.status(200).cookie('token',null).send('usuário deslogado')
}

module.exports = {
    cadastro,
    buscaPorId,
    usuario,
    editar,
    login,
    logout
};
