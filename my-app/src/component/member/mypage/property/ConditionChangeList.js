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

import { Mobile, PC } from "../../../../MediaQuery"

export default function Request({map,setMap,filter,setFilter,setVisit,vCal,setVCal,value,type,type2}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

    return (
      <Container>
          <Li opacity={type2}>
            <Infos>
              <InfosTop>
                <Condition>상태:<Orange color={type}>{value.condition}</Orange></Condition>
                <Date>처리일시 : <Gray>{value.date}</Gray></Date>
              </InfosTop>
              <InfosMiddle>
                <Left>{value.subtitle}</Left>
                <Right>{value.name}</Right>
              </InfosMiddle>
              <InfosMiddle>
                <Left>사유</Left>
                <Rightwd>{value.reason}</Rightwd>
              </InfosMiddle>
            </Infos>
          </Li>
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

`
const Li = styled.li`
  width:100%;
  position:relative;
  display:block;
  padding:43px 0;
  border-bottom:1px solid #f7f8f8;
  opacity:${({opacity}) => opacity};
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(34/428)) calc(100vw*(10/428));
  }
`

const Infos = styled.div`
`
const InfosTop = styled.div`
  width:100%;margin-bottom:25px;
  display:flex;justify-content:space-between;align-items:center;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(25/428));
    }
`
const Condition = styled.h4`
  font-size:15px;color:#707070;font-weight:800;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const Orange = styled(Condition)`
  color:${({color}) => color};
  display:inline-block;
  margin-left:5px;
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(5/428));
  }
`
const Date = styled.p`
  font-size:15px;font-weight:600;
  transform:skeW(-0.1deg);color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
const Gray = styled(Date)`
  display:inline-block;
  color:#979797;
  vertical-align:middle;
`
const InfosMiddle = styled(InfosTop)`
  flex-wrap:wrap;margin-bottom:8px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(8/428));
    }
`
const Left = styled(Date)`
`
const Right = styled(Gray)`
`
const Rightwd = styled(Right)`
  width:100%;
  margin-top:8px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(8/428));
    }
`
