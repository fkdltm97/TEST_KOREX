//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap-tabs';

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

const BrokerListItem =[
{
  broker_id : 0,
  path:"/",
  tag1:"아파트·현대아이리스",
  tag2:"상가",
  tag3:"사무실",
  name:"럭키 공인중개사",
  address:"강남구 논현동 104-5",
  sell_kind1:2,
  sell_kind2:7,
  sell_kind3:9,
  profile_img:Profile
},
{
  broker_id : 1,
  path:"/",
  tag1:"아파트·현대아이리스",
  tag2:"상가",
  tag3:"사무실",
  name:"럭키 공인중개사",
  address:"강남구 논현동 104-5",
  sell_kind1:2,
  sell_kind2:7,
  sell_kind3:9,
  profile_img:Profile
},
{
  broker_id : 3,
  path:"/",
  tag1:"아파트·현대아이리스",
  tag2:"상가",
  tag3:"사무실",
  name:"럭키 공인중개사",
  address:"강남구 논현동 104-5",
  sell_kind1:2,
  sell_kind2:7,
  sell_kind3:9,
  profile_img:Profile
}
]

export default function ItemTabContent({updatePageIndex,setHistoryInfo}) {

    return (
        <Container>
        {
          BrokerListItem.map((value) => {
            return(
              <TabContent>
                <Link onClick={() => { updatePageIndex(2); setHistoryInfo(e => {e.prevIndex.push(0); return JSON.parse(JSON.stringify(e));});}} className="data_link"></Link>
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
                      <ItemImg src={value.profile_img}/>
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
`
const TopBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  flex-wrap:wrap;
  width:100%;
  margin-bottom:14px;
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
`
const Address = styled.div`
  display:inline-block;
  font-size:15px;color:#4a4a4a;
  font-weight:700;transform:skew(-0.1deg);
  margin-bottom:13px;
`

const ColorOrange = styled.span`
  display:inline-block;
  font-size:15px;color:#fe7a01;
  vertical-align:middle;
  margin-left:3px;
  font-weight:800;transform:skew(-0.1deg);
`
const SellList = styled.div`
  width:100%;display:flex;
  justify-content:flex-start;align-items:center;
`
const List = styled(ColorOrange)`
  color:#4a4a4a;
  margin-right:7px;
`
const Part = styled.div`
  display:inline-block;
  width:1px;height:12px;
  background:#4a4a4a;
  margin-right:7px;
`

const RightContent = styled.div`
  position:relative;
  width:95px;height:95px;
`
const ItemImg = styled.img`
  width:100%;height:100%;
  border-radius:100%;
`
