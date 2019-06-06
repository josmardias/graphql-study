const knex = require('./knex/client')

const sortByIdsOrder = ids => rows => {
  if (!ids) return rows
  return ids.map(id => rows.find(row => row.id === id))
}

const getProducts = ids => {
  const query = knex('product').select(['product.id as id', 'product.name as name'])

  if (ids) {
    query.whereIn('id', ids)
  }

  // stores
  query
    .leftJoin('productStore', 'product.id', 'productStore.productId')
    .groupBy('product.id')
    .select([knex.raw('ARRAY_REMOVE(ARRAY_AGG("productStore"."storeId"), NULL) as "storeIds"')])

  return query.then(sortByIdsOrder(ids))
}
module.exports.getProducts = getProducts

const getStores = ids => {
  const query = knex('store').select(['store.id as id', 'store.name as name'])

  if (ids) {
    query.whereIn('id', ids)
  }

  // products
  query
    .leftJoin('productStore', 'store.id', 'productStore.storeId')
    .groupBy('store.id')
    .select([knex.raw('ARRAY_REMOVE(ARRAY_AGG("productStore"."productId"), NULL) as "productIds"')])

  return query.then(sortByIdsOrder(ids))
}
module.exports.getStores = getStores
