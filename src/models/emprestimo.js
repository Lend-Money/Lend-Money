// CREATE TABLE Emprestimo (
//     Id_Emprestimo INTEGER auto_increment PRIMARY KEY,
//     CPF_Emprestador VARCHAR(11) NOT NULL,
//     Id_EmprestimoSolicitado INTEGER NOT NULL,
//     CONSTRAINT fk_Solicitado FOREIGN KEY (Id_EmprestimoSolicitado) REFERENCES Emprestimo_solicitado (Id_EmprestimoSolicitado),
//     CONSTRAINT fk_cpfEmprestador FOREIGN KEY (CPF_Emprestador) REFERENCES Emprestador (CPF_Emprestador)
//     );
    
const Emprestimo_Solicitado = require('../models/emprestimo_solicitado.js')
const Emprestador = require('../models/emprestador.js')
const {DataTypes} = require('sequelize')

const db = require('../db/conn.js')

const Emprestimo = db.define('emprestimos', {
    Id_Emprestimo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_emprestador: {
        type: DataTypes.INTEGER,
        references: {
            model: Emprestador, 
            key: 'id_emprestador' 
        }
    },
    Id_EmprestimoSolicitados:{
        type: DataTypes.INTEGER,
        references:{
            model:Emprestimo_Solicitado,
            key: 'Id_EmprestimoSolicitado'
        }

    },
    valor:{
        type: DataTypes.FLOAT,
        allowNull: false
    },

    }

)

module.exports = Emprestimo;