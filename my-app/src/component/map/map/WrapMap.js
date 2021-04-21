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
import KakaoMap from './KakaoMap';


const { kakao } = window;

export default function WrapMap({openHouse, rank, open, setOpen}) {

  const [visible, setVisible] = useState(true);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [mapSize, setMapSize] = useState([400, 400]);

  const markerPositions1 = [
    [33.452278, 126.567803],
    [33.452671, 126.574792],
    [33.451744, 126.572441]
  ];
  const markerPositions2 = [
    [37.499590490909185, 127.0263723554437],
    [37.499427948430814, 127.02794423197847],
    [37.498553760499505, 127.02882598822454],
    [37.497625593121384, 127.02935713582038],
    [37.49629291770947, 127.02587362608637],
    [37.49754540521486, 127.02546694890695],
    [37.49646391248451, 127.02675574250912]
  ];




  

  return (
      <Container> 
         <section>
        <button onClick={() => setVisible(!visible)}>
          Toggle(Mount/Unmount)
        </button>
      </section>
      <section>
        <button onClick={() => setMapSize([0, 0])}>Hide</button>
        <button onClick={() => setMapSize([200, 200])}>Resize (200x200)</button>
        <button onClick={() => setMapSize([400, 400])}>Resize (400x400)</button>
      </section>
      <section>
        <button onClick={() => setMarkerPositions(markerPositions1)}>
          Marker Set 1
        </button>
        <button onClick={() => setMarkerPositions(markerPositions2)}>
          Marker Set 2
        </button>
        <button onClick={() => setMarkerPositions([])}>
          Marker Set 3 (empty)
        </button>
      </section>
        {/* <div onClick={() => {onClickTest() }}>test</div> */}
        <MapRightMenu/>
        <KakaoMap markerPositions={markerPositions} size={mapSize} />
      </Container>
  );

}

const Container = styled.div`
  position:relative;
  width:100%;
  height:100vh;
`

