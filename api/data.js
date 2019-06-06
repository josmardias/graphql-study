const knex = require('./knex/client')

const getProducts = ids => {
  const query = knex('product').select(['product.id as id', 'product.name as name'])

  if (ids) {
    query.whereIn('id', ids)
  }

  // stores
  query
    .innerJoin('productStore', 'product.id', 'productStore.productId')
    .groupBy('product.id')
    .select([knex.raw('ARRAY_AGG("productStore"."storeId") as "storeIds"')])

  return query
}
module.exports.getProducts = getProducts

const getStores = ids => {
  const query = knex('store').select(['store.id as id', 'store.name as name'])

  if (ids) {
    query.whereIn('id', ids)
  }

  // products
  query
    .innerJoin('productStore', 'store.id', 'productStore.storeId')
    .groupBy('store.id')
    .select([knex.raw('ARRAY_AGG("productStore"."productId") as "productIds"')])

  return query
}
module.exports.getStores = getStores
