const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const { expect } = require('chai');
const sinon = require('sinon');

describe('productsModels Se não existirem produtos - getAll', () => {

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

describe('productsModels Se existirem produtos - getAll', () => {
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
})

describe('productsModels Se não existir um produto com determinado id - getById', () => {

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

describe('productsModels Se existirem produtos - getById', () => {
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
})
