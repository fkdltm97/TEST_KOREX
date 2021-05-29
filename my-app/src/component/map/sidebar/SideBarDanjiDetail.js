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

// redux
import { MapProductEls } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

//server
import serverController from '../../../server/serverController';

SwiperCore.use([Navigation, Pagination]);

export default function SideItemDetail({openBunyang, rank, updatePageIndex,historyInfo, map,setMap}) {

  const [topDesc, setTopDesc] = useState({
    title:"",
    acceptDate:"",
    danji:"",
    address:"",
  });
  const [isArea, setIsArea] = useState(false); // isArea가 없으면 슬라이더가 깨집니다.
  const [area,setArea] = useState([]); // 면적 단위 정보
  const [areaIndex,setAreaIndex] = useState(0); // 면적 단위 정보 클릭
  const [list, setList] = useState([]);  // 계약일, 거래유형, 거래금액, 층수 정보
  const [danjiDesc, setDanjiDesc] = useState([]); // 면적, 세대수
  const [typeIndex, setTypeIndex] = useState(0); // 전세, 매매, 월세
  const [isAddress, setIsAddress] = useState(true); // 삳단 주소 <-> 도로명주소
  const [isWidth, setIsWidth] = useState(true); // 면적 단위 평 <-> m²

  const productRedux = useSelector(state=>{ return state.mapProductEls});

  // **api 클릭한 아이디를 통하여 서버에서 데이터를 가져와야 합니다.
  useEffect(async () => {
     console.log(productRedux.clickBlo);

     let body_info = {
       complex_id : productRedux.clickBlo
     };
     let res_result=await serverController.connectFetchController('/api/matterial/complexdetail_infoget','POST',JSON.stringify(body_info));

     if(res_result){
        console.log('==>>>sidebardandetail페잊 ㅣ실행되며 로드시점 서버에 요청, 해당 단지관련 모드넞ㅇ보:',res_result);

        var complex_data= res_result.result[0][0];//어차피 하나이기에.
        var transaction_actual_price_data=res_result.result[1];//배열.
     }
    // 면적 단위 
    setArea([
      {
        w_id : 0, // 아이디
        width:"92", //  m² 면적 
        widthPyeong:"35", // 평수 면적
      },
      {
        w_id : 1,
        width:"99",
        widthPyeong:"40",
      },
      {
        w_id : 2,
        width:"122",
        widthPyeong:"45",
      },
      {
        w_id : 3,
        width:"126",
        widthPyeong:"50",
      },
      {
        w_id : 4,
        width:"167",
        widthPyeong:"55",
      },
      {
        w_id : 5,
        width:"174",
        widthPyeong:"60",
      },
      {
        w_id : 6,
        width:"180",
        widthPyeong:"65",
      }
    ]);
    // 계약일, 거래유형, 거래금액, 층수 정보
    setList([
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
    ]);
    // 상단 설명
    setTopDesc({
      title:complex_data.complex_name, // 제목
      acceptDate:complex_data.approval_date, // 날짜
      danji:150, // 세대 수
      address:complex_data.addr_jibun, // 주소
      roadAddress:complex_data.addr_road // 도로명 주소
    })
    // 단지 내 면적별 정보 정보
    setDanjiDesc({
      area:"60/52.89m²", // 공급/전용면적
      typeNum:"2/1개", // 해당타입세대수
    })
    setIsArea(true);
  }, []);

  
  // **api  서버에 정보를 보내 해달 정보를 받아온다.
  // 처음에 정보들을 다 받아와도 괜찮을 것 같습니다.
  useEffect(() => {
    // console.log(areaIndex); // 면적별 정보의 id 값
    // console.log(typeIndex); // 0 전세, 1 매매, 2 전월세
    // setList([]);
  }, [areaIndex, typeIndex])

  return (
    <Container>
      <SideSubTitle title={topDesc.title} updatePageIndex={updatePageIndex}  historyInfo={historyInfo}/>{/*상단 타이틀은 subtitle폴더에 컴포넌트로 뺐습니다*/}
      <TopInfo>
        <FirstLine>
          <FirstDate>{topDesc.acceptDate} 사용승인</FirstDate>
          <Danji>{topDesc.danji}세대</Danji>
        </FirstLine>
        <SecondLine>
          <Address onClick={()=>{setMap(true)}}>{isAddress?topDesc.address:topDesc.roadAddress}</Address>
          <ChangeAddress onClick={() => setIsAddress(!isAddress)}>
            <ChangeImg src={Change}/>
            <Span>도로명</Span>
          </ChangeAddress>
        </SecondLine>
      </TopInfo>
      <DanjiInfo>
        <DanjiTitle>
          <Txt>단지 내 면적별 정보</Txt>
          <ChangeM2 onClick={() => setIsWidth(!isWidth)}>
            <ChangeImg src={Change}/>
            <Span>평</Span>
          </ChangeM2>
        </DanjiTitle>
        {/*컴포넌트! map > sidebar > tabcontent*/}
        <DanjiDetailTabContent isArea={isArea} area={area} areaIndex={areaIndex} setAreaIndex={setAreaIndex} isWidth={isWidth}/>
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
