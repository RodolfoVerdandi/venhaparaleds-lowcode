
const express = require('express');
const { getConcursos } = require('./src/controllers/concursoController');

const app = express();

app.get('/concursos', getConcursos);

module.exports = app;
