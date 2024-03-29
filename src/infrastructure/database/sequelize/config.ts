import { Sequelize } from "sequelize"

const sequelizeConnection = new Sequelize({
    dialect: 'sqlite',
    storage: './src/infrastructure/database/sequelize/database.sqlite'
})
  
  export default sequelizeConnection