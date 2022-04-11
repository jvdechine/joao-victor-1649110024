
# To Do App (Vibbra)

Projeto realizado para seleção da Vibbra.

O objetivo era criar uma aplicação para criação e edição de tarefas (To Do's) onde fosse possível compartilhar este To Do
com outras pessoas, através de um link único.
## Stack utilizada

**Front-end:** Angular 11+, Plugin ngx-dnd (Arraste e solte), Node (Para a parte de hospedagem)

**Back-end:** Node, Express

**Banco de Dados:** Mongo DB


## Documentação

No link abaixo é possível encontrar a documentação de todos os métodos utilizados pelo front-end, 
além de ser possível criar uma coleção do postman diretamente, para que sejam realizados testes na API.

[Documentação](https://documenter.getpostman.com/view/11678602/UVyysCNQ)


## Funcionalidades

- Criação de To Do de forma simplificada, permitindo compartilhamento do mesmo via URL ou E-mail
- Criação de Itens dentro do To Do para organizar a entrega do To Do como um todo. É permitido arrastar e soltar itens para organiza-los
entre si.
- Marcar Itens do To Do como feitos, permitindo uma visualização simplificada do que ainda não está concluído.
- Totalmente responsivo. Utilize de onde estiver.


## Demonstração

Insira um gif ou um link de alguma demonstração


## Variáveis de Ambiente da API

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`CONNECTIONSTRING` - String de conexão com o banco de dados (Mongo DB).

`JWT_KEY` - Chave do JWT para criação de tokens seguros de autorização e autenticação.


## Rodando localmente a API

Clone o projeto

```bash
  git clone https://git.vibbra.com.br/joao-victor-1649110024/selection
```

Entre no diretório do projeto

```bash
  cd backend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Variáveis de Ambiente do Frontend

Para rodar esse projeto, você vai precisar adicionar a seguinte variável de ambiente no seu arquivo environments

`apiUrl` - URL da API (Pode ser local ou a API hospedada).


## Rodando localmente o frontend

Clone o projeto

```bash
  git clone https://git.vibbra.com.br/joao-victor-1649110024/selection
```

Entre no diretório do projeto

```bash
  cd frontend/toDo
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  ng serve
```


## Deploy

Pode ser feito o deploy através de qualquer infra que permita um deploy a partir do GIT.

No caso, utilizei a hospedagem da VERCEL, que necessita que utilize sua própria CLI.

Mas, foram criados tbm duas imagens que permitem fazer o deploy através do Docker:

- Backend: 
```bash
  docker push joaovictordechine/to-do-backend:latest
```
```bash
  docker run -p 3000:3000 -d joaovictordechine/to-do-backend
```

- Frontend: 
```bash
  docker push joaovictordechine/to-do-frontend:latest
```
```bash
  docker run -p 4000:4000 -d joaovictordechine/to-do-frontend
```
## Screenshots

![Página de To Do's](https://to-do-vibbra.vercel.app/assets/print-1.png)
![Modal de Cadastro de To Do's](https://to-do-vibbra.vercel.app/assets/print-2.png)
![Página de Cadastro dos itens do To Do](https://to-do-vibbra.vercel.app/assets/print-3.png)
![Modal de Cadastro dos itens dos To Do's](https://to-do-vibbra.vercel.app/assets/print-4.png)
![Página dos itens dos To Do's](https://to-do-vibbra.vercel.app/assets/print-5.png)
![Listagem de To Do's](https://to-do-vibbra.vercel.app/assets/print-6.png)


## Autores

- [@jvdechine](https://github.com/jvdechine)

