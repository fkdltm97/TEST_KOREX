//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../img/member/filter.png';
import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Location from '../../../../img/member/loca.png';
import Set from '../../../../img/member/setting.png';
import Item from '../../../../img/main/item01.png';
import Noimg from '../../../../img/main/main_icon3.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

//지도 모달
export default function ModalVisitorReserve({ visit, setVisit }) {

  const guest = [
    { guestname: "김동반", guestNum : "01012341234"},
    { guestname: "김반동", guestNum : "01012345678"}
  ];

  if(visit == false)
    return null;
    return (
        <Container>
          <WrapModalVisitor>
              <VisitorList>
                {guest.map(item => {
                return(
                <List>
                  <Name>{item.guestname}</Name>
                  <Phone>{item.guestNum.substr(0,3).concat("-XXXX-").concat(item.guestNum.substr(7))}</Phone> 
                </List>
                )
                })}
              </VisitorList>
          </WrapModalVisitor>
        </Container>
  );
}

const Pb = styled.b`
  display:block;
  @media ${(props) => props.theme.mobile} {
        display:inline;
    }
`
const Mb = styled.b`
  display:inline;
  @media ${(props) => props.theme.mobile} {
        display:block;
    }
`
const Container = styled.div`
    width:100%;
`

const WrapModalVisitor = styled.div`
  width:100%;
`
const ModalVisitorBg = styled.div`
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;content:'';
  z-index:3;
`
const ModalVisitor = styled.div`
  position:absolute;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:535px;border-radius:24px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(395/428));
    height:auto;
    padding:calc(100vw*(33/428)) calc(100vw*(15/428));
  }
`
const VisitorCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(22/428));
  }
`
const VisitorCloseImg = styled.img`
  display:inline-block;width:15px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(12/428));
  }
`
const ModalVisitorTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
    padding-bottom:calc(100vw*(15/428));
  }

`
const VisitorList = styled.div`
  width:100%;
  text-align:center;
  padding:50px 0;
  @media ${(props) => props.theme.modal} {
    padding:calc(100vw*(50/428)) 0;
  }
`
const List = styled.div`
  width:100%;
  display:flex;justify-content:center;
`
const Name = styled.p`
  font-size: 15px;
  transform:skew(-0.1deg);
  line-height:2;
  text-align: center;
  color: #4a4a4a;
  margin-right:25px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(14/428));
  }
`
const Phone = styled(Name)`
  margin-right:0;
`
