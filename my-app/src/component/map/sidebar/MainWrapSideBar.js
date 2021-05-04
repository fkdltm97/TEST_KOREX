//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';

// components
import { Mobile, PC } from "../../../MediaQuery";
import MainSideBar from './MainSideBar';
import SideBarItemDetail from './SideBarItemDetail';
import SideBarBrokerDetail from './SideBarBrokerDetail';

// redux
import { useSelector } from 'react-redux';

import ModalCommon from '../../../component/common/modal/ModalCommon';
import ModalReserve from '../../../component/member/mypage/reservation/ModalReserve';

export default function WrapSideBar({setReport,pageIndex,setPageIndex,reserveModal}) {
  //사이드 내 페이지 이동
  // const [pageIndex , setPageIndex] = useState(0);
  const [historyInfo , setHistoryInfo] = useState({pageIndex:1,prevTab:"",prevIndex:[]});
  const [updown,setUpDown] = useState(false);
  const [click_prdidentityid,setClick_prdidentityid] = useState('');
  const [reservationId,setReservationId] = useState({id:0 ,text:""});

  const mapRightRedux = useSelector(state=>{ return state.mapRight});
  const login_userinfo= useSelector(data => data.login_user);

  const position=()=>{
    if(updown == true) {
      return "absolute"
    }else{
      return "relative"
    }
  }
  const overflow=()=>{
    if(updown == true) {
      return "scroll"
    }else{
      return "hidden"
    }
  }
  const top=()=>{
    if(updown == true) {
      if(mapRightRedux.isExclusive.is){
        return "calc(100vw*(59/428));"
      }else{
        return "calc(100vw*(0/428));"
      }
    }else{
      return "calc(100vw*(-122/428));"
    }
  }
  
  const sendinfo_data={};
  const sendInfo_local = (selectDay,selectTimes,tourid,tourtype) => {
    sendinfo_data['selectDay'] = selectDay;
    sendinfo_data['selectTimes'] = selectTimes;
    sendinfo_data['tourid'] = tourid;
    sendinfo_data['tourtype'] = tourtype;

    console.log('senfInfo_local정보 확인 먼저 저장여부>>>>:',sendinfo_data);
  }

  const pageLoader = (updateReserveModals) =>{
    switch (pageIndex) {
      case 0: return <MainSideBar updatePageIndex={updatePageIndex} historyInfo={historyInfo} setHistoryInfo={setHistoryInfo} updown={updown} setUpDown={setUpDown}/>;
      case 1: return <SideBarItemDetail updatePageIndex={updatePageIndex} historyInfo={historyInfo} setHistoryInfo={setHistoryInfo} setReport={setReport} updateReserveModal={updateReserveModals} click_prdidentityid={click_prdidentityid}/>; //물건 상세페이지
      case 2: return <SideBarBrokerDetail updatePageIndex={updatePageIndex} historyInfo={historyInfo} setHistoryInfo={setHistoryInfo}/>;//전문중개사 상세페이지
      default :return <MainSideBar updatePageIndex={updatePageIndex} setHistoryInfo={setHistoryInfo}/>;
    }
  }
  const updatePageIndex = (index,click_prd_identity_id) =>{
    if(index < 0)
      setPageIndex(0);
    else if(index == 1){
      setPageIndex(1);
      setClick_prdidentityid(click_prd_identity_id);//클릭한 prd_idnentity매물아디값 mainWrapsidebar state상태값으로 관리.
    }
      else if(index == 2)
        setPageIndex(2);
    else
      setPageIndex(index);
  }

  //물건 투어예약 모달창 
  const [reserve,setReserve] = useState(false);
  
  const [modalOption,setModalOption] = useState({show: false,setShow: null, link:'',title:'',submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});

  const offModal = () => {
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show =false;
    setModalOption(option);
  }

  const clickReservation = async () =>{
    console.log('reservationId(선택한 방문예약셋팅날짜):',sendinfo_data);
    
    offModal();
    
    if(login_userinfo.is_login){
      let body_info= {
        selectdate : sendinfo_data.selectDay,
        selectTime: sendinfo_data.selectTimes,
        slectTourid : sendinfo_data.tourid,
        selectTourtype : sendinfo_data.tourtype
      };
      //해당 선택날짜/선택한 시간대, 해당 날짜에 대한 tourId(예약방)에 어떤시간대(자리:요일그룹별,특수추가요일),어떤 방(일반,특별추가)에 요청한건지 구분키위함.
      console.log('JSON_BODY>>>:',JSON.stringify(body_info));
    }else{
      //alert('로그인 상태가 아닙니다.');
    }
  }

  const updateReserveModal = (except_datelist,result_usedatalist) =>{
    console.log('updateReservemodal 예약모달창띄우기 >>> 건내받은 해당 매물의 관련 제외/최종표현 dateList:',except_datelist,result_usedatalist);
    setModalOption({
        show:true,
        setShow:offModal,
        title:"투어예약 진행",
        content:{type:"component",text:`ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ`,component:<ModalReserve sendInfo_local={sendInfo_local} setReservationId={setReservationId} except_datelist={except_datelist} result_usedatalist={result_usedatalist}/>},
        submit:{show:false , title:"" , event : ()=>{offModal(); }},
        cancle:{show:false , title:"" , event : ()=>{offModal(); }},
        confirm:{show:true , title:"확인" , event : clickReservation }
    });
  }

    return (
        <Container pageIndex={pageIndex} position={position} overflow={overflow} top={top}>
        {
          pageLoader(updateReserveModal)
        }
          <ModalCommon modalOption={modalOption}/>
        </Container>
  );
}

const Container = styled.div`
  position:fixed;
  right:0;
  top:80px;
  width:400px;height:100vh;
  padding-bottom:120px;
  overflow-y:scroll;
  content:'';
  background:#fff;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {display: none;}
  @media ${(props) => props.theme.mobile} {
    width:100%;
    position:${({position}) => position};
    overflow-y:${({overflow}) => overflow};
    top:${({top}) => top};
    /* top:calc(100vw*(64/428)); */
    padding-bottom:calc(100vw*(150/428));
    /* overflow-y:hidden; */
    ${({pageIndex})=>{
      return pageIndex != 0 ?
      `
      top:calc(100vw*(0/428));
      `
      :
      `  `
    }}
  }
`
