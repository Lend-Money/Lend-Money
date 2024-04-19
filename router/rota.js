const express = require ('express')
const router = express.Router()
const controle =  require ('../controllers/controle')
const db = require('../db/conn')
const bcrypt = require('bcrypt')

router.get('/', controle.home)
router.get('/cadastro', controle.cadastro)
router.get('/login', controle.login)

router.post('/cadastroSolic', function(req, res){
    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const senha = req.body.senha
    const celular = req.body.celular

    bcrypt.hash(senha, 10, function(err, hash) {
        if (err) {
            console.error('Erro ao criar hash da senha:', err);
            res.status(500).send('Erro ao criar hash da senha');
            return;
        }
    const query = 'INSERT INTO Solicitador (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?) '
    const data = ['CPF_Solicitador', 'NomeSolicitador', 'email', 'senha', 'celular',
    cpf, nome, email, hash, celular]
    
    //Verifica se o email já ta cadastrado
    var queryConsulta = 'SELECT * FROM Solicitador WHERE email LIKE ?'
    db.query(queryConsulta, [email], function(err, results){
        if(results.length > 0){
            // Mensagem caso esteja cadastrado
            res.render('cadastro')
        }else{
            db.query(query, data, function(err, results){
                if(err){
                    throw err;
                } else{
                     // Mensagem quando estiver cadastrado
                    res.render('login')
                }
            });
        }
        });
    });
});

router.post('/loginSolicitador', function(req,res){
    const email = req.body.email
    const pass = req.body.pass

    const query = 'SELECT * FROM Solicitador WHERE pass = ? AND email = ?'
    const data = ['pass', 'email', pass, email]

    db.query(query, data, function(err, results){
        if(results.length > 0){
            // req.session.user = email -> necessita do EXPRESS-SESSION para seção de identificação
            res.render('home')
        } else{
            var message = 'Login incorreto!'
            res.render('login', message)
        }
    })
})

module.exports = router