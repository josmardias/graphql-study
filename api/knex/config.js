const path = require('path')

const common = {
  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    user: 'test',
    password: 'test',
    database: 'myapp',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.join(__dirname, './migrations'),
  },
  seeds: {
    directory: path.join(__dirname, './seeds'),
  },
}

module.exports = {
  development: common,

  // staging: common,

  // production: common,
}
