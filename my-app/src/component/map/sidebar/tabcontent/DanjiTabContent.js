//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import Item from "../../../../img/map/map_item.png";
import FilterDown from "../../../../img/map/filter_down_arrow.png";
import FilterNext from "../../../../img/map/filter_next.png";
import FilterClose from "../../../../img/map/filter_close.png";
import Checked from "../../../../img/map/checked.png";
import Check from "../../../../img/main/heart.png";
import Profile from "../../../../img/map/profile_img.png";
// components
import { Mobile, PC } from "../../../../MediaQuery";

// redux
import { MapProductEls } from '../../../../store/actionCreators';
import { useSelector } from 'react-redux';

export default function ItemTabContent({updatePageIndex,setHistoryInfo,setMap}) {

  const productRedux = useSelector(state=>{ return state.mapProductEls});


  const onClickEl = (value) => {
    MapProductEls.updateClickBlo({ clickBlo : value.danji_id });
    updatePageIndex(3);
    setHistoryInfo(e => {e.prevIndex.push(0); return JSON.parse(JSON.stringify(e));});
  }

  return (
    <Container>
      {
        productRedux.block.map((value, index) => {
          return(
            <TabContent key={index}>
              <Link onClick={() => onClickEl(value) } className="data_link"></Link>
              <TopBox>
                <Title>{value.title}</Title>
                <Address>{value.address}</Address>
                <DanjiInfo>
                  <Date>{value.date}</Date>
                  <Price>{value.price}</Price>
                  <Floor>{value.floor}</Floor>
                </DanjiInfo>
                <LeftImg>
                  <Img src={FilterNext}/>
                </LeftImg>
              </TopBox>
            </TabContent>
          )
        })
      }
    </Container>
  );
}

const Container = styled.div`
`
const TabContent = styled.div`
  position:relative;
  padding:30px 27px 0 27px;margin-top:17px;
  margin-bottom:30px;
  border-top:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(24/428)) calc(100vw*(12/428)) 0;
    margin-bottom:calc(100vw*(24/428));
  }
`
const TopBox = styled.div`
  display:block;
  width:100%;
  position:relative;
`
const Title= styled.h2`
  font-size:25px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(20/428));
    margin-bottom:calc(100vw*(10/428));
  }
`
const Address = styled.p`
  font-size:15px;color:#707070;
  margin-bottom:10px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(10/428));
  }
`
const DanjiInfo = styled.div`
  display:flex;justify-content:flex-start;align-item:center;
`
const Date = styled(Address)`
  color:#01684b;
  margin-bottom:0;
`
const Price = styled(Date)`
  margin:0 8px;
  @media ${(props) => props.theme.mobile} {
    margin:0 calc(100vw*(8/428));
  }
`
const Floor = styled(Date)`
`
const LeftImg = styled.div`
  position:absolute;
  top:50%;transform:translateY(-50%);
  right:0;
`
const Img = styled.img`
  width:10px;
  display:inline-block;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(10/428));
  }
`
