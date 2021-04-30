const mysql=require('mysql2/promise');

const pool=mysql.createPool({
    host: 'localhost',
    port: 3307,
    user:'sinja',
    password:'sinja',
    database:'korex'
});

const dbTest = async () => {
    const connection  = await pool.getConnection(async conn => conn);

    console.log('dbTest함수 실행,비동기함수실행 connectino개체:',connection);

    try{
        const connection=await pool.getConnection(async conn => conn);
        try{
            var business_number='123-55-5545645';
            var regi_name='titititi';
            var mem_id='11';
            await connection.beginTransaction();
            const [rows]= await connection.query("insert into business(mem_id,business_number,regi_name) values(?,?,?)",[mem_id,business_number,regi_name]);
            //const [rows]=await connection.query("select * from users");
            await connection.commit();
            connection.release();

            console.log('반환결과는 과연:',rows);
            return rows;
        }catch(err){
            await connection.rollback();
            
            connection.release();
            console.log('query Error');
            return false;
        }
    }catch(err){
        console.log('DB ERROR');
        return false;
    }
};
//dbTest함수에 async가 추가된것이 보인다. async함수로 선언되어야 원하느 순서대로 흘러가는 함수 만들수있다. pool.getConnectino함수는 커넥션 가져온다.
var dbresult=dbTest();
console.log('dbresult과연 dbTest함수 호출 aiwt await기다리고나서 결과반환 return:',dbresult);