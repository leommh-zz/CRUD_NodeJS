const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Dp7XpRVAl5ThxGROJAroQ00zrEvPNxO6ns7rUGA3F6K0JybaNb';

const autenticarToken = (request, response, next) => {

	const { cookies: { token } } = request;

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log('Token válido', payload);
        request.usuarioLogado = payload;
        next();
    }
    catch (exception) {
        console.error('Token inválido', exception);
        response.status(403).send('Acesso negado, faça login e tente novamente...');
    }

}

const gerarToken = usuario => {
	const { id, nome, email, cpf, nascimento } = usuario
	const payload = { id, nome, email, cpf, nascimento}
	return jwt.sign(payload, SECRET_KEY);
}

module.exports = {
    autenticarToken,
    gerarToken
}