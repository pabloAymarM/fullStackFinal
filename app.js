//carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')

const app = express()
const porta = 2000

//configurar express para receber dados do formulário
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//configurando o handlebars
app.engine('handlebars', handlebars.engine.apply({extend:true}))
app.set('view engine', 'handlebars')//definindo o handlebars comoo mecanismo de visualização padrão

//carregando rotas
const veiculoRouter = require('./routes/veiculo')
const hstPermanenciaRouter = require('./routes/hstPermanencia')
//utilizando rotas
app.use('/veiculo', veiculoRouter)
app.use('/hstPermanencia', hstPermanenciaRouter)

//exibir informações na tela
app.get('/estacionamento/', function(req, res){
    res.render('home')
})

//executando o servidor
app.listen(porta, function(){   
    console.log('Servidor executado na porta:', porta)
})