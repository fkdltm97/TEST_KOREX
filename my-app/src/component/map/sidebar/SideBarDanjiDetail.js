//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//img
import Arrow from "../../../img/map/filter_next.png";
import Detail from "../../../img/map/detail_img.png";
import Trade from "../../../img/map/trade.png";
import Report from "../../../img/map/report.png";
import Change from "../../../img/member/change.png";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';


// components
import { Mobile, PC } from "../../../MediaQuery";
import SideSubTitle from "./subtitle/SideSubTitle";
import DanjiDetailTabContent from "./tabcontent/DanjiDetailTabContent";
import DanjiDetailView from "./tabcontent/DanjiDetailView";

SwiperCore.use([Navigation, Pagination]);
export default function SideItemDetail({openBunyang, rank, updatePageIndex,historyInfo, map,setMap}) {

    return (
        <Container>
          <SideSubTitle title={"SM 드림빌"} updatePageIndex={updatePageIndex}  historyInfo={historyInfo}/>{/*상단 타이틀은 subtitle폴더에 컴포넌트로 뺐습니다*/}
          <TopInfo>
            <FirstLine>
              <FirstDate>2017.04.14 사용승인</FirstDate>
              <Danji>150세대</Danji>
            </FirstLine>
            <SecondLine>
              <Address onClick={()=>{setMap(true)}}>서울특별시 강남구 삼성동 200-13</Address>
              <ChangeAddress>
                <ChangeImg src={Change}/>
                <Span>도로명</Span>
              </ChangeAddress>
            </SecondLine>
          </TopInfo>
          <DanjiInfo>
            <DanjiTitle>
              <Txt>단지 내 면적별 정보</Txt>
              <ChangeM2>
                <ChangeImg src={Change}/>
                <Span>평</Span>
              </ChangeM2>
            </DanjiTitle>
            {/*컴포넌트! map > sidebar > tabcontent*/}
            <DanjiDetailTabContent/>
            <DanjiDetailView/>
          </DanjiInfo>
        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
const TopInfo = styled.div`
  width:100%;
  text-align:center;
  padding:21px 0 23px;
  border-bottom:8px solid #e4e4e4;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(20/428)) 0;
  }
`
const FirstLine = styled.div`
  display:flex;justify-content:center;align-items:center;
  margin-bottom:8px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(5/428));
  }
`
const FirstDate = styled.p`
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const Danji = styled(FirstDate)`
`
const SecondLine = styled(FirstLine)`
  margin-bottom:0;
`
const Address = styled(FirstDate)`
  text-decoration:underline;
  cursor:pointer;
`
const ChangeAddress = styled.div`
  margin-left:10px;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(10/428));
  }
`
const ChangeImg = styled.img`
  display:inline-block;width:13px;
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(13/428));
  }
`
const Span = styled.span`
  display:inline-block;
  margin-left:6px;
  font-size:10px;font-weight:800;transform:skew(-0.1deg);
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(10/428));
    margin-left:calc(100vw*(5/428));
  }
`
const DanjiInfo = styled.div`
  padding:28px 22px 0;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(23/428)) 0 0;
  }

`
const DanjiTitle = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
`
const Txt = styled.h2`
  padding-left:22px;
  font-size:20px;font-weight:800;
  transform:skew(-0.1deg);color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    padding-left:calc(100vw*(36/428));
    font-size:calc(100vw*(20/428));
  }
`
const ChangeM2 = styled.div`
  margin-left:15px;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(10/428));
  }
`
