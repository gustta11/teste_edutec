import mysql from 'mysql2/promise'

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Gustavokeven2004@',
  database: 'teste_edutec'
});

async function testConnection() {
  try {
    const connection = await db.getConnection()
    console.log('Conectado ao banco de dados com sucesso!')
    connection.release();
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
  }
}

testConnection()

export default db