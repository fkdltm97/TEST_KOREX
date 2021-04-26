//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap-tabs';

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

import { Mobile, PC } from "../../../../MediaQuery";
import ItemTabList from "./ItemTabList";
import BunyangTabList from "./BunyangTabList";
export default function Like({setFilter,value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
    return (
        <Container>
          <WrapRequest>
            <TopTitle>내 관심</TopTitle>
            <Tabs onSelect={(index, label) => console.log(label + ' selected')} className="like_tab">
              <Tab label="전속매물">
                  <ItemTabList/>
              </Tab>
              <Tab label="분양">
                  <BunyangTabList/>
              </Tab>
          </Tabs>

      </WrapRequest>
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
    width:890px;
    margin:0 auto;
    padding:24px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:100%;
      padding:calc(100vw*(30/428)) 0 calc(100vw*(100/428));
      }
`
const WrapRequest = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  width:680px;margin:0 auto;
  font-size:20px;color:#707070;
  margin-bottom:40px;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);

  @media ${(props) => props.theme.mobile} {
    width:100%;
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(36/428));
    margin-bottom:calc(100vw*(24/428));
    }
`
