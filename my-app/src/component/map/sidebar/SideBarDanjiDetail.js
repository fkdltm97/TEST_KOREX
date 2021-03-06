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

export default function SideItemDetail({openBunyang, rank, updatePageIndex,historyInfo, map,setMap,setDangimap_data}) {

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
  const [areainfo_structure,setAreainfo_structure] = useState([]);
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

        if(res_result.result){
          var complex_data= res_result.result[0][0];//어차피 하나이기에.
          var complex_total_sadecnt = res_result.result[1][0];//해당 단지에 대한 총 세대수
          var areainfo_info_structure = res_result.result[2];          
        }
     }
    // 면적 단위 
    /*setArea(  
      areainfo_array    
    );*/
    // 계약일, 거래유형, 거래금액, 층수 정보 각 면적별 정보리스트저장. 
    setAreainfo_structure(areainfo_info_structure);
    setAreaIndex(0);
    // 상단 설명
    setTopDesc({
      x:complex_data.x,
      y:complex_data.y,
      title:complex_data.complex_name, // 제목
      acceptDate:complex_data.approval_date, // 날짜
      danji:complex_total_sadecnt['cnt'], // 세대 수
      address:complex_data.addr_jibun, // 주소
      roadAddress:complex_data.addr_road // 도로명 주소
    })
    // 단지 내 면적별 정보 정보
    setDanjiDesc({
      area: parseFloat(areainfo_info_structure[0]['info']['supply_area']).toFixed(3)+'/'+parseFloat(areainfo_info_structure[0]['info']['exclusive_area']).toFixed(3), // 공급/전용면적
      typeNum:areainfo_info_structure[0]['sadecnt'], // 해당타입세대수
    });
    //단지 내 면적별 거래 정보 초기값 전세유형, 유형별로매번 바뀔수있음.
    //기본값은 전세거래타입 결과배열의 각 정보들 전세거래정보들 불러온다.
    var default_jeonse_list=[];
    for(let d=0; d<areainfo_info_structure[0]['jeonsetransaction'].length; d++){
      default_jeonse_list[d]={};
      default_jeonse_list[d]['contract_ym'] = areainfo_info_structure[0]['jeonsetransaction'][d]['contract_ym'];
      default_jeonse_list[d]['contract_dt'] = areainfo_info_structure[0]['jeonsetransaction'][d]['contract_dt'];
      default_jeonse_list[d]['type'] = areainfo_info_structure[0]['jeonsetransaction'][d]['type'];
      default_jeonse_list[d]['deposit'] = areainfo_info_structure[0]['jeonsetransaction'][d]['deposit'];
      default_jeonse_list[d]['floor'] = areainfo_info_structure[0]['jeonsetransaction'][d]['floor'];
    }
    setList(
      //계약일, 거래유형, 거래금액, 층수 정보
      //conract_ym, contract_dt, type, deposit, floor
      default_jeonse_list
    );
    setIsArea(true);
  }, []);

  
  // **api  서버에 정보를 보내 해달 정보를 받아온다.
  // 처음에 정보들을 다 받아와도 괜찮을 것 같습니다.
  //useEffect(() => {
    // console.log(areaIndex); // 면적별 정보의 id 값
    // console.log(typeIndex); // 0 전세, 1 매매, 2 전월세
    // setList([]);
  //}, [areaIndex, typeIndex])

  return (
    <Container>
      <SideSubTitle title={topDesc.title} updatePageIndex={updatePageIndex}  historyInfo={historyInfo}/>{/*상단 타이틀은 subtitle폴더에 컴포넌트로 뺐습니다*/}
      <TopInfo>
        <FirstLine>
          <FirstDate>{topDesc.acceptDate} 사용승인</FirstDate>
          <Danji>{topDesc.danji}세대</Danji>
        </FirstLine>
        <SecondLine>
          <Address onClick={()=>{setMap(true); setDangimap_data({address:topDesc.address, roadaddress:topDesc.roadAddress, x: topDesc.x, y:topDesc.y})}}>{isAddress?topDesc.address:topDesc.roadAddress}</Address>
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
        <DanjiDetailTabContent setDanjiDesc={setDanjiDesc} setList={setList} areainfo_structure={areainfo_structure} isArea={isArea} areaIndex={areaIndex} setAreaIndex={setAreaIndex}setTypeIndex={setTypeIndex} isWidth={isWidth}/>
        <DanjiDetailView topDesc={topDesc} list={list} areaIndex={areaIndex} setList={setList} danjiDesc={danjiDesc} areainfo_structure={areainfo_structure} typeIndex={typeIndex} setTypeIndex={setTypeIndex}/>
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
