# Boas-vindas ao repositório do Projeto Store Manager!

# Entregáveis

<details>
  <summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary><br />

  Você vai desenvolver sua primeira API utilizando a arquitetura MSC (model-service-controller)!

  A API a ser construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas.

  Você deverá utilizar o banco MySQL para a gestão de dados. Além disso, a API deve ser RESTful.

  <br />
</details>

# Orientações

<details>
  <summary><strong>⚠️ Observações importantes</strong></summary><br />

  - A pessoa usuária, independente de cadastro ou login, deve conseguir:

    - Adicionar, ler, deletar e atualizar produtos no estoque;

    - Enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe;

    - Ler, deletar e atualizar venda.

  - Para **todos os endpoints** garanta que:

    - Caso o recurso **não seja encontrado**, **aconteça um erro** ou **haja dados inválidos** na sua requisição, sua API deve retornar o status HTTP adequado com o body `{ message: <mensagem de erro> }`;

    - Todos os retornos de erro devem seguir o mesmo formato.

   <br />
 </details>



<details>
  <summary><strong>📥 Todos os seus endpoints devem estar no padrão REST</strong></summary><br />

  - Use os verbos HTTP adequados para cada operação;

  - Agrupe e padronize suas URL em cada recurso;

  - Garanta que seus endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não;

  - E retorne os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

  <br />
</details>


