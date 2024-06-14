// const mysql = require('mysql')

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'lendmoney'
// })

// module.exports = db

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('LendMoney2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

async function authenticateDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexão feita com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

authenticateDatabase();

module.exports = sequelize;
