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
import blockClusterer from "../../../img/map/blockClusterer.png";


// redex
import { MapRight } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

import style from './kakaoMap.css';

export default function KakaoMap({}) {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setExcClusterer] = useState();
  const [, setProClusterer] = useState();
  const [, setBlockClusterer] = useState();
  const [, setAroundClusterer] = useState();
  const [, setRoadClusterer] = useState();
  const [, setCurrnetClusterer] = useState();
  const container = useRef();
  const pivot = {lat:37.499590490909185, lng:127.0263723554437}
  const [centerClusterer, setCenterClusterer] = useState({lat:"", lng:""})

  const mapRightRedux = useSelector(state=>{ return state.mapRight});

  const [exclusiveArr, setExclusiveArr] = useState([]);
  const [probrokerArr, setProbrokerArr] = useState([]);
  const [blockArr, setBlockArr] = useState([]);
  const [aroundArr, setAroundArr] = useState([]);

  // 거리재기
  var drawingFlag = false;
  var clickLine;
  var moveLine;
  var distanceOverlay;
  var dots = [];

  // Array Init
  useEffect(() => {
    setExclusiveArr(
      [ 
        new kakao.maps.LatLng(37.499590, 127.026374),
        new kakao.maps.LatLng(37.499427, 127.027947),
        new kakao.maps.LatLng(37.498553, 127.028824),
        new kakao.maps.LatLng(37.497625, 127.029358),
        new kakao.maps.LatLng(37.496463, 127.026755),
        new kakao.maps.LatLng(37.496292, 127.025873),
        new kakao.maps.LatLng(37.497545, 127.025466),             
        new kakao.maps.LatLng(37.494424, 127.012703)                
      ]
    );

    setProbrokerArr([
      new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
      new kakao.maps.LatLng(37.49671536281186, 127.03020491448352),
      new kakao.maps.LatLng(37.496201943633714, 127.02959405469642),
      new kakao.maps.LatLng(37.49640072567703, 127.02726459882308),
      new kakao.maps.LatLng(37.49640098874988, 127.02609983175294),
      new kakao.maps.LatLng(37.49932849491523, 127.02935780247945),
      new kakao.maps.LatLng(37.49996818951873, 127.02943721562295)
    ])

    setBlockArr([
      new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
      new kakao.maps.LatLng(37.499463762912974, 127.0288828824399),
      new kakao.maps.LatLng(37.49896834100913, 127.02833986892401),
      new kakao.maps.LatLng(37.49893267508434, 127.02673400572665),
      new kakao.maps.LatLng(37.49872543597439, 127.02676785815386),
      new kakao.maps.LatLng(37.49813096097184, 127.02591949495914),
      new kakao.maps.LatLng(37.497680616783086, 127.02518427952202)
    ])
  }, [])

  // Map
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=92591c6a8ce52c67baa6a273c98f4f88&libraries=services,clusterer,drawing&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(pivot.lat, pivot.lng);
        const options = {
          center,
          level: 3
        };
        const map = new kakao.maps.Map(container.current, options);
        setKakaoMap(map);
      });
    };
  }, [container]);

  // Exclusive toggle
  useEffect(() => {
    mapRightRedux.isExclusive.is?addMarkClust(exclusiveArr, setExcClusterer, exclusiveMarker, excClusterer):setExcClusterer(clusterer=>{if(!clusterer){return}; clusterer.clear(); return clusterer;});
  }, [mapRightRedux.isExclusive.is, kakaoMap])

  // Probroker toggle
  useEffect(() => {
    mapRightRedux.isProbroker.is
    ?
    addMarkClust(probrokerArr, setProClusterer, probrokerMarker, proClusterer)
    :
    setProClusterer(clusterer=>{
      if(!clusterer){return;}
      clusterer.clear();
      return clusterer;
    });
  }, [mapRightRedux.isProbroker.is, kakaoMap])

  // Block toggle
  useEffect(() => {
    mapRightRedux.isBlock.is
    ?
    addMarkClust(blockArr, setBlockClusterer, blockMarker, blockClusterer)
    :
    setBlockClusterer(clusterer=>{
      if(!clusterer){return;}
      clusterer.clear();
      return clusterer;
    });
  }, [mapRightRedux.isBlock.is, kakaoMap])

  // Marker, Clusterer Init
  const addMarkClust = (array, setClusterer, markerImg, clustererImg) => {
    if(array.length == 0){
      return;
    }
    var imageSize = new kakao.maps.Size(40, 40),
        imageOption = {offset: new kakao.maps.Point(4, 4)};
    var markerImage = new kakao.maps.MarkerImage(markerImg, imageSize, imageOption);
    let markers = [];
    array.map(item => {
      markers.push(
        new kakao.maps.Marker({
          map: kakaoMap, 
          position: new kakao.maps.LatLng(item.Ma, item.La),
          image: markerImage,
          opacity:1
        })
      );
    })

    var clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap, 
      averageCenter: true, 
      minLevel: clustererImg ? 1 : 100,
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
      setCenterClusterer({
        lat:cluster._center.toLatLng().Ma,
        lng:cluster._center.toLatLng().La
      })
    });
    setClusterer(clusterer);
  }

  // Map Style
  useEffect(() => {
    if(!kakaoMap){
      return;
    }
    var rvContainer = document.querySelector('.roadview');
    var rvWrapper = document.querySelector(".rvWrapper");
    
    kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
    kakaoMap.removeOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
    rvContainer.style.display = 'none';
    rvWrapper.style.pointerEvents  = 'none';

    if(mapRightRedux.mapStyle == "roadView"){
      var rvContainer = document.querySelector('.roadview'); //로드뷰를 표시할 div
      var rv = new kakao.maps.Roadview(rvContainer); //로드뷰 객체
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

      var clickHandler = function(mouseEvent) {    
        var position = mouseEvent.latLng; 
        rvMarker.setPosition(position);
        toggleRoadview(position);
      }; 

      function toggleRoadview(position){
        rvClient.getNearestPanoId(position, 50, function(panoId) {
            if (panoId === null) {
                rvContainer.style.display = 'none';
                rvWrapper.style.pointerEvents  = 'none';
                kakaoMap.relayout();
            } else {
                kakaoMap.relayout();
                rvContainer.style.display = 'block'; 
                rvWrapper.style.pointerEvents  = 'auto';
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

  // Clusterer center
  useEffect(() => {
    // console.log(centerClusterer);
    // 중심좌표 -> 서버 -> 데이터 받아오기
  }, [centerClusterer])

  // Zoom In
  useEffect(() => {
    if(mapRightRedux.isZoomIn == 0){
      return;
    }
    kakaoMap.setLevel(kakaoMap.getLevel() - 1);
  }, [mapRightRedux.isZoomIn]);

  // Zoom Out
  useEffect(() => {
    if(mapRightRedux.isZoomOut == 0){
      return;
    }
    kakaoMap.setLevel(kakaoMap.getLevel() + 1);
  }, [mapRightRedux.isZoomOut]);

  // Around
  useEffect(() => {
    if(!kakaoMap ||  mapRightRedux.around.is == ""){
      return;
    }

    const searchPlace = () => {
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

    var callback = function(data, status, pagination) {
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

  // Around Update
  useEffect(() => {
    if(!kakaoMap){return;}

    switch (mapRightRedux.around.is){
      case "PS3":
        addMarkClust(aroundArr, setAroundClusterer, childMarker)
        break;
      case "SC4":
        addMarkClust(aroundArr, setAroundClusterer, schoolMarker)
        break;
      case "SW8":
        addMarkClust(aroundArr, setAroundClusterer, subwayMarker)
        break;
      case "BK9":
        addMarkClust(aroundArr, setAroundClusterer, bankMarker)
        break;
      case "PO3":
        addMarkClust(aroundArr, setAroundClusterer, officeMarker)
        break;
      default:
        setAroundClusterer(clusterer=>{if(!clusterer){return;} clusterer.clear(); return clusterer;});
        break;
    }
  }, [mapRightRedux.around, aroundArr, kakaoMap])

  // Current Location
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

  // Measure Distance
  useEffect(() => {
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
      if (drawingFlag && moveLine) {
        // 마우스무브로 그려진 선은 지도에서 제거합니다
        moveLine.setMap(null);
        moveLine = null;  
        // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
        var path = clickLine.getPath();
    
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
      console.log("click")
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

    }

    // Move Custom Overay
    function showDistance(content, position) {
      if (distanceOverlay) { // 커스텀오버레이가 생성된 상태이면
        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
      } else { // 커스텀 오버레이가 생성되지 않은 상태이면
        // 커스텀 오버레이를 생성하고 지도에 표시합니다
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
      <RvWrapper className="rvWrapper">
        <RoadViewDiv className="roadview"></RoadViewDiv>
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
