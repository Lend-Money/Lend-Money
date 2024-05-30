const {DataTypes} = require('sequelize')
const db = require('../db/conn.js')

const Usuario = db.define('solicitador',{
    cpf_solicitador:{
        type: DataTypes.STRING
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

module.exports = Usuario