const coolsms=require('../modules/coolsms');

const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

//const app=express();
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(cors());

const mysqls=require('mysql2/promise');
const pool =mysqls.createPool({
    host:'localhost',
    port:3307,
    user:'sinja',
    password:'sinja',
    database:'korex'
});

const router=express.Router(); 

router.post('/companyprofileEdit',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);

    //companyProfileEdit 회사프로필 수정 post요청 처리.
    try{
        
        //prd_id로 등록한다.
        var companyname = req_body.companyname;
        var address1= req_body.address1;
        var address2=req_body.address2;
        var address3=req_body.address3;
        var phone=req_body.phone;
        var ceoname=req_body.ceoname;
        var ceophone=req_body.ceophone;
        var addressfull= address2 + '  '+address3;

        //로그인되어있는 mem_id현재 관리자일것이고, 그 관리자가 선택한 or 그 관리자자체 소속root기업 comapnyid를 구한다. 
        var now_login_memid=request.session.user_id;

        //product에 가장 먼저 넣고, 추출해야할것은 prd_id(insertId이고) 이 insertid를 prd_identity_id대입한다. 여기선 관리자mem_id에 해당하는 루트기업을 구한다. 그 관리자가 선택한 소속기업을 수정하는 경우가 보편적이긴하다. 선택한 소속기업companyid이며 그 소속기업들이 또 소속된 root기업 까지는 없어도 되나 안정성 측면, 쌍정보 필요할수있음. root comapnyid, 선택(소속)companayi 
        var [select_rows]=await connection.query('select * from company where mem_id=?',[now_login_memid]);
        console.log('company select query rows:',select_rows);
        var get_company_id=select_rows[0].company_id;

        //해당 companyid에 해당하는 기업을 수정한다.
        await connection.beginTransaction();
        var [update_rows]=await connection.query('update company set modify_date=?, phone=?,biz_name=?,ceo_name=?,ceo_phone=?,address=? where company_id=?',[new Date(),phone,companyname,ceoname,ceophone,addressfull,get_company_id]);
        await connection.commit();
        console.log('update company edit rows query',update_rows);
        connection.release();

        if(update_rows){
            connection.release();
            return response.json({success:true, message:'server query success!!'});
        }else{
            connection.rollback();
            connection.release();
            return response.json({success:false, message: 'server query parts probilem error!!'});
        }
        
    }catch(err){
        console.log('server query error',err);
        connection.rollback();
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
router.post('/companyprofileView',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);

    //companyProfileEdit 회사프로필 수정 post요청 처리.
    try{
        
        //로그인되어있는 mem_id현재 관리자일것이고, 그 관리자가 선택한 or 그 관리자자체 소속root기업 comapnyid를 구한다. 
        var now_login_memid=request.session.user_id;

        //product에 가장 먼저 넣고, 추출해야할것은 prd_id(insertId이고) 이 insertid를 prd_identity_id대입한다. 여기선 관리자mem_id에 해당하는 루트기업을 구한다. 그 관리자가 선택한 소속기업을 수정하는 경우가 보편적이긴하다. 선택한 소속기업companyid이며 그 소속기업들이 또 소속된 root기업 까지는 없어도 되나 안정성 측면, 쌍정보 필요할수있음. root comapnyid, 선택(소속)companayi 
        var [select_rows]=await connection.query('select * from company where mem_id=?',[now_login_memid]);
        console.log('company select query rows:',select_rows);
        var get_company_id=select_rows[0].company_id;

        //해당 companyid에 해당하는 기업을 조회한다.
        var [view_rows]=await connection.query('select * from company where company_id=?',[get_company_id]);
        console.log('select company rows query',view_rows);
        connection.release();

        if(view_rows){
            connection.release();
            return response.json({success:true, message:'server query success!!', result_data:view_rows});
        }else{
            connection.release();
            return response.json({success:false, message: 'server query parts probilem error!!'});
        }
        
    }catch(err){
        console.log('server query error',err);
        connection.rollback();
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
module.exports=router;