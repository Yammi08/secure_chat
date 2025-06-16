const db = require('mysql2')

const connection = db.createPool({
  host: process.env.DATABASE_URL,
  user: process.env.ROOT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true
})
async function tryconnection() {
  connection.getConnection((err, connection) => {
    if (err) {
      console.log('error al conectar la base de datos', err)
      return;
    }
    console.log('la base de datos se a conectado exitosamente')

  })

}
tryconnection()


module.exports = connection