const express = require('express')
const router2 = express.Router() //módulo para trabalhar com rotas

const veiculo = require('../models/veiculo')
const hstPermanencia = require('../models/hstPermanencia')
const { where } = require('sequelize')

//criando rotas
//1 - inserir dados na tabela
router2.post('/store', async function(req, res){ //o sequelize recebe o conteúdo assíncrono
    const resultado = await veiculo.create({//esperar até a função dar resultado
        proprietario: req.body.proprietario,
        placa: req.body.placa,
        modelo: req.body.modelo,
    })
    //console.log(req.body)  
    if(resultado){
        res.redirect('/')
    }else{
        res.json({erro:'Erro.'})
    }
})

//2 - exibir página raíz de veiculo
router2.get('/show', function(req, res){
    res.render('veiculo/index')
})

//3 - consultar Db
router2.get('/', async function(req, res){           
    let resultado = await veiculo.findAll({include:hstPermanencia}) //o include é como o sequelize faz para realizar consultas com join
    if(resultado){
        console.log(resultado)
        res.render('veiculo/index',{dados:resultado})
    }
    else{
        console.log('Não foi possível exibir os dados.')
    }
})

//4- deletar Db
// :id iremos passar um valor na rota
router2.get('/destroy/:id', async function(req, res){
    const resultado = await veiculo.destroy({
        where:{
            id:req.params.id //recebendo o id via parâmetro que está na rota
        }
    })
    res.redirect('/veiculo')
})

//5 - exibir formulário de cadastro
router2.get('/create', async function(req, res){
    let resultado = await hstPermanencia.findAll()
    if(resultado){
        console.log(resultado)
        res.render('veiculo/addVeiculo', {dados:resultado})
    }else{
        console.log('Não foi possível carregar nenhum dado.')
        res.redirect('/') //redirecionando para a página inicial
    }
    res.render('veiculo/addVeiculo')
})

module.exports = router2