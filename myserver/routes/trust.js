/*
 trust.js
 */

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Credentials',true);
    res.send({success:true});
});

module.exports = router;