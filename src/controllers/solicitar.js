const express = require ('express')
const db = require('../db/conn')
const Emprestimo_solicitado = require('../models/emprestimo_solicitado')
const solicitadores = require('../models/solicitador')


module.exports = class solicitar {
    
    static emprestimo(req, res) {
        res.render('emprestimo', { isAuthenticated: req.session.isAuthenticated });

    }

    static emprestimo(req, res) {
        if (!req.session.isAuthenticated) {
            return res.redirect('/login'); 
        }



    const id_solicitador = req.session.userID; // Recupera o id do solicitador da sessão

        solicitadores.findOne({ raw: true, where: {  id_solicitador } })
            .then((data) => {
                res.render('emprestimo', { solicitadores: data ? [data] : [] }); // Envia os dados como um array
            })
            .catch((err) => console.log(err));

    
    }


    static emprestimoSave(req, res) {
    
        const emprestimoSave = {
            valor: req.body.valor,
            id_solicitador: req.session.userID, 
            DataDaSolicitacao: req.body.DataDaSolicitacao,
            DataMAX_Devolucao: req.body.DataMAX_Devolucao,
        };

        Emprestimo_solicitado.create(emprestimoSave)
            .then(() => res.redirect('/emprestimo'))
            .catch((err) => console.log(err));
    

}
}









    









