const express = require('express');
const router = express.Router();

const { getConcursos } = require('../controllers/concursosController');

router.get('/concursos', getConcursos);

module.exports = router;