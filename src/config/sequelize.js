import { Sequelize } from "sequelize";

import { config } from "./env.js";

export const sequelize = new Sequelize(config.DB.databaseName, config.DB.username, config.DB.password, {
  host: 'localhost',
  dialect:  'postgres' 
});