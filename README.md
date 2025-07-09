# Desafio Low Code - LEDS: Consulta-Concursos
## Principais funcionalidades
1. Listar os **órgãos, códigos e editais dos concursos públicos** que se encaixam no perfil do candidato, tomando como base o seu **CPF**; 
2. Listar o **nome, data de nascimento e o CPF** dos candidatos que se encaixam no perfil do concurso tomando com base o **Código do Concurso** do concurso público;

---

# Sumário
- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
 
# Sobre

Esse proejto faz parte do **desafio Low Code - LEDS**. O objetivo da aplicação é facilitar consultas em um banco de dados, mais especificamente, facilitar o encontro de **"matchs" entre candidatos e concursos**. Isso é feito comparando as habilidades do candidato com a lista de vagas de cada concurso. A aplicação principal foi feita usando **AppSmith + Supabase**, no entanto, paralelamente, foi feita uma **API em Node.js** que também se comunica com o banco de dados.

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
| GitHub Actions  | CI para testes e deploy automatizados              |




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


# Funcionalidades

### Tela: Busca por cpf
O usuário fornece um CPF de uma pessoa na caixa de input, e o sistema retorna quais concursos aquele CPF está apto a participar.
(Comparação de profissões da pessoa com a lista dos tipos de vaga oferecidos pelo concurso)

![tela](https://imgur.com/rwny6jg)

### Tela: Busca por código de concurso:
O usuário fornece o código do concurso, e o sistema retorna quais pessoas estão aptas a participar.





![](https://raw.githubusercontent.com/appsmithorg/appsmith/release/static/appsmith_logo_primary.png)

This app is built using Appsmith. Turn any datasource into an internal app in minutes. Appsmith lets you drag-and-drop components to build dashboards, write logic with JavaScript objects and connect to any API, database or GraphQL source.

![](https://raw.githubusercontent.com/appsmithorg/appsmith/release/static/images/integrations.png)

### [Github](https://github.com/appsmithorg/appsmith) • [Docs](https://docs.appsmith.com/?utm_source=github&utm_medium=social&utm_content=appsmith_docs&utm_campaign=null&utm_term=appsmith_docs) • [Community](https://community.appsmith.com/) • [Tutorials](https://github.com/appsmithorg/appsmith/tree/update/readme#tutorials) • [Youtube](https://www.youtube.com/appsmith) • [Discord](https://discord.gg/rBTTVJp)

##### You can visit the application using the below link

###### [![](https://assets.appsmith.com/git-sync/Buttons.svg) ](https://rodolfoverdandi.appsmith.com/applications/686b4a05fe5b092acdedb632/pages/686b4a05fe5b092acdedb635) [![](https://assets.appsmith.com/git-sync/Buttons2.svg)](https://rodolfoverdandi.appsmith.com/applications/686b4a05fe5b092acdedb632/pages/686b4a05fe5b092acdedb635/edit)
