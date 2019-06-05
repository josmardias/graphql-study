const { makeExecutableSchema } = require('graphql-tools')

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

const resolvers = {
  Query: {
    product: (parent, args, context, info) => {
      return context.loaders.productById.load(args.id)
    },
    store: (parent, args, context, info) => {
      return context.loaders.storeById.load(args.id)
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
