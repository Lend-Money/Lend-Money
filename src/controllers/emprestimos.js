const express = require('express')
const db = require('../db/conn')
const Emprestimo_solicitado = require('../models/emprestimo_solicitado');
const Emprestador = require('../models/emprestador.js');
const fim = require('../models/emprestimo.js')

module.exports = class emprestimos {

    //    static financiar(req, res) {     
    //   res.render('financiar', { isAuthenticated: req.session.isAuthenticated });   
    
    // }



    // Middleware de autenticação
    static isAuthenticated(req, res, next) {
        if (req.session.isAuthenticated) {
            next();
        } else {
            res.redirect('/login2');
        }
    }

    // Função para renderizar a página de financiar se o usuário estiver autenticado
    static async financiar(req, res) {
        if (!req.session.isAuthenticated) {
            return res.redirect('/login2');
        }

        const id_emprestador = req.session.userID; // Recupera o id do emprestador da sessão

        try {
            const emprestador = await Emprestador.findOne({ raw: true, where: { id_emprestador } });
            const emprestimos = await Emprestimo_solicitado.findAll({ raw: true});

            res.render('financiar', { 
                isAuthenticated: req.session.isAuthenticated,
                emprestador: emprestador ? [emprestador] : [],
                Emprestimo_solicitado: emprestimos
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar dados de empréstimos');
        }
    }


    static isAuthenticated(req, res, next) {
        if (req.session.isAuthenticated) {
            next();
        } else {
            res.redirect('/login2');
        }
    }

    static async concluir(req, res) {
        if (!req.session.isAuthenticated) {
            return res.redirect('/login2');
        }

        const id_emprestador = req.session.userID;

        try {
            const emprestador = await Emprestador.findOne({ raw: true, where: { id_emprestador } });
       

            res.render('concluir', { 
                isAuthenticated: req.session.isAuthenticated,
                emprestador: emprestador ? [emprestador] : [],
            });
        } catch (err) {
            console.log(err);
          
        }
            
        } 
   
    static concluirSave(req, res) {
    
        const concluirSave = {
          
            id_emprestador: req.body.id_emprestador,
            Id_EmprestimoSolicitados: req.body.Id_EmprestimoSolicitados ,
            valor: req.body.valor,
        };

        fim.create(concluirSave)
        .then(() => res.redirect('/concluir'))
        .catch((err) => console.log(err));

}
}





