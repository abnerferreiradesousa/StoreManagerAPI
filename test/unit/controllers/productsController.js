const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Testa productController e sua interação com um db', () => {

  describe('Testa função getAll se não existirem produtos.', () => {
    const response = {};
    const request = {};
    const jsonRes = { message: 'No products' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves()
    })

    after(() => {
      productService.getAll.restore();
    })

    it('retorna o status 404 quando tudo da certo', async () => {
      await productController.getAll(request, response); 
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('retorna um json de erro quando tudo da certo', async () => {
      await productController.getAll(request, response); 
      expect(response.json.calledWith(jsonRes)).to.be.equal(true);
    });
  }) 

  describe('Testa função getAll se existirem produtos.', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves([])
    })

    after(() => {
      productService.getAll.restore();
    })

    it('retorna o status 200 quando tudo da certo', async () => {
      await productController.getAll(request, response); 
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um json com array vazio quando tudo da certo', async () => {
      await productController.getAll(request, response); 
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  }) 

  describe('Testa função getById se não existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params = {id: 2};
    const jsonRes = { message: 'Product not found' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves([])
    })

    after(() => {
      productService.getById.restore();
    })

    it('retorna o status 404 quando tudo da certo', async () => {
      await productController.getById(request, response); 
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('retorna um json de erro quando tudo da certo', async () => {
      await productController.getById(request, response); 
      expect(response.json.calledWith(jsonRes)).to.be.equal(true);
    });
  }) 

  describe('Testa função getById se existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params = {id: 2};
    const mockRes = [
      { 
        id: 1, name: 'Martelo de Thor', quantity: 10
      }
    ]
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves(mockRes)
    })

    after(() => {
      productService.getById.restore();
    })

    it('retorna o status 200 quando tudo da certo', async () => {
      await productController.getById(request, response); 
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um json com array de objeto quando tudo da certo', async () => {
      await productController.getById(request, response); 
      expect(response.json.calledWith(mockRes[0])).to.be.equal(true);
    });
  })

  describe('Testa função create se não existirem produtos.', () => {
    const response = {};
    const request = {};
    request.body = { name: 'Dark Hold' };
    request.body = { quantity: 10 };

    const objError = { status: 409, message: 'Product already exists' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'create').resolves(objError)
    })

    after(() => {
      productService.create.restore();
    })

    it('retorna o status 409 quando tudo da certo', async () => {
      await productController.create(request, response); 
      expect(response.status.calledWith(objError.status)).to.be.equal(true);
    });

    it('retorna um json de erro quando tudo da certo', async () => {
      await productController.create(request, response);
      expect(response.json.calledWith({message: objError.message})).to.be.equal(true);
    });
  }) 

  describe('Testa função create se existirem produtos.', () => {
    const response = {};
    const request = {};
    request.body = { name: 'Dark Hold' };
    request.body = { quantity: 10 };
    const mockRes = [
      { 
        id: 1, name: 'Martelo de Thor', quantity: 10
      }
    ]
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'create').resolves(mockRes)
    })

    after(() => {
      productService.create.restore();
    })

    it('retorna o status 201 quando tudo da certo', async () => {
      await productController.create(request, response); 
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um json com array de objeto quando tudo da certo', async () => {
      await productController.create(request, response); 
      expect(response.json.calledWith(mockRes)).to.be.equal(true);
    });
  }) 

  describe('Testa função update se não existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params= {id: 2};
    request.body = { name: 'Dark Hold' };
    request.body = { quantity: 10 };

    const objError = { status: 404, message: 'Product not found' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'update').resolves(objError)
    })

    after(() => {
      productService.update.restore();
    })

    it('retorna o status 404 quando tudo da certo', async () => {
      await productController.update(request, response); 
      expect(response.status.calledWith(objError.status)).to.be.equal(true);
    });

    it('retorna um json de erro quando tudo da certo', async () => {
      await productController.update(request, response);
      expect(response.json.calledWith({message: objError.message})).to.be.equal(true);
    });
  }) 

  describe('Testa função update se existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params= {id: 2};
    request.body = { name: 'Dark Hold' };
    request.body = { quantity: 10 };
    const mockRes = [
      { 
        id: 1, name: 'Martelo de Thor', quantity: 10
      }
    ]
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'update').resolves(mockRes)
    })

    after(() => {
      productService.update.restore();
    })

    it('retorna o status 200 quando tudo da certo', async () => {
      await productController.update(request, response); 
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um json com array de objeto quando tudo da certo', async () => {
      await productController.update(request, response); 
      expect(response.json.calledWith(mockRes)).to.be.equal(true);
    });
  }) 

  describe('Testa função remove se não existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params= {id: 2};

    const objError = { status: 404, message: 'Product not found' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'remove').resolves(objError)
    })

    after(() => {
      productService.remove.restore();
    })

    it('retorna o status 404 quando tudo da certo', async () => {
      await productController.remove(request, response); 
      expect(response.status.calledWith(objError.status)).to.be.equal(true);
    });

    it('retorna um json de erro quando tudo da certo', async () => {
      await productController.remove(request, response);
      expect(response.json.calledWith({message: objError.message})).to.be.equal(true);
    });
  }) 

  describe('Testa função remove se existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params= {id: 2};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      response.send = sinon.stub().returns();
      sinon.stub(productService, 'remove').resolves([])
    })

    after(() => {
      productService.remove.restore();
    })

    it('retorna o status 204 quando tudo da certo', async () => {
      await productController.remove(request, response); 
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  }) 
})