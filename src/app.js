const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const rota = require('./router/rota'); 


const Solicitador = require('./models/solicitador');
const Emprestador = require('./models/emprestador');
const Emprestimo = require('./models/emprestimo')
const Emprestimo_Solicitado = require('./models/emprestimo_solicitado');

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

// Configuração do session
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
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

app.use((req, res, next) => {
  console.log(req.session.userID);

  if (req.session.userID) {
    res.locals.session = req.session;
  }
  next();
});

const bodyParser = require("body-parser");

async function syncDatabase() {
  try {
    await Solicitador.sync()
    await Emprestador.sync()
    await Emprestimo_Solicitado.sync()
    await Emprestimo.sync()
    console.log('Modelo sincronizado com o banco de dados');
    app.listen(5000, () => {
      console.log('Servidor iniciado na porta 5000');
    });
  } catch (error) {
    console.error('Erro ao sincronizar modelo com o banco de dados:', error);
  }
}


// Middleware de sessão

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Configuração de arquivos estáticos
app.use(express.static('public'));

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Uso das rotas
app.use(rota);


syncDatabase();
