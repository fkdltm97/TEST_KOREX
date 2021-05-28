/* global kakao */

import React, { useEffect, useState, useRef } from "react";

import styled from "styled-components"

// Img
import exclusiveMarker from "../../../img/map/exclusiveMarker.png";
import probrokerMarker from "../../../img/map/probrokerMarker.png";
import blockMarker from "../../../img/map/blockMarker.png";
import schoolMarker from "../../../img/map/schoolMarker.png";
import childMarker from "../../../img/map/childMarker.png";
import officeMarker from "../../../img/map/officeMarker.png";
import subwayMarker from "../../../img/map/subwayMarker.png";
import bankMarker from "../../../img/map/bankMarker.png";

import excClusterer from "../../../img/map/excClusterer.png";
import proClusterer from "../../../img/map/proClusterer.png";
import blockClustererImg from "../../../img/map/blockClusterer.png";

// redex
import { MapRight, MapProductEls } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

import json from '../../../json/geoMap.json'

import style from './kakaoMap.css';

//server
import serverController from '../../../server/serverController';
import mapProductEls from "../../../store/modules/mapProductEls";

export default function KakaoMap({status}) {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setExcClusterer] = useState();
  const [, setProClusterer] = useState();
  const [blockClusterer, setBlockClusterer] = useState();
  const [, setAroundClusterer] = useState();
  const [, setRoadClusterer] = useState();
  const [, setCurrnetClusterer] = useState();
  const pivot = {lat:37.496463, lng:127.029358}
  const [centerClusterer, setCenterClusterer] = useState({lat:"", lng:""})
  const [clickMarker, setClickMarker] = useState({});

  const mapRightRedux = useSelector(state=>{ return state.mapRight});
  const mapFilterRedux = useSelector(state=>{ return state.mapFilter});
  const productRedux = useSelector(state=>{ return state.mapProductEls});
  const mapHeaderRedux = useSelector(data => data.mapHeader);

  const [exclusiveArr, setExclusiveArr] = useState([]);
  const [probrokerArr, setProbrokerArr] = useState([]);
  const [blockArr, setBlockArr] = useState([]);
  const [aroundArr, setAroundArr] = useState([]);
  
  const container = useRef();
  const rvWrapperRef = useRef();
  const roadViewRef = useRef();
  
  // 거리재기
  var drawingFlag = false;
  var clickLine;
  var moveLine;
  var distanceOverlay;
  var dots = [];

  var searchdetail_origindata = JSON.parse(localStorage.getItem("searchdetail_origin"));
  // console.log('==>>kakaomap실행 및 초기화::',searchdetail_origindata, status, mapHeaderRedux, mapRightRedux,mapFilterRedux);
  
  
  // 호출 상황 --------
  // 첫 로드
  // 필터 변경
  // 오른쪽 메뉴 변경
  // idle 이벤트
  async function getProduct() {
    // **api
    // 현재 활성 버튼/필터 서버에 보내서 
    // 지도에 띄울 좌표(마커/클러스터러), 매물 리스트 받아와야 합니다.

    // fetch api요청 해당 현재 지도의 change 중심좌표,레벨,화면스크린크기 등을 보낸다.그에 따른 그 지도상화면에서 보이는 주변 매물들 결과얻는다.
    //console.log('-=======>>getProduct함수 실행::',mapData);
    var mapData = JSON.parse(localStorage.getItem("mapData"));
    var idle_mapdata={
      level : mapData.level,
      lat : mapData.lat,
      lng : mapData.lng,
      screen_width : window.innerWidth,
      screen_height : window.innerHeight,
      prdtype_val : mapHeaderRedux.prdtype ? mapHeaderRedux.prdtype : 'apart',
      isexclusive_val : mapRightRedux.isExclusive.is,
      isprobroker_val : mapRightRedux.isProbroker.is,
      isblock_val : mapRightRedux.isBlock.is
    };
    var res_results= await serverController.connectFetchController('/api/matterial/mapchange_searchresult','POST',JSON.stringify(idle_mapdata));
    
    if(res_results){
       // 전속 매물
      if(mapRightRedux.isExclusive.is){
        let match_matterial_exclusive= res_results.match_matterial[0];

        /*for(let i = 0 ; i < match_matterial_exclusive.length ; i++){
          newArr.push({
            isExc:true,
            item_id : i,
            path:"/",
            startDate:"20.00.00",
            endDate: "20.00.00",
            kind:"아파트",
            detail:`자이 10${i}동`,
            type:"전세",
            price:`1${i}억 5,000`,
            floor:"층수",
            area:"공급면적",
            expenses:"관리비",
            desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
          });
        }*/
        MapProductEls.updateExclusive({ exclusive : match_matterial_exclusive });
      }else{
        MapProductEls.updateExclusive({ exclusive: []});//강제 빈배열 넣기.
      }
      // 전문 중개사
      if(mapRightRedux.isProbroker.is){
        let match_matterial_probroker = res_results.match_matterial[1];
        /*
        let newArr = [];
        for(let i = 0 ; i < 10 ; i++){
          newArr.push({
            broker_id : i,
            path:"/",
            tag1:"아파트·현대아이리스",
            tag2:"상가",
            tag3:"사무실",
            name:`럭키 공인중개사${i}`,
            address:"강남구 논현동 104-5",
            sell_kind1:2,
            sell_kind2:7,
            sell_kind3:9,
          });
        }*/
        MapProductEls.updateProbroker({ probroker : match_matterial_probroker });
      }else{
        MapProductEls.updateProbroker({ probroker : []});
      }
      // 단지별 실거래
      if(mapRightRedux.isBlock.is){
        let match_matterial_block = res_results.match_matterial[2];
        /*let newArr = [];
        for(let i = 0 ; i < 10 ; i++){
          newArr.push({
            danji_id : i,
            path:"/",
            title:`골든카운티${i}`,
            address:"서울특별시 강남구 삼성동 200-13",
            date:"21.02.01",
            price:"매매 3억5,000",
            floor:"7층",
          });
        }*/
        MapProductEls.updateBlock({ block : match_matterial_block });
      }else{
        MapProductEls.updateBlock({ block : []});
      }
    } 
  }

  /*
    전속매물, 전문중개사, 단지별 실거래
    각 클러스터러와 마커를 초기화시키는 함수를 만들었습니다.
    새로운 마커를 표시하기 전 함수를 실행하여 이전에 있던 클러스터러를 지웠습니다.
  */
  const initExcCluster = () => {
    setExcClusterer(clusterer=>{ 
      console.log('==>>setExcCLUSTER initcluster:',clusterer);
      if(!clusterer){return clusterer}; 
      clusterer.clear(); 
      return clusterer;
    });
  }
  const initProCluster = () => {
    setProClusterer(clusterer=>{ 
      console.log('====>setRroclustere initcluster:',clusterer);
      if(!clusterer){return clusterer}; 
      clusterer.clear(); 
      return clusterer;
    });
  }
  const initBlockCluster =  () => {
    setBlockClusterer(clusterer=>{ 
      console.log('====>>setblockClustere initcluster:',clusterer);
      if(!clusterer){return clusterer}; 
      clusterer.clear(); 
      return clusterer;
    });
  }

  // 제거
  const removeEvent = () => {
    kakao.maps.event.removeListener(kakaoMap, 'idle', getProduct );
  }
  
  // 필터/메뉴 바뀔때마다 이벤트 발생
  useEffect(() => {
    // console.log('===>>필터 right메뉴, 카카오맵등 바뀔떄마다 이벤트 발생:');
    if(!kakaoMap){return;};
    const filerRedux = mapFilterRedux;
    localStorage.setItem( "filterData", JSON.stringify(filerRedux));
    
    // #.1 현재 리스트/마커/클러스터러 변경
    //getProduct();

    // #.2 이벤트 추가 ( 새 이벤트 추가)
    kakao.maps.event.addListener(kakaoMap, 'idle', getProduct );
    
    // #.3  클릭 시 이벤트 제거 ( 기존 이벤트 제거 )
    const changeBtn = document.querySelectorAll(".changeBtn");
    const changeBtnRange = document.querySelectorAll(".changeBtnRange");
    for(let i = 0; i < changeBtn.length ; i++){
      changeBtn[i].addEventListener("click", removeEvent );
    }
    for(let i = 0; i < changeBtnRange.length ; i++){
      changeBtnRange[i].addEventListener("mousedown", removeEvent );
    }
  },[mapFilterRedux.filterUI, mapRightRedux, kakaoMap])
  // ----------------------

  // 임시 더미 데이터
  useEffect(() => {

    // console.log('===>>>페이지 로드 시점 실행or 리덕스데이터 변경시마다 실행(idle->getproduct fetch api정보 리덕스 저장->리덕스데이터 state에저장.)::');
    // console.log('===>>productRedux::',productRedux);

    let exclusive_kakaomap_elements=[];
    for(let b=0; b<productRedux.exclusive.length; b++){
      exclusive_kakaomap_elements[b]= new kakao.maps.LatLng(productRedux.exclusive[b].prd_latitude,productRedux.exclusive[b].prd_longitude);
    }
    setExclusiveArr(
      /*[ 
        new kakao.maps.LatLng(37.499590, 127.026374),
        new kakao.maps.LatLng(37.499427, 127.027947),
        new kakao.maps.LatLng(37.498553, 127.028824),
        new kakao.maps.LatLng(37.497625, 127.029358),
        new kakao.maps.LatLng(37.496463, 127.026755),
        new kakao.maps.LatLng(37.496292, 127.025873),
        new kakao.maps.LatLng(37.497545, 127.025466),             
        new kakao.maps.LatLng(37.494424, 127.012703)                
      ]*/
      exclusive_kakaomap_elements
    );
    let probroker_kakaomap_elements=[];
    for(let b=0; b<productRedux.probroker.length; b++){
      probroker_kakaomap_elements[b]= new kakao.maps.LatLng(productRedux.probroker[b].y,productRedux.probroker[b].x);
    }
    setProbrokerArr(/*[
      new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
      new kakao.maps.LatLng(37.49671536281186, 127.03020491448352),
      new kakao.maps.LatLng(37.496201943633714, 127.02959405469642),
      new kakao.maps.LatLng(37.49640072567703, 127.02726459882308),
      new kakao.maps.LatLng(37.49640098874988, 127.02609983175294),
      new kakao.maps.LatLng(37.49932849491523, 127.02935780247945),
      new kakao.maps.LatLng(37.49996818951873, 127.02943721562295)
      ]*/
      probroker_kakaomap_elements
    )
    
    let block_kakaomap_elements=[];
    for(let b=0; b<productRedux.block.length; b++){
      block_kakaomap_elements[b] = new kakao.maps.LatLng(productRedux.block[b].y,productRedux.block[b].x);
    }
  
    setBlockArr(
      /*new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
      new kakao.maps.LatLng(37.499463762912974, 127.0288828824399),
      new kakao.maps.LatLng(37.49896834100913, 127.02833986892401),
      new kakao.maps.LatLng(37.49893267508434, 127.02673400572665),
      new kakao.maps.LatLng(37.49872543597439, 127.02676785815386),
      new kakao.maps.LatLng(37.49813096097184, 127.02591949495914),
      new kakao.maps.LatLng(37.497680616783086, 127.02518427952202)*/
      block_kakaomap_elements
    )
  }, [productRedux.block, productRedux.probroker, productRedux.exclusive]);

  // 지도 생성
  useEffect(() => {
    let searchdetail_origindata = JSON.parse(localStorage.getItem("searchdetail_origin"));
    // console.log('==>>>useEffect load continaer: 상위부모요소 실행을 통해 해당요소 실행또는 맵 실행시점 or mapHeader리덕스요소 변경시마다',searchdetail_origindata);

    let mapData = JSON.parse(localStorage.getItem("mapData"));
    
    if(searchdetail_origindata && (searchdetail_origindata.y && searchdetail_origindata.x)){
      //map/xxxx/url:xxparams에 정보가 있어서 origin center지점에 대한 정보가 있는경우.메인검색을 통해서 눌러서 온 경우에는 기존 데이터로 해서 하진 않음.
      // console.log('======>>main start search or mapheader검색를 통해 접근한경우::',searchdetail_origindata.x,searchdetail_origindata.y);
      var center = new kakao.maps.LatLng(searchdetail_origindata.y, searchdetail_origindata.x);
      var level = 3;

      /*if(mapData){
        // console.log('===>>mapData정보 있던경우::',mapData);
        center = new kakao.maps.LatLng(Number(mapData.lat), Number(mapData.lng));
        level = mapData.level;
      }*/
      
    }else if(!searchdetail_origindata){
      var center = new kakao.maps.LatLng(37.496463, 127.029358);
      //var center= new kakao.maps.LatLng(35.8094719990009044,127.09086515657002);
      var level = 3;

      // local에 정보가 있을 경우
      if(mapData){
        // console.log('===>>mapData정보 있던경우::',mapData);
        center = new kakao.maps.LatLng(Number(mapData.lat), Number(mapData.lng));
        level = mapData.level;
      }
    }
    const options = {
      center,
      level: level
    };
    // console.log('options::',options);
    const map = new kakao.maps.Map(container.current, options);
    // console.log('====>>지도생성 및 초기화:',map);

    setKakaoMap(map); 

    kakao.maps.event.addListener(map, 'idle', (e) => {

      // console.log('====>kakao maps idle이벤트 핸들러등록 발생::',e,map);
      var level = map.getLevel();
      var lng = map.getCenter().La.toFixed(11);
      var lat = map.getCenter().Ma.toFixed(9);
      const data = {
        level:level,
        lat:lat,
        lng:lng,
      }
      localStorage.setItem( "mapData", JSON.stringify(data));
    });

    //localStorage.removeItem('searchdetail_origin');
    
  }, [container, mapHeaderRedux.origin]);

  // 전속매물 토글 --- 
  useEffect(() => {
    // console.log('====>>전속매물 토글링시에',mapRightRedux.isExclusive.is, exclusiveArr);
    mapRightRedux.isExclusive.is
    ?
    addMarkClust(exclusiveArr, setExcClusterer, exclusiveMarker, excClusterer, 3 , 'exclusive')
    :
    initExcCluster();
  }, [mapRightRedux.isExclusive.is])
  //전속매물 요소 state 배열리스트(마커배열) 변동시마다실행
  useEffect( () => {
    //console.log('===>>>전속매물 관련 state마커배열요소 변동시마다 실행:',exclusiveArr);
    //전속매물 체크된 상태에서만 실행한다.그린다.마커,클러스트
    
    /*mapRightRedux.isExclusive.is 
    ?*/
    //addMarkClust(exclusiveArr, setExcClusterer, exclusiveMarker, excClusterer, 3)
    /*:
    setExcClusterer(clusterer => {
      console.log('===>>>setExccluster함수 실행::',clusterer);
      if(!clusterer){return clusterer};
      console.log('clusterer clear::',clusterer.clear,clusterer);
      clusterer.clear();
      return clusterer;
    });*/
    
    // console.log('===>>>전속매물 관련 state마커배열요소 변동시마다 실행:',exclusiveArr);
    //전속매물 체크된 상태에서만 실행한다.그린다.마커,클러스트
    // setExcClusterer(clusterer=>{ 
    //   if(!clusterer){return clusterer}; 
    //   clusterer.clear(); 
    //   return clusterer;
    // });
    initExcCluster();
    addMarkClust(exclusiveArr, setExcClusterer, exclusiveMarker, excClusterer, 3 ,'exclusive');
  },[exclusiveArr]);

  // 전문 중개사 토글 --- 
  useEffect(() => {
    // console.log('===>>전문중개사 토글링시에',mapRightRedux.isProbroker, probrokerArr);
    
    mapRightRedux.isProbroker.is
    ?
    addMarkClust(probrokerArr, setProClusterer, probrokerMarker, proClusterer, 4 , 'probroker')
    :
    initProCluster();
  }, [mapRightRedux.isProbroker.is])
  //전문중개사 요소 state 관련마커배열 리스트 변동시마다 실행
  useEffect(() => {
    //console.log('====>>전문중개사요소 관련 state마커배열요소 변동시마다 실행:',probrokerArr);
    //전문중개사 체크된 상태에서만 idle로인한 state리스트 변동때마다. 마커,클러스트 그린다.매 변동되는 마커배열요소에 따른 변동 클러스터생성(기존것 소멸 갱신)
    
    /*mapRightRedux.isProbroker.is
    ?*/
    //addMarkClust(probrokerArr, setProClusterer, probrokerMarker, proClusterer, 4)
    /*:
    setProClusterer(clusterer => {
      console.log('====>>setProClusterer함수 실행::',clusterer);
      if(!clusterer){return clusterer;}
      console.log('clustere clear::',clusterer.clear,clusterer);
      clusterer.clear();
      return clusterer;
    });*/

    // console.log('====>>전문중개사요소 관련 state마커배열요소 변동시마다 실행:',probrokerArr);
    //전문중개사 체크된 상태에서만 idle로인한 state리스트 변동때마다. 마커,클러스트 그린다.매 변동되는 마커배열요소에 따른 변동 클러스터생성(기존것 소멸 갱신)
    initProCluster();
    addMarkClust(probrokerArr, setProClusterer, probrokerMarker, proClusterer, 4 , 'probroker');
    
  },[probrokerArr]);

  // 단지별 실거래 토글 --- 
  useEffect(() => {
    // console.log('===>>>단지별실거래 토글링시에',mapRightRedux.isBlock.is, blockArr);
    mapRightRedux.isBlock.is
    ?
    addMarkClustBlock(blockArr, setBlockClusterer, blockMarker, blockClustererImg, 5)
    :
    initBlockCluster();
  }, [mapRightRedux.isBlock.is]);
  //단지별요소 state관련 마커배열 리스트 변동시마다 실행
  useEffect(() => {

    //console.log('단지별요소 관련 state마커배열요소 변동시마다 실행::',blockArr);    
    /*mapRightRedux.isBlock.is
    ?*/
    addMarkClustBlock(blockArr, setBlockClusterer, blockMarker,blockClustererImg, 5)
    /*:
    setBlockClusterer(clusterer=>{
      console.log('===>>setBlocklcustere함수 실행::',clusterer);
      if(!clusterer){return clusterer;}
      console.log('clusterer clear::',clusterer.clear,clusterer);
      clusterer.clear();
      return clusterer;
    });*/
    
  },[blockArr]);


  // 마커/클러스터러 함수
  const addMarkClust = (array, setClusterer, markerImg, clustererImg, cluLevel , element_type) => {
    // console.log('======addmarkcluster함수 실행:',array,setClusterer);
    /*if(array.length == 0){
      return;
    }*/
    var imageSize = new kakao.maps.Size(40, 40),
        imageOption = {offset: new kakao.maps.Point(4, 4)};
    var markerImage = new kakao.maps.MarkerImage(markerImg, imageSize, imageOption);
    let markers = [];
    array.map(item => {
      const markerEl = new kakao.maps.Marker({
        map: kakaoMap, 
        position: new kakao.maps.LatLng(item.Ma, item.La),
        image: markerImage,
        opacity:1
      })
      kakao.maps.event.addListener(markerEl, 'click', async function() {
         console.log('markelElement클릭:',markerEl, item.Ma, item.La, element_type);
         setClickMarker({
          lat:item.Ma,
          lng:item.La,
          click_type : element_type
        });

        MapProductEls.updateClickMarker({clickmarker : {lat:item.Ma, lng:item.La, click_type: element_type, isclick:true}});

        //clickcMkarker state변경처리를 하고 나서, 서버에 비동기 요청을 한다.해당 요청한는것은 어떤 전문중개사,어떤매물,어떤 단지에 대해서 리스트구하는건지(한개)
        let body_info = {
          lat:item.Ma,
          lng:item.La,
          click_type: element_type
        }
        var res_results= await serverController.connectFetchController('/api/matterial/clickMarker_match_infoget','POST',JSON.stringify(body_info));
    
        if(res_results){
          console.log('=====>>>clickmarker match infogetss::',res_results);

          if(res_results.result){
            MapProductEls.updateClickMarker_matchdata({clickmarker_matchdata : res_results.result});
          }
        }
      });
     markers.push( markerEl );
    })
    //// console.log('===>>>markesrs::',markers);
    
    var clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap, 
      averageCenter: true, 
      minLevel: cluLevel,
      disableClickZoom: true,
      calculator: [1, 50, 100],
      styles:[
        {
          width : '50px', height : '50px',
          backgroundImage:  `url(${clustererImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '50px'
        },
        {
          width : '60px', height : '60px',
          backgroundImage:  `url(${clustererImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '60px'
        },
        {
          width : '94px', height : '94px',
          backgroundImage:  `url(${clustererImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '94px'
        }
      ]
    });
    
    clusterer.addMarkers(markers);
    // console.log('==>>>make clusterer::',clusterer);

    kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
      console.log('클릭클러스터:',cluster,cluster._center.toLatLng());
      setCenterClusterer({
        lat:cluster._center.toLatLng().Ma,
        lng:cluster._center.toLatLng().La
      })
    });
    setClusterer(clusterer);
  }

  // 단지별 실거래 마커/클러스터러 함수
  const addMarkClustBlock = (array, setClusterer, markerImg, clustererImg, cluLevel) => {

    initBlockCluster();
    // console.log('======>>addMakrclusterblock함수실행:',array,setClusterer);
    /*if(array.length == 0){return;}*/
    let markers = [];
    // **api 서버에서 받아온 정보들을 토대로 분기처리
    // 날짜별로 투명도 조절
    array.map(item => {
        var content =`<div style="opacity:0.4;" class="markerWrap"> 21.11.09 <br /> 매매</div>`;
        var customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(item.Ma, item.La),
          content: content,
        });
        console.log('==customoverlay핸들러 등록::');
        kakao.maps.event.addListener(customOverlay,'click',async function(){
          console.log('customOverlay크릭:',customOverlay,item.Ma,item.La);
          setClickMarker({
            lat : item.Ma,
            lng: item.La,
            click_type : 'block'
          });

          MapProductEls.updateClickMarker({clickmarker : {lat:item.Ma, lng:item.La, click_type: 'block', isclick: true}});

          //clickcMkarker state변경처리를 하고 나서, 서버에 비동기 요청을 한다.해당 요청한는것은 어떤 전문중개사,어떤매물,어떤 단지에 대해서 리스트구하는건지(한개)
          let body_info = {
            lat:item.Ma,
            lng:item.La,
            click_type: 'block'
          }
          var res_results= await serverController.connectFetchController('/api/matterial/clickMarker_match_infoget','POST',JSON.stringify(body_info));
      
          if(res_results){
            console.log('=====>>>clickmarker match infogetss::',res_results);
          }
        });
      markers.push(customOverlay);
      customOverlay.setMap(kakaoMap);
    });

    var clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap, 
      averageCenter: true, 
      minLevel: cluLevel,
      disableClickZoom: true,
      calculator: [20, 50, 100],
      styles:[
        {
          width : '50px', height : '50px',
          backgroundImage:  `url(${clustererImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '50px'
        },
        {
          width : '60px', height : '60px',
          backgroundImage:  `url(${clustererImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '60px'
        },
        {
          width : '94px', height : '94px',
          backgroundImage:  `url(${clustererImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '94px'
        }
      ]
    });
    clusterer.addMarkers(markers);
    kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
       console.log('->>>block_clustser요소 클릭::',cluster,cluster._center.toLatLng());
      setCenterClusterer({
        lat:cluster._center.toLatLng().Ma,
        lng:cluster._center.toLatLng().La
      })
    });
    setClusterer(clusterer);
  }

  // 지도유형
  useEffect(() => {
    if(!kakaoMap){
      return;
    }
    
    kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
    kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
    roadViewRef.current.style.display = 'none';
    rvWrapperRef.current.style.pointerEvents = 'none';
    if(mapRightRedux.mapStyle == "roadView"){
      var rv = new kakao.maps.Roadview(roadViewRef.current); //로드뷰 객체
      var rvClient = new kakao.maps.RoadviewClient();

      var markImage = new kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
        new kakao.maps.Size(26, 46),
        {
            spriteSize: new kakao.maps.Size(1666, 168),
            spriteOrigin: new kakao.maps.Point(705, 114),
            offset: new kakao.maps.Point(13, 46)
        }
      );

      let markers = [];
      var rvMarker = new kakao.maps.Marker({
        image : markImage,
        draggable: true,
        map: kakaoMap,
        position: new kakao.maps.LatLng(37.511138, 126.997544)
      });
      
      markers.push(rvMarker);
      var clusterer = new kakao.maps.MarkerClusterer({
        map: kakaoMap,
        averageCenter: true, 
        minLevel: 1,
        disableClickZoom: true,
      });
      clusterer.addMarkers(markers);
      setRoadClusterer(clusterer);
      // console.log('===>>roadview 지도유형 선택하여 실행 함수 구문 rvmarkers설정 및 markers정보:',markers,clusterer);

      var clickHandler = function(mouseEvent) {    
        var position = mouseEvent.latLng; 
        // console.log('로드뷰 지도유형상태값 상태에서 카카오맵 임의지점 클릭핸들러:',position);
        rvMarker.setPosition(position);
        toggleRoadview(position);
      }; 

      function toggleRoadview(position){
        // console.log('=====>>toggleRoadview함수실행>>:',position);
        rvClient.getNearestPanoId(position, 50, function(panoId) {
          // console.log('rvCLIENT 클릭지점 근처의 파노라마id값 관련 콜백함수실행>>:',panoId);
            if (panoId === null) {
              roadViewRef.current.style.display = 'none';
              rvWrapperRef.current.style.pointerEvents  = 'none';
              kakaoMap.relayout();
            } else {
              kakaoMap.relayout();
              roadViewRef.current.style.display = 'block'; 
              rvWrapperRef.current.style.pointerEvents  = 'auto';
              rv.setPanoId(panoId, position);
              rv.relayout();
            }
        });
      }
    }

    switch (mapRightRedux.mapStyle){
      case "roadmap":
        kakaoMap.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
        break;
      case "district":
        kakaoMap.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
        break;
      case "hybrid":
        kakaoMap.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
        break;
      case "roadView":
        kakao.maps.event.addListener(kakaoMap, 'click', clickHandler);
        const noRv = document.querySelector(".noRv");
        noRv.addEventListener("click", () => {
          kakao.maps.event.removeListener(kakaoMap, 'click', clickHandler);
          setRoadClusterer(clusterer=>{clusterer.clear(); return clusterer;})
        })
        kakaoMap.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
        break;
      default:
        kakaoMap.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
        break;
    }
  }, [mapRightRedux.mapStyle, kakaoMap])

  
  // 클러스터러 클릭
  // **api 선택한 클러스터러의 좌표를 서버에 보내고 해당 목록 데이터를 받아와야합니다.
  // 목록 데이터는 mapProductEl 저장하여 화면에 띄어야 합니다. 
  useEffect(() => {
    // // console.log(centerClusterer);
  }, [centerClusterer])

  // 마커 클릭
  // **api 선택한 마커의 좌표 혹은 아이디를 서버에 보내고 해당 데이터를 받아와야합니다.
  useEffect(() => {
    // // console.log(clickMarker);
  }, [clickMarker])

  // 줌인
  useEffect(() => {
    if(mapRightRedux.isZoomIn == 0){
      return;
    }
    kakaoMap.setLevel(kakaoMap.getLevel() - 1);
  }, [mapRightRedux.isZoomIn]);

  // 줌아웃
  useEffect(() => {
    if(mapRightRedux.isZoomOut == 0){
      return;
    }
    kakaoMap.setLevel(kakaoMap.getLevel() + 1);
  }, [mapRightRedux.isZoomOut]);

  // 주변
  useEffect(() => {
    // console.log('===>>>mapRightRedux.around 변화에따른 감지::',mapRightRedux.around);
    if(!kakaoMap ||  mapRightRedux.around.is == ""){
      return;
    }

    const searchPlace = () => {
      // console.log('===>>searchPlace함수실행 주변검색 주변의 시설검색::');
      setAroundClusterer(clusterer=>{if(!clusterer){return;} clusterer.clear(); return clusterer;});
      places.categorySearch(mapRightRedux.around.is, callback, {
        location: new kakao.maps.LatLng(kakaoMap.getCenter().Ma, kakaoMap.getCenter().La)
      });
    }

    const aroundBuild = document.querySelector("#aroundBuild");
    kakao.maps.event.addListener(kakaoMap, 'idle', searchPlace);
    aroundBuild.addEventListener("click", () => {
      kakao.maps.event.removeListener(kakaoMap, 'idle', searchPlace);
      setAroundArr([]);
    })

    var places = new kakao.maps.services.Places(kakaoMap);
    // console.log('places::',places);

    var callback = function(data, status, pagination) {
      // console.log('==>>searhcplace> categorySDearch callbackfucntion call',data);
      if (status === kakao.maps.services.Status.OK) {
        let newArr = [];
        data.map(item => {
          newArr.push(new kakao.maps.LatLng(item.y, item.x));
        })
        setAroundArr(newArr);
      }
    };

    searchPlace()
  }, [mapRightRedux.around, kakaoMap])

  // 주변 업데이트
  useEffect(() => {
    //// console.log('===>>>arouindArr,맵변경,idle,around>>>');
    if(!kakaoMap){return;}

    switch (mapRightRedux.around.is){
      case "PS3":
        addMarkClust(aroundArr, setAroundClusterer, childMarker, "", 99)
        break;
      case "SC4":
        addMarkClust(aroundArr, setAroundClusterer, schoolMarker, "", 99)
        break;
      case "SW8":
        addMarkClust(aroundArr, setAroundClusterer, subwayMarker, "", 99)
        break;
      case "BK9":
        addMarkClust(aroundArr, setAroundClusterer, bankMarker, "", 99)
        break;
      case "PO3":
        addMarkClust(aroundArr, setAroundClusterer, officeMarker, "", 99)
        break;
      default:
        setAroundClusterer(clusterer=>{if(!clusterer){return;} clusterer.clear(); return clusterer;});
        break;
    }
  }, [mapRightRedux.around, aroundArr, kakaoMap])

  // 내위치
  useEffect(() => {
    if(!kakaoMap){return;}
    if(mapRightRedux.isCurrnet.is){
      function displayMarker(locPosition) {
        let markers = [];
        var marker = new kakao.maps.Marker({  
            map: kakaoMap, 
            position: locPosition
        });
        markers.push(marker);

        var clusterer = new kakao.maps.MarkerClusterer({
          map: kakaoMap,
          averageCenter: true, 
          minLevel: 1,
          disableClickZoom: true,
        });
        clusterer.addMarkers(markers);
        setCurrnetClusterer(clusterer);
        kakaoMap.setCenter(locPosition);      
      }
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon);
            displayMarker(locPosition);
          });
      }else{ 
        alert("navigator.geolocation 지원하지 않음")
      }
    }else{
      setCurrnetClusterer(clusterer=>{ if(!clusterer){return} clusterer.clear(); return clusterer;})
    }
  }, [mapRightRedux.isCurrnet, kakaoMap])

  // 거리재기
  useEffect(() => {
    // console.log('==>>mapright.istinace.is상태값변경 거리재기right요소 변경시마다 실행:거래재기상태값false이면 카카오맵핸들러click,mousemove미등록',moveLine);
    if(!kakaoMap || !mapRightRedux.isDistance.is){return}

    if(mapRightRedux.isDistance.is){
      kakao.maps.event.addListener(kakaoMap, 'click', clickMap );
      kakao.maps.event.addListener(kakaoMap, 'mousemove', moveMouse);  
      const distance = document.querySelector(".distance");
      distance.addEventListener("click", () => {
        kakao.maps.event.removeListener(kakaoMap, 'click', clickMap );
        kakao.maps.event.removeListener(kakaoMap, 'mousemove', moveMouse );
        if(moveLine){
          moveLine.setMap(null);
          moveLine = null;  
        }
        initLineDot();
      })
    }

    const distanceEnd = document.querySelector(".distanceEnd");
    distanceEnd.addEventListener("click", () => {
      // 지도 오른쪽 클릭 이벤트가 발생했는데 선을 그리고있는 상태이면
      // console.log('distanceEnd거리측정 버튼 클릭시에 실행 이벤트핸들러:',drawingFlag,moveLine);
      if (drawingFlag && moveLine) {
        // 마우스무브로 그려진 선은 지도에서 제거합니다
        moveLine.setMap(null);
        moveLine = null;  
        // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
        var path = clickLine.getPath();
        // console.log('마지막클릭까지의 클릭좌표들값 불러오기:',path);

        // 선을 구성하는 좌표의 개수가 2개 이상이면
        if (path.length > 1) {

          // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
          if (dots[dots.length-1].distance) {
            dots[dots.length-1].distance.setMap(null);
            dots[dots.length-1].distance = null;    
          }

          var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
              content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다
              
          // 그려진 선의 거리정보를 지도에 표시합니다
          showDistance(content, path[path.length-1]);
        }else {
          initLineDot();
        }    
          // 상태를 false로, 그리지 않고 있는 상태로 변경합니다
          drawingFlag = false;          
       }    
    })

    // Click
    function clickMap(mouseEvent){
      // console.log("clickMap function call:");
      var clickPosition = mouseEvent.latLng;
      // 첫 클릭
      if (!drawingFlag) {
        drawingFlag = true;

        initLineDot();

        // 클린 라인 스타일링
        clickLine = new kakao.maps.Polyline({
            map: kakaoMap, 
            path: [clickPosition], 
            strokeWeight: 3, 
            strokeColor: '#db4040', 
            strokeOpacity: 1, 
            strokeStyle: 'solid' 
        });
        
        moveLine = new kakao.maps.Polyline({
            strokeWeight: 3, 
            strokeColor: '#db4040', 
            strokeOpacity: 0.5, 
            strokeStyle: 'solid' 
        });
        displayCircleDot(clickPosition, 0);
      } else {  // 첫 클릭 X
        var path = clickLine.getPath();  // clickLine의 좌표배열을 가져온다.
        // console.log('첫클릭clikcmamp아님 클릭한 좌표배열 가져오기:',path);
        path.push(clickPosition); // 클릭 좌표를 넣는다.
        clickLine.setPath(path); // 패스를 설정한다.
        var distance = Math.round(clickLine.getLength()); // 거리 계산
        displayCircleDot(clickPosition, distance); // 점, 거리 스타일링
      }
    }

    // Move
    function moveMouse(mouseEvent){
      
      if (drawingFlag){
        var mousePosition = mouseEvent.latLng; 
        // console.log('====>mousemove이벤트 발생>>>>',drawingFlag,clickLine,clickLine.getPath());
        // 마지막과 현재 좌표를 가져와 연결한다.
        var path = clickLine.getPath();
        var movepath = [path[path.length-1], mousePosition];  
        moveLine.setPath(movepath);    
        moveLine.setMap(kakaoMap);
        
        var distance = Math.round(clickLine.getLength() + moveLine.getLength()), // 선의 총 거리를 계산합니다
            content = '<div class="dotOverlay distanceInfo">총거리 <span class="number">' + distance + '</span>m</div>'; // 커스텀오버레이에 추가될 내용입니다
        showDistance(content, mousePosition);   
      }    
    }

    // Init
    function initLineDot(){
      // console.log('initilinedot실행 초기함수:',clickLine,distanceOverlay,dots);
      if (clickLine) {
        clickLine.setMap(null);    
        clickLine = null;        
      }

      if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
      }

      var i;
      for ( i = 0; i < dots.length; i++ ){
        if (dots[i].circle) { 
          dots[i].circle.setMap(null);
        }

        if (dots[i].distance) {
          dots[i].distance.setMap(null);
        }
      }

      dots = [];
    } 

    // Measure Distance Time
    function getTimeHTML(distance) {
      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      var walkkTime = distance / 67 | 0;
      var walkHour = '', walkMin = '';
  
      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
          walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
      }
      walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'
  
      // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
      var bycicleTime = distance / 227 | 0;
      var bycicleHour = '', bycicleMin = '';
  
      // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
      if (bycicleTime > 60) {
          bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
      }
      bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'
  
      // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
      var content = '<ul class="dotOverlay distanceInfo">';
      content += '    <li>';
      content += '        <span class="label">총거리</span><span class="number">' + distance + '</span>m';
      content += '    </li>';
      content += '    <li>';
      content += '        <span class="label">도보</span>' + walkHour + walkMin;
      content += '    </li>';
      content += '    <li>';
      content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
      content += '    </li>';
      content += '</ul>'
      return content;
    }

    // Dot Custom Overay
    function displayCircleDot(position, distance) {
      // console.log('=>>>displayCircleodot function calls: mouseClickmap에 의해 촉발',position,distance);
      var circleOverlay = new kakao.maps.CustomOverlay({
          content: `<div class="dot"></div>`,
          position: position,
          zIndex: 4
      });
      circleOverlay.setMap(kakaoMap);

      if (distance > 0) {
        // 클릭한 지점까지의 거리 계산 
        var distanceOverlay = new kakao.maps.CustomOverlay({
            content: '<div class="dotOverlay">거리 <span class="number">' + distance + '</span>m</div>',
            position: position,
            yAnchor: 1,
            zIndex: 2
        });
        // 지도에 표시합니다
        distanceOverlay.setMap(kakaoMap);
      }

      // 배열에 추가합니다
      dots.push({circle:circleOverlay, distance: distanceOverlay});
      // console.log('update된 점좌표들 dots::',dots);
    }

    // Move Custom Overay
    function showDistance(content, position) {
      // console.log('=-==>>mousemove function에 or 마지막거리측정(end)클릭에 의해 촉발된 showdistance:',content,position);
      if (distanceOverlay) { // 커스텀오버레이가 생성된 상태이면
        // console.log('distanceoverlay prev 생성상태:',distanceOverlay)
        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
      } else { // 커스텀 오버레이가 생성되지 않은 상태이면
        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        // console.log('distanceoverlay prev 미생성 없는 상태:',distanceOverlay);
        distanceOverlay = new kakao.maps.CustomOverlay({
          map: kakaoMap, // 커스텀오버레이를 표시할 지도입니다
          content: content,  // 커스텀오버레이에 표시할 내용입니다
          position: position, // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3  
        });      
      }
    }

  }, [mapRightRedux.isDistance, kakaoMap])

  return (
    <>
      <KakaoMapContainer id="container" ref={container} />
      <RvWrapper ref={rvWrapperRef} className="rvWrapper">
        <RoadViewDiv ref={roadViewRef} className="roadview"></RoadViewDiv>
      </RvWrapper>
    </>
  )
}

const KakaoMapContainer = styled.div`
  position:absolute;
  width:100%;
  height:100vh;
  z-index:0;
`

const RvWrapper = styled.div`
  position:absolute;
  bottom:150px;
  left:22px;
  width:650px;
  height:350px;
  z-index:0;
`

const RoadViewDiv = styled.div`
  width:100%;
  height:100%;
`
