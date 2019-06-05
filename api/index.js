const express = require('express')
const graphql = require('express-graphql')
const schema = require('./graphql-schema')

const app = express()

app.use(graphql({
  schema,
  graphiql: true,
}))

app.listen(4000)
