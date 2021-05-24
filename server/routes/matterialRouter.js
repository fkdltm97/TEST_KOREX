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

console.log('==>>>>>matterialRouter default program excecute poolss::',pool);

const router=express.Router(); 

//단지명 검색.(중개의뢰,외부수임등록)
router.post('/complex_search_query',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);

    try{
        var dangi_name=req_body.dangi_name;
       
        //product에 가장 먼저 넣고, 추출해야할것은 prd_id(insertId이고) 이 insertid를 prd_identity_id대입한다.
        var complex_search_query="select * from complex where complex_name like '%"+dangi_name+"%' limit 100";

        var [complex_search_rows]=await connection.query(complex_search_query);//해당 검색 단지명에 해당하는것이 나오는지.

        console.log('complex search rtowss:',complex_search_rows);
        //connection.release();

        if(complex_search_rows){
            connection.release();
            return response.json({success:true, message:'complex searchrows server query success!!',result: complex_search_rows});
        }else{
            connection.release();
            return response.json({success:false, message: 'server query parts probilem error!!'});
        }
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//검색 단지리스트중 특정 클릭단지 정보 조회.
router.post('/complexdetail_search',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);

    try{
        var complex_id=req_body.complex_id;
       
        var [complex_search_rows]=await connection.query("select * from complex where complex_id=?",[complex_id]);//해당 검색 단지명에 해당하는것이 나오는지.

        console.log('complex search rtowss:',complex_search_rows);
        //connection.release();

        if(complex_search_rows){
            connection.release();
            return response.json({success:true, message:'complex searchrows server query success!!',result: complex_search_rows});
        }else{
            connection.release();
            return response.json({success:false, message: 'server query parts probilem error!!'});
        }
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!'});
    }
});
//검색 단지명중 특정 클릭단지 상세wide정보.
router.post('/complexdetail_join_search',async function(request,response){
    console.log('=====>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=>conn);

    try{
        var complex_id = req_body.complexid;
        //query=select * from complex c join buildings bd on c.bld_pk=bd.bld_pk join floor f on bd.bld_id=f.bld_id join ho_info h on f.flr_id=h.flr_id where c.complex_id=3095

        var [match_building_rows] = await connection.query("select * from buildings where complex_id=?",[complex_id]);//건물과 해당 단지 연결된 정보 리턴. 해당 단지id에 해당하는 여러 건물들 동등 정보들 리턴한다. 나온 여러개의 bld_id에 in포함되는 조건의 floor flrid는 곧 해당 층들은 해당 bld_id건물들에 속한 floor들 의미한다.
        var match_bld_ids='';

        if(match_building_rows.length >= 1){
            for(var b=0; b<match_building_rows.length; b++){
                if(b==match_building_rows.length -1){
                    match_bld_ids += match_building_rows[b]['bld_id'];
                }else{
                    match_bld_ids += match_building_rows[b]['bld_id']+',';
                }
            }
            console.log('=====>>match_bulidng_rows::',match_building_rows);
            console.log('====>>>match_bld_idss:::',match_bld_ids);
        }
       
        var match_floor_query="SELECT * FROM floor where bld_id in ("+match_bld_ids+")";
        var [match_floor_rows] = await connection.query(match_floor_query);//해당 건물id들에 해당하는 모든 floor리스트 정보 조회한다.
        console.log('===>>>match_floor_rows:::',match_floor_rows);

        if(match_floor_rows.length > 1){
            var match_flr_ids='';
            for(var f=0; f<match_floor_rows.length; f++){
                if(f==match_floor_rows.length -1 ){
                    match_flr_ids += match_floor_rows[f]['flr_id'];
                }else{
                    match_flr_ids += match_floor_rows[f]['flr_id']+',';
                }
            }
            console.log('====>>match_flr_ids::::',match_flr_ids);
        }
        
        var match_hoinfo_query="SELECT * FROM ho_info where flr_id in ("+match_flr_ids+")";
        var [match_hoinfo_rows] = await connection.query(match_hoinfo_query);//해당 건물참조정보에 대한 연결 호정보들 정보 리턴.
        console.log('===>>match_hofinOrwos::',match_hoinfo_rows);

        connection.release();

        return response.json({success:true, message:'server querys sucess!',result:[match_building_rows,match_floor_rows,match_hoinfo_rows]});
    }catch(err){
        console.log('server query errorss:',err);
        connection.release();

        return response.status(403).json({success:false,message:'server query full probml emerror',result:[[],[],[]]});
    }
});
router.post('/floorid_search_query',async function(request,response){
    console.log('=============>>>request.body:',request.body);

    var req_body=request.body;

    const connection=await pool.getConnection(async conn=> conn);

    try{
        //지번주소의 경우 그 안에 여러개가 있어서, 동시에 도로명주소까지 만족되는 것이다. 매물별 도로명주소가 같을수있나?? 같을수있고 여러개 나올수있음. 충분히. 다만 해당 지번>도로명 모두 만족하는것 검색해야함. 그 지번안에도 여러 다른 도로명이 있을수있기에
        var jibunaddress = req_body.jibunaddress;
        var roadaddress = req_body.roadaddress;
       
        var [floorid_search_rows]=await connection.query("select * from floor where addr_jibun like ? and addr_road like ?",['%'+jibunaddress+'%','%'+roadaddress+'%']);//해당 검색 지번,도로명 주소에 대해서 모두 만족되는 floorid리스트구한다.

        console.log('floorid search rtowss:',floorid_search_rows);
        //connection.release();

        if(floorid_search_rows){
            connection.release();
            return response.json({success:true, message:'floorid_search_rows server query success!!',result: floorid_search_rows});
        }else{
            connection.release();
            return response.json({success:false, message: 'server query parts probilem error!!', result: []});
        }
        
    }catch(err){
        console.log('server query error',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query full problem error!', result:[]});
    }
});

module.exports=router;