"use strict"

const rx = require('rx');

const _export = {};

function forPath(path, request$) {
    return request$.filter(function(request) {
        return request.url.indexOf(path) != -1;
    });
}

function authenticate(request$) {
    return forPath('auth', request$).map(function(request) {
        const query = request.query;
        return request.url;
    });
}

function register(request$) {
    return forPath('register', request$).map(function (request) {
        return request.url;
    });
}

function observe(request$) {
    const auth$ = authenticate(request$);
    const register$ = register(request$);

    _export.auth$ = auth$;
    _export.register$ = register$;
}

_export.observe = observe;

module.exports = _export;

