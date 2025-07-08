const express = require('express');
const app = express();

const concursosRoutes = require('./src/routes/concursosRoutes');

app.use(express.json()); // se precisar de json no corpo das requisições

app.use('/', concursosRoutes);

module.exports = app;