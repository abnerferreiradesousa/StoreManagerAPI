const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const { expect } = require('chai')
const sinon = require("sinon");

describe('Se não existirem produtos', () => {

  before(() => {
    sinon.stub(connection, 'execute').resolves([]);
  })
  after(() => {
    connection.execute.restore();
  })

  it('retorna um array', async () => {
    const result = await productModel.getAll();
    expect(result).to.be.a('array');
  });
})