const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Testa productsModels e sua interação com um db', () => {

  describe('Testa função getAll se não existirem produtos.', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getAll(); 
      expect(result).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const result = await productModel.getAll(); 
      expect(result).to.be.empty;
    });

  })

  describe('Testa função getAll se existirem produtos.', () => {
    const response = { 
      id: 1, name: 'Martelo de Thor', quantity: 10
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves([response]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um object', async () => {
      const result = await productModel.getAll(); 
      expect(result).to.be.an('object');
    });

    it('retorna um array de objeto', async () => {
      const result = await productModel.getAll(); 
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const result = await productModel.getAll(); 
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });

    it('retorna um objeto com as tipos de informações corretas', async () => {
      const result = await productModel.getById(); 
      expect(result.id).to.be.an('number');
      expect(result.name).to.be.an('string');
      expect(result.quantity).to.be.an('number');
    });

  })

  describe('Testa função getById se não existirem produtos.', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getById(); 
      expect(result).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const result = await productModel.getById(); 
      expect(result).to.be.empty;
    });

  })

  describe('Testa função getById se existirem produtos.', () => {
    const response = { 
      id: 1, name: 'Martelo de Thor', quantity: 10
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves([[response]]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getById(); 
      expect(result[0]).to.be.an('object');
    });

    it('retorna um array de objeto', async () => {
      const result = await productModel.getById(); 
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const result = await productModel.getById(); 
      expect(result[0]).to.have.all.keys('id', 'name', 'quantity');
    });

    it('retorna um único objeto', async () => {
      const result = await productModel.getById(); 
      expect(result).to.have.lengthOf(1); 
    });

    it('retorna um único objeto com as tipos de informações corretas', async () => {
      const result = await productModel.getById(); 
      expect(result[0].id).to.be.an('number');
      expect(result[0].name).to.be.an('string');
      expect(result[0].quantity).to.be.an('number');
    });

    it('a propriedade quantity deve ser um número maior que 0', async () => {
      const result = await productModel.getById();
      expect(result[0].quantity).to.be.an('number');
      expect(result[0].quantity).to.be.above(0);

    });

    it('a propriedade name deve ser ter pelo menos 5 caracteres', async () => {
      const result = await productModel.getById();
      expect(result[0].name.length).to.be.above(4);
      expect(result[0].name).to.be.an('string');
    }); 
    
  })

  describe('Testa função getByName se não existirem produtos.', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getByName(); 
      expect(result).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const result = await productModel.getByName(); 
      expect(result).to.be.empty;
    });

  })

  describe('Testa função getByName se existirem produtos.', () => {
    const response = { 
      id: 1, name: 'Martelo de Thor', quantity: 10
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves([response]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getByName(); 
      expect(result).to.be.an('object');
    });

    it('retorna um array de objeto', async () => {
      const result = await productModel.getByName(); 
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const result = await productModel.getByName(); 
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });

    it('retorna um objeto com as tipos de informações corretas', async () => {
      const result = await productModel.getByName(); 
      expect(result.id).to.be.an('number');
      expect(result.name).to.be.an('string');
      expect(result.quantity).to.be.an('number');
    });

  })

  describe('Testa função create se existirem existirem produtos.', () => {

    const name = "Dark Hold";
    const quantity = 20;
    const response = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 5,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }

    before(() => {
      sinon.stub(connection, 'execute').resolves([response]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um object', async () => {
      const result = await productModel.create(name, quantity);
      expect(result).to.be.a('object');
    });

    it('retorna um array de objeto', async () => {
      const result = await productModel.create(name, quantity);
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const result = await productModel.create(name, quantity);
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });

    it('retorna um objeto com as tipos de informações corretas', async () => {
      const result = await productModel.create(name, quantity);
      expect(result.id).to.be.an('number');
      expect(result.name).to.be.an('string');
      expect(result.quantity).to.be.an('number');
    });

    it('a propriedade quantity deve ser um número maior que 0', async () => {
      const result = await productModel.create(name, quantity);
      expect(result.quantity).to.be.an('number');
      expect(result.quantity).to.be.above(0);
    });

    it('a propriedade name deve ser ter pelo menos 5 caracteres', async () => {
      const result = await productModel.create(name, quantity);
      expect(result.name.length).to.be.above(4);
      expect(result.name).to.be.an('string');
    }); 

  })

  describe('Testa função update se existirem produtos.', () => {

    const name = "Dark Hold";
    const quantity = 20;
    const id = 1;
    const response = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 5,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }

    before(() => {
      sinon.stub(connection, 'execute').resolves([response]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um object', async () => {
      const result = await productModel.update(id, name, quantity);
      expect(result).to.be.a('object');
    });

    it('retorna um array de objeto', async () => {
      const result = await productModel.update(id, name, quantity);
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const result = await productModel.update(id, name, quantity);
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });

    it('retorna um objeto com as tipos de informações corretas', async () => {
      const result = await productModel.update(id, name, quantity);
      expect(result.id).to.be.an('number');
      expect(result.name).to.be.an('string');
      expect(result.quantity).to.be.an('number');
    });

    it('a propriedade quantity deve ser um número maior que 0', async () => {
      const result = await productModel.update(id, name, quantity);
      expect(result.quantity).to.be.an('number');
      expect(result.quantity).to.be.above(0);
    });

    it('a propriedade name deve ser ter pelo menos 5 caracteres', async () => {
      const result = await productModel.update(id, name, quantity);
      expect(result.name.length).to.be.above(4);
      expect(result.name).to.be.an('string');
    }); 
  })

  describe('Testa função remove se existirem produtos.', () => {
    const response = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }

    before(() => {
      sinon.stub(connection, 'execute').resolves([response]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um object', async () => {
      const result = await productModel.remove();
      expect(result).to.be.a('object');
    });

    it('retorna um array de objeto', async () => {
      const result = await productModel.remove();
      expect(result).not.to.be.empty;
    });

  })
})

