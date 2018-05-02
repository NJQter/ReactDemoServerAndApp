/*
 * itemList.js
 */

let express = require('express');
let router = express.Router();
let db = require('../database/db');

router.get('/', function(req, res, next) {
    res.set('Access-Control-Allow-Origin','*');
    let tabId = req.query.tabId;
    db.getItemList(tabId,function (itemList) {
        res.send({itemList:itemList});
    });
});

module.exports = router;
