const {sequelizeDb, sequelizeConfig} = require('./dataBase') //desmembrano o objeto para importar os módulos

const veiculo = sequelizeConfig.define(
    'veiculo',
    {
        proprietario: {type: sequelizeDb.STRING},
        placa: {type: sequelizeDb.TEXT},
        modelo: {type: sequelizeDb.TEXT}
    }
)

veiculo.sync()
module.exports = veiculo