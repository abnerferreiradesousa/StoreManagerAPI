const productService = require('../../../services/productService');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Testa productsServices e sua interação com um db', () => {

  describe('Testa função getAll se não existirem produtos.', () => {

    before(() => {
      sinon.stub(productService, 'getAll').resolves([[]]);
    })

    after(() => {
      productService.getAll.restore();
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
      sinon.stub(productService, 'getAll').resolves([response]);
    })

    after(() => {
      productService.getAll.restore();
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
      sinon.stub(productService, 'getById').resolves([[]]);
    })

    after(() => {
      productService.getById.restore();
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
      sinon.stub(productService, 'getById').resolves([response]);
    })

    after(() => {
      productService.getById.restore();
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
})