const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Testa salesController e sua interação com um db', () => {

  describe('Testa função getAll se não existirem produtos.', () => {
    const response = {};
    const request = {};
    const jsonRes = { message: 'No sales' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves();
    })

    after(() => {
      salesService.getAll.restore();
    })

    it('retorna o status 404 quando tudo da certo', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('retorna um json de erro quando tudo da certo', async () => {
      await salesController.getAll(request, response);
      expect(response.json.calledWith(jsonRes)).to.be.equal(true);
    });
  })

  describe('Testa função getAll se existirem produtos.', () => {
    const response = {};
    const request = {};
    const mockRes = [
      {
        saleId: 1,
        date: "2022-05-11T00:23:44.000Z",
        productId: 1,
        quantity: 5
      }
    ]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves(mockRes)
    })

    after(() => {
      salesService.getAll.restore();
    })

    it('retorna o status 200 quando tudo da certo', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um json com array de objeto quando tudo da certo', async () => {
      await salesController.getAll(request, response);
      expect(response.json.calledWith(mockRes)).to.be.equal(true);
    });
  });

  describe('Testa função getById se não existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params = {id: 2};
    const jsonRes = { message: 'Sale not found' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves([]);
    })

    after(() => {
      salesService.getById.restore();
    })

    it('retorna o status 404 quando tudo da certo', async () => {
      await salesController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('retorna um json de erro quando tudo da certo', async () => {
      await salesController.getById(request, response);
      expect(response.json.calledWith(jsonRes)).to.be.equal(true);
    });
  })

  describe('Testa função getById se existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params = {id: 1};
    const mockRes = [
      {
        "date": "2022-05-11T22:50:50.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "date": "2022-05-11T22:50:50.000Z",
        "productId": 2,
        "quantity": 10
      }
    ]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves(mockRes)
    })

    after(() => {
      salesService.getById.restore();
    })

    it('retorna o status 200 quando tudo da certo', async () => {
      await salesController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um json com array de objeto quando tudo da certo', async () => {
      await salesController.getById(request, response);
      expect(response.json.calledWith(mockRes)).to.be.equal(true);
    });
  });

  describe('Testa função create se existirem produtos.', () => {
    const response = {};
    const request = {};
    request.body = [
      {
        "productId": 1,
        "quantity": 3
      }
    ];
    const mockRes = {
      "id": 3,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    }

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'create').resolves(mockRes)
    })

    after(() => {
      salesService.create.restore();
    })

    it('retorna o status 201 quando tudo da certo', async () => {
      await salesController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um json com um objeto quando tudo da certo', async () => {
      await salesController.create(request, response);
      expect(response.json.calledWith(mockRes)).to.be.equal(true);
    });
  });

  describe('Testa função update se existirem produtos.', () => {
    const response = {};
    const request = {};
    request.params = {id: 2} 
    request.body = [
      {
        "productId": 1,
        "quantity": 3
      }
    ];
    const mockRes = {
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    }
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'update').resolves(mockRes)
    })

    after(() => {
      salesService.update.restore();
    })

    it('retorna o status 200 quando tudo da certo', async () => {
      await salesController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto quando tudo da certo', async () => {
      await salesController.update(request, response);
      expect(response.json.calledWith(mockRes)).to.be.equal(true);
    });
  });
}) 