const express = require('express')
const graphql = require('express-graphql')
const DataLoader = require('dataloader')
const { getProducts, getStores, getStoresByProductIds, getProductsByStoreIds } = require('./data')
const schema = require('./graphql-schema')

const app = express()

const buildLoaders = () => ({
  productById: new DataLoader(ids => getProducts(ids)),
  storeById: new DataLoader(ids => getStores(ids)),
})

app.use(
  graphql(request => ({
    schema,
    graphiql: true,
    context: { loaders: buildLoaders() },
  })),
)

app.listen(4000)
