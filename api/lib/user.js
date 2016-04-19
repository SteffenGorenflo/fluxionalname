'use strict';

module.exports = {
    handler,
    getUserById,
    registerUser,
    login
};

function handler(request, reply) {


    request.server.seneca.act({role: 'user', cmd: 'get', by: 'id', id: 'e76d1ac9-bae0-4814-a19d-566547e8c92c'}, function (err, data) {
        reply(data);
    });
}
function getUserById(request, reply) {


    request.server.seneca.act({role: 'user', cmd: 'get', by: 'id'}, request.params, function (err, data) {
        reply(data);
    });
}

function registerUser(request, reply) {
    request.server.seneca.act('role:user,cmd:create', request.payload, function (err, data) {

        reply(data);
        request.cookieAuth.set(data);
    });
}

function login(request, reply) {
    request.server.seneca.act('role:user,cmd:login', request.payload, function (err, data) {
        if (err) {
            return reply.code(401);
        }

        request.cookieAuth.set(data);
        reply(data);
    });
}