/* global kakao */

import React, { useEffect, useState, useRef } from "react";

import styled from "styled-components"

import exclusiveMarker from "../../../img/map/exclusiveMarker.png";
import probrokerMarker from "../../../img/map/probrokerMarker.png";
import blockMarker from "../../../img/map/blockMarker.png";

import excClusterer from "../../../img/map/excClusterer.png";
import proClusterer from "../../../img/map/proClusterer.png";
import blockClusterer from "../../../img/map/blockClusterer.png";


// redex
import { MapRight } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

export default function KakaoMap({}) {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setExcClusterer] = useState();
  const [, setProClusterer] = useState();
  const [, setBlockClusterer] = useState();
  const [, setRoadClusterer] = useState();
  const container = useRef();
  const pivot = {lat:37.499590490909185, lng:127.0263723554437}
  const [centerClusterer, setCenterClusterer] = useState({lat:"", lng:""})

  const mapRightRedux = useSelector(state=>{ return state.mapRight});

  const [exclusiveArr, setExclusiveArr] = useState([]);
  const [probrokerArr, setProbrokerArr] = useState([]);
  const [blockArr, setBlockArr] = useState([]);

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
    mapRightRedux.isExclusive.is?addMarkClust(exclusiveArr, setExcClusterer, exclusiveMarker, excClusterer):setExcClusterer(clusterer=>{clusterer.clear(); return clusterer;});
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
          image: markerImage 
        })
      );
    })

    var clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap, 
      averageCenter: true, 
      minLevel: 1,
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

  // Around Btn
  useEffect(() => {
    if(!kakaoMap){
      return;
    }

    switch (mapRightRedux.around){
      case "subway":
        console.log("subway");
        break;
      case "child":
        console.log("child");
        break;
      case "school":
        console.log("school");
        break;
      case "bank":
        console.log("bank");
        break;
      case "office":
        console.log("office");
        break;
      default:
        break;
    }
  }, [mapRightRedux.around, kakaoMap])

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


  // ** 월요일 주변 검색 찾기
  useEffect(() => {
    if(!kakaoMap){
      return;
    }

    
    kakao.maps.event.addListener(kakaoMap, 'idle', function() {
      places.categorySearch('FD6', callback, {
        location: new kakao.maps.LatLng(kakaoMap.getCenter().Ma, kakaoMap.getCenter().La)
      });
    });

    var places = new kakao.maps.services.Places(kakaoMap);
  
    var callback = function(status, result, pagination) {
      console.log(status[0]);
      if (status === kakao.maps.services.Status.OK) {

      }
    };
  }, [kakaoMap])


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
