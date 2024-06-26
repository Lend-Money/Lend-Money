const {DataTypes} = require('sequelize')

const db = require('../db/conn.js')

const Emprestador = db.define('emprestador', {
    cpf_emprestador:{
        type: DataTypes.STRING(11),
    },
    id_emprestador:{
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

module.exports = Emprestador;