const express = require ('express')
const router = express.Router()
const controle =  require ('../controllers/controle')
const solicitacao = require('../controllers/solicitar')
const controle2 = require('../controllers/controle2')
const emprestar = require('../controllers/emprestimos')
const finalizar = require('../controllers/emprestimos')
const saldo = require('../controllers/saldo')
const db = require('../db/conn')
const bcrypt = require('bcrypt')

router.get('/', controle.home)
router.get('/cadastro', controle.cadastro)
router.get('/login', controle.login)
router.post('/loginSolicitador', controle.loginSave)
router.get('/out', controle.logout)
router.post('/cadastroSolic', controle.cadastroSave)
router.get('/emprestimo',solicitacao.emprestimo)
router.post('/addemprestimo',solicitacao.emprestimoSave)
router.get('/home2', controle2.home2)
router.get('/cadastro2', controle2.cadastro2)
router.post('/cadastroEmprestador', controle2.cadastroSave2) 
router.get('/login2', controle2.login2)
router.post('/loginEmprestador', controle2.loginSave2)
router.get('/out', controle2.logout)
router.get('/financiar',emprestar.financiar)
router.get('/concluir',finalizar.concluir)
router.post('/concluirSave',finalizar.concluirSave)
router.get('/conta', saldo.conta)





// // router.post('/cadastroSolic', function(req, res){
// //     const nome = req.body.nome
// //     const cpf = req.body.cpf
// //     const email = req.body.email
// //     const senha = req.body.senha
// //     const celular = req.body.celular

// //     bcrypt.hash(senha, 10, function(err, hash) {
// //         if (err) {
// //             console.error('Erro ao criar hash da senha:', err);
// //             res.status(500).send('Erro ao criar hash da senha');
// //             return;
// //         }
// //     const query = 'INSERT INTO Solicitador (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?) '
// //     const data = ['CPF_Solicitador', 'NomeSolicitador', 'email', 'senha', 'celular',
// //     cpf, nome, email, hash, celular]
    
// //     //Verifica se o email já ta cadastrado
// //     var queryConsulta = 'SELECT * FROM Solicitador WHERE email LIKE ?'
// //     db.query(queryConsulta, [email], function(err, results){
// //         if(results.length > 0){
// //             // Mensagem caso esteja cadastrado
// //             res.render('cadastro')
// //         }else{
// //             db.query(query, data, function(err, results){
// //                 if(err){
// //                     throw err;
// //                 } else{
// //                      // Mensagem quando estiver cadastrado
// //                     res.render('login')
// //                 }
// //             });
// //         }
// //         });
// //     });
// // });

// router.post('/loginSolicitador', function(req,res){
//     const email = req.body.email
//     const pass = req.body.senha

//     const query = 'SELECT * FROM Solicitador WHERE pass = ? AND email = ?'
//     const data = ['pass', 'email', pass, email]

//     db.query(query, data, function(err, results) {
//         if (results.length > 0) {
//             const hashedPassword = results[0].pass; // Assume que a senha armazenada está na coluna 'pass'
            
//             bcrypt.compare(pass, hashedPassword, function(err, isMatch) {
//                 if (isMatch) {
//                     // req.session.user = email -> necessita do EXPRESS-SESSION para seção de identificação
//                     const authenticated = True;
//                     res.render('home', {authenticated: authenticated});
//                 } else {
//                     var message = 'Login incorreto!';
//                     res.render('login', { message: message });
//                 }
//             });
//         } else {
//             var message = 'Login incorreto!';
//             res.render('login', { message: message });
//         }
//     });
// });

module.exports = router