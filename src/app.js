const express = require('express');
const exphbs = require('express-handlebars');
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const path = require('path');
const os = require('os');
const bodyParser = require("body-parser");
const Usuario = require('./models/usuario'); // Certifique-se que este caminho está correto
const app = express();

// Configuração do session
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(os.tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);

// Configuração do flash
app.use(flash());

// Middleware de sessão
app.use((req, res, next) => {
  console.log(req.session.userID);

  if (req.session.userID) {
    res.locals.session = req.session;
  }
  next();
});

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração de arquivos estáticos
app.use(express.static('public'));

// Importação das rotas e dos controladores
const controle = require('../src/controllers/controle'); // Certifique-se que este caminho está correto
const rota = require('./router/rota'); // Certifique-se que este caminho está correto

// Uso das rotas
app.use(rota);

async function syncDatabase() {
  try {
    await Usuario.sync();
    console.log('Modelo sincronizado com o banco de dados');
    // Inicia o servidor após a sincronização
    app.listen(5000, () => {
      console.log('Servidor iniciado na porta 5000');
    });
  } catch (error) {
    console.error('Erro ao sincronizar modelo com o banco de dados:', error);
  }
}

syncDatabase();
