const express = require('express')
const graphql = require('express-graphql')
const DataLoader = require('dataloader')
const { getProducts, getStores, getStoresByProductsIds, getProductsByStoresIds } = require('./data')
const schema = require('./graphql-schema')

const app = express()

const buildLoaders = () => {
  const productById = new DataLoader(ids => getProducts(ids))

  const storeById = new DataLoader(ids => getStores(ids))

  const productsByStoreId = new DataLoader(async ids => {
    const productsPerStore = await getProductsByStoresIds(ids, { fields: ['id'] })
    const productIdsPerStore = productsPerStore.map(stores => stores.map(store => store.id))

    return Promise.all(productIdsPerStore.map(productIds => productById.loadMany(productIds)))
  })

  const storesByProductId = new DataLoader(async ids => {
    const storesPerProduct = await getStoresByProductsIds(ids, { fields: ['id'] })
    const storeIdsPerProduct = storesPerProduct.map(stores => stores.map(store => store.id))

    return Promise.all(storeIdsPerProduct.map(storeIds => storeById.loadMany(storeIds)))
  })

  return {
    productById,
    productsByStoreId,
    storeById,
    storesByProductId,
  }
}

app.use(
  graphql(request => ({
    schema,
    graphiql: true,
    context: { loaders: buildLoaders() },
  })),
)

app.listen(4000)
