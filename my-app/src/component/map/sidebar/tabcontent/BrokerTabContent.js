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

export default function ItemTabContent({updatePageIndex,setHistoryInfo, containerRef}) {

  const productRedux = useSelector(state=>{ return state.mapProductEls});

  const onClickEl = (value) => {
    MapProductEls.updateClickPro({ clickPro : value.broker_id });
    if(containerRef){
      containerRef.current.scrollTop=0;
    }
    updatePageIndex(2);
    setHistoryInfo(e => {e.prevIndex.push(0); return JSON.parse(JSON.stringify(e));});
  }

    return (
      <Container>
        {
          productRedux.probroker.map((value, index) => {
            return(
              <TabContent key={index}>
                <Link onClick={() => onClickEl(value) } className="data_link"></Link>
                  <TopBox>
                    <Tag>{value.tag1}</Tag>
                    <Tag>{value.tag2}</Tag>
                    <Tag>{value.tag3}</Tag>
                  </TopBox>
                  <BottomBox>
                    <LeftContent>
                      <ItemInfo>
                        <Name>{value.name}</Name>
                        <Address>{value.address}</Address>
                        <SellList>
                          <List>매매 <ColorOrange>{value.sell_kind1}</ColorOrange></List>
                          <Part/>
                          <List>전세 <ColorOrange>{value.sell_kind2}</ColorOrange></List>
                          <Part/>
                          <List>월세 <ColorOrange>{value.sell_kind3}</ColorOrange></List>
                        </SellList>
                      </ItemInfo>
                    </LeftContent>
                    <RightContent>
                      <ItemImg src={Profile}/>
                    </RightContent>
                  </BottomBox>
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
  padding:25px 27px 0 27px;margin-top:17px;
  margin-bottom:17px;
  border-top:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(25/428)) calc(100vw*(0/428));
    margin-bottom:calc(100vw*(10/428));
  }
`
const TopBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  flex-wrap:wrap;
  width:100%;
  margin-bottom:14px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(14/428));
  }
`
const Tag = styled.div`
  border-radius: 15px;
  border: solid 1px #e4e4e4;
  background-color: #f8f7f7;
  height:30px;
  padding:7px 16px;
  margin-right:5px;
  font-size:15px;color:#01684b;
  font-weight:600;transform:skew(-0.1deg);
  text-align:center;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    padding: calc(100vw*(6/428)) calc(100vw*(10/428));
    font-size:calc(100vw*(14/428));
    margin-right:calc(100vw*(5/428));
  }
`
const BottomBox = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`
const LeftContent = styled.div`
`
const ItemInfo = styled.div`
`
const Name = styled.div`
  font-size:25px;font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(20/428));
    margin-bottom:calc(100vw*(10/428));
  }
`
const Address = styled.div`
  display:inline-block;
  font-size:15px;color:#4a4a4a;
  font-weight:700;transform:skew(-0.1deg);
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    margin-bottom:calc(100vw*(10/428));
  }
`

const ColorOrange = styled.span`
  display:inline-block;
  font-size:15px;color:#fe7a01;
  vertical-align:middle;
  margin-left:3px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    margin-left:calc(100vw*(3/428));
  }
`
const SellList = styled.div`
  width:100%;display:flex;
  justify-content:flex-start;align-items:center;
`
const List = styled(ColorOrange)`
  color:#4a4a4a;
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(6/428));
  }
`
const Part = styled.div`
  display:inline-block;
  width:1px;height:12px;
  background:#4a4a4a;
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(6/428));
    height:calc(100vw*(12/428));
  }
`

const RightContent = styled.div`
  position:relative;
  width:95px;height:95px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(95/428));
    height:calc(100vw*(95/428));
  }
`
const ItemImg = styled.img`
  width:100%;height:100%;
  border-radius:100%;
`
