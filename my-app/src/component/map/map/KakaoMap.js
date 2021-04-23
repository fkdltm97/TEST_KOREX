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

export default function KakaoMap({exclusiveArr, probrokerArr, blockArr, isExclusive, isProbroker, isBlock}) {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setExcClusterer] = useState();
  const [, setProClusterer] = useState();
  const [, setBlockClusterer] = useState();
  const container = useRef();
  const pivot = {lat:37.499590490909185, lng:127.0263723554437}
  const [centerClusterer, setCenterClusterer] = useState({lat:"", lng:""})

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
    isExclusive?addExcMarker(exclusiveArr, setExcClusterer, exclusiveMarker, excClusterer):setExcClusterer(clusterer=>{clusterer.clear(); return clusterer;});
  }, [isExclusive, kakaoMap])

  // Probroker toggle
  useEffect(() => {
    isProbroker
    ?
    addExcMarker(probrokerArr, setProClusterer, probrokerMarker, proClusterer)
    :
    setProClusterer(clusterer=>{
      if(!clusterer){return;}
      clusterer.clear();
      return clusterer;
    });
  }, [isProbroker, kakaoMap])

    // Probroker toggle
    useEffect(() => {
      isBlock
      ?
      addExcMarker(blockArr, setBlockClusterer, blockMarker, blockClusterer)
      :
      setBlockClusterer(clusterer=>{
        if(!clusterer){return;}
        clusterer.clear();
        return clusterer;
      });
    }, [isBlock, kakaoMap])

  // Marker, Clusterer Init
  const addExcMarker = (array, setClusterer, markerImg, clustererImg) => {
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


  

  useEffect(() => {
    // console.log(centerClusterer);
    // 중심좌표 -> 서버 -> 데이터 받아오기
  }, [centerClusterer])
 
  return (
    <>
      <KakaoMapContainer id="container" ref={container} />
    </>
  )
}




const KakaoMapContainer = styled.div`
  position:absolute;
  width:100%;
  height:100vh;
  z-index:0;
`