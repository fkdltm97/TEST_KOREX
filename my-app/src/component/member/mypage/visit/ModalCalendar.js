//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Calendar from 'react-calendar';

//style
import styled from "styled-components";

//img
import CloseIcon from "../../../../img/main/modal_close.png";
import Check from "../../../../img/member/check.png";
import Checked from "../../../../img/member/checked.png";

//components
import ModalCalendarFirst from "./ModalCalendarFirst";
import ModalCalendarSecond from "./ModalCalendarSecond";
import ModalCalendarThird from "./ModalCalendarThird";

export default function ModalCal({vCal, setVCal}){
  const [value, onChange] = useState(new Date());
  const [pageIndex , setPageIndex] = useState(0);

  const pageLoader = () =>{
    switch (pageIndex) {
      case 0: return <ModalCalendarFirst updatePageIndex={updatePageIndex} vCal={vCal} setVCal={setVCal}/>;
      case 1: return <ModalCalendarSecond updatePageIndex={updatePageIndex} vCal={vCal} setVCal={setVCal}/>
      case 2: return <ModalCalendarThird updatePageIndex={updatePageIndex} vCal={vCal} setVCal={setVCal}/>
      default: return <ModalCalendarFirst updatePageIndex={updatePageIndex} vCal={vCal} setVCal={setVCal}/>;
    }
  }
  const updatePageIndex = (index) =>{
    if(index == 0)
      setPageIndex(0);
    else if(index == 1)
      setPageIndex(1);
    else
      setPageIndex(index);
  }

  if(vCal == false)
    return null;
    return (
      <Container>
        <ModalBg onClick={()=>{setVCal(false)}}/>
        {
          pageLoader()
        }
      </Container>
    );
}

const Container = styled.div`
  width:100%;

`
const ModalBg = styled.div`
  position:fixed;
  width:100%;height:100%;left:0;top:0;
  display:block;content:'';background:rgba(0,0,0,0.05);
  z-index:1001;
`
