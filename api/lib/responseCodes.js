'use strict';

const boom = require('boom');

module.exports = {
    unwrap
};

const ERRORS = {
    NOT_FOUND: {fn: boom.notFound},
    BAD_IMPL: {fn: boom.badImplementation},
    MISSING_COMPANY_ID_SESSION: {fn: boom.badRequest, details: 'Please define a company_id for your session'}
};


function unwrap(serviceResponse) {
    if (serviceResponse && !serviceResponse.err && serviceResponse.data) {
        return serviceResponse.data;
    }

    if (serviceResponse && serviceResponse.err) {

        // get boom function
        let boom = ERRORS[serviceResponse.err.msg];

        if (!boom) {
            console.error('TODO: unknown error-code:', serviceResponse.err.msg);
            return boom.badImplementation();
        }

        // return boom function with (optional) message
        return boom.fn(serviceResponse.err.details || boom.details);
    }
    // TODO: log, really bad - should never happen
    console.error('really bad:', serviceResponse);
    return boom.badImplementation();

}