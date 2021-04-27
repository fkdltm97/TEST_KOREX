//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Item from '../../../../../img/main/item01.png';
import Check from '../../../../../img/map/radio.png';
import Checked from '../../../../../img/map/radio_chk.png';

//지도 모달
export default function ModalSelect({select,setSelect}) {
  const PropertyListItem =[
    {
      p_id : 0,
      img:Item,
      date:"21.00.00 - 21.00.00",
      conditiontype:"사용자 의뢰",
      condition:"거래 개시",
      startdate:"2021.00.00",
      enddate:"2021.00.00",
      number:"2D0000324",
      title:"충남내포신도시2차대방엘리움더센트럴",
      kinds:"아파트",
      itemname:"충남내포신도시2차대방엘리움더센트럴 7층 707호",
      trade:"매매",
      username:"홍길동",
      price:"1억 5,000",
      person:"3"
    },
    {
      p_id : 1,
      img:Item,
      date:"21.00.00 - 21.00.00",
      conditiontype:"외부 수임",
      condition:"거래 개시",
      startdate:"2021.00.00",
      enddate:"2021.00.00",
      number:"2D0000324",
      title:"충남내포신도시2차대방엘리움더센트럴",
      kinds:"아파트",
      itemname:"충남내포신도시2차대방엘리움더센트럴 7층 707호",
      trade:"매매",
      username:"홍길동",
      price:"1억 5,000",
      person:"3"
    }
]

    return (
        <Container>
          <WrapModalSelect>
            <WrapTop>
              <InputCheck type="radio" name="tour" id="allcheck" onClick={()=>{setSelect(false);}} defaultChecked/>
              <CheckLabel for="allcheck">
                <Span/>
                전체
              </CheckLabel>
            </WrapTop>
            <WrapList>
            {
            PropertyListItem.map((value) => {

              const type=()=>{
                if(value.conditiontype == "사용자 의뢰") { //검토대기
                  return "#fe7a01"
                }else if(value.conditiontype == "외부 수임") {//거래준비
                  return "#01684b"
                }
              }

              return(
                <Li>
                <WrapRight>
                  <CheckBox>
                    <InputCheckEa type="radio" name="tour" id={"ea"+value.p_id} onClick={()=>{setSelect(true);}}/>
                    <CheckLabelEa for={"ea"+value.p_id}/>
                  </CheckBox>
                </WrapRight>
                <WrapLeft>
                  <Top>
                    <TopLeft>
                      <TopCondition><Color color={type}>{value.conditiontype}</Color>상태 : {value.condition}</TopCondition>
                      <JunsokBox>
                        <Green>전속</Green>
                        <Date>{value.startdate} ~{value.enddate}</Date>
                      </JunsokBox>
                    </TopLeft>
                    <TopRight>
                      <Img src={Item}/>
                    </TopRight>
                  </Top>
                  <Bottom>
                    <BottomRight>
                      <Number>등록번호 : {value.number}</Number>
                      <Title>{value.title}</Title>
                      <FlexBox>
                        <Left>물건종류</Left>
                        <Right>{value.kinds}</Right>
                      </FlexBox>
                      <FlexBox>
                        <Left>건물명</Left>
                        <Right>{value.itemname}</Right>
                      </FlexBox>
                      <FlexBox>
                        <Left>거래유형</Left>
                        <Right>{value.trade}</Right>
                      </FlexBox>
                      <FlexBox>
                        <Left>거래금액</Left>
                        <Right>{value.price}</Right>
                      </FlexBox>
                      <FlexBox>
                        <Left>물건투어 예약</Left>
                        <Right>{value.person}명</Right>
                      </FlexBox>
                      <FlexBox>
                        <Left>의뢰인명</Left>
                        <Right>{value.name}</Right>
                      </FlexBox>
                    </BottomRight>
                  </Bottom>
                </WrapLeft>
              </Li>
              )
            })
          }
            </WrapList>
          </WrapModalSelect>
        </Container>
  );
}

const Pb = styled.b`
  display:block;
  @media ${(props) => props.theme.modal} {
        display:inline;
    }
`
const Mb = styled.b`
  display:inline;
  @media ${(props) => props.theme.modal} {
        display:block;
    }
`
const Container = styled.div`
    width:100%;
`

const WrapModalSelect = styled.div`
  width:100%;
`
const WrapTop = styled.div`
  width:100%;
  padding-bottom:10px;
  border-bottom:1px solid #e4e4e4;
  @media ${(props) => props.theme.modal} {
      padding-bottom:calc(100vw*(10/428));
    }
`
const InputCheck = styled.input`
  display:none;
  &:checked+label span{background:url(${Checked}) no-repeat;background-size:100% 100%}
`
const InputCheckEa = styled(InputCheck)`
  &:checked+label{background:url(${Checked}) no-repeat;background-size:100% 100%}
`
const CheckLabel = styled.label`
  display:inline-block;
  font-size:15px;color:#707070;transform:skew(-0.1deg);
  vertical-align:middle; font-weight:600;
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(15/428));
    }
`
const Span = styled.span`
   display:inline-block;
   width:20px;height:20px;
   margin-right:15px;
   background:url(${Check}) no-repeat; background-size:100% 100%;
   vertical-align:middle; 
   @media ${(props) => props.theme.modal} {
      width:calc(100vw*(20/428));
      height:calc(100vw*(20/428));
      margin-right:calc(100vw*(15/428));
    }
`
const WrapList = styled.ul`
  margin-top:10px;
  width:100%;
  height:250px;overflow-y:scroll;
  @media ${(props) => props.theme.modal} {
      height:calc(100vw*(250/428));
      margin-top:calc(100vw*(10/428));
    }
`
const Li = styled.li`
  width:100%;padding:25px 0;
  display:flex;justify-content:space-between;align-items:center;
  border-bottom:1px solid #f2f2f2;
  &:last-child{border-bottom:none;}
  
`
const WrapRight = styled.div`
  margin-right:20px;
  @media ${(props) => props.theme.modal} {
      margin-right:calc(100vw*(15/428));
    }
`
const CheckBox = styled.div`
`
const CheckLabelEa = styled.label`
  display:inline-block;
  width:20px;height:20px;
  background:url(${Check}) no-repeat;background-size:100% 100%;
  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(20/428));
      height:calc(100vw*(20/428));
    }
`
const WrapLeft = styled.div`
  width:360px;
  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(320/428));
    }
`
const Top = styled.div`
  width:100%;
  display:flex;justify-content:space-between;align-items:flex-start;
`
const TopLeft = styled.div`

`
const TopCondition = styled.h3`
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  font-weight:800;
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(15/428));
    }
`
const Color = styled.span`
  font-size:15px;
  vertical-align:middle;
  color:${({color}) => color};
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(15/428));
    }
`
const JunsokBox = styled.div`
    width:200px;height:25px;
    border:1px solid #2b664d;
    text-align:center;margin-top:10px;
    display:flex;justify-content:center;align-items:center;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(190/428));
    height:calc(100vw*(25/428));
    margin-top:calc(100vw*(8/428));
  }
`
const Green = styled.p`
  font-size:12px;color:#01684b;
  transform:skew(-0.1deg);
  margin-right:8px;font-weight:600;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(12/428));
    margin-right:calc(100vw*(8/428));
  }
`
const Date = styled(Green)`
  color:#707070;margin-right:0;
`
const TopRight = styled.div`
  width:80px;height:80px;
  border-radius:3px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(80/428));height:calc(100vw*(80/428));
  }
`
const Img = styled.img`
  width:100%;height:100%;
  object-fit:cover;
`
const Bottom = styled.div`
  width:100%;
`
const BottomRight = styled.div`
`
const Number = styled.p`
  font-size:12px; color:#707070;font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(12/428));
  }
`
const Title = styled.h3`
  font-size:18px; color:#4a4a4a;font-weight:800;
  transform:skew(-0.1deg);
  margin:8px 0;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(18/428));
    margin:calc(100vw*(8/428)) 0 calc(100vw*(12/428));
  }
`
const FlexBox = styled.div`
  display:flex;justify-content:space-between;align-items:flex-start;
  margin-bottom:6px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(6/428));
  }
`
const Left = styled.p`
  font-size:15px; color:#4a4a4a;font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
  }
`
const Right = styled(Left)`
  color:#979797;
  text-align:right;
  width:250px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(220/428));
  }
`