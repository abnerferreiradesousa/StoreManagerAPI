const productService = require('../../../services/productService')
const productModel = require('../../../models/productModel')

const { expect } = require('chai');
const sinon = require('sinon');

describe('Testa productsServices e sua interação com um db', () => {

  describe('Testa função getAll se não existirem produtos.', () => {

    before(() => {
      sinon.stub(productModel, 'getAll').resolves([[]]);
    })

    after(() => {
      productModel.getAll.restore();
    })

    it('retorna um array', async () => {
      const result = await productService.getAll(); 
      expect(result).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const [result] = await productService.getAll(); 
      expect(result).to.be.empty;
    });
  })

  describe('Testa função getAll se existirem produtos.', () => {
    const response = { 
        id: 1, name: 'Martelo de Thor', quantity: 10
      };

    before(() => {
      sinon.stub(productModel, 'getAll').resolves([response]);
    })

    after(() => {
      productModel.getAll.restore();
    })

    it('retorna um object', async () => {
      const [result] = await productService.getAll(); 
      expect(result).to.be.an('object');
    });

    it('retorna um array de objeto', async () => {
      const [result] = await productService.getAll(); 
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const [result] = await productService.getAll(); 
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });
  })

  describe('Testa função getById se não existirem produtos.', () => {

    before(() => {
      sinon.stub(productModel, 'getById').resolves([[]]);
    })

    after(() => {
      productModel.getById.restore();
    })

    it('retorna um array', async () => {
      const result = await productService.getById(); 
      expect(result).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const [result] = await productService.getById(); 
      expect(result).to.be.empty;
    });
  })

  describe('Testa função getById se existirem produtos.', () => {
    const response = { 
        id: 1, name: 'Martelo de Thor', quantity: 10
      };

    before(() => {
      sinon.stub(productModel, 'getById').resolves([response]);
    })

    after(() => {
      productModel.getById.restore();
    })

    it('retorna um object', async () => {
      const [result] = await productService.getById(); 
      expect(result).to.be.an('object');
    });

    it('retorna um array de objeto', async () => {
      const [result] = await productService.getById(); 
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const [result] = await productService.getById(); 
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });
  })

  describe('Testa função create se já existir um produto com mesmo nome existirem produtos.', () => {
    const response = {};
    const request = {};
    const name = 'Dark Hold';
    const quantity = 10;

    const objError = { status: 409, message: 'Product already exists' };
    before(() => {
      sinon.stub(productModel, 'create').resolves([])
      sinon.stub(productModel, 'getByName').resolves([{}])
    })

    after(() => {
      productModel.create.restore();
      productModel.getByName.restore();
    })

    it('retorna um objeto com duas chaves status e message quando tudo da certo', async () => {
      const result = await productService.create(name, quantity);
      expect(result).to.have.all.keys('status', 'message');
      expect(result).to.be.an('object');

    });
  }) 

  describe('Testa função create se não existir um produto com mesmo nome.', () => {
    const response = {};
    const request = {};
    const name = 'Dark Hold';
    const quantity = 10;

    const objError = { status: 409, message: 'Product already exists' };
    const responseObj = {
      id: 1, name, quantity
    }

    before(() => {
      sinon.stub(productModel, 'create').resolves(responseObj)
      sinon.stub(productModel, 'getByName').resolves([])
    })

    after(() => {
      productModel.create.restore();
      productModel.getByName.restore();
    })


    it('retorna um object', async () => {
      const result = await productService.create(name, quantity);
      expect(result).to.be.a('object');
    });

    it('retorna um array de objeto', async () => {
      const result = await productService.create(name, quantity);
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const result = await productService.create(name, quantity);
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });

    it('retorna um objeto com as tipos de informações corretas', async () => {
      const result = await productService.create(name, quantity);
      expect(result.id).to.be.an('number');
      expect(result.name).to.be.an('string');
      expect(result.quantity).to.be.an('number');
    });

    it('a propriedade quantity deve ser um número maior que 0', async () => {
      const result = await productService.create(name, quantity);
      expect(result.quantity).to.be.an('number');
      expect(result.quantity).to.be.above(0);
    });

    it('a propriedade name deve ser ter pelo menos 5 caracteres', async () => {
      const result = await productService.create(name, quantity);
      expect(result.name.length).to.be.above(4);
      expect(result.name).to.be.an('string');
    }); 
  })

  describe('Testa função update se não existirem produtos com id informado.', () => {

    const name = "Dark Hold";
    const quantity = 20;
    const id = 1;
    const objError = { status: 404, message: 'Product not found' };

    before(() => {
      sinon.stub(productModel, 'create').resolves()
      sinon.stub(productModel, 'getById').resolves([])
    })

    after(() => {
      productModel.create.restore();
      productModel.getById.restore();
    })

    it('retorna um object de erro ', async () => {
      const result = await productService.update(id, name, quantity);
      expect(result).to.be.a('object');
      expect(result).to.have.all.keys('status', 'message');
    });
  });

  describe('Testa função update se existirem produtos com id informado.', () => {

    const name = "Dark Hold";
    const quantity = 20;
    const id = 1;
    const response = { id, name, quantity }

    before(() => {
      sinon.stub(productModel, 'update').resolves(response)
      sinon.stub(productModel, 'getById').resolves([response])
    })

    after(() => {
      productModel.update.restore();
      productModel.getById.restore();
    })

    it('retorna um objeto', async () => {
      const result = await productService.update(id, name, quantity);
      expect(result).to.be.a('object');
      expect(result).not.to.be.empty;
    });

    it('o objeto contém as propriedades id, name e quantity', async () => {
      const result = await productService.update(id, name, quantity);
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });

    it('retorna um objeto com as tipos de informações corretas', async () => {
      const result = await productService.update(id, name, quantity);
      expect(result.id).to.be.an('number');
      expect(result.name).to.be.an('string');
      expect(result.quantity).to.be.an('number');
    });

    it('a propriedade quantity deve ser um número maior que 0', async () => {
      const result = await productService.update(id, name, quantity);
      expect(result.quantity).to.be.an('number');
      expect(result.quantity).to.be.above(0);
    });

    it('a propriedade name deve ser ter pelo menos 5 caracteres', async () => {
      const result = await productService.update(id, name, quantity);
      expect(result.name.length).to.be.above(4);
      expect(result.name).to.be.an('string');
    }); 
  })
})