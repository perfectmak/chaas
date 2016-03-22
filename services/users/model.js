"use strict"

const rx = require('rx');

const output$ = new rx.Subject();

function observe(intent) {
    intent.auth$.subscribe(authUser);
}

function authUser(user){
    console.log('auth user');
    output$.onNext('authorized user');
}


module.exports = {
    observe: observe,
    output$: output$
};