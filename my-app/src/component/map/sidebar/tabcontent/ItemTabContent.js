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
import HeartCheck from "../../../../img/main/heart_check.png";

// components
import { Mobile, PC } from "../../../../MediaQuery";

// redux
import { MapProductEls } from '../../../../store/actionCreators';
import { useSelector } from 'react-redux';

export default function ItemTabContent({updatePageIndex, setHistoryInfo,setReport,index, productList, containerRef}) {

  const onClickEl = (value) => {
    if(containerRef){
      containerRef.current.scrollTop=0;
    }
    if(value.prd_name == '더미매물'){
      MapProductEls.updateClickExc({ clickExc : { id: value.prd_id , type:'dummy'}});
      // updatePageIndex(1,value.item_id);
      updatePageIndex(1,value.prd_id);
    }else{
      MapProductEls.updateClickExc({ clickExc : { id: value.prd_identity_id , type:'standard'}});
      // updatePageIndex(1,value.item_id);
      updatePageIndex(1,value.prd_identity_id);
    }
    
    setHistoryInfo(e => {e.prevIndex.push(index);
    return JSON.parse(JSON.stringify(e));});
  }

  return (
    <Container>
      {
        productList.map((value, index) => {
            //초기엔 10개까지만 최초 보여주다가 스크롤이벤트 발생시마다 추가로 보여줌.
          return(
            <TabContent key={index}>
              <Link onClick={() => onClickEl(value) } className="data_link"></Link>
              <LeftContent>
                {/*전속매물에 속한 아파트 일때 TopBox가 나와야함*/}
                {
                 //value.isExc && 
                  <TopBox>
                    
                    <ColorGreen>전속매물</ColorGreen>
                    <WrapDate>
                      <StartDate>20.05.05</StartDate>
                      <Line>~</Line>
                      <EndDate>21.05.05</EndDate>
                    </WrapDate>
                  </TopBox>
                }
                <ItemInfo>
                  <Name>
                    <Kind>{value.prd_type}</Kind>
                    <ColorOrange>·</ColorOrange>
                    <Detail>{value.prd_name}</Detail>
                  </Name>
                  <Price>{value.prd_sel_type}{value.prd_sel_type=='월세'?value.prd_month_price : value.prd_price}만원</Price>
                  <Option>
                    <Floor>{value.address_detail}</Floor>
                    <Area>{value.supply_space}</Area>
                    <Expenses>{value.managecost}만원</Expenses>
                  </Option>
                  <Desc><small>{value.prd_longitude}/{value.prd_latitude}</small>{value.maemul_description}</Desc>
                </ItemInfo>
              </LeftContent>
              <RightContent>
                <ItemImg src={Item}/>
                <Input type="checkbox" name="" id={"check"+value.prd_identity_id}/>
                <CheckLabel for={"check"+value.prd_identity_id}/>
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
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(25/428)) calc(100vw*(0/428)) calc(100vw*(15/428));
  }

`
const LeftContent = styled.div`
  margin-right:31px;
  @media ${(props) => props.theme.mobile} {
    margin-right:0;
  }
`
const TopBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:163px;height:26px;border:1px solid #2b664d;
  line-height:24px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(163/428));
    height:calc(100vw*(26/428));
    line-heigiht:calc(100vw*(24/428));
  }
`
const ColorGreen = styled.span`
  font-size:11px;
  font-weight:600;transform:skew(-0.1deg);
  color:#01684b;
  display:inline-block;margin-right:3px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(11/428));
    margin-right:calc(100vw*(3/428));
  }
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
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(11/428));
  }
`
const Line = styled(StartDate)`
`
const EndDate = styled(StartDate)`
`
const ItemInfo = styled.div`
  margin-top:8px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(9/428));
  }
`
const Name = styled.div`
  margin-bottom:3px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(3/428));
  }
`
const Kind = styled.p`
  display:inline-block;
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const ColorOrange = styled.span`
  display:inline-block;
  font-size:15px;color:#fe7a01;
  vertical-align:middle;
  margin:0 3px;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin:0 calc(100vw*(5/428));
  }
`
const Detail = styled(Kind)`
`
const Price = styled.h3`
  font-size:20px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(20/428));
  }
`
const Option = styled.div`
  margin:6.5px 0;
  display:flex;justify-content:flex-start;align-items:center;
  @media ${(props) => props.theme.mobile} {
    margin:calc(100vw*(6.5/428)) 0;
  }
`
const Floor = styled.p`
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
  margin-right:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-right:calc(100vw*(5/428));
  }
`
const Area = styled(Floor)`
`
const Expenses = styled(Floor)`
  margin-right:0;
`
const Desc = styled(Expenses)`
  width:196px;
  //white-space:nowrap;
  //text-overflow:ellipsis;

  //overflow:hidden;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(196/428));
  }
`
const RightContent = styled.div`
  position:relative;
  width:100px;height:100px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(158/428));
    height:calc(100vw*(158/428));
  }
`
const ItemImg = styled.img`
  width:100%;height:100%;
  border-radius:3px;
`
const LikeBox = styled.div`
  position:absolute;
  width:100%;height:100%;
  left:0;top:0;
`
const Input = styled.input`
  display:none;
  &:checked + label{
    background:#fff url(${HeartCheck}); background-repeat:no-repeat;
    background-position:center center; background-size:17px 17px;}
  @media ${(props) => props.theme.mobile} {
    &:checked + label{background-size:calc(100vw*(15/428)) calc(100vw*(15/428));}
  }
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
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(8/428));right:calc(100vw*(8/428));
    width:calc(100vw*(29/428));height:calc(100vw*(29/428));
    background-size:calc(100vw*(15/428)) calc(100vw*(15/428));
  }
`
