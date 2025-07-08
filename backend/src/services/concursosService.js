const { findConcursosByCapacidades } = require('../models/concursosModel');

async function buscarConcursos(capacidades) {
  let capacidadesArray = [];
  
  if (capacidades) {
    capacidadesArray = capacidades.split(',').map(p => p.trim());
  }

  const concursos = await findConcursosByCapacidades(capacidadesArray);
  return concursos;
}

module.exports = { buscarConcursos };