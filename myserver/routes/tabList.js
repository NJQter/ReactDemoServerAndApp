/*
 tabList.js
 */

let express = require('express');
let router = express.Router();
let db = require('../database/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.set('Access-Control-Allow-Origin','*');
    db.getTabList((tabList)=>{
        res.send({tabList: tabList});
    });
});

module.exports = router;
