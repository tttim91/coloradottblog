require('dotenv').load()

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/coloradott'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
