'use strict';

const actions = require('./lib/actions');

const defaults = {
    name: 'user'
};

module.exports = function (options) {

    const seneca = this;
    const extend = seneca.util.deepextend;

    const opts = extend(defaults, options);

    seneca.add({init: opts.name}, function (args, ready) {
        console.log('init', defaults.name);
        // do some init work
        setTimeout(ready, 100);
    });

    seneca.add('role:seneca,cmd:close', function (close_msg, done) {
        // do some cleanup or something
        console.log('bye bye from', defaults.name);
        this.prior(close_msg, done);
    });

    seneca.add({role: 'user', cmd: 'create'}, actions.createUser);
    seneca.add({role: 'user', cmd: 'get', by: 'nothing'}, actions.getAllUser);
    return {
        name: opts.name
    };
};
