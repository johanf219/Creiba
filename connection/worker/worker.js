const db = require("../mysql");

var ErrMissingNationalID = new Error("missing national id");

function storeWorker(jsonInput) {
    let body = JSON.parse(httpResponse);

    /*db.connection()
    db.query("", (err, _, _) => {
        if (err) {
            throw err
        }
    })
    db.close()
*/
    return null;
}

function loadWorkerByNationalID(nationalID) {
    return new Promise((response, err) => {
        if (nationalID == "") {
            err(ErrMissingNationalID)
        }

        let queryResult = {}
        db.connection()
        db.query(`SELECT * FROM trabajador WHERE cedula=${nationalID}`, (err, body, _) => {
            if (err) {
                throw err
            }

            queryResult = body
        })
        db.close()

        response(queryResult)
    })
}

module.exports = {
    storeWorker,
    loadWorkerByNationalID
}