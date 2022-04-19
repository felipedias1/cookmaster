# Boas vindas ao repositório do projeto Cookmaster


## Contexto

Esta é uma aplicação back-end de um sistema de cadastro e pesquisa de receitas. Nela, será possível cadastrar usuários do tipo cliente e admin. Apenas usuários do tipo admin terão acesso a todas as receitas cadastradas; já os usuários do tipo client devem ter permissão para disparar qualquer tipo de ação apenas em suas próprias receitas cadastradas.

Através dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais íntimas 😜).

Para realizar qualquer tipo de alteração no banco de dados (como cadastro, edição ou exclusão de receitas) será necessário autenticar-se. Além disso, as pessoas usuárias devem poder ser clientes ou administradores. Pessoas clientes apenas poderão disparar ações nas receitas que ele mesmo criou. Já uma pessoa administradora pode disparar qualquer ação em qualquer receita.
Pre-requisitos para rodar o projeto:

# Pre-requisitos para rodar o projeto:
- mongoDB
- NPM
- Nodejs

Copie a chave ssh do projeto:
```
git clone git@github.com:felipedias1/cookmaster.git
```

Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:
```
git clone git@github.com:felipedias1/to-do-list.git
cd to-do-list
npm install
npm start
```
# Tecnologias

Neste projeto, foram utilizados:
- Express, 
- JWT;
- APIs REST;
- NodeJs
- MongoDB
- JavaScript
- Arquitetura MSC

# Avisos e Próximos Passos

Este projeto foi desenvolvido com o foco em BackEnd. A partir daqui, o próximo passo é desenvolver a estrutura de telas do front-End. Minha sugetão é utilizar JavaScript com React, que já testei em outras oportunidades e a integração entre as ferramentas é adequada.

Divirta-se! 😁
