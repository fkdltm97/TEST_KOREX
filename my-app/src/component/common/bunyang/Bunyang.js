//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//style
import styled from "styled-components"

//component
import BunyangList from "./BunyangList";
import BunyangDetail from "./BunyangDetail";

//img
import CalIcon from "../../../img/main/icon_cal.png";
import CloseIcon from "../../../img/main/modal_close.png";
import IconSearch from "../../../img/main/icon_search.png";
import IconRecent from "../../../img/main/icon_view.png";
import ItemImg from "../../../img/main/item01.png";

import { Mobile, PC } from "../../../MediaQuery"
export default function Bunyang({bunyang, openBunyang ,live, setLive, detailimg, setDetailImg,cal, setCal, setImgArr, imgArr}) {

  //모달창 내 페이지 이동
  const [pageIndex , setPageIndex] = useState(0);

  const [BunyangDate, setBunyangDate] = useState([])
  // 클락한 리스트의 아이디
  const [clickId, setClickId] = useState(0);

  const pageLoader = () =>{
    switch (pageIndex) {
      case 0: return <BunyangList updatePageIndex={updatePageIndex} setBunyangDate={setBunyangDate} BunyangDate={BunyangDate} setClickId={setClickId}/>;
      case 1: return <BunyangDetail updatePageIndex={updatePageIndex} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal} setBunyangDate={setBunyangDate} BunyangDate={BunyangDate} clickId={clickId} setImgArr={setImgArr} imgArr={imgArr}/>;
      default :return <BunyangList updatePageIndex={updatePageIndex}setBunyangDate={setBunyangDate}BunyangDate={BunyangDate}/>;
    }
  }

  const updatePageIndex = (index) =>{
    if(pageIndex + index < 0)
      setPageIndex(0);
    else if(pageIndex + index > 1)
      setPageIndex(1);
    else
      setPageIndex(index);
  }

//모달창
  if(bunyang == false)
    return null;
    return (
      <Container>
        <PC>
          <ModalBg onClick={()=>{setPageIndex(0);openBunyang(false)}}></ModalBg>
          <ModalContent>
            <ModalClose>
              <Link onClick={()=>{setPageIndex(0);openBunyang(false)}}>
                <CloseImg src={CloseIcon}/>
              </Link>
            </ModalClose>
            {
              pageLoader()
            }
          </ModalContent>

        </PC>
        <Mobile>
          <ModalBg onClick={()=>{openBunyang(false)}}></ModalBg>
          <ModalContent>
            <ModalClose>
              <Link onClick={()=>{setPageIndex(0);openBunyang(false)}}>
                <CloseImg src={CloseIcon}/>
              </Link>
            </ModalClose>
            {
              pageLoader()
            }
          </ModalContent>
        </Mobile>
      </Container>
    );
}

const Container = styled.div`
  width:100%;
  @media ${(props) => props.theme.mobile} {
    display:none;
  }
`

const ModalBg = styled.div`
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 999;
  background:rgba(0,0,0,0.05);

`
const ModalContent = styled.div`
  position:fixed;
  width:1146px;
  height:752px;
  background:#fff;box-shadow: 0 0 10px 1px rgb(0 0 0 / 10%);
  left:50%;top:50%;transform:translate(-50%,-50%);
  border-radius:24px;
  padding: 47px 46.7px 65.8px 95.8px;
  overflow-y:scroll;
  z-index:1000;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {display: none;}

  @media ${(props) => props.theme.container} {
      width:90%;
      height:calc(100vw*(800/1436));
      overflow:hidden;
    }

`
const ModalClose = styled.div`
  position:absolute;
  right:47px;top:47px;
  z-index:2;

`
const CloseImg = styled.img`
  width:17px;
  height:18px;
`
