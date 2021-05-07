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
import { MapProductEls } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

import ModalCommon from '../../../component/common/modal/ModalCommon';
import ModalReserve from '../../../component/member/mypage/reservation/ModalReserve';

export default function WrapSideBar({setReport,pageIndex,setPageIndex,reserveModal, status}) {
  //사이드 내 페이지 이동
  // const [pageIndex , setPageIndex] = useState(0);
  const [historyInfo , setHistoryInfo] = useState({pageIndex:1,prevTab:"",prevIndex:[]});
  const [updown,setUpDown] = useState(false);
  const [click_prdidentityid,setClick_prdidentityid] = useState('');

  const productRedux = useSelector(state=>{ return state.mapProductEls});
  const mapRightRedux = useSelector(state=>{ return state.mapRight});
  
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

  const pageLoader = (updateReserveModals) =>{
    switch (pageIndex) {
      case 0: return <MainSideBar status={status} updatePageIndex={updatePageIndex} historyInfo={historyInfo} setHistoryInfo={setHistoryInfo} updown={updown} setUpDown={setUpDown}/>;
      case 1: return <SideBarItemDetail updatePageIndex={updatePageIndex} historyInfo={historyInfo} setHistoryInfo={setHistoryInfo} setReport={setReport} updateReserveModal={reserveModal} click_prdidentityid={click_prdidentityid}/>; //물건 상세페이지
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
  const updateReserveModal = () =>{
    console.log('updateReservemodal 예약모달창띄우기');
    setModalOption({
        show:true,
        setShow:offModal,
        title:"투어예약 진행",
        content:{type:"component",text:`ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ`,component:<ModalReserve/>},
        submit:{show:false , title:"" , event : ()=>{offModal(); }},
        cancle:{show:false , title:"" , event : ()=>{offModal(); }},
        confirm:{show:true , title:"확인" , event : ()=>{offModal(); }}

    });
  }

   
  // 무한 스크롤 구현 
  const onScrollList = () => {
    const sideBarWrap = document.querySelector(".sideBarWrap");
    
    // 무한스크롤 넉넉
    // if(sideBarWrap.scrollHeight <= sideBarWrap.scrollTop+sideBarWrap.clientHeight + 100){
    // 무한스크롤 빡빡
    if(sideBarWrap.scrollHeight == sideBarWrap.scrollTop+sideBarWrap.clientHeight){
      // **api 서버에서 데이터 가져와서 배열에 추가하기 
      const currentArr = JSON.parse(JSON.stringify(productRedux.exclusive));
      console.log(currentArr);
      currentArr.push({
        item_id : 10,
        path:"/",
        startDate:"20.00.00",
        endDate: "20.00.00",
        kind:"아파트",
        detail:`새로운 자이 111동`,
        type:"전세",
        price:`111억 5,000`,
        floor:"층수",
        area:"공급면적",
        expenses:"관리비",
        desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
      })
      MapProductEls.updateExclusive({ exclusive : currentArr });
      console.log("end");
    }

  }

  

    return (
        <Container pageIndex={pageIndex} position={position} overflow={overflow} top={top} className="sideBarWrap" onScroll={() => onScrollList()}>
        {
          pageLoader(updateReserveModal)
        }
          <ModalCommon modalOption={modalOption}/>
        </Container>
  );
}

const Container = styled.div`
  box-shadow:  -10px 0px 5px rgba(0, 0, 0, 0.16);
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
