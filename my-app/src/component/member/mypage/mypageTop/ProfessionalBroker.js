//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Louder from '../../../../img/member/louder.png';
import Checking from '../../../../img/member/checking.png';
import Like from '../../../../img/member/like.png';
import Smile from '../../../../img/member/smile.png';
import OrangeStar from '../../../../img/member/star_orange.png';
import GreenStar from '../../../../img/member/star_green.png';
import WhiteStar from '../../../../img/member/star_white.png';

//components
import CommonFlexBox from "./commonFlexBox";

export default function Professional() {

  // star(아이콘이미지, 제목, 별수, 오랜지 여부)
  const star = (icon, title, length, isOrange) => {
    let arr = [];
    let whiteLength = 0;
    let isWhite = false;
    let whiteArr = [];
    for(let i = 0 ; i < length ; i++){arr.push(i);}
    if(5 - length !== 0){
      whiteLength = 5 - length;
      isWhite = true;
      for(let i = 0 ; i < whiteLength ; i++){whiteArr.push(i);}
    }
    return(
      <FlexBox>
        <Left>
          <Icon src={icon} alt="icon"/>
          <SubTitle>{title}</SubTitle>
        </Left>
        <RightStar>
          {
              arr.map((item, index) => {
                return(
                  <Star key={index} src={isOrange ? OrangeStar : GreenStar}/>
                )
              })
          }
          {
            isWhite&&
            whiteArr.map((item, index) => {
              return(
                <Star key={index} src={WhiteStar}/>
              )
            })
          }
        </RightStar>
      </FlexBox>
    )
  }

    return (
        <Container>
          {/* -- 수정코드입니다. */}
          <CommonFlexBox icon={Louder} subTitle={"중개의뢰"} price={2} jeonse={0} monthly={0} />
          <CommonFlexBox icon={Checking} subTitle={"거래완료"} price={1} jeonse={0} monthly={0} />
          {star(Like, "전문성",4, true)}
          {star(Smile, "중개매너", 5, false)}

          {/* -- 원래 코드입니다. */}
          {/*
            <FlexBox>
              <Left>
                <Icon src={Louder} alt="icon"/>
                <SubTitle>중개의뢰</SubTitle>
              </Left>
              <Right>
                <TxtHave>매매2</TxtHave>
                <Part/>
                <Txt>전세0</Txt>
                <Part/>
                <Txt>월세0</Txt>
              </Right>
            </FlexBox>
            <FlexBox>
              <Left>
                <Icon src={Checking} alt="icon"/>
                <SubTitle>거래완료</SubTitle>
              </Left>
              <Right>
                <TxtHave>매매1</TxtHave>
                <Part/>
                <Txt>전세0</Txt>
                <Part/>
                <Txt>월세0</Txt>
              </Right>
            </FlexBox>
            <FlexBox>
              <Left>
                <Icon src={Like} alt="icon"/>
                <SubTitle>전문성</SubTitle>
              </Left>
              <RightStar>
                <Star src={OrangeStar}/>
                <Star src={OrangeStar}/>
                <Star src={OrangeStar}/>
                <Star src={OrangeStar}/>
                <Star src={OrangeStar}/>
              </RightStar>
            </FlexBox>

            <FlexBox>
              <Left>
                <Icon src={Smile} alt="icon"/>
                <SubTitle>중개매너</SubTitle>
              </Left>
              <RightStar>
                <Star src={GreenStar}/>
                <Star src={GreenStar}/>
                <Star src={GreenStar}/>
                <Star src={GreenStar}/>
                <Star src={WhiteStar}/>
              </RightStar>
            </FlexBox>
          */}
        </Container>
  );
}

const Container = styled.div`
    width:100%;
`
const Top = styled.div`
  width:100%;
`
const FlexBox = styled.div`
  display:flex;width:100%;
  justify-content:flex-start;align-items:center;
  padding-left:160px;
  margin-bottom:25px;
  &:nth-child(3){margin-top:60px;}
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(25/428));
    padding-left:calc(100vw*(25/428));
    &:nth-child(3){margin-top:calc(100vw*(40/428));}
    }
`
const Left = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100px;
  margin-right:88px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(50/428));
    width:calc(100vw*(100/428));
    }
`
const Icon = styled.img`
  display:inline-block;
  width:20px;margin-right:12px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    margin-right:calc(100vw*(12/428));
    }
`
const SubTitle = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const Right = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:184px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(184/428));
    }
`
const RightStar = styled(Right)`
  margin-left:40px;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(40/428));
    }
`
const Txt = styled.p`
  font-size:15px;color:#4a4a4a;
  color:#979797;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const TxtHave = styled(Txt)`
  color:#4a4a4a;
`
const Part = styled.p`
  width:1px;height:16px;
  background:#979797;vertical-align:middle;
  margin:0 18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(1/428));
    height:calc(100vw*(16/428));
    margin:0 calc(100vw*(16/428));
    }
`
const Bottom = styled.div`
  width:100%;margin-top:60px;
`
const Star = styled.img`
  display:inline-block;
  width:16px;
  margin-right:9px;
  &:last-child{margin-right:0;}
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(16/428));
    margin-right:calc(100vw*(9/428));
    }
`
