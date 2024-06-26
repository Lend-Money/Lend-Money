const express = require ('express')
const db = require('../db/conn')
const bcrypt = require('bcrypt')
const Solicitador = require('../models/solicitador.js')
const Solicitador = require('../models/solicitador.js')

module.exports = class controle {   
    static home (req , res){
        res.render ('home', {isAuthenticated: req.session.isAuthenticated})
    }

        
    static cadastro (req , res){
        res.render ('cadastro', {message2: req.flash('message2')})
    }

    static login (req , res){
        res.render ('login', {isCreated: req.session.create, message2: req.flash('message2')})
    }

    static async loginSave(req, res){
        const {email, senha} = req.body

        const solicitadores = await Solicitador.findOne({where: {email: email}})

        if(!solicitadores){
            res.render('login', {
            message: 'Usuário não encontrado',
            })
        return
        }

        const senhaMatch = bcrypt.compareSync(senha, solicitadores.senha)
        if(!senhaMatch){
            res.render('login', {
                message: 'Senha inválida',
            })
            return
        }
        req.session.isAuthenticated = true;

        req.session.userID = solicitadores.id_solicitador;
        req.flash('message2', 'Login realizado com sucesso!')

        req.session.save(()=>{
            res.redirect('/')            
        })
    }
    static async cadastroSave(req, res) {
        try {
            const { nome, email, senha, cpf_solicitador, celular } = req.body;
    
            const solicitadorNaoValido = await Solicitador.findOne({ where: { email: email } });
    
            if (solicitadorNaoValido) {
                req.flash('message', 'Este e-mail já está sendo utilizado em outra conta');
                res.render('cadastro', { message: req.flash('message') })
                return;
            }
    
            const salt = bcrypt.genSaltSync(10);
            const senhaHashed = bcrypt.hashSync(senha, salt);
    
            const solicitador = {
                nome,
                email,
                senha: senhaHashed,
                cpf_solicitador,
                celular
            };
    
            const novoSolicitador = await Solicitador.create(solicitador);
    
            req.session.userID= novoSolicitador.id;
            req.session.create = true
                req.flash('message2', 'Usuario criado com sucesso!\n Faça o login!');
                req.session.save(() => {
                res.redirect('login');
            
                });
            }
            catch (error) {
            console.error('Erro ao registrar usuário:', error);
            
        }
    }
    static logout(req, res){
        req.session.destroy()
        res.redirect('/')
    }
}