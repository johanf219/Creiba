const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost:',
    port: '5432',
    user: 'postgres',
    password: 'pg123',
    database: 'Creiba'
})

module.exports = {
    connection: connection.connect(),
    close: connection.end(),
    query: connection
}
