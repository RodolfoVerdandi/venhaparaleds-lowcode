export default {
  buscarCandidatos: async () => {
    try {
      // 1. Buscar o concurso pelo código
      await GET_CONCURSO_POR_CODIGO.run();
      
      if (!GET_CONCURSO_POR_CODIGO.data || GET_CONCURSO_POR_CODIGO.data.length === 0) {
        showAlert("Nenhum concurso encontrado com esse código.", "warning");
        return;
      }

      // 2. Buscar os candidatos compatíveis com a lista de vagas do concurso
      await CANDIDATOS_POR_TIPO_DE_VAGA.run();

      if (!CANDIDATOS_POR_TIPO_DE_VAGA.data || CANDIDATOS_POR_TIPO_DE_VAGA.data.length === 0) {
        showAlert("Nenhum candidato encontrado com as profissões compatíveis.", "info");
      }

    } catch (error) {
      showAlert("Erro ao buscar candidatos: " + error.message, "error");
      console.error("Erro em buscarCandidatos:", error);
    }
  }
};
