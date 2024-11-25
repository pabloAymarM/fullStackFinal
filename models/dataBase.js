const sequelizeDb = require('sequelize')    
const sequelizeConfig = new sequelizeDb(
    'estacionamentoDb', //nome do Data Base
    'root', //usuário do Db
    '',  //senha do Db
    {
        dialect: 'sqlite',
        storage: './estacionamentoDb.sqlite' //nome do arquivo para salvar
    }
)

module.exports = {sequelizeDb, sequelizeConfig}