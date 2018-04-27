/*
 tabList.js
 */

let express = require('express');
let router = express.Router();
let db = require('../database/db');
db.open && db.open();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.set('Access-Control-Allow-Origin','*');
    db.getTabList((tabList)=>{
        console.log(tabList);
        res.send({tabList: tabList});
    });
});

module.exports = router;
