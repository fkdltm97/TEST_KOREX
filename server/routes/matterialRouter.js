const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const request_api=require('request-promise-native');

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

//지도관련 검색 api시작>>>>
//메인페이지 메인검색 시작부분검색
router.post('/main_searchStart',async function(request,response){
    console.log('=====+++++>>>request.body:',request.body);

    var req_body= request.body;

    const connection = await pool.getConnection(async conn => conn);

    try{
        //해당 keyword에 대해서 대학교명, 지하철명, 지역명 등 검색 진행.하여 종류별 리턴 결과 세개 던져주기(현재는 두개, 지역 못받음)
        var keyword=req_body.search_keyword_val;

        var [metro_row_result] = await connection.query("select * from metro where mtr_name like '%"+keyword+"%'");

        var [university_row_result] = await connection.query("select * from university where uvs_name like '%"+keyword+"%'");

        console.log('realted metro지하철,대학교,지역 관련 연관데이터들:',metro_row_result,university_row_result);

       //각 지역,지하철,대학별 검색결과 list가 비어있는 널상태일수도있다.
       if(metro_row_result.length === 0){
           metro_row_result = [];
       }
       if(university_row_result.length === 0){
          university_row_result = [];
       }
        connection.release();
        return response.json({success: true, message:'sauqewry success', result: [metro_row_result,university_row_result]});
        
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query problem error!',result:[ [],[] ]});
    }
});
//메인 검색페이지 검색리스트중 임의 클릭 지역or대학교or지하철 지점의 관련 정보 리턴
router.post('/main_searchresult_clickDetail',async function(request,response){
    console.log('=====>>>request.body:',request.body);

    var req_body= request.body;

    const connection = await pool.getConnection(async conn => conn);
    //id_val, search_type_val
    try{
        var search_type=req_body.search_type_val;
        var id=req_body.id_val;
        var screen_width= req_body.screen_width;
        var screen_height= req_body.screen_height;
        var zido_level =req_body.level;

        var search_sql="select * from "+search_type+" where id="+id;
        console.log('search_sqls::',search_sql);
        var [searchdetail_result] = await connection.query(search_sql);
        console.log('검색타입 및 해당 테이블 검색결과(한개정보):',search_type, searchdetail_result);

        //나온 중심 좌표x,y값을 기준으로 계산처리. 추상적으로 임의의 지점으로부터 중심으로 해서 직사각형 area영역 크기만큼(화면스크린사이즈px사이즈 가로,세로)와 지도레벨값에 따른 분기처리를 한다. 각 레벨에서 화면상에서 현재의 화면좌표일때 기준 차이px량 크기px량만큼 위도경도 크기 차이난다.x,y
        var level_array={
            '1' : 0.000003000 ,//레벨1일떄 단위1px당(화면상 보여지는 지도에서의 각 1px 단위크기당 일때의 위도,경도 차이값.지도상에서 가로,세로 크기1px의 차이일 경우마다 십억분에 7500차이나게형상화)
            /*'2' : 0.000015000 */'2' : 0.000007500 ,
            '3' : 0.000015000 ,
            '4' : 0.000025000 ,
            '5' : 0.000038000 ,
            '6' : 0.000075000 ,
            '7' : 0.000150000 ,
            '8' : 0.000300000 ,
            '9' : 0.000750000 ,
            '10' : 0.001250000 ,
            '11' : 0.002500000 ,
            '12' : 0.007500000 ,
            '13' : 0.050000000 ,
            '14' : 0.200000000  //14레벨일때는 화면상 지도 1px가로세로당 위도경도값 0.5만큼 차이 이동된다고 할수있다. 추상화.
        };
        var x_distance= level_array[zido_level] * parseInt(screen_width / 2);
        var y_distance = level_array[zido_level] * parseInt(screen_height / 2);
        var origin_x= searchdetail_result[0].x;
        var origin_y= searchdetail_result[0].y;

        var level_zido_startx= origin_x - x_distance;
        var level_zido_endx= origin_x + x_distance; 
        var level_zido_starty= origin_y - y_distance;
        var level_zido_endy= origin_y + y_distance;
        console.log('지도 중심origin x,y좌표 및 주변 직사각형 좌표 범위area:',origin_x,origin_y,level_zido_startx,level_zido_endx,level_zido_starty,level_zido_endy);

        //해당 범위의 startx~endx,starty~endy 모두 만족하는 범위들 구한다. 만족하는 전문중개사들(company),단지별실거래(complex),매물(product:오피아파트이면 complexid에서 가져온 x,y값이고, 상가사무실이면 floor에서있던 x,y들 가져온것) x,y를 기준으로 만족 되는 범위의 것들 구한다.
        var [search_complex_result] = await connection.query("select * from complex where x >= ? and x <= ? and y >= ? and y <= ?",[level_zido_startx,level_zido_endx, level_zido_starty,level_zido_endy]);
        var [search_product_result] = await connection.query("select * from product where prd_longitude >= ? and prd_longitude <= ? and prd_latitude >= ? and prd_latitude <= ?",[level_zido_startx,level_zido_endx,level_zido_starty,level_zido_endy]);
        var [search_company_result] = await connection.query("select * from company where x >= ? and x <= ? and y >= ? and y <= ?",[level_zido_startx,level_zido_endx,level_zido_starty,level_zido_endy]);
        //var [search_product_result] = await connection.query("select * from product");
        //var [search_company_result] = await connection.query("select * from company");

        console.log('===>>만족되는 데이터들::',search_complex_result,search_product_result,search_company_result);
        connection.release();

        return response.json({success:true,message:'sucecess queryss',result: searchdetail_result, match_matterial : [search_product_result,search_company_result,search_complex_result]});

    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query problme error!',result:[], match_matterial: [] });
    }
});
//메인 검색페이지 검색리스트중 임의 클릭 지역or대학교or지하철 지점의 관련 정보 리턴
router.post('/mapchange_searchresult',async function(request,response){
    console.log('=====>>>request.body:',request.body);

    var req_body= request.body;

    const connection = await pool.getConnection(async conn => conn);
    //id_val, search_type_val
    try{
        var origin_x=req_body.lng;
        var origin_y=req_body.lat;
        var screen_width= req_body.screen_width;
        var screen_height= req_body.screen_height;
        var zido_level =req_body.level;

        //나온 중심 좌표x,y값을 기준으로 계산처리. 추상적으로 임의의 지점으로부터 중심으로 해서 직사각형 area영역 크기만큼(화면스크린사이즈px사이즈 가로,세로)와 지도레벨값에 따른 분기처리를 한다. 각 레벨에서 화면상에서 현재의 화면좌표일때 기준 차이px량 크기px량만큼 위도경도 크기 차이난다.x,y
        var level_array={
            '1' : 0.000003000 ,//레벨1일떄 단위1px당(화면상 보여지는 지도에서의 각 1px 단위크기당 일때의 위도,경도 차이값.지도상에서 가로,세로 크기1px의 차이일 경우마다 십억분에 7500차이나게형상화)
            /*'2' : 0.000015000 */'2' : 0.000007500 ,
            '3' : 0.000015000 ,
            '4' : 0.000025000 ,
            '5' : 0.000038000 ,
            '6' : 0.000075000 ,
            '7' : 0.000150000 ,
            '8' : 0.000300000 ,
            '9' : 0.000750000 ,
            '10' : 0.001250000 ,
            '11' : 0.002500000 ,
            '12' : 0.007500000 ,
            '13' : 0.050000000 ,
            '14' : 0.200000000  //14레벨일때는 화면상 지도 1px가로세로당 위도경도값 0.5만큼 차이 이동된다고 할수있다. 추상화.
        };
        var x_distance= level_array[zido_level] * parseInt(screen_width / 2);
        var y_distance = level_array[zido_level] * parseInt(screen_height / 2);

        var level_zido_startx= origin_x - x_distance;
        var level_zido_endx= origin_x + x_distance; 
        var level_zido_starty= origin_y - y_distance;
        var level_zido_endy= origin_y + y_distance;
        console.log('지도 중심origin x,y좌표 및 주변 직사각형 좌표 범위area:',origin_x,origin_y,level_zido_startx,level_zido_endx,level_zido_starty,level_zido_endy);

        //해당 범위의 startx~endx,starty~endy 모두 만족하는 범위들 구한다. 만족하는 전문중개사들(company),단지별실거래(complex),매물(product:오피아파트이면 complexid에서 가져온 x,y값이고, 상가사무실이면 floor에서있던 x,y들 가져온것) x,y를 기준으로 만족 되는 범위의 것들 구한다.
        var [search_complex_result] = await connection.query("select * from complex where x >= ? and x <= ? and y >= ? and y <= ?",[level_zido_startx,level_zido_endx, level_zido_starty,level_zido_endy]);
        var [search_product_result] = await connection.query("select * from product where prd_longitude >= ? and prd_longitude <= ? and prd_latitude >= ? and prd_latitude <= ?",[level_zido_startx,level_zido_endx,level_zido_starty,level_zido_endy]);
        var [search_company_result] = await connection.query("select * from company where x >= ? and x <= ? and y >= ? and y <= ?",[level_zido_startx,level_zido_endx,level_zido_starty,level_zido_endy]);
        //var [search_product_result] = await connection.query("select * from product");
        //var [search_company_result] = await connection.query("select * from company");

        console.log('===>>만족되는 데이터들::',search_complex_result,search_product_result,search_company_result);
        connection.release();

        return response.json({success:true,message:'sucecess queryss', result:[], match_matterial : [search_product_result,search_company_result,search_complex_result]});

    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query problme error!',result:[], match_matterial: [] });
    }
});
router.get('/getXY',async function(request,response){
    console.log('getxy테스트:::');

    var query=request.body.query;
    console.log('검색 도로명주소::',query);
    var jibun='경기도 파주시 문산읍 내포리 743-10번지';
    var road=' 서울특별시 동작구 노량진로32길 156';

    console.log('ENCODECURL::',encodeURI(road),request_api);
    try{
        const headers={'Authorization' : "KakaoAK "+"ac08f2d6adfd16a501ad517d7a2fab3f"};
        const url = "https://dapi.kakao.com/v2/local/search/address.json?&query=" + encodeURI(road);
        let api_response = await request_api.get({
            uri:url,
            headers: headers
        });
        console.log('++++>>>>response::',api_response);
        api_response = JSON.parse(api_response);
        console.log('resoonseodoicuemtns::',api_response.documents);
        api_response_final = api_response.documents[0];

        return {x : api_response_final.x, y:api_response_final.y}
    }catch(err){
        console.log('errrrrr::',err);
    }
});
router.post('/getFloor_xy',async function(request,response){
    console.log('get floor xy>>>:');

    var floorid=request.body.floorid_val;

    const connection = await pool.getConnection(async conn => conn);

    try{       
        var [floorsearch_result] = await connection.query("select addr_road, addr_jibun from floor where flr_id=?",[floorid]);
        console.log('검색타입 및 해당 테이블 검색결과',floorsearch_result);

        var addr_road=floorsearch_result[0]['addr_road'];
        connection.release();
        //해당 도로명 주소에 대해서 xy로 리턴하는 api구현. 핻해당 클릭한 임의 건물의 flrid층에 대한 그 물질에 대해서 도로명주소공유되는것 도로명주소에 대한 경도위도 반환.
        const api_headers={'Authorization' : 'KakaoAK '+"ac08f2d6adfd16a501ad517d7a2fab3f"};
        const api_url="https://dapi.kakao.com/v2/local/search/address.json?&query=" + encodeURI(addr_road);

        let api_response = await request_api.get({
            uri:api_url,
            headers: api_headers
        });
        console.log('++++>>>>response::',api_response);
        api_response = JSON.parse(api_response);
        console.log('resoonseodoicuemtns::',api_response.documents);
        api_response_final = api_response.documents[0];

        return response.json({success:true,message:'sucecess queryss',result: {x: api_response_final.x, y:api_response_final.y} });

    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query problme error!',result:[], match_matterial: [] });
    }
});
router.get('/dummy_insert_test',async function(request,response){
    console.log('insert store dummyinsert test::');

    const connection = await pool.getConnection(async conn => conn);

    try{
        for(let s=0; s<100; s++){
            let random_x= 127 + 2*Math.random();
            let random_y= 36 + 2*Math.random();
            console.log(random_x,random_y);
            var [insert_query_res] = await connection.query("insert into company(mng_no,biz_name,x,y) values('','더미중개사',?,?)",[random_x,random_y]);
            
            console.log('insert_query_res::',insert_query_res);
        }

        return response.status(403).json({success:false, message:'success!!',result:[]});
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query problme error!',result:[]});
    }
});
router.get('/dummy_insert_testproduct',async function(request,response){
    console.log('insert store dummyinsert test::>>>');

    const connection = await pool.getConnection(async conn => conn);

    try{
        for(let s=0; s<100; s++){
            let random_x = 127 + 2*Math.random();
            let random_y = 36 + 2*Math.random();
            console.log(random_x,random_y);
            var [insert_query_rows] = await connection.query("insert into product(prd_identity_id,prd_name,prd_longitude,prd_latitude) values(?,?,?,?)",[-1,'더미매물',random_x,random_y]);

            console.log('insert_query_rows::',insert_query_rows);
        }

        return response.status(403).json({success:false, message:'success!!',result:[]});
    }catch(err){
        console.log('server query error:',err);
        connection.release();

        return response.status(403).json({success:false, message:'server query problme error!',result:[]});
    }
});
module.exports=router;