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
    database:'korex',
    dateStrings : 'date'
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
        var [products_insert_rows]=await connection.query('insert into product(company_id,prd_name,prd_type,prd_sel_type,prd_price,prd_month_price,prd_status,prd_display,prd_area,prd_area_fect,prd_exculsive_status,address,address_detail,supply_space,exculsive_space,create_date,modify_date,request_memid,product_create_origin,request_man_name,request_mem_phone,managecost) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[companyid,maemulname,maemultype,selltype,sellprice,sellprice,'검토대기',0,1,1,0,dangiaddress,address_detail,supplydimension,jeonyongdimension,new Date(),new Date(),requestmemid,1,name,phone,managecost]);
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
            var [prev_toursetList]=await connection.query("select tour_set_days from tour where prd_identity_id=? and tour_type=1",[prd_identity_ids]);
            console.log('prd_dioentity_id요청 매물에 대한 투어예약셋팅 등롤리스트:',prev_toursetList);
            
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

                var [tour_insert_rows] = await connection.query("insert into tour(tour_type,prd_identity_id,company_id,mem_id,tour_set_days,tour_set_times,create_date,modify_date,is_tour_holiday_except,day_select_count,tour_set_specifydate,tour_set_specifydate_times,tour_specifyday_except) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[tour_type,prd_identity_ids,company_id,mem_id,normal_select_days,normal_select_times,new Date(),new Date(),normal_isholidayexcept,normal_select_daycount,special_specifydate,special_specifydatetimes,special_isexceptspecifydate]);
                connection.commit();
                console.log('tour_insert_rows :',tour_insert_rows,tour_insert_rows.insertId);
                //connection.release();
                var extract_insertTourid=tour_insert_rows.insertId;

                await connection.beginTransaction();

                var [tourdetail_insert_rows] = await connection.query("insert into tourDetail(tour_id,td_text,create_date,modify_date) values(?,?,?,?)",[extract_insertTourid,'',new Date(),new Date()]);
                connection.commit();
                console.log('tour detail insert rows:',tourdetail_insert_rows);

                connection.release();

                return response.json({success:true, message:'tour and tourdetail server query success!!', result_data: tour_insert_rows});    
            }
            
        }else if(tour_type == 2){

            //var prev_special_setspecifydates=[];//추가한 날짜들 리스트 구한다.
            //var prev_special_except_specifydates=[];//제외한 날짜들 리스트 구한다.
            var prev_special_specifydates=[];//특정 추가or제외한 날짜리스트들 집합구한다. 두개를 공통적 날짜리스트로 해야한다. 

            //특정날짜를 제외or추가한 합집합 요청인 경우에는 기존 제외or추가 하려는 날짜들 리스트를 모두 뽑아서 저장(중복제거)한다.해서 그 리스트중에서 추가하려는 특정제외or추가날짜여부가 있는지 중복여부
            var [prev_tour_specifydate_rows] = await connection.query("select tour_set_specifydate from tour where tour_type=2");

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
                var [tour_insert_rows] = await connection.query("insert into tour(tour_type,prd_identity_id,company_id,mem_id,tour_set_days,tour_set_times,create_date,modify_date,is_tour_holiday_except,day_select_count,tour_set_specifydate,tour_set_specifydate_times,tour_specifyday_except) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[tour_type,prd_identity_ids,company_id,mem_id,normal_select_days,normal_select_times,new Date(),new Date(),normal_isholidayexcept,normal_select_daycount,special_specifydate,special_specifydatetimes,special_isexceptspecifydate]);
                connection.commit();
                console.log('tour_insert_rows :',tour_insert_rows,tour_insert_rows.insertId);
                //connection.release();
                var extract_insertTourid=tour_insert_rows.insertId;

                await connection.beginTransaction();

                var [tourdetail_insert_rows] = await connection.query("insert into tourDetail(tour_id,td_text,create_date,modify_date) values(?,?,?,?)",[extract_insertTourid,'',new Date(),new Date()]);
                connection.commit();
                console.log('tour detail insert rows:',tourdetail_insert_rows);

                connection.release();

                return response.json({success:true, message:'tour and tourdetail server query success!!', result_data: tour_insert_rows}); 
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

        //마이페이지 propertyToursetting/17 특정 매물에 대한 예약 물건투어셋팅리스트
        var [productToursettinglist_row] = await connection.query("select * from tour where mem_id=? and company_id=? and prd_identity_id=?",[mem_id,get_company_id,prd_identity_id]);
        console.log('productTourserttinglist row:',productToursettinglist_row);
        
        connection.release();

        return response.json({success:true, message:'proudctTOursettinglist server query success!!', result_data: productToursettinglist_row});
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
module.exports=router;