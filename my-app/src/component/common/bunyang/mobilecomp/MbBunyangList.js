//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//style
import styled from "styled-components"

//img
import ItemImg from "../../../../img/main/item01.png";
import Heart from "../../../../img/main/heart.png";
import HeartCheck from "../../../../img/main/heart_check.png";
import IconSearch from "../../../../img/main/icon_search.png";
import IconRecent from "../../../../img/main/icon_view.png";

const BunyangListItem =[
  {
    bunyang_id : 0,
    src:ItemImg,
    path:"/MbBunyangDetail",
    number:"2D0000324",
    title:"충남내포신도시2차대방엘리움더센트럴",
    option:"충청남도 / 아파트 / 민간분양",
    address:"충청남도 홍성군 홍북읍 신경리",
    desc1:"831세대",
    desc2:"103㎡ ~ 114㎡",
    desc3:"77㎡ ~ 85㎡",
    desc4:"35,599 ~ 44,049 만원"
  },
  {
    bunyang_id : 1,
    src:ItemImg,
    path:"/MbBunyangDetail",
    number:"2D0000325",
    title:"충남내포신도시2차",
    option:"충청남도 / 테스트 / 테스트",
    address:"충청남도 홍성군 홍북읍 신경리",
    desc1:"500세대",
    desc2:"103㎡ ~ 114㎡",
    desc3:"77㎡ ~ 85㎡",
    desc4:"35,599 ~ 44,049 만원"
  }
]

export default function BunyangList({updatePageIndex,updateModal}){
    return (
      <Container>
{/*Total & Search*/}
        <WrapTotal>
            <ListTop>총 <Green>2</Green>건</ListTop>
            <BunyangSearch>
              <SearchIcon>
                <SearchInput type="text" name="" placeholder="검색어를 입력하세요."></SearchInput>
                <SearchBtn type="button" name=""></SearchBtn>
              </SearchIcon>
            </BunyangSearch>
            <SortRecent>
            <RecentList>
              <RecentSubdepth onClick={() => {updateModal();}}/>
            </RecentList>
          </SortRecent>
        </WrapTotal>
{/*bunyang List*/}
        <WrapList>
          <ListUl>
          {
            BunyangListItem.map((value) => {
              return(
                <Li>
                  <LiTop className="clearfix">
                    <Link to={value.path}>
                      <LiImg src={value.src}/>
                      <LiDesc>
                        <Number>{value.number}</Number>
                        <LiveView>Live 방송 예고</LiveView>
                        <LiTitle>{value.title}</LiTitle>
                        <Option>{value.option}</Option>
                        <Address>{value.address}</Address>
                      </LiDesc>
                    </Link>
                    <LikeBtn>
                      <Like type="checkbox" name="" id="Like1"></Like>
                      <Label for="Like1" className="check_label"></Label>
                    </LikeBtn>
                  </LiTop>
                </Li>
              )
            })
          }
          </ListUl>
        </WrapList>

      </Container>
    );
}

const Container = styled.div`
  width:100%;
`
const ModalTop = styled.div`
  width:100%;
  margin-bottom:22px;
`
const Title = styled.h1`
  font-size:20px;
  color:#707070;
  font-weight:800;
`
const ModalSelect = styled.div`
  width:100%;
  height:calc(100vw*(50/428));
  margin-bottom:calc(100vw*(15/428));
  display:flex;justify-content:center;align-items:center;
`
const WrapTotal = styled.div`
  width:100%;
  height:auto;
  padding:calc(100vw*(15/428)) 0;
  display:flex;justify-content:center;align-items:center;
  border-bottom:1px solid #f2f2f2;
`
const ListTop = styled.div`
  width:auto;text-align:left;
  font-size:calc(100vw*(14/428));color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
`
const Green = styled.span`
  font-size:calc(100vw*(14/428));color:#01684b;margin:0 calc(100vw*(5/428));
  font-weight:800;transform:skew(-0.1deg);
`
const BunyangSearch = styled.div`
  width:calc(100vw*(297/428));height:calc(100vw*(44/428));
  background:#f8f7f7;
  margin-left:calc(100vw*(12/428));
  border-radius:9px;
  padding:0 calc(100vw*(15/428)) 0 calc(100vw*(27/428));
`
const SearchInput = styled.input`
  height:100%;width:95%;
  font-size:calc(100vw*(14/428));
  font-weight:800;
  transform:skew(-0.1deg);
  &::placeholder{font-weight:normal;}
  background:transparent;
`
const SearchIcon = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;height:100%;text-align:center;cursor:pointer;

`
const SearchBtn = styled.button`
  width:calc(100vw*(28/428));height:calc(100vw*(32/428));
  background:url(${IconSearch}) no-repeat center center; background-size:calc(100vw*(16/428));height:calc(100vw*(15/428));
  vertical-align: -webkit-baseline-middle;
`
const WrapItem = styled.div`
`
const ItemList = styled.div`
  font-size:calc(100vw*(12/428));color:#707070;
  text-align:center;cursor:pointer;
  font-weight:600;transform:skew(-0.1deg);
`
const ItemSubdepth = styled.div`
  width:calc(100vw*(30/428));
  height:calc(100vw*(30/428));
  border-radius:4px;border:1px solid #979797;
  text-align-last:center;
  appearance:none;
  background:#f8f7f7;
  font-weight:600;transform:skew(-0.1deg);
`
const SortRecent = styled(WrapItem)`
  border:none;
  width:calc(100vw*(30/428));
  background:none;
`
const RecentList = styled(ItemList)`
  width:calc(100vw*(30/428));height:calc(100vw*(30/428));
`
const RecentSubdepth = styled(ItemSubdepth)`
  width:calc(100vw*(19/428));height:calc(100vw*(19/428));
  background:url(${IconRecent}) no-repeat center center;background-size:100% 100%;
  border:none;
  appearance:none;
  text-align-last:inherit;
  margin-top:calc(100vw*(5/428));
  margin-left:calc(100vw*(10/428));
`

const WrapList = styled.div`
  padding:calc(100vw*(26/428)) calc(100vw*(20/428));

`
const ListUl = styled.ul`
  width:100%;
`
const Li = styled.li`
  width:100%;
  padding-bottom:calc(100vw*(20/428));
  border-bottom:1px solid #b9b9b9;
  margin-bottom:calc(100vw*(20/428));
  &:last-child{border-bottom:none;margin-bottom:0;}
`
const LiTop = styled.div`
  width:100%;
  position:relative;
`
const LiImg = styled.img`
  float:left;
  display:inline-block;
  width:calc(100vw*(106/428));height:calc(100vw*(106/428));border-radius:4px;
  margin-right:calc(100vw*(13/428));
  border:1px solid #e4e4e4;
`
const LiDesc = styled.div`
  float:left;
  margin-left:calc(100vw*(13/428));
  padding-top:calc(100vw*(10/428));
`
const LiTitle = styled.h2`
  font-size:calc(100vw*(14/428));font-weight:800;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:calc(100vw*(7/428));
`
const Number = styled.span`
  font-size:calc(100vw*(14/428));color:#979797;
  display:inline-block;margin-bottom:calc(100vw*(7/428));
  transform:skew(-0.1deg);
  vertical-align:middle;
`
const LiveView = styled.span`
  display:inline-block;
  background:#fe7a01;
  text-align:center;
  color:#fff;font-weight:800;transform:skew(-0.1deg);
  font-size:calc(100vw*(10/428));
  width:calc(100vw*(80/428));
  height:calc(100vw*(22/428));
  line-height:calc(100vw*(23/428));
  border-radius:4px;
  vertical-align:middle;
  margin-bottom:calc(100vw*(7/428));
  margin-left:calc(100vw*(10/428));
`

const Option = styled.div`
  font-size:calc(100vw*(14/428));font-weight:800;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:calc(100vw*(3/428));
`
const Address = styled(Option)`
  color:#707070;
  margin-bottom:0;
`
const LikeBtn = styled.div`
  position:Absolute;
  right:0;
  top:calc(100vw*(-12/428));
`
const Like = styled.input`
  display:none;
  &:checked + .check_label{width:calc(100vw*(29/428));height:calc(100vw*(29/428));background:url(${HeartCheck}) no-repeat center center;background-size:calc(100vw*(17/428)) calc(100vw*(17/428));}
`
const Label = styled.label`
  display:inline-block;
  width:calc(100vw*(29/428));height:calc(100vw*(29/428));
  border:1px solid #d0d0d0;border-radius:3px;
  background:url(${Heart}) no-repeat center center;
  background-size:calc(100vw*(17/428)) calc(100vw*(17/428));
`
const LiBottom = styled.div`
  width:100%;
  background:#f8f7f7;
  padding: calc(100vw*(18/428)) calc(100vw*(27/428));
  margin-top:calc(100vw*(14/428));
`
const Desc = styled.div`
  display:flex;justify-content:space-between;
  align-items:center;
  margin-bottom:calc(100vw*(10/428));
  &:last-child{margin-bottom:0;}
`
const DescTitle = styled.p`
  font-size:calc(100vw*(14/428));color:#4a4a4a;
  text-align:left;
  font-weight:800;transform:skew(-0.1deg);
`
const DescInfo = styled(DescTitle)`
  text-align:right;
`
