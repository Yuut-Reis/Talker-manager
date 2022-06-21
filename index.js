const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

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
  }else{
    return res.status(200).send(talkerData);
  }
});



