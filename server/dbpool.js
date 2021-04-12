const mysql=require('mysql');
const config=require('./db_config.json');

var pool=mysql.createPool(config);

console.log('pool',pool);
function getConnection(callback){
    console.log('전달 함수요청:',callback);
    pool.getConnection(function(err,conn){
        console.log('ppol내장 됀 함수 모듈외부모듈함수실행, 내부 콜백함수: conn을 callback에 전달',conn);
        if(!err){
            callback(conn);
        }
    });
}

module.exports=getConnection;
