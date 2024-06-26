// const express = require ('express')
// const db = require('../db/conn')
// const olho = require('../models/emprestimo')

// module.exports = class contas {
//     static conta (req , res){
//         res.render('conta')

        
//     }
    
//     static conta(req,res){
//         olho.findAll({raw: true})
//         .then((data) =>{
//           res.render('conta',{olho: data})
//         })
//         .catch((err)=> console.log())
//       }
// }


// Id_EmprestimoSolicitados



            // const Id_EmprestimoSolicitados = req.session.userID; // Recupera o id do solicitador da sessão

            // olho.findOne({ raw: true, where: {  Id_EmprestimoSolicitados } })
            //     .then((data) => {
            //         res.render('conta', { emprestimos: data ? [data] : [] }); // Envia os dados como um array
            //     })
            //     .catch((err) => console.log(err));




            const express = require('express');
            const db = require('../db/conn');
            const olho = require('../models/emprestimo');
            
            module.exports = class Contas {
                static conta(req, res) {
                    const Id_EmprestimoSolicitados = req.session.userID; // Recupera o id do solicitador da sessão
            
                    olho.findOne({ raw: true, where: { Id_EmprestimoSolicitados } })
                        .then((data) => {
                            res.render('conta', { olho: data ? [data] : [] }); // Envia os dados como um array
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).send('Erro ao buscar dados');
                        });
                }
            };
            