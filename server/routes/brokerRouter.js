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

router.post('/user_brokerRequest',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);

    //단수 알고리즘 해야함. 기존 쿼리에서 해당 매물이 다른 전문중개사에 등록된건지 여부를 검사. 일단은 insert먼저 하고 단수알고리즘은 나중에
    try{
        /*dong,hosil,floor,dangi,dangiaddress,name,phone,maemultype,maeulname,jeongyongdimension,jeonyongpyeong,supplydimension,supplypyeong, 
        selltype,sellprice,mangecost,ibju_isinstant,ibju_speciftydate, exculsive_peridos,companyid,requestmemdi
        아파트,오피의 경우 단지명,단지주소,동 층 호실의 조합으로 구분한다.사실상 이 조합이 유일하게 임의 등록하려는 전속매물끼릴를 구분할수있는 것이기에. 기존 products,transaction등에서 이러한 조합으로
        구분하여 존재하고있는것이면 등록안되게끔 하는게 단수알고리즘.
        */
        //prd_id로 등록한다.
        var dong=req_body.dong;
        var hosil=req_body.hosil;
        var floor=req_body.floor;
        var dangi=req_body.dangi;
        var dangiaddress=req_body.dangiaddress;
        var name=req_body.name;
        var phone=req_body.phone;
        var maemultype=req_body.maemultype;
        var maemulname=req_body.maemulname;
        var jeonyongdimension=req_body.jeonyongdimension;
        var jeonyongpyeong=req_body.jeonyongpyeong;
        var supplydimension=req_body.supplydimension;
        var selltype=req_body.selltype;
        var sellprice=req_body.sellprice;
        var managecost=req_body.managecost;
        var companyid=req_body.companyid;
        var requestmemid=req_body.requestmemid;
        var address_detail=dong+' '+hosil+' '+floor;


        //product에 가장 먼저 넣고, 추출해야할것은 prd_id(insertId이고) 이 insertid를 prd_identity_id대입한다.
        await connection.beginTransaction();
        var [products_insert_rows]=await connection.query('insert into product(company_id,prd_name,prd_type,prd_sel_type,prd_price,prd_month_price,prd_status,prd_display,prd_area,prd_area_fect,prd_exculsive_status,address,address_detail,supply_space,exculsive_space,create_date,modify_date,request_memid,product_create_origin,request_man_name,request_mem_phone,managecost) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[companyid,maemulname,maemultype,selltype,sellprice,sellprice,'대기',0,1,1,0,dangiaddress,address_detail,supplydimension,jeonyongdimension,new Date(),new Date(),requestmemid,1,name,phone,managecost]);
        await connection.commit();
        console.log('produts insert query rtowss:',products_insert_rows);
        //connection.release();

        var prd_identity_id=products_insert_rows.insertId;

        //방금막 추가한 isnertid에 해당하는 prd_id의 idnenity_id지정.update지정 update prd_idneity_id ->product
        await connection.beginTransaction();
        var [products_update_rows] = await connection.query('update product set prd_identity_id=? where prd_id=?',[prd_identity_id,prd_identity_id]);
        await connection.commit();
        console.log('products update query rows:',products_update_rows);

        //trasnaction에 지정한다->> prd_identtiy_id로 지정
        await connection.beginTransaction();
        var [transaction_insert_rows] = await connection.query('insert into transaction(company_id,txn_type,txn_status,txn_order_type,create_date,modify_date,prd_identity_id) values(?,?,?,?,?,?,?)',[companyid,1,'의뢰대기',selltype,new Date(),new Date(),prd_identity_id]);
        await connection.commit();
        console.log('products transaction insert query rows:',transaction_insert_rows);

        var extract_txn_id=transaction_insert_rows.insertId;

        //transaction_history에 지정한다 -> prd_identity_id로 지정
        await connection.beginTransaction();
        var [transaction_history_insert_rows] = await connection.query('insert into transaction_history(txn_id,company_id,prd_identity_id,th_status,th_type,create_date,modify_date) values(?,?,?,?,?,?,?)',[extract_txn_id,companyid,prd_identity_id,'의뢰대기',selltype,new Date(),new Date()]);
        await connection.commit();
        console.log('transaction_history insert query rows:',transaction_history_insert_rows);

        if(products_update_rows && products_insert_rows && transaction_insert_rows && transaction_history_insert_rows){
            connection.release();
            return response.json({success:true, message:'product,transaction등 server query success!!'});
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
router.post('/user_brokerRequestlistview',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);
    
    console.log('/user_brokerRequestListview request session store:::>>>>',request.session);

    //try catch문 mysql 구문 실행구조.
    try{
        var broker_product_list=[];

        var [product_row]=await connection.query('select distinct prd_identity_id from product where request_memid=?',[request.session.user_id]);
        
        console.log('select query rows results:',product_row);
        //connection.release();

        if(product_row){

            for(var ss=0; ss<product_row.length; ss++){
                var [part_product_query_row]=await connection.query("select * from product where prd_identity_id=?",[product_row[ss].prd_identity_id]);

                console.log('part product identity distinct quqery results:',part_product_query_row);

                broker_product_list[ss]=part_product_query_row;
            }
            console.log('respronse reuslt data:',broker_product_list);
            connection.release();
            return response.json({success:true, message:'product server query success!!', result_data: broker_product_list});
        }else{
            connection.release();
            return response.json({success:false, message:'server query parts probilem error!!'});
        }
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});

module.exports=router;