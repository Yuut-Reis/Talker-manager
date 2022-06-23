const verifyLogin = (req, res, next) => {
    const { email, password } = req.body;
    const verifyEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]/i.test(email);
   /*  const verifyPassword = password.length < 6; */
    if (!email) { return res.status(400).send({ message: 'O campo "email" é obrigatório' }); }

    if (!verifyEmail) {
        return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!password) { return res.status(400).send({ message: 'O campo "password" é obrigatório' }); }

    if (password.length < 6) {
     return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });   
    }

    next();
};

module.exports = {
    verifyLogin,
};