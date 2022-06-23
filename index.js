const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const { verifyLogin } = require('./middlewareLogin');
const {
  tokenTest,
  nameTest,
  ageTest,
  talkeTestOne,
  talkeTestTwo,
} = require('./middlewareTalkerEdit');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerJson = './talker.json';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// iniciando projeto
app.get('/talker', (req, res) => {
  const data = fs.readFileSync(talkerJson, 'utf-8');
  const talkerData = JSON.parse(data);
  if (!talkerData.length) {
    return res.status(200).send([]);
  } return res.status(200).send(talkerData);
});

app.get('/talker/search', tokenTest, (req, res) => {
  const data = fs.readFileSync(talkerJson, 'utf-8');
  const talkerData = JSON.parse(data);
  const { q } = req.query;
  if (!q) { 
    return res.status(200).send(talkerData);
  }
  const talkerSearch = talkerData.filter((talker) => talker.name.includes(q));
  if (!talkerSearch.length) {
    return res.status(200).send([]);
  }
  return res.status(200).send(talkerSearch);
});

app.get('/talker/:id', (req, res) => {
  const data = fs.readFileSync(talkerJson, 'utf-8');
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

app.post('/talker',
  tokenTest,
  nameTest,
  ageTest,
  talkeTestOne,
  talkeTestTwo, (req, res) => {
    const data = fs.readFileSync(talkerJson, 'utf-8');
    const talkerData = JSON.parse(data);
    const newTalker = { ...req.body, id: talkerData.length + 1 };
    talkerData.push(newTalker);
    const newTalkerData = JSON.stringify(talkerData);
    fs.writeFileSync(talkerJson, newTalkerData);
    return res.status(201).send(newTalker);
  });

  app.put('/talker/:id', tokenTest,
  nameTest,
  ageTest,
  talkeTestOne,
  talkeTestTwo, (req, res) => {
    const data = fs.readFileSync(talkerJson, 'utf-8');
    const talkerData = JSON.parse(data);
    const id = Number(req.params.id);
    const verifyTalker = talkerData.findIndex((talker) => talker.id === id);
    const newTalker = { ...req.body, id };
    talkerData[verifyTalker] = { ...newTalker };
    fs.writeFileSync(talkerJson, JSON.stringify(talkerData));
    return res.status(200).send(newTalker);
  });

app.delete('/talker/:id', tokenTest, (req, res) => {
  const data = fs.readFileSync(talkerJson, 'utf-8');
  const talkerData = JSON.parse(data);
  const id = Number(req.params.id);
  const deleteTalker = talkerData.filter((talker) => talker.id !== id);
  fs.writeFileSync(talkerJson, JSON.stringify(deleteTalker));
  return res.status(204).send();
});