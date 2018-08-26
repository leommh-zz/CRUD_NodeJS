const jwt = require('jsonwebtoken');
const SECRET_KEY = '&uaQ76gR#SQPthHV82#Dt=HnUwzbM8KnP&T#uTvG*NsQZMspRt';

function autenticarToken (request, response, next){

	const { cookies: {token} } = request;

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log('Token válido', payload);
        request.usuarioLogado = payload;
        next();
        //response.status(200).send('Acesso permitido');
    }
    catch (exception) {
        console.error('Token inválido', exception);
        response.status(403).send('Acesso negado, faça login e tente novamente...');
    }

}

function gerarToken (usuario){
	const { id, nome, email, cpf, nascimento } = usuario
	const payload = { id, nome, email, cpf, nascimento}
	return jwt.sign(payload, SECRET_KEY);
}

module.exports = {
	gerarToken,
	autenticarToken
}