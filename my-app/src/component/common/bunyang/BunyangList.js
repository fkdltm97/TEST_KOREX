//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//style
import styled from "styled-components"

//img
import ItemImg from "../../../img/main/item01.png";
import Heart from "../../../img/main/heart.png";
import HeartCheck from "../../../img/main/heart_check.png";
import IconSearch from "../../../img/main/icon_search.png";
import IconRecent from "../../../img/main/icon_view.png";

export default function BunyangList({updatePageIndex}){
  /*물건종류*/
  const [item,setItem] = useState(false);
  const [trade,setTrade] = useState(false);
  const [price,setPrice] = useState(false);
  const [width,setWidth] = useState(false);
  const [menu,setMenu] = useState(false);

  const showItem =()=>{
    setItem(!item);
  }
  const showTrade =()=>{
    setTrade(!trade);
  }
  const showPrice =()=>{
    setPrice(!price);
  }
  const showWidth =()=>{
    setWidth(!width);
  }
  const showMenu =()=>{
    setMenu(!menu);
  }

    return (
      <Container>
{/*bunyangtop*/}
      <ModalTop>
        <Title>분양</Title>
      </ModalTop>
{/*bunyang select*/}
      <ModalSelect>
        <SearchIcon>
          <SearchImage src={IconSearch} alt="search"/>
        </SearchIcon>
        <WrapItem>
          <ItemList>
            <Link onClick={showItem}>
              <Span>물건종류</Span>
            {
              item ?
              <ItemSubdepth>
                <ItemSubList>물건종류1</ItemSubList>
                <ItemSubList>물건종류2</ItemSubList>
                <ItemSubList>물건종류3</ItemSubList>
              </ItemSubdepth>
              :
              null
            }
            </Link>
          </ItemList>
        </WrapItem>
        <WrapTread>
          <TreadList>
            <Link onClick={showTrade}>
              <Span>거래유형</Span>
              {
                trade ?
                <TreadSubdepth>
                  <TreadSubList>거래유형1</TreadSubList>
                  <TreadSubList>거래유형2</TreadSubList>
                  <TreadSubList>거래유형3</TreadSubList>
                </TreadSubdepth>
                :
                null
              }
            </Link>
          </TreadList>
        </WrapTread>
        <WrapPrice>
          <PriceList>
            <Link onClick={showPrice}>
              <Span>가격</Span>
              {
                price ?
                <PriceSubdepth>
                  <PriceSubList>가격1</PriceSubList>
                  <PriceSubList>가격2</PriceSubList>
                  <PriceSubList>가격3</PriceSubList>
                </PriceSubdepth>
                :
                null
              }
            </Link>
          </PriceList>
        </WrapPrice>
        <WrapWidth>
          <WidthList>
            <Link onClick={showWidth}>
              <Span>면적</Span>
            {
              width ?
              <WidthSubdepth>
                <WidthSubList>면적1</WidthSubList>
                <WidthSubList>면적2</WidthSubList>
                <WidthSubList>면적3</WidthSubList>
              </WidthSubdepth>
              :
              null
            }
            </Link>
          </WidthList>
        </WrapWidth>
        <SortRecent>
          <RecentList>
            <Link onClick={showMenu}>
              <Span><RecentImg src={IconRecent}/></Span>
            {
              menu ?
              <RecentSubdepth>
                <ReceentSubList>최신순</ReceentSubList>
                <ReceentSubList>과거순</ReceentSubList>
              </RecentSubdepth>
              :
              null
            }

            </Link>
          </RecentList>
        </SortRecent>
      </ModalSelect>
{/*bunyang List*/}
        <ListTop>총 <Green>2</Green>건</ListTop>
        <WrapList>
          <ListUl>
            <Li>
              <LiTop className="clearfix">
                <Link onClick={() => {updatePageIndex(1)}}>
                  <LiImg src={ItemImg}/>
                  <LiDesc>
                    <LiTitle>
                    충남내포신도시2차대방엘리움더센트럴
                    <Number>2D0000324</Number>
                    <LiveView>Live 방송 예고</LiveView>
                    </LiTitle>
                    <Option>충청남도 / 아파트 / 민간분양</Option>
                    <Address>충청남도 홍성군 홍북읍 신경리</Address>
                  </LiDesc>
                </Link>
                <LikeBtn>
                  <Like type="checkbox" name="" id="Like1"></Like>
                  <Label for="Like1" className="check_label"></Label>
                </LikeBtn>
              </LiTop>
              <LiBottom>
                <Desc>
                  <DescTitle>분양세대</DescTitle>
                  <DescInfo>831세대</DescInfo>
                </Desc>
                <Desc>
                  <DescTitle>분양면적</DescTitle>
                  <DescInfo>103㎡ ~ 114㎡</DescInfo>
                </Desc>
                <Desc>
                  <DescTitle>전용면적</DescTitle>
                  <DescInfo>77㎡ ~ 85㎡</DescInfo>
                </Desc>
                <Desc>
                  <DescTitle>분양가격</DescTitle>
                  <DescInfo>35,599 ~ 44,049 만원</DescInfo>
                </Desc>
              </LiBottom>
            </Li>
            <Li>
              <LiTop className="clearfix">
                <Link onClick={() => {updatePageIndex(1)}}>
                  <LiImg/>
                  <LiDesc>
                    <LiTitle>충남내포신도시2차대방엘리움더센트럴<Number>2D0000324</Number></LiTitle>
                    <Option>충청남도 / 아파트 / 민간분양</Option>
                    <Address>충청남도 홍성군 홍북읍 신경리</Address>
                  </LiDesc>
                </Link>
                <LikeBtn>
                  <Like type="checkbox" name="" id="Like1"></Like>
                  <Label for="Like1" className="check_label"></Label>
                </LikeBtn>
              </LiTop>
              <LiBottom>
                <Desc>
                  <DescTitle>분양세대</DescTitle>
                  <DescInfo>831세대</DescInfo>
                </Desc>
                <Desc>
                  <DescTitle>분양면적</DescTitle>
                  <DescInfo>103㎡ ~ 114㎡</DescInfo>
                </Desc>
                <Desc>
                  <DescTitle>전용면적</DescTitle>
                  <DescInfo>77㎡ ~ 85㎡</DescInfo>
                </Desc>
                <Desc>
                  <DescTitle>분양가격</DescTitle>
                  <DescInfo>35,599 ~ 44,049 만원</DescInfo>
                </Desc>
              </LiBottom>
            </Li>
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
  @media ${(props) => props.theme.container} {
      margin-bottom:calc(100vw*(22/1436));
    }
`
const Title = styled.h1`
  font-size:20px;
  color:#707070;
  font-weight:800;
  padding-left:20px;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }
`
const ModalSelect = styled.div`
  width:100%;
  height:68px;
  padding-top:20px;
  display:flex;justify-content:center;align-items:flex-start;
  background:#f8f7f7;border-top:1px solid #b9b9b9;

`
const SearchIcon = styled.div`
  width:30px;height:30px;text-align:center;
  margin-right:32px;cursor:pointer;
`
const SearchImage = styled.img`
  width:19px;height:18px;
  vertical-align: -webkit-baseline-middle;
`
const WrapItem = styled.ul`
  width:81px;
  border-radius:4px;border:1px solid #979797;
  padding:6px 0;
  margin-right:5px;
  background:#fff;
  text-align:center;
  position:relative;
  z-index:2;
`
const ItemList = styled.li`
  position:relative;
  font-size:13px;color:#707070;
  text-align:center;cursor:pointer;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(13/1436));
    }

`
const Span = styled.span`
  font-size:13px;color:#707070;
  text-align:center;cursor:pointer;
  font-weight:600;transform:skew(-0.1deg);

`
const ItemSubdepth = styled.ul`
  width:100%;height:auto;
  margin-top:5px;
`
const ItemSubList = styled.li`
  font-size:13px;color:#707070;
  text-align:center;
  font-weight:600;transform:skew(-0.1deg);
  cursor:pointer;
  padding:4px 0;
  &:hover{background:#f8f7f7;}
`
const WrapTread = styled(WrapItem)`
`
const TreadList = styled(ItemList)`
`
const TreadSubdepth = styled(ItemSubdepth)`
`
const TreadSubList = styled(ItemSubList)`
`
const WrapPrice = styled(WrapItem)`
`
const PriceList = styled(ItemList)`
`
const PriceSubdepth = styled(ItemSubdepth)`
`
const PriceSubList = styled(ItemSubList)`
`
const WrapWidth = styled(WrapItem)`
  margin-right:30px;
`
const WidthList = styled(ItemList)`
`
const WidthSubdepth = styled(ItemSubdepth)`
`
const WidthSubList = styled(ItemSubList)`
`
const SortRecent = styled(WrapItem)`
  border:none;
  padding:0;background:none;
`
const RecentList = styled(ItemList)`
  width:30px;height:30px;padding:0;

`
const RecentImg = styled.img`
  width:19px;height:19px;vertical-align: -webkit-baseline-middle;

`
const RecentSubdepth = styled(ItemSubdepth)`
  position:Absolute;left:35px;top:0;background:#fff;
  border-radius:8px;border:1px solid #707070;
  width:70px;
`
const ReceentSubList = styled(ItemSubList)`
  font-size:13px;
  padding:8px 15px;border-radius:8px;
`
const ListTop = styled.div`
  width:100%;text-align:left;
  padding-left:26.5px;
  font-size:20px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  padding-bottom:19px;
  margin-top:19px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }
`
const Green = styled.span`
  font-size:20px;color:#01684b;margin:0 5px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }
`
const WrapList = styled.div`
  padding:20px 17.5px 20px 35px;
  height:395px;
  overflow-y:scroll;
  scrollbar:auto;
  @media ${(props) => props.theme.container} {
      height:calc(100vw*(395/1436));
    }
`
const ListUl = styled.ul`
  width:100%;
`
const Li = styled.li`
  width:100%;
  padding-bottom:11px;
  border-bottom:1px solid #b9b9b9;
  margin-bottom:11px;
  &:last-child{border-bottom:none;margin-bottom:0;}
`
const LiTop = styled.div`
  width:100%;
  position:relative;
`
const LiImg = styled.img`
  float:left;
  display:inline-block;
  width:106px;height:106px;border-radius:4px;
  margin-right:38px;
  border:1px solid #e4e4e4;
`
const LiDesc = styled.div`
  float:left;
  padding-top:10px;
`
const LiTitle = styled.h2`
  font-size:18px;font-weight:800;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:10px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
      margin-bottom:calc(100vw*(10/1436));
    }
`
const Number = styled.span`
  font-size:14px;color:#979797;
  display:inline-block;margin-left:15px;
  margin-right:23px;
  vertical-align:baseline;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(15/1436));
    }
`
const LiveView = styled.span`
  display:inline-block;
  width:82px;height:25px;border-radius:8px;
  line-height:25px;
  background:#fe7a01;
  text-align:center;
  font-size:10px;
  cursor:pointer;
  color:#fff;font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(10/1436));
      width:calc(100vw*(100/1436));
      height:calc(100vw*(25/1436));
      line-height:calc(100vw*(25/1436));
      border-radius:4px;
    }
  @media ${(props) => props.theme.mobile} {
    position:absolute;left:calc(100vw*(90/428));top:calc(100vw*(-8/428));
    width:calc(100vw*(82/428));height:calc(100vw*(25/428));
    line-height:calc(100vw*(25/428));
    font-size:calc(100vw*(10/428));
    }
`

const Option = styled.div`
  font-size:15px;font-weight:800;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:3px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(16/1436));
    }
`
const Address = styled(Option)`
  color:#707070;
  margin-bottom:0;
`
const LikeBtn = styled.div`
  position:Absolute;
  right:0;
  top:10px;
`
const Like = styled.input`
  display:none;
  &:checked + .check_label{width:29px;height:29px;background:url(${HeartCheck}) no-repeat center center;background-size:17px 17px;}
`
const Label = styled.label`
  display:inline-block;
  width:29px;height:29px;
  border:1px solid #d0d0d0;border-radius:3px;
  background:url(${Heart}) no-repeat center center;
  background-size:17px 17px;
`
const LiBottom = styled.div`
  width:100%;
  background:#f8f7f7;
  padding: 29px 70px 34px 51px;
  margin-top:10px;
`
const Desc = styled.div`
  display:flex;justify-content:space-between;
  align-items:center;
  margin-bottom:8px;
`
const DescTitle = styled.p`
  font-size:15px;color:#4a4a4a;
  text-align:left;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(16/1436));
    }
`
const DescInfo = styled(DescTitle)`
  text-align:right;
`
