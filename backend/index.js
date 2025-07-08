require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Conexão com o banco Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Função para extrair lista do formato {item1,item2}
function parseLista(str) {
  if (!str) return [];
  const trimmed = str.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed.substring(1, trimmed.length - 1).split(',');
  }
  return [];
}

// Rota principal
app.get('/concursos', async (req, res) => {
  const listaRaw = req.query.profissoes;
  const lista = parseLista(listaRaw);

  try {
    let result;

    if (lista.length > 0) {
      const query = `
        SELECT * FROM "Concursos"
        WHERE lista_de_vagas && $1::text[]
      `;
      result = await pool.query(query, [lista]);
    } else {
      result = await pool.query('SELECT * FROM "Concursos"');
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Erro na consulta:', err);
    res.status(500).json({ erro: 'Erro ao consultar o banco' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}