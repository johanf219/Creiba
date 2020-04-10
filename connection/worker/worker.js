const db = require("./mysql");

var ErrMissingName = new Error("missing name");
var ErrMissingEmail = new Error("missing email");
var ErrMissingPhone = new Error("missing phone");
var ErrMissingAddress = new Error("missing address");
var ErrMissingPassword = new Error("missing password");
var ErrMissingLastName = new Error("missing last name");
var ErrMissingNationalID = new Error("missing national id");
var ErrNoMatchInPasswords = new Error("passwords must be equals")
var ErrMissingConfirmPassword = new Error("missing confirm password");

function handle(httpResponse) {
    err = validateInputs(httpResponse)
    if(err != null){
        return buildJSONResponse(400, err)
    }
}

/* 
httpResponse
{
    "nationalID": "11", "name": "johan", "lastName": "florez", "phone": "1212", "password": "*",
    "confirmPassword": "*", "email": "j@gmail.com", "address": "cra212", "profilePhoto": "base64",
    "documentPhoto": "base64", servicios {}
}
*/

function buildJSONResponse(status, message) {
    return JSON.parse(`"{"status": ${status}, "message": ${message}}"`)
}

function validateInputs(httpResponse) {
    let body = JSON.parse(httpResponse);
    if (body.nationalID == "") {
        return ErrMissingNationalID
    }

    if (body.name == "") {
        return ErrMissingName
    }

    if (body.lastName == "") {
        return ErrMissingLastName
    }

    if (body.phone == "") {
        return ErrMissingPhone
    }

    if (body.password == "") {
        return ErrMissingPassword
    }

    if (body.confirmPassword == "") {
        return ErrMissingConfirmPassword
    }

    if (body.password != body.confirmPassword) {
        return ErrNoMatchInPasswords
    }

    if (body.email == "") {
        return ErrMissingEmail
    }

    if (body.address == "") {
        return ErrMissingAddress
    }

    return null;
}