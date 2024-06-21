const express = require ('express')
const db = require('../db/conn')
const Emprestimo_solicitado = require('../models/emprestimo_solicitado')
const solicitadores = require('../models/solicitador')


module.exports = class solicitar {
    static  emprestimo (req ,res){
       res.render ('emprestimo', {isAuthenticated: req.session.isAuthenticated})  
    }
    

     static emprestimo (req,res){
         solicitadores.findAll ({raw: true})
          .then((data) =>{
             res.render('emprestimo',{solicitadores: data})
           })
           .catch((err) => console.log(err))  
     }
  
    static emprestimoSave (req,res){
        const emprestimoSave = {
            valor: req.body.valor,
            id_solicitador: req.body.id_solicitador,
            DataMAX_Devolucao: req.body.DataMAX_Devolucao,
            DataDaSolicitacao: req.body.DataDaSolicitacao,
        }
       
        Emprestimo_solicitado.create(emprestimoSave)
             .then(res.redirect('/emprestimo'))
            .catch((err)=> console.log()) 
} 

}





