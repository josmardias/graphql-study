const { makeExecutableSchema } = require('graphql-tools')
const DataLoader = require('dataloader')
const {
  getProducts, //
  getStores,
  getStoresByProductIds,
  getProductsByStoreIds,
} = require('./data')

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

    store(id: ID!): Store
  }
`

const productLoader = new DataLoader(ids => getProducts(ids))

const storeLoader = new DataLoader(ids => getStores(ids))

const storesByProductIdLoader = new DataLoader(ids => getStoresByProductIds(ids))

const productsByStoreIdLoader = new DataLoader(ids => getProductsByStoreIds(ids))

const resolvers = {
  Query: {
    product: (parent, args, context, info) => {
      return productLoader.load(args.id)
    },
    store: (parent, args, context, info) => {
      return storeLoader.load(args.id)
    },
  },
  Product: {
    stores: (parent, args, context, info) => {
      return storesByProductIdLoader.load(parent.id)
    },
  },
  Store: {
    products: (parent, args, context, info) => {
      return productsByStoreIdLoader.load(parent.id)
    },
  },
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
