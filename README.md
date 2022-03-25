# rentX

## Sumário

1. [Informações gerais do projeto](#informacoes-gerais)

2. [Requisitos da aplicação](#requisitos-aplicacao)

   2.1. [Cadastro de carros](#cadastro-carros)

   2.2. [Listagem de carros](#listagem-carros)

   2.3. [Cadastro de especificação para um carro](#cadastro-especificacoes)

   2.4. [Cadastro de imagens para um carro](#cadastro-imagens-carro)

   2.5. [Aluguel de carro](#aluguel-carro)

   2.6. [Devolução de carro](#devolucao-carro)

   2.7. [Listagem de aluguéis](#listagem-alugueis)

3. [Comandos principais](#comandos-principais)

   3.1. [Virtualização com Docker](#docker)

   3.2. [Banco de dados](#database)

## Informações gerais do projeto <a name="informacoes-gerais" />

A car's renting application

## Requisitos da aplicação <a name="requisitos-aplicacao" />

### Cadastro de carros <a name="cadastro-carros" />

#### Requisitos funcionais

- [x] Deve ser possível cadastrar um novo carro.

#### Regras de negócio

- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O carro deve ser cadastrado, por padrão, com disponibilidade.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

### Listagem de carros <a name="listagem-carros" />

#### Requisitos funcionais

- [ ] Deve ser possível listar todos os carros disponíveis.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

#### Regras de negócio

- [ ] O usuário não precisa estar logado no sistema.

### Cadastro de especificação para um carro <a name="cadastro-especificacoes" />

#### Requisitos funcionais

- [ ] Deve ser possível cadastrar uma especificação para um carro.

#### Regras de negócio

- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador.

### Cadastro de imagens para um carro <a name="cadastro-imagens-carro" />

#### Requisitos funcionais

- [ ] Deve ser possível cadastrar a imagem do carro.

#### Requisitos não-funcionais

- [ ] Deve utilizar o Multer para upload dos arquivos.

#### Regras de negócio

- [ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [ ] O usuário responsável deve ser um usuário administrador.

### Aluguel de carro <a name="aluguel-carro" />

#### Requisitos funcionais

- [x] Deve ser possível cadastrar um aluguel.

#### Regras de negócio

- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo carro.
- [x] O usuário deve estar logado na aplicação.
- [x] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

### Devolução de carro <a name="devolucao-carro" />

#### Requisitos funcionais

- [x] Deve ser possível realizar a devolução de um carro.

#### Regras de negócio

- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- [x] Caso haja multa, deverá ser somado ao total do aluguel.
- [x] O usuário deve estar logado na aplicação.

### Listagem de aluguéis para usuário <a name="listagem-alugueis" />

#### Requisitos funcionais

- [x] Deve ser possível a busca de todos os aluguéis para o usuário.

#### Regras de negócio

- [x] O usuário deve estar logado na aplicação.

## Comandos principais <a name="comandos-principais" />

### Virtualização com Docker <a name="docker" />

#### Para criar a imagem

```
docker build -t rentx .
```

#### Para executar o container

```
docker run -p 3333:3333 rentx
```

#### Para subir os serviços com o Docker-compose

Os dois comandos anteriores não são necessários caso use o Docker-compose.

```
docker-compose up
```

Para subir os serviços em background:

```
docker-compose up -d
```

### Banco de dados <a name="database" />

#### Criar uma migration

```
yarn typeorm migration:create -n <MIGRATION_NAME>
```

#### Executar as migrations

```
yarn typeorm migration:run
```

#### Reverter migration

```
yarn typeorm migration:revert
```

## Built With

- [NodeJS](https://nodejs.org/en/) - Build the server
- [AWS](https://aws.amazon.com/pt/) - IaaS used in the production
- [GitHub](https://github.com/GabrielMorettii/ignite_rentx/actions) - CI + CD
- [express](https://expressjs.com/) - Router of the Application
- [postgreSQL](https://www.postgresql.org/) - Relational Database
- [pm2](https://pm2.keymetrics.io/) - Process Manager used in the production
- [dotenv](https://github.com/motdotla/dotenv) - Environment loader
- [multer](https://github.com/expressjs/multer) - File Upload
- [eslint](https://eslint.org/) - JS Linter and code style
- [JEST](https://jestjs.io/) - Tests
- [prettier](https://github.com/prettier/prettier) - Code formatter
- [super-test](https://github.com/visionmedia/supertest) - Test HTTP requests

## Support tools

- [Amazon SES](https://aws.amazon.com/pt/ses/) - Email Provider
- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: gabrielmorettisilva@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/gabriel-morettii/)

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/GabrielMorettii/ignite_rentx/blob/main/LICENSE) file for details.