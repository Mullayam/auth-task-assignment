import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'mysql-265b5589-mullayam06.f.aivencloud.com',
    port: 20347,
    username: 'avnadmin',
    password: 'AVNS_Oli9iTS1DHVuUra6KSP',
    logging: false,
    database: 'defaultdb',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})
export default sequelize;