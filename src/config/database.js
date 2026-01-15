import { config } from "./env.js"


export default {
  development: {
    username: config.DB.username,
    password: config.DB.password,
    database: config.DB.databaseName,
    host: "127.0.0.1",
    dialect: "postgres"
  },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
}
