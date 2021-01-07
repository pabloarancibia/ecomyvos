/*
* Configuramos el pool de conexiones
* integracion de base de datos con express.js
*/
var mysql = require('mysql');
var configMysql = {
    connectionLimit: 10,
    // host: 'mysql-server',
    host: '127.0.0.1',
    port: 3306,
    //user: 'root',
    user: 'pablo',
    //password: 'userpass',
    password: 'p4bl0',

    database: 'ecomyvos',
    insecureAuth: true
}
var pool = mysql.createPool(configMysql);
pool.getConnection((err, connection) => {
    // manejo de errores del pool de conexiones
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
        }
        if (connection) {
            connection.release();
        }
        return;
    }
});
module.exports = pool;