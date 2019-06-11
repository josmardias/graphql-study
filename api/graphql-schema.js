const { makeExecutableSchema } = require('graphql-tools')
const { getProducts, getStores } = require('./data')

// helps editor highlight support
const gql = input => input[0]

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    stores: [Store!]!
  }

  type Store {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Query {
    product(id: ID!): Product
    products: [Product!]!

    store(id: ID!): Store
    stores: [Store!]!
  }
`

const resolvers = {
  Query: {
    product: (parent, args, context, info) => {
      return context.loaders.productById.load(args.id)
    },
    products: async (parent, args, context, info) => {
      const products = await getProducts()
      products.forEach(product => {
        context.loaders.productById.prime(product.id, product)
      })
      return products
    },
    store: (parent, args, context, info) => {
      return context.loaders.storeById.load(args.id)
    },
    stores: async (parent, args, context, info) => {
      const stores = await getStores()
      stores.forEach(store => {
        context.loaders.storeById.prime(store.id, store)
      })
      return stores
    },
  },
  Product: {
    stores: (parent, args, context, info) => {
      return context.loaders.storesByProductId.load(parent.id)
    },
  },
  Store: {
    products: (parent, args, context, info) => {
      return context.loaders.productsByStoreId.load(parent.id)
    },
  },
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
