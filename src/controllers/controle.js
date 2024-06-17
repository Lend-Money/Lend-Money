const express = require ('express')
const db = require('../db/conn')
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario.js')
module.exports = class controle {   
    static home (req , res){
        res.render ('home', {isAuthenticated: req.session.isAuthenticated})
    }

    static cadastro (req , res){
        res.render ('cadastro')
    }

    static login (req , res){
        res.render ('login')
    }
    static conta (req, res){
        res.render('conta')
    }

    static async loginSave(req, res){
        const {email, senha} = req.body

        const usuario = await Usuario.findOne({where: {email: email}})

        if(!usuario){
            res.render('login', {
            message: 'Usuário não encontrado',
            })
        return
        }

        const senhaMatch = bcrypt.hash.compareSync(senha, usuario.senha)
        if(!senhaMatch){
            res.render('login', {
                message: 'Senha inválida',
            })
            return
        }
        req.session.isAuthenticated = true;

        req.session.usuarioid = usuario.id
        req.flash('message2', 'Login realizado com sucesso!')

        req.session.save(()=>{
            res.redirect('/')
        })
    }
    static async cadastroSave(req, res) {
        try {
            const { nome, email, senha } = req.body;
    
            const usuarioNaoValido = await Usuario.findOne({ where: { email: email } });
    
            if (usuarioNaoValido) {
                req.flash('message', 'Este e-mail já está sendo utilizado em outra conta');
                res.render('cadastro', { message: req.flash('message') })
                return;
            }
    
            const salt = bcrypt.genSaltSync(10);
            const senhaHashed = bcrypt.hashSync(senha, salt);
    
            const usuario = {
                nome,
                email,
                senha: senhaHashed
            };
    
            const novoUsuario = await Usuario.create(usuario);
    
            req.session.userID= novoUsuario.id;
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