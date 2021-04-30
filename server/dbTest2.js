const mysql=require('mysql2/promise');

const pool=mysql.createPool({
    host: 'localhost',
    port: 3307,
    user:'sinja',
    password:'sinja',
    database:'korex'
});

const query_async_function=async () => {
    console.log('비동기 함수 구문실행=====여 함수 구문안에서만 await를 쓸수있는듯하다 이상하군.');
    try{
        const connection=await pool.getConnection(async conn => conn);
        console.log('connenction get:',connection);
        try{
            const business_number='sdgsdgsdgsdg';
            const regi_name='ssddxxdgeeegegeg';
    
            //await connection.beginTransaction();//start trasaction
           // const [rows,fields]= await connection.query('insert into business(business_number,regi_name) values(?,?)',[business_number,regi_name]);
            const [rows,feilds] = await connection.query("select * from users");
            //await connection.commit();
            connection.release();
    
            console.log('rows and fields info:',rows,fields);
            return rows;
        }catch(err){
           // await connection.rollback();
            connection.release();
            console.log('query Ereror');
            return false;
        }
    }catch(err){
        console.log('DB ERROR');
        return false;
    }
};
query_async_function();//비동기 함수 실행
