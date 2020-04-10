const db = require("../mysql");

var ErrMissingNationalID = new Error("missing national id");

function storeWorker(jsonInput) {
    db.connection()
    db.query(`INSERT INTO trabador VALUES()`, (err, _, _) => {
        if (err) {
            throw err
        }
    })
    db.close()

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