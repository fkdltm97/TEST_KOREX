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
    host:'korex-dev-db.cewuqg5n85w2.ap-northeast-2.rds.amazonaws.com',
    //host: 'localhost',
    //host : '13.209.251.38',
    port:3306,
    user:'pref_user',
    password:'vmfpvm$3909',
    database:'korex_pref',
    dateStrings : 'date'
});

console.log('==>>>>>brokerRouter default program excecute poolss::',pool);


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
        임의 전문중개사가 전용담당하고있는걸로 하면 안되고, 그 중개사id로 등록된 상품들중에서 해당 요청ho_id(아파트,오피스텔의 경우 등록하려는 아파트오피의 특정층의 특정호실에 대한 그 매물로 등록한 product가 있다면 그건 이미 코렉스시스템에 등록된 매물인것임,) 사무실상가의 경우는 product에서 임의 전문중개사companyid로 등록된 rpdocdut내역중에서 그 해당 flr_id층id값 어떤 상가,사무실건물의 특정 건물그 자체의 n층에 해당하는 (층단위)flr_id로의 등록이 이미 되었는지로 판단.(오피,아파트보다 좀더 신청가능한 범위가 좁음.)
        */
        //prd_id로 등록한다.
        var dong=req_body.dong;
        var hosil=req_body.hosil;
        var floor=req_body.floor;
        var dangi=req_body.dangi;
        var dangijibunaddress=req_body.dangijibunaddress;
        var dangiroadaddress=req_body.dangiroadaddress;
        var dongname=req_body.dongname;
        var floorname=req_body.floorname;
        var hosilname=req_body.hosilname;
        var x=req_body.x;
        var y=req_body.y;
        
        var name=req_body.name;
        var phone=req_body.phone;
        var maemultype=req_body.maemultype;
        var maemulname=req_body.maemulname;
        var jeonyongdimension=req_body.jeonyongdimension;
        var jeonyongpyeong=req_body.jeonyongpyeong;
        var supplydimension=req_body.supplydimension;
        var supplypyeong=req_body.supplypyeong;
        var selltype=req_body.selltype;
        var sellprice=req_body.sellprice;
        var managecost=req_body.managecost;
        var companyid=req_body.companyid;
        var requestmemid=req_body.requestmemid;
        var address_detail=dongname+' '+floorname+' '+hosilname;

        var ibju_isinstant=req_body.ibju_isinstant;
        var ibju_specifydate=req_body.ibju_specifydate;
        var exculsive_periods=req_body.exculsive_periods;
        //product에 가장 먼저 넣고, 추출해야할것은 prd_id(insertId이고) 이 insertid를 prd_identity_id대입한다.
        await connection.beginTransaction();
        var [products_insert_rows]=await connection.query('insert into product(company_id,prd_name,prd_type,prd_sel_type,prd_price,prd_month_price,prd_status,prd_latitude,prd_longitude,prd_exculsive_status,address_detail,supply_space,exculsive_space,floor,modify_date,create_date,request_memid,product_create_origin,request_man_name,request_mem_phone,managecost,ibju_isinstant,ibju_specifydate,exculsive_pyeong,supply_pyeong,exculsive_periods,managecostincludes,bld_id,ho_id,addressjibun,addressroad) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[companyid,maemulname,maemultype,selltype,sellprice,sellprice,'검토대기',x,y, 0,address_detail,supplydimension,jeonyongdimension,floor,new Date(),new Date(),requestmemid,'중개의뢰',name,phone,managecost,ibju_isinstant,ibju_specifydate,jeonyongpyeong,supplypyeong,exculsive_periods,'',dong,hosil,dangijibunaddress,dangiroadaddress]);
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
        var [transaction_insert_rows] = await connection.query('insert into transaction(company_id,txn_type,txn_status,txn_order_type,create_date,modify_date,prd_identity_id) values(?,?,?,?,?,?,?)',[companyid,1,'검토대기',selltype,new Date(),new Date(),prd_identity_id]);
        await connection.commit();
        console.log('products transaction insert query rows:',transaction_insert_rows);

        var extract_txn_id=transaction_insert_rows.insertId;

        //transaction_history에 지정한다 -> prd_identity_id로 지정
        await connection.beginTransaction();
        var [transaction_history_insert_rows] = await connection.query('insert into transaction_history(txn_id,company_id,prd_identity_id,th_status,th_type,create_date,modify_date) values(?,?,?,?,?,?,?)',[extract_txn_id,companyid,prd_identity_id,'검토대기',selltype,new Date(),new Date()]);
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
//외부수임 직접 등록(중개사)
router.post('/user_brokerOuterRequest',async function(request,response){
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
        var address = req_body.address;
        var apartspaceoption = req_body.apartspaceoption_val;
        var bathroomcount = req_body.bathroomcount_val;
        var companyid = req_body.companyid;
        var dangi = req_body.dangi;
        var direction = req_body.direction_val;
        var dong = req_body.dong;
        var entrance = req_body.entrance_val;
        var exculsive_periods= req_body.exculsive_periods;
        var exculsivedimension=req_body.exculsivedimension;
        var exculsivepyeong = req_body.exculsivepyeong;
        var floor= req_body.floor;
        var guaranteeprice = req_body.guaranteeprice_val;
        var heatfuel = req_body.heatfuel_val;
        var heatmethod = req_body.heatmethod_val;
        var hosil = req_body.hosil;
        var ibju_isinstant = req_body.ibju_isinstant;
        var ibju_specifydate = req_body.ibju_specifydate;
        ibju_isinstant= (ibju_isinstant != '' || ibju_isinstant != null ) ? ibju_isinstant : 0;
        ibju_specifydate = (ibju_specifydate != '' || ibju_specifydate != null ) ? ibju_specifydate : '0000-00-00';
        var iscontractrenewal = req_body.iscontractrenewal_val;
        var isduplexfloor = req_body.isduplexfloor_val;
        var iselevator= req_body.iselevator_val;
        var isparking = req_body.isparking_val;
        var iswithpet = req_body.iswithpet_val;
        isduplexfloor= (isduplexfloor != '' || isduplexfloor != null) ? isduplexfloor : 0;
        isparking = (isparking !='' || isparking != null) ? isparking : 0;
        iselevator = (iselevator !='' || iselevator != null) ? iselevator : 0;
        iswithpet = (iswithpet !='' || iswithpet != null)? iswithpet : 0;
        var loanprice = req_body.loanprice_val;
        var maemul_description = req_body.mameul_description_val;
        var maemul_descriptiondetail_val = req_body.maemul_descriptiondetail_val;
        var maemulname = req_body.maemulname;
        var maemultype = req_body.maemultype;//maemultype
        var managecost = req_body.managecost;
        var managecostincludes = req_body.managecostincludes;
        var parkingoptions = req_body.parkingoptions_val;
        var requestmanname = req_body.requestmanname;
        var requestmemphone = req_body.requestmemphone;
        var roomcount = req_body.roomcount_val;
        var securityoption = req_body.securityoption_val;
        var sellprice = req_body.sellprice;
        var selltype= req_body.selltype;
        var spaceaddonoption = req_body.spaceaddonoption_val;
        var spaceoption = req_body.spaceoption_val;
        var supplydimension = req_body.supplydimension;
        var supplypyeong = req_body.supplypyeong;
        var address_detail = dong + '동 '+floor+' 층'+hosil+'호';

        //product에 가장 먼저 넣고, 추출해야할것은 prd_id(insertId이고) 이 insertid를 prd_identity_id대입한다.
        await connection.beginTransaction();
        var [products_insert_rows]=await connection.query('insert into product(address,apartspaceoption,bathroom_count,company_id,direction,entrance,address_detail,exculsive_periods,exculsive_space,exculsive_pyeong,prd_status,floor,month_base_guaranteeprice,heat_fuel_type,heat_method_type,ibju_isinstant, ibju_specifydate, iscontractrenewal, isduplexfloor,is_elevator,is_parking,iswithpet,loanprice,maemul_description,maemul_descriptiondetail,prd_name,prd_type,managecost,managecostincludes,parkingoptions,request_man_name,request_mem_phone,room_count,securityoption,prd_price,prd_sel_type,spaceaddonoption,spaceoption,supply_space,supply_pyeong,product_create_origin) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[address,apartspaceoption,bathroomcount,companyid,direction,entrance,address_detail,exculsive_periods,exculsivedimension,exculsivepyeong,'검토대기',floor,guaranteeprice,heatfuel,heatmethod,ibju_isinstant,ibju_specifydate,iscontractrenewal,isduplexfloor,iselevator,isparking,iswithpet,loanprice,maemul_description,maemul_descriptiondetail_val,maemulname,maemultype,managecost,managecostincludes,parkingoptions,requestmanname,requestmemphone,roomcount,securityoption,sellprice,selltype,spaceaddonoption,spaceoption,supplydimension,supplypyeong,'외부수임']);
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
        var [transaction_insert_rows] = await connection.query('insert into transaction(company_id,txn_type,txn_status,txn_order_type,create_date,modify_date,prd_identity_id) values(?,?,?,?,?,?,?)',[companyid,1,'검토대기',selltype,new Date(),new Date(),prd_identity_id]);
        await connection.commit();
        console.log('products transaction insert query rows:',transaction_insert_rows);

        var extract_txn_id=transaction_insert_rows.insertId;

        //transaction_history에 지정한다 -> prd_identity_id로 지정
        await connection.beginTransaction();
        var [transaction_history_insert_rows] = await connection.query('insert into transaction_history(txn_id,company_id,prd_identity_id,th_status,th_type,create_date,modify_date) values(?,?,?,?,?,?,?)',[extract_txn_id,companyid,prd_identity_id,'검토대기',selltype,new Date(),new Date()]);
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
//중개사회원의 모든 매물리스트
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
//사용자 중개의뢰 리스트
router.post('/BrokerRequest_productlist',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);
    
    console.log('/BrokerRequest_productlist request session store:::>>>>',request.session);

    //try catch문 mysql 구문 실행구조.
    try{
        //로그인유저 memid 에 해당하는 (중개사)회원 companyid 고유회사아이디 구한다. 어떤 중개사(companyid)인지 여부 그리고 그를 선임하여 요청한 의뢰상품목록들(products)
        var [company_id_row] = await connection.query("select * from company where mem_id=?",[request.session.user_id]);
        console.log('company_id_get:',company_id_row);
        var get_company_id=company_id_row[0].company_id;

        var brokerRequest_productlist=[];

        var [product_row]=await connection.query('select distinct prd_identity_id from product where company_id=?',[get_company_id]);//수임받게될 전문중개사가 등록(외부수임,의뢰)하게 될 product들 초기상태값은 의뢰대기,검토대기 기본값 상태
        
        console.log('speicfy login broker company or(selected brokercompanyid) registered or assgigned productlists:',product_row);
        //connection.release();

        if(product_row){

            for(var ss=0; ss<product_row.length; ss++){
                var [part_product_query_row]=await connection.query("select * from product where prd_identity_id=?",[product_row[ss].prd_identity_id]);

                console.log('part product identity distinct quqery results:',part_product_query_row);

                brokerRequest_productlist[ss]=part_product_query_row;
            }
            console.log('respronse reuslt data:',brokerRequest_productlist);
            connection.release();
            return response.json({success:true, message:'product server query success!!', result_data: brokerRequest_productlist});
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
//해당 prd_identity_id에 해당하는 특정요청 의뢰매물에 대한 view,modify요청
router.post('/brokerRequest_productview',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);
    
    //try catch문 mysql 구문 실행구조.
    try{

        var [brokerRequest_product_query_row]=await connection.query("select * from product where prd_identity_id=? order by prd_id desc",[req_body.prd_identity_ids]);

        console.log('brokerReuqest speicfy target query row:',brokerRequest_product_query_row);
            
        //await connection.beginTransaction();
        //var [products_update_rows] = await connection.query('update product set where prd_identitiy')
        connection.release();

        return response.json({success:true, message:'product server query success!!', result_data: brokerRequest_product_query_row});      
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//중개사가 중개의뢰온 매물상품에 대해서 확인하고 수정할시에 실행.
router.post('/brokerRequest_productconfirmupdate',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);
    
    //try catch문 mysql 구문 실행구조.
    try{

        //var [brokerRequest_product_query_row]=await connection.query("select * from product where prd_identity_id=? and company_id=? order by prd_id desc",[req_body.prdidentityid,req_body.companyid]);

       //console.log('brokerReuqest speicfy target query row:',brokerRequest_product_query_row);
         
       await connection.beginTransaction();
       //address,companyi,dexculsivedimension,exculsivepyong,ibju_isinstatnt,ibju_specifydate,maemulname,maemultype,mangaecost,name,phone,predidnetiyid,requestmnname,requetmemid,requestmemphone,sellprcie,selltype,supplydiemnsion,supplypyong,roomcount,bathroomcount,isdupelxfloor,isparkgin,parkginoptons,iselveator,iswithpet,direction,entrance,heatmehtod,heatfuel,apartspaceoiption,spaceoption,securtyooption,spacaddontiopo,iscontractnrenval,iloadprice,guaranteeprice,maemul_dscert,maemul_dsecrptidetal

       //var [products_update_rows] = await connection.query('update product set prd_type=?,prd_sel_type=?, prd_price=?, prd_address=?, supply_space=?, exculsive_space=?, direction=?, bathroom_count=?, room_count=?, heat_method_type=?,heat_fuel_type=?, is_parking=?, is_elevator=?, modify_date=? , managecost=?, ibju_isinstant=?, ibju_specifydate=?, isduplexlfoor=?, parkingoptions=?, iswithpet=?, entrance=?, apartspaceoption=?, spaceoption=?, securityoption=?, spaceaddonoption=?, iscontractrenewal=?, loanprice=? where prd_identity_id=? and company_id=?',[req_body.maemultype, req_body.selltype, req_body.sellprice, req_body.address,req_body.supplydimension,req_body.exculsivedimension,req_body.direction_val,req_body.bathroomcount_val,req_body.roomcount_val, req_body.heatmethod_val,req_body.heatfuel_val, req_body.isparking_val,req_body.iselevator_val,req_body.iswithpet_val,req_body.entrance_val,req_body.apartspaceoption_val,req_body.spaceoption_val,req_body.securityoption_val,req_body.spaceaddonoption_val,req_body.iscontractrenewal_val,req_body.loanprice_val, req_body.prdidentityid,req_body.companyid]);

       var maemultype= req_body.maemultype != null? req_body.maemultype : '';
       var selltype=req_body.selltype != null? req_body.selltype : -1;

       var sellprice=req_body.sellprice != null? req_body.sellprice : -1;
       var address=req_body.address != null? req_body.address : '';
       var supply_space= req_body.supplydimension != null? req_body.supplydimension : 0;
       var exculsive_space= req_body.exculsivedimension != null? req_body.exculsivedimension : 0;
       var direction = req_body.direction_val != null? req_body.direction : '';
       var bathroom_count= req_body.bathroomcount_val != null? req_body.bathroomcount_val : 0;
       var room_count = req_body.roomcount_val != null?req_body.roomcount_val : 0;
       var heat_method_type = req_body.heat_method_type != null?req_body.heat_method_type : '';
       var head_fuel_type = req_body.heat_fuel_type != null?req_body.heat_fuel_type : '';
       var is_parking=req_body.isparking_val != null ? req_body.isparking_val : 0;
       var is_elevator =req_body.iselevator_val != null?req_body.iselevator_val : 0;
       var managecost = req_body.managecost != null ? req_body.managecost : 0;
       var ibju_isinstant =req_body.ibju_isinstant != null?req_body.ibju_isinstant : 0;

       var sql_query="update product set prd_type='"+req_body.maemultype+"', prd_sel_type='"+req_body.selltype+"', prd_price='"+req_body.sellprice+"', address='"+req_body.address+"', supply_space='"+req_body.supplydimension+"', exculsive_space='"+req_body.exculsivedimension+"', direction='"+req_body.direction_val+"', bathroom_count='"+req_body.bathroomcount_val+"', room_count='"+req_body.roomcount_val+"', heat_method_type='"+req_body.heatmethod_val+"', heat_fuel_type='"+req_body.heatfuel_val+"', is_parking='"+req_body.isparking_val+"', is_elevator='"+req_body.iselevator_val+"', managecost='"+req_body.managecost+"', ibju_isinstant='"+ibju_isinstant+"', isduplexfloor='"+req_body.isduplexfloor_val+"', parkingoptions='"+req_body.parkingoptions_val+"', iswithpet='"+req_body.iswithpet_val+"', entrance='"+req_body.entrance_val+"', apartspaceoption='"+req_body.apartspaceoption_val+"', spaceoption='"+req_body.spaceoption_val+"', securityoption='"+req_body.securityoption_val+"', spaceaddonoption='"+req_body.spaceaddonoption_val+"', iscontractrenewal='"+req_body.iscontractrenewal_val+"', loanprice='"+req_body.loanprice_val+"',month_base_guaranteeprice='"+req_body.guaranteeprice_val+"', maemul_description='"+req_body.maemul_description_val+"', maemul_descriptiondetail='"+req_body.maemul_descriptiondetail_val+"' where prd_identity_id='"+req_body.prdidentityid+"' and company_id='"+req_body.companyid+"'";
       console.log('server sql query statment:',sql_query);

        var [products_update_rows] = await connection.query(sql_query);
        connection.commit();
        connection.release();

        return response.json({success:true, message:'product server query success!!', result_data: products_update_rows});      
        
    }catch(err){
        console.log('server query error',err);
        connection.rollback();
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//의뢰온 매물에 대해서 의뢰수락할시에 처리.
router.post('/brokerRequest_productstatusupdate',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);
    
    //try catch문 mysql 구문 실행구조.
    try{

       await connection.beginTransaction();
      
       var company_id=req_body.company_id;
       var prd_identity_id=req_body.prd_identity_id;

       var sql_query="update product set prd_exculsive_status='1', prd_status='거래준비' where prd_identity_id='"+prd_identity_id+"' and company_id='"+company_id+"'";
       console.log('server sql query statment:',sql_query);

        var [products_update_rows] = await connection.query(sql_query);
        connection.commit();
        connection.release();

        return response.json({success:true, message:'product server query success!!', result_data: products_update_rows});      
        
    }catch(err){
        console.log('server query error',err);
        connection.rollback();
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//중개사가 등록한 매물에 대해서 투어예약셋팅설정 tour,tourdetail등 테이블처리.
router.post('/productToursettingRegister',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);
    
    //try catch문 mysql 구문 실행구조. tour,tourDetail테이블 정보 insert
    try{
       
       var tour_type = req_body.tour_type;
       var company_id=req_body.company_id;
       var mem_id=req_body.mem_id;
       var prd_identity_ids=req_body.prd_identity_ids;

       var normal_isholidayexcept=req_body.normal_isholidayexcept !='' && req_body.normal_isholidayexcept ? req_body.normal_isholidayexcept : 0;
       var normal_select_daycount=req_body.normal_select_daycount !='' && req_body.normal_select_daycount ? req_body.normal_select_daycount : 0;
       var normal_select_days=req_body.normal_select_days != '' && req_body.normal_select_days ? req_body.normal_select_days : '';
       var normal_select_times=req_body.normal_select_times !='' && req_body.normal_select_times ? req_body.normal_select_times : '';

       if(normal_select_days && normal_select_days!=''){
          var normal_select_days_array = normal_select_days.split(',');
       }
       
       var special_specifydate = req_body.special_specifydate !='' && req_body.special_specifydate ? req_body.special_specifydate : '0000-00-00';
       var special_specifydatetimes= req_body.special_specifydatetimes !='' && req_body.special_specifydatetimes ? req_body.special_specifydatetimes : '';
       var special_isexceptspecifydate= req_body.special_isexceptspecifydate != '' && req_body.special_isexceptspecifydate ? req_body.special_isexceptspecifydate : 0;
         

       //일반타입인경우 일반 tour_set_days항목 문자열형태 split중에서 기존항목중에서 새로추가하려는 항목중 하나가 존재 하나라도 하면 막는다.
        if(tour_type == 1){
            var prev_normal_toursetdays=[];
            var [prev_toursetList]=await connection.query("select tour_set_days from tour where prd_identity_id=? and tour_type=1 ",[prd_identity_ids]);
            console.log('prd_dioentity_id요청 매물에 대한 투어예약셋팅 일반 등록 리스트(date하나하나가 셋팅등록내역)',prev_toursetList);
            
            var count=0;
            for(let s=0; s<prev_toursetList.length; s++){
                let tour_set_days_split=prev_toursetList[s]['tour_set_days'].split(',');
                console.log('tour_sert_days_split result:',tour_set_days_split);
                for(let i=0; i<tour_set_days_split.length; i++){
                    prev_normal_toursetdays[count]=tour_set_days_split[i];

                    count++;
                }
            }
            connection.release();
            console.log('일반추가 요청 request요청처리 기존 prd_identity_id 관련 tour예약셋팅리스트 선택요일들 취합(중복포함):',prev_normal_toursetdays);
            prev_normal_toursetdays = Array.from(new Set(prev_normal_toursetdays));//set개체로 변환(중복없이)후에 그 set개체를 array로 반환받음
            console.log('일반추가 요청 request요청처리귀준 선택요일들 중복제거:',prev_normal_toursetdays);

            //해당 중복제거 선택된 요일리스트에서 새로 추가하려는것이 하나라도 발견될시에 추가연산 막는다.
            var is_overwraped_days=false;//일반 집합요일리스트 중에서, 기존에 선택된 요일들중 하나라도 추가하려고 하는경우에 중복여부
            for(let ss=0; ss<normal_select_days_array.length; ss++){
                for(let ii=0; ii<prev_normal_toursetdays.length; ii++){
                    if(normal_select_days_array[ss] == prev_normal_toursetdays[ii]){
                        is_overwraped_days=true;
                    }
                }
            }
            console.log('>>일반추가 요일중복여부::',is_overwraped_days);

            if(is_overwraped_days){

                return response.json({success:false, message:'이미 추가됀 요일집합입니다!', error:'already_day_exists'});
            }else{
                //추가 가능한 요일들 이라면.(일반)
                await connection.beginTransaction();

                //월수금/월수금/월수금/월 이렇게 추가했다면-> 10개가 총 tour추가되고,tourDetail은 10*3각 date별 설정한 시간대만큼 생성되게한다.
                var outer_insert_loop= Math.ceil( normal_select_daycount / normal_select_days_array.length);//10/3->4 3/3/3/3 중에서 생성된것중에서 노출은 보여줄 항목수만큼만 하기에 안보여줄 tour_id에 대한 요청이 올 일은 없다.
                console.log('>>>>outer_insert_loop:',outer_insert_loop);

                //tour_group_id로써 쓰일 timestamp난수값 일반/특별 추가하려고했던 그 시간대 밀리초값 으로설정하여 추가된다.
                var tourgroupid_timestamp = new Date().getTime();
                console.log('>>>tourgroupid_timestamp:',tourgroupid_timestamp);
                for(let outer=0; outer < outer_insert_loop; outer++){
                    //3*4 월수금월수금월수금월수금 이렇게 생성한다. 뒤의 나머지 오버flow항목 tour_id는 클라이언트 미노출처리한다.
                    
                    for(let inner=0; inner < normal_select_days_array.length; inner++){
                        //4 * 3요일의 종류수만큼 (월수금 월수금) 내부 포문 돈다. 
                        //내부 포문은 각 요일이다. sun,sat,fri등 요일이다. 각 요일date별 tour_set_days지정한다. 각 date별 어떤 설정요일인지 지정일뿐.tour_set_times는 그 일반추가에서 했던것들 공통추가.
                        let inner_day_value=normal_select_days_array[inner];
                        var [tour_insert_rows] = await connection.query("insert into tour(tour_type,tour_group_id,prd_identity_id,company_id,mem_id,tour_set_days,tour_set_times,create_date,modify_date,is_tour_holiday_except,day_select_count,tour_set_specifydate,tour_set_specifydate_times,tour_specifyday_except) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[tour_type,tourgroupid_timestamp,prd_identity_ids,company_id,mem_id,inner_day_value,normal_select_times,new Date(),new Date(),normal_isholidayexcept,normal_select_daycount, special_specifydate,special_specifydatetimes,special_isexceptspecifydate]);
                        //date만큼 tourid 요소 테이블 요소 생성 overflow하게 생성, 보여질 개수 timestamp tourgroupid에 해당하는에 존재하는 day-select_count(선택항목표현수)만큼만 노출한다.
                        console.log('++>>>>>tour insert rows>>>>:',tour_insert_rows);
                    }
                }

                connection.commit();

                var [inserted_tourlist_rows] = await connection.query("select * from tour where tour_group_id=?",[tourgroupid_timestamp]);//고유한 투어그룹아디timestamp 로 같게 생성된 방금 생성된 tourid들 구한다.

                console.log('=>>>>>inserted tourlist rows>>:',inserted_tourlist_rows);

                //updated inserted tourlist query start
                var temp_yoil_dateinfo={};
                for(let u=0; u<inserted_tourlist_rows.length; u++){
                    //각 설정에 의해서 추가된 date들 하나하나이고, 그 요일들 집합에 대해서,해당하는 각 실 date값 저장하기위한 쿼리.
                    let update_local_setyoil_val=inserted_tourlist_rows[u].tour_set_days;//mon,wed,fri등의 요일값..그 요일들 집합에 대한 객체에 추가한다.
                    let update_local_tourid=inserted_tourlist_rows[u].tour_id;//inserted된 tour리스트의 각 tour_id값. 각 tourid에 대해 update위해 필요함.
                    console.log('>>>>inserted tour list rows>> ',inserted_tourlist_rows[u]);
                    console.log('>>>>outer yoil loops::',update_local_setyoil_val, update_local_tourid);

                    if(temp_yoil_dateinfo[update_local_setyoil_val]){
                        console.log('>>>기존 요일에 대한 정보 있음>>',temp_yoil_dateinfo);
                        //임의의 요일(영문)개체에 대한 프로퍼티 존재하고있는 경우 기존 배열에 대해 push하는 연산/기존에 있던 배열에 마지막 요소의 date날짜값 이후의 이후의 날짜부터 while문 검색한다.
                        
                        let last_index=temp_yoil_dateinfo[update_local_setyoil_val].length;
                        let last_index_date=temp_yoil_dateinfo[update_local_setyoil_val][last_index-1];//마지막에 push되었었던 날짜값을 얻는다.그 날짜값 이후부터 검사
                        let secure_count=0; let match_count=0;

                        console.log('>>target yoil info array:',temp_yoil_dateinfo[update_local_setyoil_val]);
                        console.log('>>target yoil info array lenght count:',last_index);
                        console.log('>>last search date value:',last_index_date);

                        let currenttime= new Date(last_index_date);//문자열 형태 날짜 문자열형태 가져온다.
                        let find_match_date_string='';//각 요일 외부반복문당 매치하여 찾은 날짜값 저장하는.
                        console.log('>>>last search date dateFormat:',currenttime);
                        while(match_count<1){

                            //마지막 날짜값을 제외한 다음날것부터 검색을 해야하기에, 분기처리필요함.
                            currenttime = new Date(currenttime.setDate(currenttime.getDate() + 1));//다음날짜값 저장.
                            
                            let get_day_intval= currenttime.getDay();
                            let get_yoil_string;

                            switch(get_day_intval){
                                case 0:
                                    get_yoil_string='sun';
                                break;
                                case 1:
                                    get_yoil_string='mon';
                                break;
                                case 2:
                                    get_yoil_string='tue';
                                break;
                                case 3:
                                    get_yoil_string='wed';
                                break;
                                case 4:
                                    get_yoil_string='thr';
                                break;
                                case 5:
                                    get_yoil_string='fri';
                                break;
                                case 6:
                                    get_yoil_string='sat';
                                break;
                                
                            }

                            console.log('inner whiel loops:::',currenttime,get_yoil_string);

                            let currenttime_getmonth;
                            let currenttime_getDate;
                            if( update_local_setyoil_val == get_yoil_string){
                                console.log('=====>>검색 요일매치:',update_local_setyoil_val);
                                //각 date요일별 마지막으로 있던 실날짜값 이후부터의 검색의 날짜중에서 tourdate요일에 일치하는것 찾을시 
                                if(currenttime.getMonth() +1 < 10){
                                    currenttime_getmonth = '0' + (parseInt(currenttime.getMonth()) + 1);
                                }else{
                                    currenttime_getmonth = parseInt(currenttime.getMonth())+1;
                                }

                                if(currenttime.getDate() < 10){
                                    currenttime_getDate = '0'+ parseInt(currenttime.getDate());
                                }else{
                                    currenttime_getDate = currenttime.getDate();
                                }

                                temp_yoil_dateinfo[update_local_setyoil_val].push(currenttime.getFullYear()+'-'+currenttime_getmonth+'-'+currenttime_getDate);
                                find_match_date_string=currenttime.getFullYear()+'-'+currenttime_getmonth+'-'+currenttime_getDate;
                                match_count++;

                                await connection.beginTransaction();

                                console.log('>>>>whyile loops find matchstrings:',find_match_date_string,update_local_tourid);

                                var [update_tourid_query]=await connection.query("update tour set tour_start_date=?, tour_end_date=? where tour_id=?",[find_match_date_string,find_match_date_string,update_local_tourid]);//어떤 매칭된 날짜값인지 tour_start_date,end_date 지정한다.
                                console.log('>>>>>inserted tour table update_tourid_query>>>>>:',update_tourid_query);

                                connection.commit();
                            }

                            if(secure_count==500){
                                break;
                            }
                        }
                        
                    }else{
                        //임의의 요일(영문)개체에 대해 프로퍼티 미존재할경우엔 해당 요일에 대한 정보array없는 것이기에 새로이 push
                        let secure_count=0; let match_count=0;
                        let find_match_date_string='';//각 요일 외부반복문당 매치하여 찾은 날짜값 저장하는.
                        let currenttime= new Date();//현재의 시간날짜값 로부터.처음으로 있는 요일에 대한 항목이라면 현재 날짜로부터 이상부터 검색한다.
                        console.log('>>>>>해당 요일에 대한 기존 정보 없음>>:',temp_yoil_dateinfo);

                        while(match_count<1){
                            
                            let get_day_intval= currenttime.getDay();//현재 오늘의 날짜에 요일값 int형 반환한다.
                            let get_yoil_string;
                            switch(get_day_intval){
                                case 0:
                                    get_yoil_string='sun';
                                break;
                                case 1:
                                    get_yoil_string='mon';
                                break;
                                case 2:
                                    get_yoil_string='tue';
                                break;
                                case 3:
                                    get_yoil_string='wed';
                                break;
                                case 4:
                                    get_yoil_string='thr';
                                break;
                                case 5:
                                    get_yoil_string='fri';
                                break;
                                case 6:
                                    get_yoil_string='sat';
                                break;
                                
                            }
                            let currenttime_getmonth;
                            let currenttime_getDate;
                            console.log('inner whiel loops:::',currenttime,get_yoil_string);
                            if( update_local_setyoil_val == get_yoil_string){
                                console.log('=====>>검색 요일매치:',update_local_setyoil_val);
                                //각 date요일별 마지막으로 있던 실날짜값 이후부터의 검색의 날짜중에서 tourdate요일에 일치하는것 찾을시 
                                if(currenttime.getMonth() +1 < 10){
                                    currenttime_getmonth = '0' + (parseInt(currenttime.getMonth()) + 1);
                                }else{
                                    currenttime_getmonth = parseInt(currenttime.getMonth())+1;
                                }

                                if(currenttime.getDate() < 10){
                                    currenttime_getDate = '0'+ parseInt(currenttime.getDate());
                                }else{
                                    currenttime_getDate = currenttime.getDate();
                                }
                                temp_yoil_dateinfo[update_local_setyoil_val]=[];
                                temp_yoil_dateinfo[update_local_setyoil_val].push(currenttime.getFullYear()+'-'+currenttime_getmonth+'-'+currenttime_getDate);
                                find_match_date_string = currenttime.getFullYear()+'-'+currenttime_getmonth+'-'+currenttime_getDate;

                                match_count++;

                                console.log('>>>>>while loops find_match_date_string::',find_match_date_string,update_local_tourid);
                                await connection.beginTransaction();

                                var [update_tourid_query]=await connection.query("update tour set tour_start_date=?, tour_end_date=? where tour_id=?",[find_match_date_string,find_match_date_string,update_local_tourid]);//어떤 매칭된 날짜값인지 tour_start_date,end_date 지정한다.
                                console.log('>>>>>inserted tour table update_tourid_query>>>>>:',update_tourid_query);
                                
                                connection.commit();
                            }
                            if(secure_count==500){
                                break;
                            }
                            
                            //현재날짜까지 포함해서 매칭여부 검색시작해야하므로 
                            currenttime = new Date(currenttime.setDate(currenttime.getDate() + 1));//다음날짜값 저장.
                        }
                    }
                }

                console.log('===========>>>updated tour list rows end..>>>>>>>>>>>>>>>>');

                //tourdetail inserteed query start
                await connection.beginTransaction();

                for(let h=0; h< inserted_tourlist_rows.length; h++){
                    let extracted_tourid= inserted_tourlist_rows[h].tour_id;//외부 포문이 위의 일반추가에서 추가된 요일들 월수금 월수금 월수금 월수금 반복문이고, 그 12개항목에 대해서 각각에 대해서 설정한 시간대들 x,y,z 등 내부 포문으로 각각 생성한다.

                    for(let inn=0; inn<normal_select_times.split(',').length; inn++){
                        //시간대 x,y,z각각 지정한다.
                        var select_times_val=normal_select_times.split(',')[inn];
                        console.log('normal-selectTimes split arrays:',select_times_val);
                        var td_starttime_val;
                        var td_endtime_val;
                        switch(select_times_val){
                            case '오전1T':
                                td_starttime_val = '9:00am';
                                td_endtime_val = '12:00pm';
                            break;
                            case '오후1T':
                                td_starttime_val = '12:00pm';
                                td_endtime_val = '15:00pm';
                            break;
                            case '오후2T':
                                td_starttime_val = '15:00pm';
                                td_endtime_val = '18:00pm';
                            break;
                        }
                        var [tourdetail_insert_rows] = await connection.query("insert into tourdetail(tour_id,td_text,td_starttime,td_endtime,create_date,modify_date) values(?,?,?,?,?,?)",[extracted_tourid,select_times_val,td_starttime_val,td_endtime_val,new Date(),new Date()]);
                        console.log('>>>>>>>tourdetail_insert_rows>>>:',tourdetail_insert_rows);
                    }
                }
      
                connection.commit();
                connection.release();

                return response.json({success:true, message:'tour and tourdetail server query success!!', result_data: [tour_insert_rows,tourdetail_insert_rows]});    
            }
            
        }else if(tour_type == 2){

            //var prev_special_setspecifydates=[];//추가한 날짜들 리스트 구한다.
            //var prev_special_except_specifydates=[];//제외한 날짜들 리스트 구한다.
            var prev_special_specifydates=[];//특정 추가or제외한 날짜리스트들 집합구한다. 두개를 공통적 날짜리스트로 해야한다. 

            //특정날짜를 제외or추가한 합집합 요청인 경우에는 기존 제외or추가 하려는 날짜들 리스트를 모두 뽑아서 저장(중복제거)한다.해서 그 리스트중에서 추가하려는 특정제외or추가날짜여부가 있는지 중복여부
            var [prev_tour_specifydate_rows] = await connection.query("select tour_set_specifydate from tour where tour_type=2 and prd_identity_id=?",[prd_identity_ids]);

            console.log('기존 제외 또는 추가되어있는 특정날짜리스트들:',prev_tour_specifydate_rows);

            for(let s=0; s<prev_tour_specifydate_rows.length; s++){
                prev_special_specifydates[s]=prev_tour_specifydate_rows[s]['tour_set_specifydate'];
            }
            prev_special_specifydates = Array.from(new Set(prev_special_specifydates));//특정 제외날짜리스트들 중복제거 array반환
            console.log('중복제거 제외 특정날짜리스트들:',prev_special_specifydates);

            var is_overwraped_specifydates=false;//특정제외or추가날짜 중복여부

            for(let se=0; se<prev_special_specifydates.length; se++){
                if(special_specifydate == prev_special_specifydates[se]){
                    //제외or추가하려는 특정날짜가 기존 리스트중에서 발견되었다면
                    is_overwraped_specifydates=true;
                }
            }
            console.log('>>특별날짜 제외or추가 요일중복여부:',is_overwraped_specifydates);

            if(is_overwraped_specifydates){
                return response.json({success:false , message: '이미 추가or제외 등록한 특정날짜입니다.',error:'already_specifydate_exists'});
            }else{
                //추가 가능한 제외또는 등록 특정날짜라면
                var tour_start_date=special_specifydate;
                var tour_end_date=special_specifydate;//특정 설정한 날짜값 하루에 시작~종료라는 저장 표현.

                var [tour_insert_rows] = await connection.query("insert into tour(tour_type,prd_identity_id,company_id,mem_id,tour_start_date,tour_end_date,tour_set_days,tour_set_times,create_date,modify_date,is_tour_holiday_except,day_select_count,tour_set_specifydate,tour_set_specifydate_times,tour_specifyday_except) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[tour_type,prd_identity_ids,company_id,mem_id,tour_start_date,tour_end_date,normal_select_days,normal_select_times,new Date(),new Date(),normal_isholidayexcept,normal_select_daycount,special_specifydate,special_specifydatetimes,special_isexceptspecifydate]);
                connection.commit();
                console.log('tour_insert_rows :',tour_insert_rows,tour_insert_rows.insertId);
                //connection.release();
                var extract_insertTourid=tour_insert_rows.insertId;

                await connection.beginTransaction();

                for(let dinn=0; dinn<special_specifydatetimes.split(',').length; dinn++){
                    var loca_setTimes=special_specifydatetimes.split(',')[dinn];//오전1t,오후1t,..등 여부 저장. 어떤 특정 date에 대한 tourid정보 하나 추가되고,tourstart~enddate추가되었고 그tourid에 대해서 설정한 시간대들만큼 detail적으로 하여 어떤 항목별 start~endtime지정, td_text는 해당 special add tourid에 대하ㅐ 지정된 시간대들 하나하나 방(시간표)
                    var tour_starttime_val;
                    var tour_endtime_val;
                    switch(loca_setTimes){
                        case '오전1T':
                            tour_starttime_val = '9:00am';
                            tour_endtime_val = '12:00pm';
                        break;
                        case '오후1T':
                            tour_starttime_val = '12:00pm';
                            tour_endtime_val = '15:00pm';
                        break;
                        case '오후2T':
                            tour_starttime_val = '15:00pm';
                            tour_endtime_val = '18:00pm';
                        break;
                    }
                    var [tourdetail_insert_rows] = await connection.query("insert into tourdetail(tour_id,td_text,td_starttime,td_endtime,create_date,modify_date) values(?,?,?,?,?,?)",[extract_insertTourid,loca_setTimes,tour_starttime_val,tour_endtime_val,new Date(),new Date()]);
                    console.log('>>>tourdetail insert rows>>>:',tourdetail_insert_rows);
                }

                connection.commit();

                connection.release();

                return response.json({success:true, message:'tour and tourdetail server query success!!', result_data: [tour_insert_rows,tourdetail_insert_rows]}); 
            }                    
        }

    }catch(err){
        console.log('server query error',err);
        connection.rollback();
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//중개사가 등록한 매물별 물건투어예약셋팅 설정 리스트(일반,특별추가리스트) tour,tourDetail등..
router.post('/productToursettinglist',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;
    console.log('req_body :',req_body);
    const connection=await pool.getConnection(async conn=> conn);
    
    console.log('/productToursettinglist request session store:::>>>>',request.session);

    //try catch문 mysql 구문 실행구조.
    try{
        var mem_id=request.session.user_id;//아이디는 node에 서버측 세션아이디로 해도된다.
        var company_id=req_body.company_id;
        var prd_identity_id=req_body.prd_identity_ids;

        //해당 로그인되어있는 mem_id회원에 대해서 어떤 회사(업체)company_id회원인지 여부를 구한다.(리덕스 비동기 관련 데이터 불러오는 문제 존재하여 추가)
        var [company_row] = await connection.query("select * from company where mem_id=?",[mem_id]);
        var get_company_id= company_row[0].company_id;
        console.log('get_company_id  :',get_company_id,company_row);

        //마이페이지 propertyToursetting/17 특정 매물에 대한 예약 물건투어셋팅리스트 tourgroupid구분 그룹지어서.
        var [productToursettinglist_row_groupOuter] = await connection.query("select distinct tour_group_id from tour where mem_id=? and company_id=? and prd_identity_id=? and tour_type=1",[mem_id,get_company_id,prd_identity_id]);
        console.log('productToursettinglist_row_groupOuter row:',productToursettinglist_row_groupOuter);

        var normal_touridgroup_info={};//tour_groupid별 키값을 가지고있고, 그 각 그룹아디별 리스트 취합한 요일 집합리스트월수금월수금등), 설정시간대들 그들끼리는 모두 같기의 임의하나아무거나선정 등의 정보 묶어서 표현하는 저장.
        
        for(let outer=0; outer<productToursettinglist_row_groupOuter.length; outer++){
            let tour_group_id_cond=productToursettinglist_row_groupOuter[outer]['tour_group_id'];

            var local_yoil_values_overwraped = [];//그룹투어아디에 해당하는 월수금 월수금 월수금 리스트 중복포함 요일들.
            var local_set_times_overwraped = [];
            var [group_tourlist_rows] = await connection.query("select * from tour where mem_id=? and company_id=? and prd_identity_id=? and tour_group_id=?",[mem_id,get_company_id,prd_identity_id,tour_group_id_cond]);
            console.log('group_tourlist_rows::',group_tourlist_rows);

            for(let inner=0; inner<group_tourlist_rows.length; inner++){
                //해당 그룹id에 해당하는 세부 관련 tourlist요소들>>>>
                local_yoil_values_overwraped.push( group_tourlist_rows[inner]['tour_set_days'] );//1덩어리:월수금월수금/ 2덩어리:화목화목화목/ 3덩어리: 일토일토일토 형태로 한다. 중복포함한 요일들을 저장한다.
                local_set_times_overwraped.push(group_tourlist_rows[inner]['tour_set_times'] );
            }
            var local_yoil_values_settle = Array.from(new Set(local_yoil_values_overwraped));//그룹투어리스트 rows 투어리스트 특정 매물id,그룹투어아디,회사,memid에 해당하는 투어리스트요소에 있는 요일집합리스트 중복제거.
            var local_set_times_settle = Array.from(new Set(local_set_times_overwraped));

            console.log('========>>>중복제거한 요일집합리스트:',local_yoil_values_settle , local_set_times_settle);
            normal_touridgroup_info[tour_group_id_cond] = {};
            normal_touridgroup_info[tour_group_id_cond]['yoil_set_days'] = local_yoil_values_settle;
            normal_touridgroup_info[tour_group_id_cond]['set_times'] = local_set_times_settle;//중복제거한 다 같은 요소들일것이고,tour set times시간대들 값 지정한다.
            normal_touridgroup_info[tour_group_id_cond]['tour_type'] = 1;//일반 타입 덩어리 추가.
        }

        //특별 추가 리스트 리턴.
        var special_tourgroup_info={};//tour_id별(어차피 특별은 하나하나가 한 예약셋팅이기에) 각 특별추가의 tour_id로 구분,키로 한다.
        var [productToursettinglist_row_special] = await connection.query("select * from tour where mem_id=? and company_id=? and prd_identity_id=? and tour_type=2",[mem_id,get_company_id,prd_identity_id]);//해당 중개사가 해당매물에 대해서 등록한 특별추가리스트 제외,추가리스트 모두 구한다.

        for(let loo=0; loo<productToursettinglist_row_special.length; loo++){
            let special_tourrow_item=productToursettinglist_row_special[loo];
            console.log('added special tourlist rows:',special_tourrow_item);
            special_tourgroup_info[special_tourrow_item['tour_id']]={};
            special_tourgroup_info[special_tourrow_item['tour_id']]['set_specifydate']=special_tourrow_item['tour_set_specifydate'];
            special_tourgroup_info[special_tourrow_item['tour_id']]['set_specifydatetimes'] = special_tourrow_item['tour_set_specifydate_times'];
            special_tourgroup_info[special_tourrow_item['tour_id']]['tour_type'] = 2;//특별 타입.
            special_tourgroup_info[special_tourrow_item['tour_id']]['tour_specifyday_except'] = special_tourrow_item['tour_specifyday_except'];//특별 추가/제외여부 타입
        }
        
        connection.release();

        console.log('==>>>>normal_touridgroup_info and specailtrougroupinfo >>>>> :',normal_touridgroup_info, special_tourgroup_info);

        return response.json({success:true, message:'proudctTOursettinglist server query success!!', result_data: [normal_touridgroup_info,special_tourgroup_info]});
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//특정매물에 대한 tourid셋팅리스트
router.post('/brokerProduct_toursetting_dates',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;
    console.log('req_body :',req_body);
    const connection=await pool.getConnection(async conn=> conn);
    
    console.log('/brokerProduct_toursetting_dates request session store:::>>>>',request.session);

    //try catch문 mysql 구문 실행구조.
    try{
        var prd_identity_id=req_body.id;

        //지도 클릭한 특정매물에 대한 투어셋팅예약정보 리스트 조회한다.
        var [productToursettinglist_row_groupOuter] = await connection.query("select distinct tour_group_id from tour where prd_identity_id=? and tour_type=1",[prd_identity_id]);
        console.log('productToursettinglist_row_groupOuter row:',productToursettinglist_row_groupOuter);

        var normal_touridgroup_info={};//tour_groupid별 키값을 가지고있고, 그 각 그룹아디별 리스트 취합한 요일 집합리스트월수금월수금등), 설정시간대들 그들끼리는 모두 같기의 임의하나아무거나선정 등의 정보 묶어서 표현하는 저장. 일반 그룹아디별 있는 요일집합들 월수금월수금 월수금 및 상징표현 및 실제 날짜row들 배열같은걸로 저장리턴필요함.
        
        for(let outer=0; outer<productToursettinglist_row_groupOuter.length; outer++){
            let tour_group_id_cond=productToursettinglist_row_groupOuter[outer]['tour_group_id'];

            var local_yoil_values_overwraped = [];//그룹투어아디에 해당하는 월수금 월수금 월수금 리스트 중복포함 요일들.
            var local_set_times_overwraped = [];
            var local_match_dates= [];//그룹투어아디에 해당하는 각 요일별 실제 매칭되는 date날짜값들 배열형태로 저장키 위함.
            let local_dayselectcount=0;//각 추가한 일반 목록별 요일집합기간리스트에서 보여줄 리스트의 총 개수만큼만 보여줘야함(오름차순 그 날짜리스트들을 전체 오름차순 하면 될뿐이고 그 것들중에서 daycount만큼만 보여주면됌)
            var [group_tourlist_rows] = await connection.query("select * from tour where prd_identity_id=? and tour_group_id=?",[prd_identity_id,tour_group_id_cond]);
            console.log('group_tourlist_rows::',group_tourlist_rows);

            for(let inner=0; inner<group_tourlist_rows.length; inner++){
                //해당 그룹id에 해당하는 세부 관련 tourlist요소들>>>>
                local_yoil_values_overwraped.push( group_tourlist_rows[inner]['tour_set_days'] );//1덩어리:월수금월수금/ 2덩어리:화목화목화목/ 3덩어리: 일토일토일토 형태로 한다. 중복포함한 요일들을 저장한다.
                local_set_times_overwraped.push(group_tourlist_rows[inner]['tour_set_times'] );
                local_match_dates.push( { tour_date : group_tourlist_rows[inner]['tour_start_date'], tour_id: group_tourlist_rows[inner]['tour_id'], setting_times: group_tourlist_rows[inner]['tour_set_times']});//일단 시작,종료일 같음 그날시작 그날끝.하루기준 날짜. 실제 투어예약시행일.
                local_dayselectcount = group_tourlist_rows[inner]['day_select_count'];
            }
            var local_yoil_values_settle = Array.from(new Set(local_yoil_values_overwraped));//그룹투어리스트 rows 투어리스트 특정 매물id,그룹투어아디,회사,memid에 해당하는 투어리스트요소에 있는 요일집합리스트 중복제거.
            var local_set_times_settle = Array.from(new Set(local_set_times_overwraped));

            console.log('========>>>중복제거한 요일집합리스트 및 투어그룹일반추가별 매칭날짜들:',local_yoil_values_settle , local_set_times_settle , local_match_dates);
            normal_touridgroup_info[tour_group_id_cond] = {};
            normal_touridgroup_info[tour_group_id_cond]['yoil_set_days'] = local_yoil_values_settle;
            normal_touridgroup_info[tour_group_id_cond]['set_times'] = local_set_times_settle;//중복제거한 다 같은 요소들일것이고,tour set times시간대들 값 지정한다.
            normal_touridgroup_info[tour_group_id_cond]['tour_type'] = 1;//일반 타입 덩어리 추가.
            normal_touridgroup_info[tour_group_id_cond]['match_dates'] = local_match_dates;
            normal_touridgroup_info[tour_group_id_cond]['day_select_count'] = local_dayselectcount;
        }

        function data_ascending(a,b){
            var left = new Date(a['tour_date']).getTime();
            var right = new Date(b['tour_date']).getTime();

            return left > right ? 1 : -1;//왼쪽요소가 더크면 true리턴, 왼쪽요소가 더클시에 왼쪽요소를 오른쪽으로 밀어내는듯.
        }

        for(let key in normal_touridgroup_info){
            console.log('>>>>server normaltouridgroup_info::',key, normal_touridgroup_info[key]);
            let day_select_count_loca=normal_touridgroup_info[key]['day_select_count'];//표현할 항목수
            let match_dates_loca= normal_touridgroup_info[key]['match_dates'];//각 일반타입 추가별 매칭 날짜리스트들 이들 오름차순 정렬필요함.
            let order_settle_match_dates_loca = match_dates_loca.sort(data_ascending);//노말 매치데이터들 정렬한것 새로 리턴.
            console.log('=>>>>>>>key 그룹투어아디의 있던 match_dates_loca 정렬전:',match_dates_loca);
            console.log('====>>>>>>그룹투어아디에 있던 match_dates_loca 오름차순정렬후:',order_settle_match_dates_loca);
            
            normal_touridgroup_info[key]['match_dates'] = order_settle_match_dates_loca;//새로 relace한것 오름차순 정렬처리한걸로 교체
        }
        
        //특별 추가 리스트 리턴.
        var special_tourgroup_info={};//tour_id별(어차피 특별은 하나하나가 한 예약셋팅이기에) 각 특별추가의 tour_id로 구분,키로 한다.
        var [productToursettinglist_row_special] = await connection.query("select * from tour where prd_identity_id=? and tour_type=2",[prd_identity_id]);//해당 중개사가 해당매물에 대해서 등록한 특별추가리스트 제외,추가리스트 모두 구한다.

        for(let loo=0; loo<productToursettinglist_row_special.length; loo++){
            let special_tourrow_item=productToursettinglist_row_special[loo];
            console.log('added special tourlist rows:',special_tourrow_item);
            special_tourgroup_info[special_tourrow_item['tour_id']]={};
            special_tourgroup_info[special_tourrow_item['tour_id']]['set_specifydate']=special_tourrow_item['tour_set_specifydate'];
            special_tourgroup_info[special_tourrow_item['tour_id']]['set_specifydatetimes'] = special_tourrow_item['tour_set_specifydate_times'];
            special_tourgroup_info[special_tourrow_item['tour_id']]['tour_type'] = 2;//특별 타입.
            special_tourgroup_info[special_tourrow_item['tour_id']]['tour_specifyday_except'] = special_tourrow_item['tour_specifyday_except'];//특별 추가/제외여부 타입
            special_tourgroup_info[special_tourrow_item['tour_id']]['tour_id'] = special_tourrow_item['tour_id'];//고유 추가한 투어아이디
        }
        
        connection.release();

        console.log('==>>>>normal_touridgroup_info and specailtrougroupinfo >>>>> :',normal_touridgroup_info, special_tourgroup_info);

        return response.json({success:true, message:'brokerProduct_toursetting_dates server query success!!', result_data: [normal_touridgroup_info,special_tourgroup_info]});
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//해당 클릭 tourid(날짜)에 대한 관련 상세시간대(td_id)리스트 
router.post('/brokerProduct_tourid_tourdetailList',async function(request,response){
    console.log('=->>>>>>>>>>>>request.body:',request.body);

    var req_body=request.body;
    var tour_id=req_body.tour_id_val;
    const connection = await pool.getConnection(async conn => conn);
    console.log('>>>>pool connection Test:',pool);

    try{
        var [product_tourdetaillist_rows] = await connection.query("select * from tourdetail where tour_id=?",[tour_id]);//해당 아디에 대한 디테일투어 설정 td_id리스트 구한다. 그 td_id에대ㅐ허 선택할시에 예약이 몰리는 개념이다.
        console.log('>>>>>====product_tourdetaillist_rows:',product_tourdetaillist_rows);
        connection.release();

        return response.json({success:true, result_data : product_tourdetaillist_rows});
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//사용자 투어예약셋팅매물에 대한 투어예약접수(신청)
router.post('/brokerProduct_tourReservation_register',async function(request,response){
    console.log('=>>>>>>>request.body:',request.body);

    var req_body=request.body;
    var tour_id=req_body.slectTourid;//어떤 tourid(투어날짜)에 대해 요청하는건지
    var td_id=req_body.selectTdid;//어떤 tdid(투어날짜>디테일시간대)에 대해 요청하는건지
    var tour_type=req_body.selectTourtype;//어떤 투어타입 일반,특별에 대해 요청하는건지 예약

    console.log('request_sessionid:',request.session.user_id,request.session);

    //이걸 요청하는 로그인된 유저가 요청하는것으로 저장.
    var mem_id=request.session.user_id !='' ? request.session.user_id : -1;
    var phone=req_body.phone !=''? req_body.phone : '';
    var email=req_body.email !=''? req_body.email : '';
    var user_name=req_body.user_name !='' ? req_body.user_name :'';
    var user_type=req_body.user_type !='' ? req_body.user_type :'';

    const connection=await pool.getConnection(async conn => conn);
    console.log('>>>>pool connection Test:',pool);

    try{
        var [brokerproduct_tourReservation_insert] = await connection.query("insert into tourReservation(td_id,tour_id,mem_id,create_date,modify_date,tr_name,tr_email,tr_phone,tr_type,tr_status,tr_user_reservtime) values(?,?,?,?,?,?,?,?,?,?,?)",[td_id,tour_id,mem_id,new Date(),new Date(),user_name,email,phone,0,0,new Date()]);
        console.log('=>>>>>>brokerproduct_tourReservationInsert:',brokerproduct_tourReservation_insert);
        connection.release();

        return response.json({success:true, result_data : brokerproduct_tourReservation_insert});
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false,message:'server query full problme error!'});
    }
});
//사용자 투어예약접수에 대한 수정진행.(시간대 조율 조정)
router.post('/brokerProduct_tourRerservation_modify',async function(request,response){
    console.log('=>>>>>>>request.body:',request.body);

    var req_body=request.body;
    var tr_id=req_body.tr_id;
    var selectdate=req_body.selectdate;
    var selectTourid=req_body.selectTourid;
    var selectTourtype=req_body.selectTourtype;
    var selectTdid=req_body.selectTdid;
    var starttime=req_body.starttime;
    var endtime=req_body.endtime;//해당 tr_id에 대해서 수정 처리 진행. 개별 수정 진행한다.

    const connection=await pool.getConnection(async conn => conn);
    console.log('>>>>pool connection Test:',pool);

    try{
        var [tourReservation_editquery] = await connection.query("update tourReservation set td_id=?, tour_id=?, reserv_start_time=?,reserv_end_time=? where tr_id=?",[selectTdid,selectTourid,starttime,endtime,tr_id]);//어떤 tourid(날짜),시간대(td_id)에대해 시간조율 시작~종료시간대로의 변경 처리 개별수정

        console.log('=>>>>>>touyrReservation_editquery:',tourReservation_editquery);
        connection.release();

        return response.json({success:true, result_data : tourReservation_editquery});
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false,message:'server query full problme error!'});
    }
});
//사용자 투어예약접수내역 하나에 대한 조회
router.post('/brokerProduct_reservationRegisterview',async function(request,response){
    console.log('=>>>>>>>request.body:',request.body);
    
    var req_body=request.body;
    var tr_id=req_body.tr_id_val;//어떤 tourid(투어날짜)에 대해 요청하는건지
   
    const connection=await pool.getConnection(async conn => conn);
    console.log('>>>>pool connection Test:',pool);

    try{
        var [brokerproduct_tourReservationregi_view] = await connection.query("select r.reserv_start_time as reserv_start_time,r.reserv_end_time as reserv_end_time,r.tr_id as r_tr_id,r.tour_id as r_tour_id,r.td_id as r_td_id,r.tr_name as r_tr_name,r.tr_email as r_tr_email,r.tr_phone as r_tr_phone,t.tour_id as t_tour_id,t.tour_set_times as t_tour_set_times,t.tour_start_date as t_tour_start_date,t.tour_type as t_tour_type, td.tour_id as td_tour_id,td.td_text as td_td_text,td.td_id as td_td_id from tourReservation r join tour t on r.tour_id=t.tour_id join tourdetail td on t.tour_id=td.tour_id where tr_id=?",[tr_id]);
        console.log('result sets:',brokerproduct_tourReservationregi_view);

        connection.release();

        return response.json({success:true, result_data : brokerproduct_tourReservationregi_view});
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false,message:'server query full problme error!'});
    }
});
//사용자 특정한개 매물별 투어예약접수리스트들(선택)에 대한 일괄수정진행.(시간대 조율 조정)
router.post('/brokerProduct_tourRerservation_multimodify',async function(request,response){
    console.log('=>>>>>>>request.body:',request.body);

    var req_body=request.body;
    var tridchklist=req_body.tridchklist;//체크선택한 trid들 집합구한다.
    tridchklist = tridchklist.split(',');
    var selectdate=req_body.selectdate;//일괄적용 날짜(selectDate)
    var selectTourid=req_body.selectTourid;//일괄적용 투어아이디값
    var selectTourtype=req_body.selectTourtype;//일괄적용 투어타입값(모두 동일한 tour_id,tourtype,tourtid->>tdlist selectvalue)
    var selectTdid=req_body.selectTdid;//일괄적용 selctTdid디테일시간값.
    var starttime=req_body.starttime;//일괄적용 시간조율시작~종료 지정값.
    var endtime=req_body.endtime;//해당 tr_id에 대해서 수정 처리 진행. 개별 수정 진행한다.

    const connection=await pool.getConnection(async conn => conn);
    console.log('>>>>pool connection Test:',pool);

    
    for(var s=0; s<tridchklist.length; s++){
        let tr_id_local=tridchklist[s];//각각의 trid선택값.

        try{
            var [tourReservation_editquery] = await connection.query("update tourReservation set td_id=?, tour_id=?,reserv_start_time=?,reserv_end_time=? where tr_id=?",[selectTdid,selectTourid,starttime,endtime,tr_id_local]);

            console.log('===>>>tourReservation_editquery::',tourReservation_editquery);
            //connection.release();

            //return response.json({success:true, result_data: tourReservation_editquery});
        }catch(err){
            console.log('server query error:',err);
            //connection.release();

            return response.status(403).json({success:false,message:'server query full problme error!'});
        }
    }
    return response.json({success:true, message:'query all success!!!'});
});
//사용자 투어예약접수리스트조회(중개사회원)
router.post('/brokerproduct_reservationList',async function(request, response){
    console.log('===========>>>request.body::',request.body);

    var req_body=request.body;

    var mem_id=req_body.memid;
    var company_id=req_body.company_id;
    var user_type=req_body.user_type;
    var isexculsive=req_body.isexculsive;

    const connection=await pool.getConnection(async conn => conn);

    try{
        var [prd_id_rows] = await connection.query("select prd_identity_id from product where company_id=?",[company_id]);
        var prd_id_strings='';
        for(var p=0; p<prd_id_rows.length; p++){
            if(p == prd_id_rows.length-1){
                prd_id_strings += prd_id_rows[p]['prd_identity_id'];
            }else{
                prd_id_strings += prd_id_rows[p]['prd_identity_id']+',';
            }          
        }
        console.log('====>>>prd_id_strings::::',prd_id_strings);

        var tour_id_strings='';
        var tour_id_rows_query="select tour_id from tour where prd_identity_id in ("+prd_id_strings+")";

        //var [tour_id_rows] = await connection.query("select tour_id from tour where prd_identity_id in (?)",[prd_id_strings]);
        var [tour_id_rows] = await connection.query(tour_id_rows_query);
        console.log('==>>>tour_id_rows 임의 company_id가 다루고있는 모든 상품들별에 따른 tour_id셋팅예약방리스트(일반,추가)내역리스트,이중에서 사용자들이 요청을 한 내역들에 해당하는것만 보여주면 된다.',tour_id_rows);

        for(var t=0; t<tour_id_rows.length; t++){
            if(t == tour_id_rows.length - 1){
                tour_id_strings += tour_id_rows[t]['tour_id'];
            }else{
                tour_id_strings += tour_id_rows[t]['tour_id']+',';
            }
        }
        console.log('=======>>>>tour_id_strings::::',tour_id_strings);

        //var [tour_reservation_rows] = await connection.query("select * from tourReservation where tour_id in (?)",[tour_id_strings]);
        var tour_reservation_rows_query= "select r.tr_id as r_tr_id,r.td_id as r_td_id,r.tour_id as r_tour_id,r.mem_id as r_mem_id,r.create_date as r_create_date,r.modify_date as r_modify_date,r.tr_name as r_tr_name,r.tr_phone as r_tr_phone,r.tr_type as r_tr_type,r.invite_text as r_invite_text,r.tr_status as r_tr_status,r.tr_user_reservtime as r_tr_user_reservtime, t.tour_id as t_tour_id, t.prd_identity_id as t_prd_identity_id,t.tour_start_date as t_tour_start_date,t.tour_end_date as t_tour_end_date, p.prd_identity_id as p_prd_identity_id,p.prd_name as p_prd_name,p.prd_img as p_prd_img,p.prd_type as p_prd_type,p.prd_sel_type as p_prd_sel_type,p.prd_price as p_prd_price from tourReservation r join tour t on r.tour_id = t.tour_id join product p on t.prd_identity_id = p.prd_identity_id where r.tour_id in ("+tour_id_strings+")";
        var [tour_reservation_rows] = await connection.query(tour_reservation_rows_query);
        console.log('===>>>tour_reservation_rows::::',tour_reservation_rows);
        connection.release();

        return response.json({success:true, result_data : tour_reservation_rows})
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false,message:'server query full problme error!'});
    }
});
//임의 매물에 대한 사용자 투어예약접수리스트
router.post('/brokerproduct_reservationList_perProduct',async function(request, response){
    console.log('===========>>>request.body::',request.body);

    var req_body=request.body;
    
    var prd_identity_id=req_body.prd_identity_id;

    const connection=await pool.getConnection(async conn => conn);

    try{
        
        var [tour_id_rows] = await connection.query("select tour_id from tour where prd_identity_id=?",[prd_identity_id]);
        console.log('==>>>임의 매물 한개에 대한 tour_id셋팅예약방리스트(일반,추가)내역리스트,이중에서 사용자들이 요청을 한 내역들에 해당하는것만 보여주면 된다.',tour_id_rows);
        var tour_id_strings='';
        for(var t=0; t<tour_id_rows.length; t++){
            if(t == tour_id_rows.length - 1){
                tour_id_strings += tour_id_rows[t]['tour_id'];
            }else{
                tour_id_strings += tour_id_rows[t]['tour_id']+',';
            }
        }
        console.log('=======>>>>tour_id_strings::::',tour_id_strings);

        //var [tour_reservation_rows] = await connection.query("select * from tourReservation where tour_id in (?)",[tour_id_strings]);
        var tour_reservation_rows_query= "select r.tr_id as r_tr_id,r.td_id as r_td_id,r.tour_id as r_tour_id,r.mem_id as r_mem_id,r.create_date as r_create_date,r.modify_date as r_modify_date,r.tr_name as r_tr_name,r.tr_phone as r_tr_phone,r.tr_type as r_tr_type,r.invite_text as r_invite_text,r.tr_status as r_tr_status,r.tr_user_reservtime as r_tr_user_reservtime, t.tour_id as t_tour_id, t.prd_identity_id as t_prd_identity_id,t.tour_start_date as t_tour_start_date,t.tour_end_date as t_tour_end_date, p.prd_identity_id as p_prd_identity_id,p.prd_name as p_prd_name,p.prd_img as p_prd_img,p.prd_type as p_prd_type,p.prd_sel_type as p_prd_sel_type,p.prd_price as p_prd_price from tourReservation r join tour t on r.tour_id = t.tour_id join product p on t.prd_identity_id = p.prd_identity_id where r.tour_id in ("+tour_id_strings+")";
        var [tour_reservation_rows] = await connection.query(tour_reservation_rows_query);
        console.log('===>>>tour_reservation_rows::::',tour_reservation_rows);
        connection.release();

        return response.json({success:true, result_data : tour_reservation_rows})
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false,message:'server query full problme error!'});
    }
});
//투어예약접수내역 예약해제 액션.
router.post('/brokerproduct_reservation_release',async function(request, response){

    console.log('===========>>>request.body::',request.body);

    var req_body=request.body;

    var tr_id=req_body.tr_id_val;

    const connection=await pool.getConnection(async conn => conn);

    try{
        var [tourReservation_update_query] = await connection.query("update tourReservation set tr_status=1 where tr_id=?",[tr_id]);

        console.log('tourReservation_update query result:',tourReservation_update_query);

        connection.release();

        return response.json({success:true, message:'query success'});
    }catch(err){
        console.log('server query error:',e);
        connection.release();

        return response.status(403).json({success:false,message:'server query full problme error!'});
    }
});
//담당 매물별 정보(+각 매물별 접수신청한 투어예약인원수까지)
router.post('/brokerproduct_list_view2',async function(request, response){
    console.log('===========>>>request.body::',request.body);

    var req_body=request.body;

    var mem_id=req_body.memid;
    var company_id=req_body.company_id;
    var user_type=req_body.user_type;
    var isexculsive=req_body.isexculsive;

    const connection=await pool.getConnection(async conn => conn);

    try{
        var [prd_id_rows] = await connection.query("select * from product where company_id=?",[company_id]);
        /*var prd_id_strings='';
        for(var p=0; p<prd_id_rows.length; p++){
            if(p == prd_id_rows.length-1){
                prd_id_strings += prd_id_rows[p]['prd_identity_id'];
            }else{
                prd_id_strings += prd_id_rows[p]['prd_identity_id']+',';
            }          
        }
        console.log('====>>>prd_id_strings::::',prd_id_strings);*/

        console.log('prd_id_rows::::',prd_id_rows);
        //각 담당 매물, 매물별 관련 정보 저장할 개체 저장.
        var prd_identity_info_array=[];//매물별 정보 저장할 배열 객체

        for(var r=0,match=0; r<prd_id_rows.length; r++){   
            //각 담당 매물들리스트가 나오고, 그 매물별 tour_id리스트 구한다.
            let prd_identity_id_loca=prd_id_rows[r]['prd_identity_id'];

            console.log('prd_identity_id별 루프:',prd_identity_id_loca);

            let [tour_id_rows_local] = await connection.query("select tour_id from tour where prd_identity_id=?",[prd_identity_id_loca]);//해당 매물에 해당하는 셋팅해뒀던 tour_id리스트를 반환하고, 그 tour_id_rows string그룹한것 저장한다.

            if(tour_id_rows_local.length > 0){
                //해당 매물에 대한 투어에약셋팅리스트가 있는 경우에만 처리한다.셋팅자체를 등록해놓지 않았다면 가능 투어일시자체에 뜨지 않을것이고, 투어예약신청 못할것임.투어셋팅 내역이 있는것들만 저장.그중에서도 또 카운트가 있는것만.(사람들이 예약신청 요청한것이 있는것만)
                let tour_id_strings='';
                for(let i=0; i<tour_id_rows_local.length; i++){
                    if(i == tour_id_rows_local.length - 1){
                        tour_id_strings += tour_id_rows_local[i]['tour_id'];
                    }else{
                        tour_id_strings += tour_id_rows_local[i]['tour_id']+',';
                    }
                }
                console.log('===>>>>>tour_id_strings:::',tour_id_strings);

                var tour_reservation_rows_query="select * from tourReservation where tour_id in ("+tour_id_strings+")";
                var [tour_reservation_rows] = await connection.query(tour_reservation_rows_query);
                console.log('tour_reservation_ROWS.length:',tour_reservation_rows.length);

                if(tour_reservation_rows.length > 0){
                    prd_identity_info_array[match]={};
                    prd_identity_info_array[match]['prd_identity_id'] = prd_identity_id_loca;
                    prd_identity_info_array[match]['info'] = prd_id_rows[r];//각 prd_identity_id인포 저장한다.
                    prd_identity_info_array[match]['reservcnt_per_prd']=tour_reservation_rows.length;//매물별 신청한 투어예약인원수 저장한다.

                    match++;
                }            
            }           
        }
        console.log('=>>>>prd_identity_info_arrayss:',prd_identity_info_array);
        connection.release();

        return response.json({success:true, result_data : prd_identity_info_array})
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false,message:'server query full problme error!'});
    }
});
/*
//특정 등록된 매물에 셋팅된 투어예약셋팅 정보 리스트 조회한다.
router.post('/brokerProduct_toursetting_dates',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;
    console.log('req_body :',req_body);
    const connection=await pool.getConnection(async conn=> conn);
    console.log('>>>>pool connection Test:',pool);

    //try catch문 mysql 구문 실행구조.
    try{
        var prd_identity_id=req_body.id;

        //일반추가 요일목록들(일반요일들 집합끼리는 요일중복 발생하지 않게 처리되어있기에, 각 일반row별로는 요일들이 서로 다르다는 전제하임.) 일반 추가 항목들 일반 origin에 의해서 추가된 일반 예약셋팅 각날짜별 date목록들 각 date당 하나가 일반투어하나항목이다. 특별 투어추가항목과 겹치는것 포함하여 그냥 다 내보낸다.
        var [product_normal_setting_tourRow] = await connection.query("select * from tour where prd_identity_id=? and tour_type=1",[prd_identity_id]);
        
        //특정 추가일자들 결과물 반환.
        var [product_special_specifydate_tourRow] = await connection.query("select * from tour where prd_identity_id=? and tour_type=2 and tour_specifyday_except!=1",[prd_identity_id]);

        //특정 제외일자들 결과물 반환.
        var [product_special_exceptdate_tourRow] = await connection.query("select * from tour where prd_identity_id=? and tour_type=2 and tour_specifyday_except=1",[prd_identity_id]);

        console.log('->>>>>>product_normal_setting_tourRow list:',product_normal_setting_tourRow);
        
        //우선 1. 일반 추가 요일목록들(각 일반추가목록row끼리는 요일중복 없는 형태일것이고, 중복이 없기에 선택한 요일들에 해당하는 ) 노출 개수에 따른 반복이 우선 필요.
        
        var yoil_dateArray={};
        var total_display_count=0;//각 row별 표현할 요일개수들의 합으로 최종적 합계를 지정한다.
        for(let row_outer=0; row_outer < product_normal_setting_tourRow.length; row_outer++){
            console.log('======normal added row count loop start===========================================>>>');

            var normal_outer_loopcount= Math.ceil( product_normal_setting_tourRow[row_outer]['day_select_count'] / (product_normal_setting_tourRow[row_outer]['tour_set_days'].split(',').length));//올림처리한것 반복회수   11/3=>3.xxx=4    6/2=3 나눠떨어지는경우, 떨어지지 않는경우 올림처리 원래 표현수보다 더 많은 datelist저장.
            console.log('normal_outer_loopcouint 요일별 반복주기회수:',normal_outer_loopcount);
            total_display_count += product_normal_setting_tourRow[row_outer]['day_select_count'];//최종적 표현개수합계 날짜표현갯수
            //var normal_lastloop_innercount= product_normal_setting_tourRow[0]['day_select_count'] % (product_normal_setting_tourRow[0]['tour_set_days'].split(',').length);//5%3=2 6%2=0 나머지 여부에 따라 마지막 반복문에서 어떻게 처리되는지 여부 정해짐.                
            //선택항목날짜 표현수 / 요일종류수 다 딱 나눠떨어지는경우에는 모든outer 반복주기회수 = 각 요일별 반복주기회수 모두 동일할당.  6%2 ==0 , 3회반복. 각 반복회수만큼 요일종류별로 저장한다. 각 요일의 반복주기횟수 

            //각 row별 (normal) 설정한 시간대값 tour_set_times mon,fri 안에서 그 두 조합은 공통 시간대설정값 지정한다. 모두 일관된 같은 시간대설정값 지정한다.
            var normal_tour_setTimes= product_normal_setting_tourRow[row_outer]['tour_set_times'];//오전,오후1t,2t 이런식 문자열 
            var tour_id = product_normal_setting_tourRow[row_outer]['tour_id'];//일반/특별 물건투어예약row별 추가한 tour_id값 각 추가한 normal,special 리스트에 대한 날짜들값이 최종적 하나하나가 어떤 tour_id(노말 또는 특별추가:특별 우선순위로 덮어씌워짐) 에 해당하는 예약방셋팅인지 알필요가 있음. 한 매물에 대해 여러 예약방셋팅을 해놓고 그 방에 예약을 받는것과도 같다.
            var tour_type= product_normal_setting_tourRow[row_outer]['tour_type']; //일반/특별 추가 투어항목여부 일반방?특별방??

            for(let outer=0; outer<product_normal_setting_tourRow[row_outer]['tour_set_days'].split(',').length; outer++){
                let yoil_value=product_normal_setting_tourRow[row_outer]['tour_set_days'].split(',')[outer]; //월, 수 이렇게 저장한다. mon,wed 이런식임.
            
                let middle=0;
                console.log('=========================outer loop start yoil_value:=============================',yoil_value);
                let nowtime=new Date();//현재의 날짜를 구한다.
                let yoil_match_dates=[];//각 요일별 현재날짜로부터기준해서 오름차순으로 있는 날짜값들 저장한다. 각 날짜에 대한 정보를 의미한다.
                let secure_count=0;

                while(middle<normal_outer_loopcount){
                    console.log('=>>>>>>>>>>>>>inner loop start.....');
                    //월->6/2    수=> 6/2 각 요일별 세번씩 주기반복. 0,1,2 요일별 반복주기회수
                    //해당 요일에 대해서 반복문 회수만큼 검사한다. normal_outer_llopcount회수만큼 각 요일종류별 주기회수 저장된다.
                    let local_day_int=nowtime.getDay();
                    let local_day_string; 
                    switch(local_day_int){
                        case 0:
                            //console.log('일요일');
                            local_day_string = 'sun';
                        break;
                        case 1:
                            //console.log('월요일');
                            local_day_string = 'mon';
                        break;
                        case 2:
                            //console.log('화요일');
                            local_day_string = 'tue';
                        break;
                        case 3:
                            //console.log('수요일');
                            local_day_string = 'wed';
                        break;
                        case 4:
                            //console.log('목요일');
                            local_day_string = 'thr';
                        break;
                        case 5:
                            //console.log('금요일');
                            local_day_string = 'fri';
                        break;
                        case 6:
                            //console.log('토요일');
                            local_day_string = 'sat';
                        break;
                    }
                    console.log(nowtime.getFullYear()+'-'+(nowtime.getMonth()+1)+'-'+nowtime.getDate()+'::'+local_day_string);//반복문 나열되는 매 요일별 오늘이후의 무수한 날짜들중에서 선형적으로 오름차순으로 각 요일에 대응되는 날짜들을 요일별 매칭날짜수만큼 매칭될시에 반복문 멈춘다.

                    if(yoil_value == local_day_string){
                        //외부 반복문 요일종류값 == 내부 순환 date값 요일 일치하는것
                        yoil_match_dates[middle] = {};

                        if(nowtime.getMonth()+1 < 10){
                            nowtime_getmonth= '0'+ ( parseInt(nowtime.getMonth())+1); //01,02,03,04,.....09
                        }else{
                            nowtime_getmonth = parseInt(nowtime.getMonth())+1;//10,11,12
                        }

                        if(nowtime.getDate() < 10){
                            nowtime_getDate = '0'+ parseInt(nowtime.getDate());//01,02,03,......09
                        }else{
                            nowtime_getDate = nowtime.getDate();//10,11,12,...29,30,31
                        }

                        yoil_match_dates[middle]['date'] = nowtime.getFullYear()+'-'+nowtime_getmonth+'-'+nowtime_getDate;//각 날짜값 문자열 형태로 매치되는것 저장. 요일별
                        //매치가 된 date값들을 찾을때마다 카운트변수 증가시킨다.
                        yoil_match_dates[middle]['setTimes'] = normal_tour_setTimes;//모두 일관된 값을..
                        yoil_match_dates[middle]['tour_id'] = tour_id;
                        yoil_match_dates[middle]['tour_type'] = tour_type;

                        middle++;

                        console.log('yoil_match_dates:',yoil_match_dates);
                    }
                                        
                    nowtime = new Date(nowtime.setDate(nowtime.getDate() + 1));

                    if(secure_count >=100){
                        break;
                    }
                    console.log('=====>>>>inner loop end..===========');
                }
                yoil_dateArray[yoil_value] = yoil_match_dates;

                console.log('===============outer loopp end..ssssssss================================');
            }
            console.log('======normal added row count loop ends===========================================>>>');               
        }

        //normal row loops date processing 처리이후 normal datelist자료 취합
        console.log('all yoil date info:',yoil_dateArray);
        console.log('일반추가 데이터 전체 요일별 키/값 데이터 조회=========================');

        var simple_all_dateList=[];//전체 일반 결과row별 요일들 집합들 합은 총 7개 최대 7개 넘을수없음(중복없음) x<=7
        var all_datelist_index=0;

        for(key in yoil_dateArray){
            console.log('yoil_dateArray:',yoil_dateArray[key]);

            //각 요일별 배열요소 순회하여 모든 날짜들 all저장.
            let local_datelist=yoil_dateArray[key];//각 키값에 대한 값은 배열이다 키:요일/값:요일에 대한 반복주기날짜값들.
            for(let s=0; s<local_datelist.length; s++){
                simple_all_dateList[all_datelist_index]=local_datelist[s];

                all_datelist_index++;
            }
        };
        console.log('총 저장 날짜리스트(오름차순 정렬전):',simple_all_dateList);

        //총 저장 날짜들 오름차순 정렬진행.=>>>>(일반 추가날짜들)
        function data_ascending(a,b){
            var left = new Date(a['date']).getTime();
            var right = new Date(b['date']).getTime();

            return left > right ? 1 : -1;//왼쪽요소가 더크면 true리턴, 왼쪽요소가 더클시에 왼쪽요소를 오른쪽으로 밀어내는듯.
        }
        function data_descending(a,b){
            var left = new Date(a['date']).getTime();
            var right = new Date(b['date']).getTime();

            return left < right ? 1 : -1;
        }
        var ascend_all_normaldateList=simple_all_dateList.sort(data_ascending);
        console.log('오름차순 정렬 총 저장 날짜리스트:',ascend_all_normaldateList);
        console.log('+=>>>>normal datelist총 표현개수:',total_display_count);

        //2단계. normallist + speical addList dateMerged
        var merged_dateList = [];
        for(let m=0; m<ascend_all_normaldateList.length; m++){
            if(m < total_display_count ){
                merged_dateList[m] = ascend_all_normaldateList[m];
            }            
        }
        console.log('>>>>>mereged_dateList 초기상태 , 각 normalRow별 보여줄 선택항목요일수합계만큼만 display저장',merged_dateList);
    
        console.log('=>>>>>>product_special_specifydate_tourRow list:',product_special_specifydate_tourRow);

        if(merged_dateList.length == 0){
            //이런경우는 사실상 ascend_all_normaldateList 가 비어있는경우 일반추가로 인한 목록이 없던 경우로써 합병할피요가없고 그냥 해당 배열에 바로 특별추가목록들을 추가한다.
            console.log('일반추가리스트 dateList가 없던 경우로 바로 특별추가날짜들 추가한다.');
            for(let row_outer=0; row_outer < product_special_specifydate_tourRow.length; row_outer++){
                let added_special_specifydate = product_special_specifydate_tourRow[row_outer];
                merged_dateList.push({date : added_special_specifydate['tour_set_specifydate'], setTimes: added_special_specifydate['tour_set_specifydate_times'], tour_id : added_special_specifydate['tour_id'], tour_type: added_special_specifydate['tour_type']});
            }
        }else{
            for(let row_outer=0; row_outer < product_special_specifydate_tourRow.length; row_outer++){
                let added_special_specifydate= product_special_specifydate_tourRow[row_outer];//특정 추가하련는 특정날짜값.
                let is_already_exists_date=false;//추가하려는 특정날짜값이 기존 노말dateList에 존재하는지 여부 존재하지않으면 내부for문에서 발견되지 않을것이고, 새로이 mereged에 뒤에 push한다.
                for(let in_cond=0; in_cond < merged_dateList.length; in_cond++){
                    if(added_special_specifydate['tour_set_specifydate'] == merged_dateList[in_cond]['date']){
                        console.log('추가하려는 특정add날짜 기존normalist날짜와 겹침:',added_special_specifydate['tour_set_specifydate']);
                        merged_dateList[in_cond]['tour_id'] = added_special_specifydate['tour_id'];
                        merged_dateList[in_cond]['tour_type'] = added_special_specifydate['tour_type'];
                        merged_dateList[in_cond]['setTimes'] = added_special_specifydate['tour_set_specifydate_times'];
                        //추가하려는 특정날짜값에 해당하는 기존요소가 발견되면 그 기존요소에 값에 특정날짜의 시간대값을 덮어씌운다(udpate) 투어예약추가유형과,고유아디를 특별에 있던걸로 갱신합니다. 
                        is_already_exists_date=true;
                    }
                }//inner for loop search end.
    
                if(is_already_exists_date == false){
                    //존재하지 않은 날짜라면 새로이 push추가한다.
                    merged_dateList.push({date : added_special_specifydate['tour_set_specifydate'], setTimes: added_special_specifydate['tour_set_specifydate_times'], tour_id : added_special_specifydate['tour_id'], tour_type : added_special_specifydate['tour_type']});
                }
            }
        }
        
        console.log('=>>>>>mereged_dateList 합병상태, normalDATElIST + SPECIALaddDateList 중복제외한 mereged상태:',merged_dateList);
        var ascend_all_mergedDateList = merged_dateList.sort(data_ascending);
        console.log('=>>>>>mereged ascend오름차순정렬 배열:',ascend_all_mergedDateList);

        connection.release();

        console.log('->>>>product_special_exceptdate_tourRow list:',product_special_exceptdate_tourRow);

        return response.json({success:true, message:'proudctTOursettinglist server query success!!', result_total_data: ascend_all_mergedDateList, except_special_specifydate_tourRowlist : product_special_exceptdate_tourRow});
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});*/
module.exports=router;