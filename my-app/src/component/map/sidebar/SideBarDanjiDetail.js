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

const tableList =[
  {
    t_id : 0,
    date:"21.02.01",
    trade:"매매",
    price:"18억,2000",
    floor:"7층"
  },
  {
    t_id : 1,
    date:"21.02.01",
    trade:"매매",
    price:"18억,2000",
    floor:"7층"
  },
  {
    t_id : 2,
    date:"21.02.01",
    trade:"전세",
    price:"18억,2000",
    floor:"7층"
  },
  {
    t_id : 3,
    date:"21.02.01",
    trade:"월세",
    price:"18억,2000",
    floor:"7층"
  }
]

const widthListItem =[
  {
    w_id : 0,
    width:"92m²"
  },
  {
    w_id : 1,
    width:"99m²"
  },
  {
    w_id : 2,
    width:"122m²"
  },
  {
    w_id : 3,
    width:"126m²"
  },
  {
    w_id : 4,
    width:"167m²"
  },
  {
    w_id : 5,
    width:"174m²"
  },
  {
    w_id : 6,
    width:"180m²"
  },
]


export default function SideItemDetail({openBunyang, rank, updatePageIndex,historyInfo, map,setMap}) {


  const [topDesc, setTopDesc] = useState({
    title:"",
    acceptDate:"",
    danji:"",
    address:"",
  });
  const [isArea, setIsArea] = useState(false);
  const [area,setArea] = useState([]);
  const [areaIndex,setAreaIndex] = useState(0);
  const [list, setList] = useState([]);
  const [danjiDesc, setDanjiDesc] = useState([]);
  const [typeIndex, setTypeIndex] = useState(0);

  // **api 클릭한 아이디를 통하여 서버에서 데이터를 가져와야 합니다.
  useEffect(() => {
    setArea(widthListItem);
    setList(tableList);
    setTopDesc({
      title:"SM 드림빌",
      acceptDate:"2017.04.14",
      danji:150,
      address:"서울특별시 강남구 삼성동 200-13",
    })
    setDanjiDesc({
      area:"60/52.89m²",
      typeNum:"2/1개",
    })
    setIsArea(true);

  }, []);

  // 면적 정보
  useEffect(() => {
    console.log(areaIndex);
  }, [areaIndex])

  // 실거래가 전세/매매/전월세
  useEffect(() => {
    console.log(typeIndex);
  }, [typeIndex])

  return (
    <Container>
      <SideSubTitle title={topDesc.title} updatePageIndex={updatePageIndex}  historyInfo={historyInfo}/>{/*상단 타이틀은 subtitle폴더에 컴포넌트로 뺐습니다*/}
      <TopInfo>
        <FirstLine>
          <FirstDate>{topDesc.acceptDate} 사용승인</FirstDate>
          <Danji>{topDesc.danji}세대</Danji>
        </FirstLine>
        <SecondLine>
          <Address onClick={()=>{setMap(true)}}>{topDesc.address}</Address>
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
        <DanjiDetailTabContent isArea={isArea} area={area} areaIndex={areaIndex} setAreaIndex={setAreaIndex}/>
        <DanjiDetailView list={list} danjiDesc={danjiDesc} typeIndex={typeIndex} setTypeIndex={setTypeIndex}/>
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
