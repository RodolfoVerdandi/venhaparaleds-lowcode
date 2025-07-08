const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get('/concursos', async (req, res) => {
  try {
    const { capacidades } = req.query;
    const query = capacidades
      ? `SELECT * FROM "Concursos" WHERE lista_de_vagas && ${capacidades}`
      : 'SELECT * FROM "Concursos"';

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar concursos:', error.message);
    res.status(500).json({ erro: 'Erro ao consultar concursos' });
  }
});

module.exports = app;
