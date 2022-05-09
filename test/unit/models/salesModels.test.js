const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');
const { expect } = require('chai');
const sinon = require('sinon');

describe('salesModels Se existirem produtos - getAll', () => {
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
    sinon.stub(connection, 'execute').resolves([response]);
  })
  after(() => {
    connection.execute.restore();
  })

  it('retorna um array', async () => {
    const result = await salesModel.getAll(); 
    expect(result).to.be.a('array');
  });
  it('retorna um array de objetos', async () => {
    const result = await salesModel.getAll();
    result.map((obj) => {
      expect(obj).to.be.a('object');
    })
  });
  it('os objetos contém as chaves convertidas sale_id e product_id para saleId e productId', async () => {
    const result = await salesModel.getAll(); 
    result.map((obj) => {
      expect(obj).not.to.have.all.keys(
        'sale_id',
        'date',
        'product_id',
        'quantity',
      );
    })
    result.map((obj) => {
      expect(obj).to.have.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity',
      );
    })
  });
})