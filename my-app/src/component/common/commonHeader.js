//react
import React ,{useState, useEffect} from 'react';

//components
import ImgDetail from './bunyang/ImgDetail';
import LiveModal from './bunyang/LiveModal';
import ModalCalendar from './bunyang/ModalCalendar';
import Bunyang from './bunyang/Bunyang';
import MainHeader from './MainHeader';


const CommonHeader = (props) => {
    
//이용약관
  const [termservice, setTermService] = useState(false);
  const openTermService = (onOff) =>{ setTermService(onOff);}

  //개인정보처리방침
  const [termprivacy, setTermPrivacy] = useState(false);
  const openTermPrivacy = (onOff) =>{ setTermPrivacy(onOff);}

  //위치기반서비스 이용약관
  const [termlocation, setTermLocation] = useState(false);
  const openTermLocation = (onOff) =>{ setTermLocation(onOff);}

  //분양 모달
  const [bunyang, setBunyang] = useState(false);
  const openBunyang = (onOff) =>{ setBunyang(onOff);}
  //라이브 시청 모달
  const [live, setLive] = useState(false);
  //분양 상세이미지 모달
  const [detailimg, setDetailImg] = useState(false);
  // 분양 이미지 배열입니다. 이 배열을 통하여 분양디테일이미지와 상세이미지를 보여줍니다.
  const [imgArr, setImgArr] = useState([])
  const [cal, setCal] = useState(false);


  console.log(bunyang);
    return(
        <>
          <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg} imgArr={imgArr}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal} setImgArr={setImgArr} imgArr={imgArr}/>
          <MainHeader openBunyang={openBunyang}/>
        </>
    )
};

export default CommonHeader;