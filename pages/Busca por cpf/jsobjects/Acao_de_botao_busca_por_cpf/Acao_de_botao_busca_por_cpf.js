export default {
	buscarConcursos: async (cpfToConsult) => {
		try {
			const cpf = cpfToConsult.trim();



			// Executa a API (o parâmetro "cpf" será injetado na URL)
			await GET_PROFISSAO_POR_CPF.run();

			if (!GET_PROFISSAO_POR_CPF.data?.length) {
				showAlert("Nenhum candidato encontrado", "error");
				await GET_CONCURSOS_POR_PROFISSAO.run();
				return;
			}

			// Se chegou aqui, a consulta funcionou!
			showAlert("Dados carregados ! ", "success");
			await GET_CONCURSOS_POR_PROFISSAO.run();
			if (!GET_CONCURSOS_POR_PROFISSAO.data?.length) {
				showAlert("Nenhum concurso para este candidato", "error");
				return;
			}

		} catch (error) {
			showAlert("Erro na API: " + error.message, "error");
			console.error(error);
		}
	}
}