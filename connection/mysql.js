const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Creiba'
})

module.exports = {
    connection: connection.connect(),
    close: connection.end(),
    query: connection
}
