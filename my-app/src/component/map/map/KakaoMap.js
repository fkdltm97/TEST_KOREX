/* global kakao */

import React, { useEffect, useState, useRef } from "react";

import styled from "styled-components"

export default function KakaoMap() {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setClusterer] = useState([]);
  const container = useRef();
  const pivot = {lat:37.1234, lng:127.1234}

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
          //setMapCenter(center);
          setKakaoMap(map);
  
          var clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel: 2, // 클러스터 할 최소 지도 레벨
            disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        });


    
        clusterer.addMarkers(getRandomMarker(40));
        setClusterer(clusterer);
      });
    };


  }, [container]);

  function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min).toString();
  }
  
  function getRandomMarker(n){
    
    let markers = [];
    for(var i =0;i<n;i++){
      var lat =  parseFloat(`37.12${getRandomArbitrary(100,1000)}`);
      var lng =  parseFloat(`127.12${getRandomArbitrary(100,1000)}`);
      
      markers.push(
        new kakao.maps.Marker({
          map: kakaoMap, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(lat, lng), // 마커를 표시할 위치
          title : "ttt",
        })
      );
    }
    return markers; 
  }

  function clickClear(){ setClusterer(clusterer=>{  clusterer.clear(); return clusterer;})}

  function clickAdd(){ setClusterer(clusterer=>{ 
      clusterer.addMarkers(getRandomMarker(1));  
      return clusterer;
    })
  }

  function updateMarker(){
    
    setClusterer(clusterer=>{
      clusterer.clear();
      clusterer.addMarkers(getRandomMarker(40));
      return clusterer;
    })
  }

  return (
    <>
    <button onClick={clickAdd}>add</button>
    <br></br>
    <button onClick={updateMarker}>update</button>
    <br></br>
    <button onClick={clickClear}>clear</button>
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