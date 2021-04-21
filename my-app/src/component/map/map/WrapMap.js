//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';

// components
import { Mobile, PC } from "../../../MediaQuery";
import MapRightMenu from "./MapRightMenu";
import WrapMapFilter from "./WrapMapFilter";

const { kakao } = window;

export default function MainHeader({openHouse, rank, open, setOpen}) {

  const [latitudeInit, setLatitudeInit] = useState(37.494650); // 위도
  const [longitudeInit, setLongitudeInit] = useState(127.027859); // 경도
  const [mapGlobal, setMapGlobal] = useState();
  const [clustererGlobal, setClustererGlobal] = useState();
  


  useEffect(() => {
    // 지도 생성
    let _latitude = latitudeInit;
    let _longitude = longitudeInit;
    const mapEl =  document.getElementById('map'); 
    var options = {
      center: new kakao.maps.LatLng(_latitude, _longitude),
      level: 5,
      minLevel: 5,
    };
    let map = new kakao.maps.Map(mapEl, options);      

    // 클러스터러 생성
    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 3, // 클러스터 할 최소 지도 레벨 
      disableClickZoom: true
    });

    // 마커 생성 positions -> 서버에서 받아온 좌표값 데이터 
    var positions = [
      {
        latlng: new kakao.maps.LatLng(37.494650, 127.027859)
      },
      {
        title: '강남', 
        latlng: new kakao.maps.LatLng(37.494611, 127.027166)
      },
      {
        title: '신논현', 
        latlng: new kakao.maps.LatLng(37.500296, 127.022793)
      },
      {
        title: '신논현', 
        latlng: new kakao.maps.LatLng(37.501123, 127.025252)
      },
    ];
    let markers = []
    positions.map(item => {
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: item.latlng, // 마커를 표시할 위치
        title : item.title,
      });
      markers.push(marker);
    })
    clusterer.addMarkers(markers);

    setMapGlobal(map);
    setClustererGlobal(clusterer);
    // 클러스터러 클릭 이벤트 생성
    kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
      // 중심 좌표
      // console.log(cluster._center.toLatLng().toString());
      console.log(123123);
      var level = map.getLevel()-1; 
      map.setLevel(level, {anchor: cluster.getCenter()});
    });

  }, [])
  

  // const onClickTest = () => {
  //   console.log("click");   const mapEl =  document.getElementById('map'); 
  //   console.log(mapEl);


  //    // 클러스터러 생성
  //    var clusterer = new kakao.maps.MarkerClusterer({
  //     map: mapGlobal, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
  //     averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
  //     minLevel: 4, // 클러스터 할 최소 지도 레벨 
  //     disableClickZoom: true
  //   });

  //   // 마커 생성 positions -> 서버에서 받아온 좌표값 데이터 
  //   var positions = [
  //     {
  //       latlng: new kakao.maps.LatLng(32.494650, 127.027859)
  //     },
  //     {
  //       title: '강남', 
  //       latlng: new kakao.maps.LatLng(32.494611, 127.027166)
  //     },
  //     {
  //       title: '신논현', 
  //       latlng: new kakao.maps.LatLng(32.500296, 127.022793)
  //     },
  //     {
  //       title: '신논현', 
  //       latlng: new kakao.maps.LatLng(32.501123, 127.025252)
  //     },
  //   ];
  //   let markers = []
  //   positions.map(item => {
  //     let marker = new kakao.maps.Marker({
  //       map: mapGlobal, // 마커를 표시할 지도
  //       position: item.latlng, // 마커를 표시할 위치
  //       title : item.title,
  //     });
  //     markers.push(marker);
  //   })
  //   clusterer.addMarkers(markers);
  //   // 클러스터러 클릭 이벤트 생성

  //   console.log(kakao.maps);

  //   kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
  //     // 중심 좌표
  //     // console.log(cluster._center.toLatLng().toString());
  //     var level = mapGlobal.getLevel()-1; 
  //     mapGlobal.setLevel(level, {anchor: cluster.getCenter()});
  //   });


  // }

  return (
      <Container>
        {/* <div onClick={() => {onClickTest() }}>test</div> */}
        <KakaoMap id="map" />
        <MapRightMenu/>
        <WrapMapFilter setOpen={setOpen}/>
      </Container>
  );

}

const Container = styled.div`
  position:relative;
  width:100%;
  height:100vh;
`

const KakaoMap = styled.div`
  position:absolute;
  width:100%;
  height:100vh;
  z-index:0;
`
