const express = require ('express')
const db = require('../db/conn')
const bcrypt = require('bcrypt')

const Emprestador = require('../models/emprestador.js')
module.exports = class controle2 {   
    static cadastro2 (req , res){
        res.render ('cadastro2', {message2: req.flash('message2')})
    }

    static login2 (req , res){
        res.render ('login2', {isCreated: req.session.create, message2: req.flash('message2')})
    }

    static async loginSave2(req, res){
        const {email, senha} = req.body

        const emprestador = await Emprestador.findOne({where: {email: email}})

        if(!emprestador){
            res.render('login2', {
            message: 'Usuário não encontrado',
            })
        return
        }

        const senhaMatch = bcrypt.compareSync(senha, emprestador.senha)
        if(!senhaMatch){
            res.render('login2', {
                message: 'Senha inválida',
            })
            return
        }
        req.session.isAuthenticated = true;

        req.session.userID = emprestador.id_emprestador;
        req.flash('message2', 'Login realizado com sucesso!')

        req.session.save(()=>{
            res.redirect('/')            
        })
    }
    static async cadastroSave2(req, res) {
        try {
            const { nome, email, senha, cpf_emprestador, celular } = req.body;
    
            const emprestadorNaoValido = await Emprestador.findOne({ where: { email: email } });
    
            if (emprestadorNaoValido) {
                req.flash('message', 'Este e-mail já está sendo utilizado em outra conta');
                res.render('cadastro', { message: req.flash('message') })
                return;
            }
    
            const salt = bcrypt.genSaltSync(10);
            const senhaHashed = bcrypt.hashSync(senha, salt);
    
            const emprestador = {
                nome,
                email,
                senha: senhaHashed,
                cpf_emprestador,
                celular
            };
    
            const novoEmprestador = await Emprestador.create(emprestador);
    
            req.session.userID= novoEmprestador.id;
            req.session.create = true
                req.flash('message2', 'Usuario criado com sucesso!\n Faça o login!');
                req.session.save(() => {
                res.redirect('login2');
            
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