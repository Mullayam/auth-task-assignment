import { Sequelize } from 'sequelize'
import { __CONFIG__ } from '.';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host:__CONFIG__.DATABASE.DB_HOST, 
    port: __CONFIG__.DATABASE.DB_PORT,
    username: __CONFIG__.DATABASE.DB_USER,
    password: __CONFIG__.DATABASE.DB_PASS,
    logging: false,
    database:  __CONFIG__.DATABASE.DB_NAME,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})
export default sequelize;