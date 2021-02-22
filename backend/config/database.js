require('dotenv').config()

module.exports = {
  //configuracion db
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "p4bl0",
  database: process.env.DB_DATABASE || "ecomyvos",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "mysql",

  // Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  // Migraciones
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",

  // singular tables in db
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true
  }
}
