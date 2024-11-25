const express = require('express')
const router1 = express.Router()

const hstPermanencia = require('../models/hstPermanencia')
const veiculo = require('../models/veiculo')
const {where} = require('sequelize')

// const calcularCustoTotal = (dataEntrada, dataSaida) => {
//     const entrada = new Date(dataEntrada);
//     const saida = new Date(dataSaida);
    
//     // Calcular a diferença em milissegundos
//     const diferencaMs = saida - entrada;

//     // Converter a diferença para horas
//     const diferencaHoras = diferencaMs / (1000 * 60 * 60);

//     // Definir um custo por hora (exemplo: R$ 10 por hora)
//     const custoPorHora = 10;
//     return diferencaHoras * custoPorHora;
// };

//criando rotas
//1 - inserir dados na tabela
router1.post('/store', async function(req, res){ //o sequelize recebe o conteúdo assíncrono
    const resultado = await hstPermanencia.create({//esperar até a função dar resultado
        dataEntrada: req.body.dataEntrada,
        dataSaida: req.body.dataSaida,
        custoTotal: req.body.custoTotal,
        veiculoId: req.body.veiculoId //chave estrangeira
    })
    // const custoTotal = calcularCustoTotal(dataEntrada, dataSaida);

    //console.log(req.body)  
    if(resultado){
        res.redirect('/estacionamento')
    }else{
        res.json({erro:'Erro.'})
    }
})

//2 - exibir página raíz de hstPermanencia
router1.get('/', function(req, res){
    res.render('hstPermanencia/index')
})

//3 - consultar Db
router1.get('/show', async function(req, res){           
    let resultado = await veiculo.findAll({include:hstPermanencia}) //o include é como o sequelize faz para realizar consultas com join
    if(resultado){
        console.log(resultado)
        res.render('hstPermanencia/index', {dados:resultado})
    }
    else{
        console.log('Não foi possível exibir os dados.')
    }
})

//4- deletar Db
// :id iremos passar um valor na rota
router1.get('/destroy/:id', async function(req, res){
    const resultado = await hstPermanencia.destroy({
        where:{
            id:req.params.id //recebendo o id via parâmetro que está na rota
        }
    })
    res.redirect('/hstPermanencia')
})

//5 - exibir formulário de cadastro
router1.get('/create', async function(req, res){
    let resultado = await veiculo.findAll()
    if(resultado){
        console.log(resultado)
        res.render('hstPermanencia/addHstPermanencia', {dados:resultado})
    }else{
        console.log('Não foi possível carregar nenhum dado.')
        res.redirect('/estacionamento') //redirecionando para a página inicial
    }
    res.render('hstPermanencia/addHstPermanencia')
})

module.exports = router1