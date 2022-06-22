const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const { verifyLogin } = require('./middleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// iniciando projeto
app.get('/talker', (req, res) => {
  const data = fs.readFileSync('./talker.json', 'utf-8');
  const talkerData = JSON.parse(data);
  if (!talkerData.length) {
    return res.status(200).send([]);
  } return res.status(200).send(talkerData);
});

app.get('/talker/:id', (req, res) => {
  const data = fs.readFileSync('./talker.json', 'utf-8');
  const talkerData = JSON.parse(data);
  const { id } = req.params;
  const verifyTalker = talkerData.find((talker) => talker.id === Number(id));
  if (!verifyTalker) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } return res.status(200).send(verifyTalker);
});

app.post('/login', verifyLogin, (req, res) => {   
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});