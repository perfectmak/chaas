"use strict"

const rx = require('rx');
const express = require('express');

const intent = require('./intent');
const model = require('./model');


const router = express.Router();

// used to hold output response for a request
// still not sure how to pipe this through a stream
let response;

/**
 * Turns an express router request into an event stream.
 *
 * @param router
 * @returns {*}
 */
function makeRequestStream(router){
    return rx.Observable.create(function (observer){
        router.all('/*', function(req, res){
            response = res;
            observer.onNext(req);
        });
    });
}

function outputFromStream(model){
    model.output$.subscribe(function(output) {
        response.send(output);
    });

}

const request$ = makeRequestStream(router);

intent.observe(request$);
model.observe(intent);
outputFromStream(model);


module.exports = router;
