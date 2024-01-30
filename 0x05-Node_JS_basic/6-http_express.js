const express = require('express');

const app = express();
const host = '127.0.0.1';
const port = 1245;

app.get('/', (_, response) => {
  response.status(200).send('Hello Holberton School!');
});

app.listen(port, () => {
  process.stdout.write(`Server listening on http://${host}:${port}/`);
});

module.exports = app;
