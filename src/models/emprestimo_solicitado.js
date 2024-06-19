// CREATE TABLE Emprestimo_solicitado(
//     Id_EmprestimoSolicitado INTEGER auto_increment PRIMARY KEY,
//     CPF_Solicitador VARCHAR(11) NOT NULL,
//     Valor FLOAT NOT NULL,
//     DataMAX_Devolucao DATE NOT NULL,
//     DataDaSolicitacao DATE NOT NULL,
//     CONSTRAINT fk_cpfSolicitador FOREIGN KEY (CPF_Solicitador) REFERENCES Solicitador(CPF_Solicitador)
//     );
    
const Solicitador = require('../models/solicitador.js')
const {DataTypes} = require('sequelize')

const db = require('../db/conn.js')

const Emprestimo_solicitado = db.define('emprestimo_solicitado', {
    Id_EmprestimoSolicitado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cpf_solicitador: {
        type: DataTypes.STRING(11),
        allowNull: false,
        references: {
            model: Solicitador, 
            key: 'cpf_solicitador' 
        }
    },
    valor:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    DataMAX_Devolucao:{
        type: DataTypes.DATE,
        allowNull: false
    },
    DataDaSolicitacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

Solicitador.hasMany(Emprestimo_solicitado)
module.exports = Emprestimo_solicitado;