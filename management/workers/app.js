const worker = require('../../connection/worker/worker');

const ErrMissingName = new Error('missing name');
const ErrMissingEmail = new Error('missing email');
const ErrMissingPhone = new Error('missing phone');
const ErrMissingAddress = new Error('missing address');
const ErrMissingPassword = new Error('missing password');
const ErrMissingLastName = new Error('missing last name');
const ErrMissingServicios = new Error('missing servicios');
const ErrMissingNationalID = new Error('missing national id');
const ErrNoMatchInPasswords = new Error('passwords must be equals');
const ErrMissingConfirmPassword = new Error('missing confirm password');


function buildJSONResponse(status, message) {
    return JSON.parse(`{'status': ${status}, 'message': '${message}'}`);
}

function validateInputs(body) {
    if (body.nationalID === '') {
        return ErrMissingNationalID;
    }

    if (body.name === '') {
        return ErrMissingName;
    }

    if (body.lastName === '') {
        return ErrMissingLastName;
    }

    if (body.phone === '') {
        return ErrMissingPhone;
    }

    if (body.password === '') {
        return ErrMissingPassword;
    }

    if (body.confirmPassword === '') {
        return ErrMissingConfirmPassword;
    }

    if (body.password !== body.confirmPassword) {
        return ErrNoMatchInPasswords;
    }

    if (body.email === '') {
        return ErrMissingEmail;
    }

    if (body.address === '') {
        return ErrMissingAddress;
    }

    if (body.servicios.length === 0) {
        return ErrMissingServicios;
    }

    return null;
}

function handle(httpResponse) {
    let err = validateInputs(httpResponse);
    if (err !== null) {
        return buildJSONResponse(400, err);
    }

    err = worker.storeWorker(httpResponse);
    if (err !== null) {
        return buildJSONResponse(500, err);
    }

    return buildJSONResponse(200, 'worker_successfull_indexed');
}

/*
httpResponse
{
    'nationalID': '11', 'name': 'johan', 'lastName': 'florez', 'phone': '1212', 'password': '*',
    'confirmPassword': '*', 'email': 'j@gmail.com', 'address': 'cra212', 'profilePhoto': 'base64',
    'documentPhoto': 'base64', servicios: [{},{}]
}
*/

const test = {
    nationalID: '11', name: 'johan', lastName: 'florez', phone: '1212', password: '*', confirmPassword: '*', email: 'j@gmail.com', address: 'cra212', profilePhoto: 'base64', documentPhoto: 'base64', servicios: '{}',
};

handle(test);

module.exports = {
    handle,
};
