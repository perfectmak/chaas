const rx = require('rx');
const express = require('express');
const router = express.Router();



router.get('/', function(req, res){
    res.send('requesting users');
});


module.exports = router;
