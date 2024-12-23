import sequelize from "@/app/config/Datasource"
import { Logging } from "@/logs"

export const CreateConnection = () => sequelize.authenticate().then(async () => {
    Logging.dev("Database Connected")
    await sequelize.sync({ force: false }).then(() => Logging.dev("Database Synced"))
}).catch(error => {
    Logging.dev(error, "error")
    process.exit(1)
})
export const CloseConnection = () => sequelize.close().then(() => Logging.dev("Database Connection Closed")).catch(error => {
    Logging.dev(error, "error")
    process.exit(1)
})