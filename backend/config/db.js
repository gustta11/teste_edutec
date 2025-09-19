import mysql from 'mysql'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'teste_edutec'
});

db.connect((err)=>{
    if(err){
        console.log(`Erro ao conectar ao banco de dados: ${err}`)
    }
    console.log("Conectado ao banco de dados com sucesso!")
});

export default db;