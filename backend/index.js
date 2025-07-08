const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const pool = new Pool({
  connectionString: "postgresql://postgres.znzfjumybhqviopjrntq:FeE6SG150k5u2K9P@aws-0-sa-east-1.pooler.supabase.com:6543/postgres",
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.get('/concursos', async (req, res) => {
  try {
    const { capacidades } = req.query; // espera uma string como 'dev,designer'

    let query = 'SELECT * FROM "Concursos"';
    let params = [];

    if (capacidades) {
      // transforma string em array
      const capacidadesArray = capacidades.split(',').map(p => p.trim());

      query += ` WHERE EXISTS (SELECT 1 FROM unnest(lista_de_vagas) as vaga WHERE vaga = ANY($1))`;
      params.push(capacidadesArray);

    }

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);

  } catch (error) {
    console.error('Erro ao buscar concursos:', error);
    res.status(500).json({ erro: 'Erro ao consultar concursos' });
  }
});

module.exports = app;
