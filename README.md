# Desafio Low Code - LEDS: Consulta-Concursos
## Principais funcionalidades
1. Listar os **órgãos, códigos e editais dos concursos públicos** que se encaixam no perfil do candidato, tomando como base o seu **CPF**; 
2. Listar o **nome, data de nascimento e o CPF** dos candidatos que se encaixam no perfil do concurso tomando com base o **Código do Concurso** do concurso público;

---

# Sobre

Esse projeto faz parte do **desafio Low Code - LEDS**. O objetivo da aplicação é facilitar consultas em um banco de dados, mais especificamente, facilitar o encontro de **"matchs" entre candidatos e concursos**. Isso é feito comparando as habilidades do candidato com a lista de vagas de cada concurso. A aplicação principal foi feita usando **AppSmith + Supabase**, no entanto, paralelamente, foi feita uma **API em Node.js** que também se comunica com o banco de dados.

# Tecnologias
### Aplicação principal
| Tecnologia | Descrição |
|---|---|
|**Supabase**| Foi usada a plataforma Supabase para hostear e configurar o banco. Além disso, ela já vem com chaves de acesso para APIs.|
|**Appsmith**| Onde foi feito o front-end da aplicação, com requisições ao banco de dados dinâmicas e de consultas configuráveis.|

### Projeto complementar 
| Tecnologia      | Descrição                                           |
|-----------------|-----------------------------------------------------|
| Node.js         | Ambiente de execução JavaScript no backend         |
| PostgresSQL     | Banco de dados relacional utilizado via Supabase   |
| Express.js      | Framework para construção de APIs REST             |
| Jest            | Framework para testes unitários                    |
| Supertest       | Biblioteca para testar endpoints HTTP              |
| Docker          | Containerização da aplicação                       |
| SonarCloud      | Análise de qualidade e cobertura de código         |
| GitHub Actions  | CI para testes e ativar o sonar                    |




# Supabase 
🧱 Estrutura do Banco de Dados
O banco contém duas tabelas principais:

### Candidatos
| Campo             | Tipo        | Descrição                        |
| ----------------- | ----------- | -------------------------------- |
| id                | `int 8` (PK)| Identificador                    |
| `cpf`             | `text`      | Código único do candidato        |
| `nome`            | `text`      | Nome completo do candidato       |
| `data_nascimento` | `date`      | Data de nascimento do candidato  |
| `capacidades`     | `text[]`    | Lista de capacidades declaradas  |

### Concurso
| Campo         | Tipo        | Descrição                       |
| ------------- | ----------- | ------------------------------- |
| id            | `int 8` (PK)| Identificador                   |
| `codigo`      | `text`      | Código único do concurso*       |
| `orgao`       | `text`      | Órgão responsável pelo concurso |
| `edital`      | `text`      | URL ou nome do edital           |
| `habilidades` | `text[]`    | Lista de habilidades exigidas   |

#### *Transformado em único para não ocorrer conflitos na consulta. 

### Conexão do banco de dados:

#### Appsmith
O Supabase fornece uma API key que podemos usar no header para montar a solicitação corretamente no Appsmith 

#### API Backend
Via PostgresSQL.


# Funcionalidades principais

### Tela: Busca por cpf
O usuário fornece um CPF de uma pessoa na caixa de input, e o sistema retorna quais concursos aquele CPF está apto a participar.
(Comparação de profissões da pessoa com a lista dos tipos de vaga oferecidos pelo concurso)

`venhaparaleds-lowcode/pages/Busca por concurso/jsobjects/Acao_de_botao_busca_por_codigo/Acao_de_botao_busca_por_codigo.js` é onde está o código que, ativado pelo botão, faz o encadeamento das requisições para que apareça as informações na tabela (GET "PROFISSAO_POR_CPF" -> GET "CONCURSOS_POR_PROFISSAO")

![Busca por cpf](https://imgur.com/TurtejC.png)


### Tela: Busca por código de concurso
O usuário fornece o código do concurso, e o sistema retorna quais pessoas estão aptas a participar.

`venhaparaleds-lowcode/pages/Busca por cpf/jsobjects/Acao_de_botao_busca_por_cpf/Acao_de_botao_busca_por_cpf.js` é o local do código que o botão dessa tela ativa, encadeando as requisições (GET "CONCURSO_POR_CÓDIGO" -> GET "CANDIDATOS_POR_TIPO_DE_VAGA").

![Busca por concurso](https://imgur.com/5hN8WGR.png)

### Requisições

#### 🔹 CONCURSO_POR_CODIGO
##### Usado na tela: Busca por CPF
Requisição: <pre>```https://znzfjumybhqviopjrntq.supabase.co/rest/v1/Concursos?select=*&codigo=eq.{{inputCodigo.text}}```</pre>
###### {{inputCodigo.text}} é o valor no campo de input quando a requisição é chamada

#### 🔹 CANDIDATOS_POR_TIPO_DE_VAGA
##### Usado na tela: Busca por CPF
Requisição:<pre>```https://znzfjumybhqviopjrntq.supabase.co/rest/v1/Candidatos?profissoes=ov.{{ '{' + (CONCURSO_POR_CODIGO.data[0]?.lista_de_vagas || []).join(',') + '}' }}&select=*```</pre>
###### CONCURSO_POR_CODIGO.data[0]?.lista_de_vagas é o valor extraído da última chamada de CONCURSO_POR_CODIGO

#### 🔹 PROFISSAO_POR_CPF
##### Usado na tela: Busca por Concurso
Requisição: <pre>```https://znzfjumybhqviopjrntq.supabase.co/rest/v1/Candidatos?select=profissoes&cpf=eq.{{InputCpf.text}}```</pre>
###### {{InputCpf.text}} é o valor no campo de input quando a requisição é chamada

#### 🔹 CONCURSOS_POR_PROFISSAO
##### Usado na tela: Busca por Concurso
Requisição: <pre>```https://znzfjumybhqviopjrntq.supabase.co/rest/v1/Concursos?lista_de_vagas=ov.{{ '{' + (PROFISSAO_POR_CPF.data[0]?.profissoes || []).join(',') + '}' }}&select=*```</pre>
###### PROFISSAO_POR_CPF.data[0]?.profissoes é o valor extraído da última chamada de PROFISSAO_POR_CPF

# Funcionalidades do backend em Node

### A API em Node.js 
##### A API foi construída com Express e exposta como um microserviço REST. Sua principal função é permitir a busca de concursos com base nas capacidades (profissões) de um candidato.
#### Rota disponível
| Método | Rota         | Parâmetro       | Descrição                                                                |
| ------ | ------------ | --------------- | ------------------------------------------------------------------------ |
| GET    | `/concursos` | `?capacidades=` | Retorna os concursos que exigem ao menos uma das capacidades informadas. |

#### ❓ Por que a rota /concursos?capacidades= não foi utilizada diretamente no Appsmith?
Embora essa rota esteja funcional via backend Express, optei por não integrá-la ao Appsmith por uma questão prática:
a aplicação Node.js precisaria estar ativa e rodando continuamente (ex: via Docker ou servidor externo), o que não condiz com o foco principal do desafio, que é construir soluções de forma ágil e funcional com ferramentas Low Code. 
Esta rota, na minha entrega, é uma demonstração do que podemos integrar ao Low Code, caso quisermos maior personalização do back-end, e de como os diferenciais poderiam ser aplicados em um projeto desse escopo. 

Como o Supabase já fornece uma API REST completa, todas as funcionalidades principais puderam ser implementadas sem depender de serviços externos rodando continuamente. Po 
##### Estrutura da aplicação backend 
| Camada         | Arquivo                              | Responsabilidade                                                  |
| -------------- | ------------------------------------ | ----------------------------------------------------------------- |
| **Model**      | `models/concursosModel.js`           | Realiza as consultas diretamente no banco via `pool.query`.       |
| **Service**    | `services/concursosService.js`       | Processa e trata os dados antes de enviá-los ao controller.       |
| **Controller** | `controllers/concursosController.js` | Controla as requisições da rota e envia respostas para o cliente. |
| **Route**      | `routes/concursosRoutes.js`          | Define a rota GET `/concursos` e conecta com o controller.        |

### Testes Automatizados da API `/concursos`



Utilizamos **Jest** junto com **Supertest** para validar o comportamento da rota `/concursos` e garantir a integridade da API.

#### Testes de Integração / Funcionais

Esses testes fazem requisições HTTP simuladas para a API e validam respostas completas:

- **Teste básico de status e formato:**

  - Verifica se a rota responde com status 200 e retorna um array JSON.
  - Exemplo: consulta por `capacidades=marceneiro`

- **Testes comportamentais por capacidade:**

  - Valida se a API retorna concursos contendo a capacidade solicitada.
  - Exemplos:  
    - `capacidades=padeiro`  
    - `capacidades=professor de matemática` 
  - Também verifica retorno vazio para capacidade inexistente.
 
### Como Rodar os Testes Localmente

<pre># rodando o terminal na pasta backend 
cd backend
# instalar dependencias
npm install
#rodar testes
npm test</pre>

### Os testes também são rodados a cada Commit feito via Github Actions!
#### Roda todos os testes que estiverem na pasta C:\Users\amara\Source\Repos\venhaparaleds-lowcode\backend\\\__tests__

# SonarQube
### Teste automatizados via GitHub Actions
#### Foi usado a plataforma SonarCloud (do SonarQube) para os testes, a implementação é feita via .yml (.github\workflows) + sonar-project.properties (na raiz)
#### Código não está passando no Quality Gate...
Não consegui usar o Secrets do Github para declarar a variável DATABASE_URL com segurança (apesar de ter conseguido para o Token do SonarCloud). **Isso demonstra que o sonar está cumprindo seu papel**!



![](https://raw.githubusercontent.com/appsmithorg/appsmith/release/static/appsmith_logo_primary.png)

This app is built using Appsmith. Turn any datasource into an internal app in minutes. Appsmith lets you drag-and-drop components to build dashboards, write logic with JavaScript objects and connect to any API, database or GraphQL source.

![](https://raw.githubusercontent.com/appsmithorg/appsmith/release/static/images/integrations.png)

### [Github](https://github.com/appsmithorg/appsmith) • [Docs](https://docs.appsmith.com/?utm_source=github&utm_medium=social&utm_content=appsmith_docs&utm_campaign=null&utm_term=appsmith_docs) • [Community](https://community.appsmith.com/) • [Tutorials](https://github.com/appsmithorg/appsmith/tree/update/readme#tutorials) • [Youtube](https://www.youtube.com/appsmith) • [Discord](https://discord.gg/rBTTVJp)

##### You can visit the application using the below link

###### [![](https://assets.appsmith.com/git-sync/Buttons.svg) ](https://rodolfoverdandi.appsmith.com/applications/686b4a05fe5b092acdedb632/pages/686b4a05fe5b092acdedb635) [![](https://assets.appsmith.com/git-sync/Buttons2.svg)](https://rodolfoverdandi.appsmith.com/applications/686b4a05fe5b092acdedb632/pages/686b4a05fe5b092acdedb635/edit)
