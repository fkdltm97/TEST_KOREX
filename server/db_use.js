const getConnection=require('./dbpool');

getConnection((conn) => {
    console.log('함수전달: connection전달받은 개체 connection개체 전달받음:',conn);

    conn.query("select * from users",function(err,result){
        console.log('겨로가 results:',result);
    });
    conn.release();
});
