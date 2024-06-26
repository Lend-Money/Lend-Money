const {DataTypes} = require('sequelize')
const db = require('../db/conn.js')

const Solicitador = db.define('solicitadores',{
    cpf_solicitador:{
        type: DataTypes.STRING(11),
    },
    id_solicitador:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    senha:{
        type: DataTypes.STRING
    },
    celular:{
        type: DataTypes.INTEGER
    }
})

module.exports = Solicitador