const { pick } = require('ramda')
const knex = require('../knex/client')

module.exports.getProducts = ids => {
  const query = knex('product').select(['product.id as id', 'product.name as name'])

  if (ids) {
    query.whereIn('id', ids)
    return query.then(rows => ids.map(id => rows.find(row => row.id === id)))
  }

  return query
}

module.exports.getStores = ids => {
  const query = knex('store').select(['store.id as id', 'store.name as name'])

  if (ids) {
    query.whereIn('id', ids)
    return query.then(rows => ids.map(id => rows.find(row => row.id === id)))
  }

  return query
}

module.exports.getStoresByProductsIds = async (ids, options = {}) => {
  const query = knex('store')
    .innerJoin('productStore', 'productStore.storeId', 'store.id')
    .whereIn('productId', ids)
    .select('productId')
    .select(options.fields || '*')

  return query.then(rows =>
    ids.map(id => rows.filter(row => row.productId === id).map(row => pick(options.fields, row))),
  )
}

module.exports.getProductsByStoresIds = (ids, options = {}) => {
  const query = knex('product')
    .innerJoin('productStore', 'productStore.productId', 'product.id')
    .whereIn('storeId', ids)
    .select('storeId')
    .select(options.fields || '*')

  return query.then(rows =>
    ids.map(id => rows.filter(row => row.storeId === id).map(row => pick(options.fields, row))),
  )
}
