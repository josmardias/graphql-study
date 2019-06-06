const knex = require('./knex/client')
const { getProducts, getStores } = require('./data')

describe('#getProducts', () => {
  afterAll(() => {
    knex.destroy()
  })

  test('returned products should be in the same order as input and rows should contain storeIds list', async () => {
    await Promise.all([knex('product').del(), knex('store').del(), knex('productStore').del()])
    await Promise.all([
      knex('product').insert([
        { id: 'ae54afb5-fc8a-4df3-a96f-e8b0a2bcc5ae', name: 'Swiming Pool' },
        { id: 'd02c5796-c078-4566-b17c-717413678c61', name: 'Deodorant' },
        { id: '77270519-3e8e-42f2-9644-3d234d388f6b', name: 'Leather wallet' },
      ]),
      knex('store').insert([
        { id: 'cc3bbe69-6a86-4781-bb50-73230707150f', name: 'Victor store' },
        { id: 'c5c11712-9ff8-4427-98b0-4a9e0905d3fb', name: 'Coutinhos' },
        { id: '7c413ad1-1a82-4c2c-a942-e22005a31768', name: 'Madam Frufru' },
      ]),
    ])
    await knex('productStore').insert([
      {
        productId: 'ae54afb5-fc8a-4df3-a96f-e8b0a2bcc5ae',
        storeId: 'cc3bbe69-6a86-4781-bb50-73230707150f',
      },
      {
        productId: 'ae54afb5-fc8a-4df3-a96f-e8b0a2bcc5ae',
        storeId: 'c5c11712-9ff8-4427-98b0-4a9e0905d3fb',
      },
      {
        productId: 'd02c5796-c078-4566-b17c-717413678c61',
        storeId: 'c5c11712-9ff8-4427-98b0-4a9e0905d3fb',
      },
      {
        productId: 'd02c5796-c078-4566-b17c-717413678c61',
        storeId: '7c413ad1-1a82-4c2c-a942-e22005a31768',
      },
    ])

    const products = await getProducts([
      '77270519-3e8e-42f2-9644-3d234d388f6b',
      'ae54afb5-fc8a-4df3-a96f-e8b0a2bcc5ae',
      'd02c5796-c078-4566-b17c-717413678c61',
    ])

    expect(products).toEqual([
      {
        id: '77270519-3e8e-42f2-9644-3d234d388f6b',
        name: 'Leather wallet',
        storeIds: [],
      },
      {
        id: 'ae54afb5-fc8a-4df3-a96f-e8b0a2bcc5ae',
        name: 'Swiming Pool',
        storeIds: ['cc3bbe69-6a86-4781-bb50-73230707150f', 'c5c11712-9ff8-4427-98b0-4a9e0905d3fb'],
      },
      {
        id: 'd02c5796-c078-4566-b17c-717413678c61',
        name: 'Deodorant',
        storeIds: ['c5c11712-9ff8-4427-98b0-4a9e0905d3fb', '7c413ad1-1a82-4c2c-a942-e22005a31768'],
      },
    ])
  })
})
