/*
 * 操作数据库、表
 */

let path = require('path');
let sqlite3 = require('sqlite3').verbose();
let db = null;
let tableName = 'tabList';

function open() {
    if (!db) {
        let db_file = path.join(__dirname, 'app.db');
        db = new sqlite3.Database(db_file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
            if (err) {
                console.log(`打开数据库文件'${db_file}'失败,${err}`);
            } else {
                console.log(`打开数据库文件'${db_file}'成功。`);
                createTable();
            }
        });
    } else {
        console.log('数据可文件已open,不要重复open()。')
    }
}

function close() {
    if (db) {
        db.close((err) => {
            if (err) {
                console.log(`数据库关闭失败,${err}。`);
            } else {
                console.log('数据库关闭成功。');
            }
        });
    }
}

function createTable() {
    let fields = {
        tabId: 'tabId integer primary key autoincrement',
        name: 'name text'
    };
    let sql = `create table ${tableName} (${fields.tabId},${fields.name})`;
    db.run(sql, function (err) {
        if (err) {
            console.log(`表${tableName}创建失败！`);
        } else {
            console.log(`表${tableName}创建成功。`);
            defaultInsert();
        }
    });
}

function defaultInsert() {
    if (db) {
        let sql = `insert into ${tableName} (name) values(?)`;
        let prepare = db.prepare(sql);
        let defaultTabs = ['默认分组1','默认分组2','默认分组3','默认分组4','默认分组5','默认分组6'];
        defaultTabs.map((name,index)=>{
            prepare.run(name,function (err) {
               if (err) {
                   console.log(`defaultInsert fail, ${err}。`);
               } else {
                   console.log(`defaultInsert success, ${name}。`);
               }
            });
        })
        prepare.finalize();
    }
}

function getTabList(callBack) {
    if (db) {
        let tabList = []
        let sql = `select tabId, name from ${tableName}`;
        db.all(sql, function (err, rows) {
            if (!err) {
                (rows || []).map((row, index) => {
                    tabList.push({
                        index: index,
                        tabId: row.tabId,
                        name: row.name
                    });
                })
            }
            if (callBack) {
                callBack(tabList)
            }
        });
    }
}

module.exports = {
    open,
    close,
    getTabList
}
