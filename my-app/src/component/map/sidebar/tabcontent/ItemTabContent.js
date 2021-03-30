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

// components
import { Mobile, PC } from "../../../../MediaQuery";


export default function ItemTabContent({updatePageIndex,itemList,setHistoryInfo,index}) {


    return (
        <Container>
        {
            itemList.map((value) => {
              return(
                <TabContent>
                  <Link onClick={() => {updatePageIndex(1); setHistoryInfo(e => {e.prevIndex.push(index); return JSON.parse(JSON.stringify(e));}); }} className="data_link"></Link>
                  <LeftContent>
                    {/*전속매물에 속한 아파트 일때 TopBox가 나와야함*/}
                    <TopBox>
                      <ColorGreen>전속매물</ColorGreen>
                      <WrapDate>
                        <StartDate>{value.startDate}</StartDate>
                        <Line>~</Line>
                        <EndDate>{value.endDate}</EndDate>
                      </WrapDate>
                    </TopBox>
                    <ItemInfo>
                      <Name>
                        <Kind>{value.kind}</Kind>
                        <ColorOrange>·</ColorOrange>
                        <Detail>{value.detail}</Detail>
                      </Name>
                      <Price>{value.price}</Price>
                      <Option>
                        <Floor>{value.floor}</Floor>
                        <Area>{value.area}</Area>
                        <Expenses>{value.expenses}</Expenses>
                      </Option>
                      <Desc>{value.desc}</Desc>
                    </ItemInfo>
                  </LeftContent>
                  <RightContent>
                    <ItemImg src={Item}/>
                    <Input type="checkbox" name="" id={"check"+value.item_id}/>
                    <CheckLabel for={"check"+value.item_id}/>
                  </RightContent>
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
  display:flex;justify-content:space-between;align-items:center;
  padding:25px 27px 0 27px;margin-top:17px;
  margin-bottom:17px;
  border-top:1px solid #f2f2f2;
`
const LeftContent = styled.div`
  margin-right:31px;
`
const TopBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:163px;height:26px;border:1px solid #2b664d;
  line-height:24px;
`
const ColorGreen = styled.span`
  font-size:11px;
  font-weight:600;transform:skew(-0.1deg);
  color:#01684b;
  display:inline-block;margin-right:3px;
`
const WrapDate = styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
`
const StartDate = styled.p`
  font-size:11px;
  font-weight:600;transform:skew(-0.1deg);
  color:#707070;
`
const Line = styled(StartDate)`
`
const EndDate = styled(StartDate)`
`
const ItemInfo = styled.div`
  margin-top:8px;
`
const Name = styled.div`
  margin-bottom:3px;
`
const Kind = styled.p`
  display:inline-block;
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
`
const ColorOrange = styled.span`
  display:inline-block;
  font-size:15px;color:#fe7a01;
  vertical-align:middle;
  margin:0 3px;
  font-weight:600;transform:skew(-0.1deg);
`
const Detail = styled(Kind)`
`
const Price = styled.h3`
  font-size:20px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
`
const Option = styled.div`
  margin:6.5px 0;
  display:flex;justify-content:flex-start;align-items:center;
`
const Floor = styled.p`
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
  margin-right:5px;
`
const Area = styled(Floor)`
`
const Expenses = styled(Floor)`
  margin-right:0;
`
const Desc = styled(Expenses)`
  width:196px;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
`
const RightContent = styled.div`
  position:relative;
  width:158px;height:158px;
`
const ItemImg = styled.img`
  width:100%;height:100%;
`
const LikeBox = styled.div`
  position:absolute;
  width:100%;height:100%;
  left:0;top:0;
`
const Input = styled.input`
  display:none;
  &:checked + label{
    background:#fff url(${Checked}); background-repeat:no-repeat;
    background-position:center center; background-size:17px 17px;}
`
const CheckLabel = styled.label`
  position:absolute;
  top:8px;right:8px;
  z-index:2;
  display:inline-block;
  width:29px;height:29px;
  border:1px solid #d0d0d0;
  border-radius:3px;
  background:#fff url(${Check});background-repeat:no-repeat;
  background-position:center center; background-size:17px 17px;
`
