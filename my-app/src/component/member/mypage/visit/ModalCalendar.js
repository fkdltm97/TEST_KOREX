//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

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

export default function ModalCal({vCal, setVCal,calModal}){
  const [value, onChange] = useState(new Date());
  const [pageIndex , setPageIndex] = useState(0);

  const pageLoader = () =>{
    switch (pageIndex) {
      case 0: return <ModalCalendarFirst updatePageIndex={updatePageIndex} calModal={calModal} vCal={vCal} setVCal={setVCal}/>;
      case 1: return <ModalCalendarSecond updatePageIndex={updatePageIndex} calModal={calModal} vCal={vCal} setVCal={setVCal}/>
      case 2: return <ModalCalendarThird updatePageIndex={updatePageIndex} calModal={calModal} vCal={vCal} setVCal={setVCal}/>
      default: return <ModalCalendarFirst updatePageIndex={updatePageIndex} calModal={calModal} vCal={vCal} setVCal={setVCal}/>;
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
        { 
          pageLoader()
        }
      </Container>
    );
}

const Container = styled.div`
  width:100%;

`
const Wrap = styled.div`
  width:100%;
`
const ModalBg = styled.div`
  position:fixed;
  width:100%;height:100%;left:0;top:0;
  display:block;content:'';background:rgba(0,0,0,0.05);
  z-index:1001;
`
const ModalClose = styled.div`
  width:100%;
  text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.modal} {
      margin-bottom:calc(100vw*(25/428));
    }
`
const CloseImg = styled.img`
  display:inline-block;
  width:15px;height:16px;
  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(12/428));
      height:calc(100vw*(13/428));
    }
`
const ModalTop = styled.div`
  width:100%;padding-bottom:20px;
  border-bottom:1px solid #a3a3a3;
  @media ${(props) => props.theme.modal} {
      padding-bottom:calc(100vw*(15/428));
    }
`
const Title = styled.div`
  font-size:20px;
  font-weight:800;
  color:#707070;
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(15/428));
    }
`
