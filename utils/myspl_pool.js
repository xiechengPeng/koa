var mysql = require('mysql');
// var config = require('../config')

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'dome',
    port:3306
});
//
// let query = function( sql, values ) {
//
//     return new Promise(( resolve, reject ) => {
//         pool.getConnection(function(err, connection) {
//             if (err) {
//                 reject( err )
//             } else {
//                 connection.query(sql, values, ( err, rows) => {
//                     if ( err ) {
//                         reject( err )
//                     } else {
//                         resolve( rows )
//                     }
//                     connection.release()
//                 })
//             }
//         })
//     })
//
// }

var Connection = require('mysql/lib/Connection.js');
let query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                transAutoRelease(connection)
                connection.beginTransaction(function(err) {
                    if (err){
                        reject(err)
                    } else{
                        connection.query(sql, values, (err, rows) => {
                            if (err) {
                                connection.rollback(function() {});
                                reject(err)
                            } else {
                                connection.commit(function() {
                                  //  console.log('success' + JSON.stringify(rows));
                                });
                                resolve(rows)
                            }
                           // connection.release()
                        })
                    }

                });
            }

        })
    })

}
let connect = function( ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                transAutoRelease(connection)
                connection.beginTransaction(function(err) {
                    if (err){
                        reject(err)
                    } else{
                        resolve(connection)
                    }

                });
            }

        })
    })
}

function queryNoCommit(connect,sql,value) {
    return new Promise(( resolve, reject ) => {
        connect.query(sql, value, (err, rows) => {
            if(err){
                connect.rollback()
                reject(err)
            }else{
                resolve(rows)
            }

        });
    });
}

function after(fn, cb) { return function() {
    fn.apply(this, arguments);
    cb();
}
}
function transAutoRelease(conn) {
    if (conn.commit == Connection.prototype.commit)
        conn.commit = after(conn.commit, release);
    if (conn.rollback == Connection.prototype.rollback)
        conn.rollback = after(conn.rollback, release);

    function release() {
        if (conn) {
            conn.release();
        }
    }
}


module.exports={
    query,
    pool,
    queryNoCommit,
    connect
}