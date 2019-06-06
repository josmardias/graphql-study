exports.seed = async function(knex, Promise) {
  await Promise.all([
    knex('product')
      .del()
      .then(function() {
        return knex('product').insert([
          { id: 'ae54afb5-fc8a-4df3-a96f-e8b0a2bcc5ae', name: 'Swiming Pool' },
          { id: 'd02c5796-c078-4566-b17c-717413678c61', name: 'Deodorant' },
          { id: '77270519-3e8e-42f2-9644-3d234d388f6b', name: 'Leather wallet' },
        ])
      }),

    knex('store')
      .del()
      .then(function() {
        return knex('store').insert([
          { id: 'cc3bbe69-6a86-4781-bb50-73230707150f', name: 'Victor store' },
          { id: 'c5c11712-9ff8-4427-98b0-4a9e0905d3fb', name: 'Coutinhos' },
          { id: '7c413ad1-1a82-4c2c-a942-e22005a31768', name: 'Madam Frufru' },
        ])
      }),
  ])

  return knex('productStore')
    .del()
    .then(function() {
      return knex('productStore').insert([
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
    })
}
