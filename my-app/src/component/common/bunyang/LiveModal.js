//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//style
import styled from "styled-components"

//img
import CloseIcon from "../../../img/main/modal_close.png";

import ModalCommon from "../modal/ModalCommon";

export default function LiveModal({live, setLive}){
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});

  //여기 두개가 핵심이에여
  //모달 끄는 식
  const offModal = ()=>{
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  }


  //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
    const liveModal = () =>{
      //여기가 모달 키는 거에엽
      setModalOption({
          show:true,
          setShow:offModal,
          title:"Live 시청예약",
          content:{type:"text",text:`Live시청 예약이 정상적으로\n접수되었습니다.\n담당자가 Live방송 시작전에\n초대장을 이메일로 보내드립니다.`},
          submit:{show:false , title:"적용" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"초기화" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
          confirmgreen:{show:true , title:"확인" , event : ()=>{offModal(); }}

      });
    }

  if(live == false)
    return null;
    return (
      <Container>
        <ModalBg onClick={()=>{setLive(false)}}></ModalBg>
        <Wraplive>
            <ModalClose>
                <Link onClick={()=>{setLive(false)}}>
                <CloseImg src={CloseIcon}/>
              </Link>
            </ModalClose>
            <ModalTop>
              <Title>Live 시청예약</Title>
            </ModalTop>
            <ModalBody>
              <Box>
                <BoxTitle>이름</BoxTitle>
                <InputText type="text" name="" placeholder="이름을 입력해 주세요."></InputText>
              </Box>
              <Box>
                <BoxTitle>이메일</BoxTitle>
                <InputText type="email" name="" placeholder="이메일을 입력해 주세요."></InputText>
              </Box>
            </ModalBody>
            <ModalBtn>
              <Confirm type="submit" name="" onClick={() => {liveModal();}}>확인</Confirm>
            </ModalBtn>
        </Wraplive>
        <ModalCommon modalOption={modalOption}/>
      </Container>
    );
}

const Container = styled.div`
  width:100%;

`
const ModalBg = styled.div`
  position:fixed;
  width:100%;height:100%;left:0;top:0;
  display:block;content:'';background:rgba(0,0,0,0.05);
  z-index:1001;
`
const Wraplive = styled.div`
  position:fixed;z-index:1002;
  width:535px;height:auto;
  background:#fff;
  border-radius:24px;
  border:1px solid #f2f2f2;
  left:50%;top:50%;transform:translate(-50%,-50%);
  padding:49px 49px 77px 63px;

  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(395/428));
      height:auto;
      padding:calc(100vw*(24/428)) calc(100vw*(20/428)) calc(100vw*(50/428));
    }
`
const ModalClose = styled.div`
  width:100%;
  text-align:right;
  margin-bottom:22px;

  @media ${(props) => props.theme.modal} {
      margin-bottom:calc(100vw*(25/428));
    }
`
const CloseImg = styled.img`
  display:inline-block;
  width:15px;height:16px;


  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(12/428));
      height:calc(100vw*(13/428));
    }
`
const ModalTop = styled.div`
  width:100%;padding-bottom:20px;
  border-bottom:1px solid #a3a3a3;


  @media ${(props) => props.theme.modal} {
      padding-bottom:calc(100vw*(15/428));
    }
`
const Title = styled.div`
  font-size:20px;
  font-weight:800;
  color:#707070;


  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(15/428));
    }
`
const ModalBody = styled.div`
  width:100%;
  padding-top:11px;

  @media ${(props) => props.theme.modal} {
      padding-top:calc(100vw*(14/428));
    }
`
const Box = styled.div`
  width:100%;
  margin-bottom:14px;
  &:last-child{margin-bottom:0;}


  @media ${(props) => props.theme.modal} {
      margin-bottom:calc(100vw*(15/428));
    }
`
const BoxTitle = styled.p`
  font-size:12px;color:#4a4a4a;
  margin-bottom:9px;
  padding-left:7px;


  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(12/428));
      margin-bottom:calc(100vw*(9/428));
      padding-left:calc(100vw*(7/428));
    }
`
const InputText = styled.input`
  font-size:15px;color:#979797;
  transform:skew(-0.1deg);
  text-align:center;
  width:100%;
  height:43px;
  line-height:43px;
  border:1px solid #e4e4e4;
  &::placeholder{font-size:15px;color:#979797;}

  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(14/428));
      height:calc(100vw*(43/428));
      line-height:calc(100vw*(43/428));
      &::placeholder{font-size:calc(100vw*(14/428));}
    }
`

const ModalBtn = styled.div`
    width:100%;
    margin-top:40px;
    @media ${(props) => props.theme.modal} {
      margin-top:calc(100vw*(40/428));
    }
`
const Confirm = styled.div`
    width:100%;text-align:center;
    background:#979797;
    border:3px solid #e4e4e4;
    border-radius:11px;
    height:66px;
    line-height:60px;
    color:#fff;cursor:pointer;
    font-size:20px;font-weight:600;
    @media ${(props) => props.theme.modal} {
      height:calc(100vw*(60/428));
      line-height:calc(100vw*(54/428));
      font-size:calc(100vw*(15/428));
    }
`
