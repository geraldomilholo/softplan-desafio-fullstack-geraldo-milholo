# Desafio implementador fullstack

### Desafio
- Desenvolver uma aplicação web responsável por gerenciar processos.
- *Soluções parcias serão aceitas.*
- Visão de administrador
	- Incluir, excluir, atualizar e visualizar usuários,
- Visão de usuário-triador
	- Incluir e visualizar processos,
	- Atribuir um ou mais usuários a realizar um Parecer sobre um processo,
- Visão de usuário-finalizador
	- Visualizar processos Pendentes de Parecer.
	- Incluir o Parecer sobre o processo.

### Escopo do desafio
- Documentar todas suposições realizadas.
- Desenvolver os módulos de frontend e backend de forma separada.
- O desenvolvimento do backend deve ser feito em Java.
- O desenvolvimento do frontend pode utilizar JavaScript e qualquer framework ou ferramenta que suportem ou utilizem estas tecnologias.
- Preferencialmente utilizar Spring Boot 1.5+ com toda sua stack para o desenvolvimento do backend.
- Preferencialmente utilizar React para o desenvolvimento do frontend.
- É aceitável utilizar algumas respostas estáticas em determinadas porções da aplicação.
- Não é necessário submeter uma aplicação que cumpra cada um dos requisitos descritos, mas o que for submetido deve funcionar.

# Desenvolvimento

## Estrutura

- softplan-app
  
  - Aplicação frontend ([Veja mais](softplan-app/README.md))

- softplan-server

  - Aplicação backend ([Veja mais](softplan-server/README.md))

- database

  - Banco de dados postgres no docker

## Executando a aplicação

1. Criar banco de dados

```shel
$ cd database && docker-compose up -d
```

2. Executar o backend

```shel
$ cd .. && cd softplan-server && mvn spring-boot:run
```

3. Executar o frontend

```shel
$ cd softplan-app && yarn && yarn start
```

## Scripts de Inserção de Dados

Ao subir, o backend roda 4 scripts utilizando o [flyway](https://flywaydb.org/).

1. V1__creates_tables.sql - Criação das tabelas do sistema
	- role;
	- user;
	- process;
	- user_process.

2. V2__populate_role_table.sql - Popula a tabela de roles:
	- Role para usuário administrador (**ADMIN**)
	- Role para usuário-triador (**TRIADOR**)
	- Role para usuário-finalizador (**FINALIZADOR**)

3. V3__populate_user_table.sql - Popula a tabela de user com os seguintes valores:
	- **Nome**: Administrador, **E-mail**: admin@softplan.com, **Senha**: password
	- **Nome**: Usuário-triador, **E-mail**: triador@softplan.com, **Senha**: password
	- **Nome**: Usuário-triador 2, **E-mail**: triador2@softplan.com, **Senha**: password
	- **Nome**: Usuário-finalizador, **E-mail**: finalizador@softplan.com, **Senha**: password
	- **Nome**: Usuário-finalizador 2, **E-mail**: finalizador2@softplan.com, **Senha**: password
	- **Nome**: Usuário-finalizador 3, **E-mail**: finalizador3@softplan.com, **Senha**: password

4. V4__populate_process_and_user_process_tables.sql - Popula a tabela de process e user_process, com os seguintes valores:
	- Processo com Parecer:
		- **Nome**: Processo 1, **Parecer**: **Parecer** do processo 1, **Pendente**: false
		- **Nome**: Processo 2, **Parecer**: **Parecer** do processo 2, **Pendente**: false
		- **Nome**: Processo 3, **Parecer**: **Parecer** do processo 3, **Pendente**: false
	
	- Processo sem Parecer:
		- **Nome**: Processo 4, **Parecer**: null, **Pendente**: true
		- **Nome**: Processo 5, **Parecer**: null, **Pendente**: true
		- **Nome**: Processo 6, **Parecer**: null, **Pendente**: true

	- Usuário-Processo (Vinculação):
		- **Usuário-finalizador** está vinculado com os processos **Processo 1, Processo 2, Processo 3, Processo 4, Processo 5**
		- **Usuário-finalizador 2** está vinculado com os processos **Processo 4, Processo 5, Processo 6**
		- **Usuário-finalizador 3** está vinculado apenas com **Processo 4**

Portanto, ao logar com os usuários finalizadores os processo que devem aparecer para cada um é:

- **Usuário-finalizador** deve ver os processos **Processo 4** e **Processo 5**.

- **Usuário-finalizador 2** deve ver os processos **Processo 4**, **Processo 5** e **Processo 6**.

- **Usuário-finalizador 3** deve ver apenas o processo **Processo 4**.
