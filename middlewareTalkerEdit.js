const tokenTest = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) { return res.status(401).send({ message: 'Token não encontrado' }); }
    if (authorization.length !== 16) { return res.status(401).send({ message: 'Token inválido' }); }
    next();
};

const nameTest = (req, res, next) => {
    const { name } = req.body;
    if (!name) { return res.status(400).send({ message: 'O campo "name" é obrigatório' }); }
    if (name.length < 3) {
        return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const ageTest = (req, res, next) => {
    const { age } = req.body;
    if (!age) { return res.status(400).send({ message: 'O campo "age" é obrigatório' }); }
    if (Number(age) < 18) {
        return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const talkeTestOne = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) { return res.status(400).send({ message: 'O campo "talk" é obrigatório' }); }
    if (!talk.watchedAt) {
        return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!talk.rate) {
        return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
    }
    next();
};

const talkeTestTwo = (req, res, next) => {
    const { talk } = req.body;
    const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
    const dat = regex.test(talk.watchedAt);
    if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
        return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (!talk.watchedAt) {
        return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!dat) {
        return res.status(400).send({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

module.exports = {
    tokenTest,
    nameTest,
    ageTest,
    talkeTestOne,
    talkeTestTwo,
};