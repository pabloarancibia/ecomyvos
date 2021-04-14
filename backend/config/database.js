require('dotenv').config()

module.exports = {
  //configuracion db
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,

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
