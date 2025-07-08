async function buscarConcursos(capacidades, pool) {
  let query = 'SELECT * FROM "Concursos"';
  let params = [];

  if (capacidades) {
    const capacidadesArray = capacidades.split(',').map(p => p.trim());
    query += ` WHERE EXISTS (SELECT 1 FROM unnest(lista_de_vagas) as vaga WHERE vaga = ANY($1))`;
    params.push(capacidadesArray);
  }

  const result = await pool.query(query, params);
  return result.rows;
}

module.exports = { buscarConcursos };
