//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//img
import View from '../../../../img/main/icon_view.png';
import Item from "../../../../img/map/map_item.png";
import Check from "../../../../img/main/heart.png";
import HeartCheck from "../../../../img/main/heart_check.png";

import { Mobile, PC } from "../../../../MediaQuery"

// Components
import CommonFilter from './commonFilter';

export default function ItemTabList({value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

  const ItemListItem =[
  {
    item_id : 0,
    path:"/",
    startDate:"20.00.00",
    endDate: "20.00.00",
    kind:"아파트",
    detail:"자이 109동",
    price:"전세 12억 5,000",
    floor:"층수",
    Area:"공급면적",
    expenses:"관리비",
    desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
  },
  {
    item_id : 1,
    path:"/",
    startDate:"20.00.00",
    endDate: "20.00.00",
    kind:"아파트",
    detail:"자이 109동",
    price:"전세 12억 5,000",
    floor:"층수",
    Area:"공급면적",
    expenses:"관리비",
    desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
  },
  {
    item_id : 2,
    path:"/",
    startDate:"20.00.00",
    endDate: "20.00.00",
    kind:"아파트",
    detail:"자이 109동",
    price:"전세 12억 5,000",
    floor:"층수",
    Area:"공급면적",
    expenses:"관리비",
    desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
  },
  {
    item_id : 3,
    path:"/",
    startDate:"20.00.00",
    endDate: "20.00.00",
    kind:"아파트",
    detail:"자이 109동",
    price:"전세 12억 5,000",
    floor:"층수",
    Area:"공급면적",
    expenses:"관리비",
    desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
  },
  {
    item_id : 4,
    path:"/",
    startDate:"20.00.00",
    endDate: "20.00.00",
    kind:"아파트",
    detail:"자이 109동",
    price:"전세 12억 5,000",
    floor:"층수",
    Area:"공급면적",
    expenses:"관리비",
    desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
  },
  {
    item_id : 5,
    path:"/",
    startDate:"20.00.00",
    endDate: "20.00.00",
    kind:"아파트",
    detail:"자이 109동",
    price:"전세 12억 5,000",
    floor:"층수",
    Area:"공급면적",
    expenses:"관리비",
    desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
  },
  {
    item_id : 6,
    path:"/",
    startDate:"20.00.00",
    endDate: "20.00.00",
    kind:"아파트",
    detail:"자이 109동",
    price:"전세 12억 5,000",
    floor:"층수",
    Area:"공급면적",
    expenses:"관리비",
    desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
  }
  ]


  const onClickList = (e) => {
    // 클릭한 텍스트 불러오기
    console.log(e.target.innerText);
  }

    return (
        <Container>
          <TopInfo>
            <All>총 <GreenColor>4</GreenColor> 건</All>
            {/* -- 수정코드입니다. */}
            <CommonFilter onClick={onClickList}/>
            {/* -- 원래 코드입니다. */}
            {/*
              <FilterAndAdd>
                <Link onClick={showModal}>
                  <FilterImg src={View} alt="filter"/>
                  {
                    menu ?
                    <InMenu>
                      <Div>
                        <Link className="data_link"></Link>
                        <InDiv>최신등록순</InDiv>
                      </Div>
                      <Div>
                        <Link className="data_link"></Link>
                        <InDiv>높은가격순</InDiv>
                      </Div>
                      <Div>
                        <Link className="data_link"></Link>
                        <InDiv>낮은가격순</InDiv>
                      </Div>
                      <Div>
                        <Link className="data_link"></Link>
                        <InDiv>넓은면적순</InDiv>
                      </Div>
                      <Div>
                        <Link className="data_link"></Link>
                        <InDiv>좁은면적순</InDiv>
                      </Div>
                      <Div>
                        <Link className="data_link"></Link>
                        <InDiv>가나다순</InDiv>
                      </Div>
                    </InMenu>
                    :
                    null
                  }
                </Link>
              </FilterAndAdd>
            */}
          </TopInfo>
          <ListUl>
            {
              ItemListItem.map((value) => {
                return(
                  <TabContent>
                      <Link className="data_link"></Link>
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
                        <Input type="checkbox" name="" id={"check"+value.item_id} defaultChecked/>
                        <CheckLabel for={"check"+value.item_id}/>
                      </RightContent>
                    </TabContent>
                )
              })
            }
          </ListUl>
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
    width:680px;
    margin:0 auto;
    @media ${(props) => props.theme.mobile} {
      width:100%;
      }
`
const WrapRequest = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:40px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;
  border-bottom:1px solid #f2f2f2;
margin-top:calc(100vw*(18/428));
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(40/428));
    padding:0 calc(100vw*(34/428)) calc(100vw*(22/428));
    }
`
const All = styled.span`
  font-size:17px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const GreenColor = styled(All)`
  color:#01684b;
`
const FilterImg = styled.img`
  display:inline-block;
  width:18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
  }
`

const FilterAndAdd = styled.div`
  position:relative;
  display:flex;justify-content:flex-start; align-items:center;
`
const ListUl = styled.div`
  width:100%;
  height:563px;
  overflow-y:scroll;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height:calc(100vw*(536/428));
    }
`
const TabContent = styled.div`
  position:relative;
  display:flex;justify-content:space-between;align-items:center;
  padding:0 27px 25px 27px;margin-top:17px;
  margin-bottom:17px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding:0 calc(100vw*(16/428)) calc(100vw*(18/428)) calc(100vw*(26/428));
    margin-bottom:calc(100vw*(18/428));
    margin-top:calc(100vw*(18/428));
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
    line-height:calc(100vw*(24/428));
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
    margin-top:calc(100vw*(10/428));
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
    margin: 0 calc(100vw*(5/428));
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
    margin:calc(100vw*(6/428)) 0;
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
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(176/428));
    }
`
const RightContent = styled.div`
  position:relative;
  width:158px;height:158px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(158/428));
    height:calc(100vw*(158/428));
    }
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
    background:#fff url(${HeartCheck}); background-repeat:no-repeat;
    background-position:center center; background-size:17px 17px;}
    @media ${(props) => props.theme.mobile} {
      &:checked + label{
        background-position:center center; background-size:calc(100vw*(15/428)) calc(100vw*(15/428));}
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
    width:calc(100vw*(29/428));height:calc(100vw*(29/428));
    top:calc(100vw*(8/428));right:calc(100vw*(8/428));
    background-position:center center;
    background-size:calc(100vw*(15/428)) calc(100vw*(15/428));}
`

const InMenu = styled.ul`
  position:absolute;
  top:20px;left:0;
  width:112px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;
  z-index:3;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(20/428));
    left:calc(100vw*(-50/428));
    width:calc(100vw*(100/428));
  }

`
const Div = styled.li`
  position:relative;
  font-size:13px;
  transform:skew(-0.1deg);
  border-radius:8px;
  padding:4px 0 4px 17px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
  &:first-child{padding-top:8px;}
  &:last-child{padding-bottom:8px;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    padding:calc(100vw*(4/428)) 0 calc(100vw*(4/428)) calc(100vw*(12/428));
    &:first-child{padding-top:calc(100vw*(8/428));}
    &:last-child{padding-bottom:calc(100vw*(8/428));}
  }
`
const InDiv = styled.div`
  width:100%;height:100%;
`
