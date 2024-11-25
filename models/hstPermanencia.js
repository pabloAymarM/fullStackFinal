const dataBase = require('./dataBase')
const veiculo = require('./veiculo')

const hstPermanencia = dataBase.sequelizeConfig.define(
    'hstPermanencia',
    {
        dataEntrada: {type: dataBase.sequelizeDb.DATE},
        dataSaida: {type: dataBase.sequelizeDb.DATE},
        custoTotal: {type: dataBase.sequelizeDb.FLOAT}
    } //não iremos criar o idHistorico e a chave estrangeira, pois o Sequelize vai criar automaticamente.
)

veiculo.hasOne(hstPermanencia,{ //veiculo tem um historico
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

hstPermanencia.sync() //criar a tabela
module.exports = hstPermanencia