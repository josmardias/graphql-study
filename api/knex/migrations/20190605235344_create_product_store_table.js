exports.up = function(knex, Promise) {
  return knex.schema.createTable('productStore', t => {
    t.uuid('productId')
      .index()
      .notNull()

    t.uuid('storeId')
      .index()
      .notNull()

    t.primary(['productId', 'storeId'])

    t.foreign('productId')
      .references('id')
      .inTable('product')
      .onDelete('CASCADE')

    t.foreign('storeId')
      .references('id')
      .inTable('store')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('productStore')
}
