# Boas-vindas ao repositório do Projeto Store Manager!

# Entregáveis

<details>
  <summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary><br />

  Você vai desenvolver sua primeira API utilizando a arquitetura MSC (model-service-controller)!

  A API a ser construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar pr`odutos e vendas.

  Você deverá utilizar o banco MySQL para a gestão de dados. Além disso, a API deve ser RESTful.

  <br />
</details>

# Funcionamento

<details>
  <summary><strong>⚠️ Observações importantes</strong></summary><br />

  * Os testes presentes na pasta `tests` são da Trybe e estão presentes no projeto unicamente para fins de minha aprendizagem;
  
  * Os testes na pasta `utils` foram desenvolvidos por mim usando `mocha`, `sinon` e `chai`;
  
  - A pessoa usuária, independente de cadastro ou login, consegue:

    - Adicionar, ler, deletar e atualizar produtos no estoque;

    - Enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe;

    - Ler, deletar e atualizar venda.

  - Para **todos os endpoints** garante que:

    - Caso o recurso **não seja encontrado**, **aconteça um erro** ou **haja dados inválidos** na sua requisição, sua API deve retornar o status HTTP adequado com o body `{ message: <mensagem de erro> }`;

    - Todos os retornos de erro devem seguir o mesmo formato.

   <br />
 </details>



<details>
  <summary><strong>📥 Todos os endpoints estão no padrão REST</strong></summary><br />

  - Uso os verbos HTTP adequados para cada operação;

  - Agrupando e padronizando suas URL em cada recurso;

  - Garantindo que os endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não;

  - E retorna os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

  <br />
</details>


