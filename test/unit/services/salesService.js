const salesService = require('../../../services/salesService')
const salesModel = require('../../../models/salesModel')

const { expect } = require('chai');
const sinon = require('sinon');

describe('Testa salesServices e sua interação com um db', () => {

  describe('Testa função getAll se não existirem produtos.', () => {

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([]);
    })

    after(() => {
      salesModel.getAll.restore();
    })

    it('retorna um array', async () => {
      const result = await salesService.getAll(); 
      expect(result).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const result = await salesService.getAll(); 
      expect(result).to.be.empty;
    });

  })

  describe('Testa função getAll Se existirem produtos', () => {
    const response = [
      {
        sale_id: 1,
        date: "2022-05-09T23:42:21.000Z",
        product_id: 1,
        quantity: 5
      },
      {
        sale_id: 1,
        date: "2022-05-09T23:42:21.000Z",
        product_id: 2,
        quantity: 10
      },
    ]
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(response);
    })

    after(() => {
      salesModel.getAll.restore();
    })

    it('retorna um array', async () => {
      const result = await salesService.getAll(); 
      expect(result).to.be.a('array');
    });

    it('retorna um array de objetos', async () => {
      const result = await salesService.getAll();
      result.map((obj) => {
        expect(obj).to.be.a('object');
      })
    });

    it('os objetos devem conter as chaves convertidas sale_id, product_id para saleId, productId', async () => {
      const result = await salesService.getAll(); 
      result.map((obj) => {
        expect(obj).to.have.all.keys(
          'sale_id',
          'date',
          'product_id',
          'quantity',
        );
      })
    });
  })
})