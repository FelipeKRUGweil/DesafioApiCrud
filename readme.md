Pré-requisitos
Antes de executar o projeto, é necessário ter os seguintes itens instalados em sua máquina:

Node.js (Recomendado: versão 16 ou superior)
PostgreSQL (Servidor de banco de dados)
Configuração do Ambiente
Clone o repositório:

Copiar código
git clone <url_do_repositorio>
cd sgbr-sistemas
Instale as dependências do projeto:

Copiar código
npm install
Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias. Um exemplo do arquivo .env seria:

env
Copiar código
PORT=3000
CONNECTION_STRING=postgresql://postgres:admin@localhost/SgbrSistemas
PORT é a porta que o servidor irá escutar (default: 3000).
CONNECTION_STRING é a string de conexão com o banco de dados PostgreSQL. Substitua os valores conforme necessário.
Estrutura do Projeto
arquivo.env: Contém as variáveis de ambiente.
db.js: Módulo responsável pela conexão e operações no banco de dados (CRUD de lugares).
index.js: Configuração do servidor Express e definição das rotas da API.
Como Executar
Inicie o servidor:

Copiar código
npm start
O servidor estará disponível em http://localhost:3000.

Endpoints
1. GET /places
Descrição: Lista todos os lugares cadastrados.
Parâmetros:
name (opcional): Filtra lugares pelo nome.
Exemplo de requisição:
bash
Copiar código
GET http://localhost:3000/places?name=parque
2. GET /places/
Descrição: Retorna os detalhes de um lugar específico pelo ID.
Exemplo de requisição:
bash
Copiar código
GET http://localhost:3000/places/1
3. POST /places
Descrição: Cria um novo lugar.
Corpo da requisição:
json
Copiar código
{
  "name": "Parque Nacional",
  "slug": "parque-nacional",
  "city": "São Paulo",
  "state": "SP"
}
Exemplo de requisição:

Copiar código
POST http://localhost:3000/places
4. PATCH /places/
Descrição: Atualiza um lugar existente pelo ID.
Corpo da requisição:
json
Copiar código
{
  "name": "Parque Estadual",
  "slug": "parque-estadual",
  "city": "São Paulo",
  "state": "SP"
}
Exemplo de requisição:

Copiar código
PATCH http://localhost:3000/places/1
5. DELETE /places/
Descrição: Exclui um lugar pelo ID.
Exemplo de requisição:

Copiar código
DELETE http://localhost:3000/places/1
Funcionalidades
Conexão com o Banco de Dados
A conexão com o banco de dados é gerenciada pela função connect() no arquivo db.js. A primeira vez que o servidor é iniciado, ele verifica se já existe uma conexão global. Se não, uma nova conexão é criada utilizando a string de conexão fornecida no arquivo .env.

CRUD de Lugares
As funções selectPlaces(), selectPlaceById(), insertPlace(), updatePlace() e deletePlace() são responsáveis pelas operações de CRUD no banco de dados.

selectPlaces(): Retorna todos os lugares, com possibilidade de filtragem por nome.
selectPlaceById(): Retorna um lugar específico pelo ID.
insertPlace(): Insere um novo lugar.
updatePlace(): Atualiza um lugar existente.
deletePlace(): Exclui um lugar.
Exceções e Erros
Se um lugar não for encontrado (por exemplo, ao tentar obter, atualizar ou excluir um lugar com um ID inexistente), a API retornará um erro 404.