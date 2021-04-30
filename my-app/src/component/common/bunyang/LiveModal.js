//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//style
import styled from "styled-components"

//img
import CloseIcon from "../../../img/main/modal_close.png";
import Check from "../../../img/member/check.png";
import Checked from "../../../img/member/checked.png";


import ModalCommon from '../modal/ModalCommon';

export default function LiveModal({cal, setCal,live, setLive}){


  const [modalOption,setModalOption] = useState({
    show : false,
    setShow:null,
    link:"",
    title:"",
    submit:{},
    cancle:{},
    confirm:{},
    confirmgreennone:{},
    content:{}
  });

  const offModal = ()=>{
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  }

const confirmtext = 'Live시청 예약이 정상적으로 접수되었습니다.\n담당자가 Live방송 시작전에 \n 초대장을 이메일로 보내드립니다.'


//등록되었습니다 모달
const comfirmModal= () =>{
  console.log("작동");
  console.log(modalOption);
  setModalOption({
      show:true,
      setShow:offModal,
      title:"등록",
      content:{type:"text",text:`${confirmtext}.`,component:""},
      submit:{show:false , title:"" , event : ()=>{offModal(); }},
      cancle:{show:false , title:"" , event : ()=>{offModal(); }},
      confirm:{show:true , title:"확인" , event : ()=>{offModal();setLive(false)}},
      confirmgreennone:{show:false , title:"확인" , event : ()=>{offModal();setCal(false)}}
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
              <Checkbox>
                <CheckInput type="checkbox" name="" id="Check"></CheckInput>
                <Label for="Check" className="check_label">
                  <Span className="chk_on_off"></Span>
                  개인정보 수집 또는 이용동의
                </Label>
                <ViewTerm>
                  <Link>
                    자세히보기
                  </Link>
                </ViewTerm>
              </Checkbox>
            </ModalBody>
            <ModalBtn>
              <Confirm type="submit" name=""onClick={()=>{comfirmModal();}}>확인</Confirm>
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
  width:535px;height:520px;
  background:#fff;
  border-radius:24px;
  border:1px solid #f2f2f2;
  left:50%;top:50%;transform:translate(-50%,-50%);
  padding:49px 49px 77px 63px;
  @media ${(props) => props.theme.container} {
        width:calc(100vw*(535/1436));
        height:calc(100vw*(520/1436));
    }

  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(395/428));
      height:auto;
      padding:calc(100vw*(24/428)) calc(100vw*(20/428)) calc(100vw*(50/428));
    }
`
const ModalClose = styled.div`
  width:100%;
  text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.container} {
        margin-bottom:calc(100vw*(22/1436));
    }

  @media ${(props) => props.theme.mobile} {
      margin-bottom:calc(100vw*(25/428));
    }
`
const CloseImg = styled.img`
  display:inline-block;
  width:15px;height:16px;
  @media ${(props) => props.theme.container} {
        width:calc(100vw*(15/1436));
        height:calc(100vw*(16/1436));
    }

  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(12/428));
      height:calc(100vw*(13/428));
    }
`
const ModalTop = styled.div`
  width:100%;padding-bottom:20px;
  border-bottom:1px solid #a3a3a3;
  @media ${(props) => props.theme.container} {
      padding-bottom:calc(100vw*(20/1436));
    }

  @media ${(props) => props.theme.mobile} {
      padding-bottom:calc(100vw*(15/428));
    }
`
const Title = styled.div`
  font-size:20px;
  font-weight:800;
  color:#707070;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }

  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`
const ModalBody = styled.div`
  width:100%;
  padding-top:11px;
  @media ${(props) => props.theme.container} {
      padding-top:calc(100vw*(11/1436));
    }

  @media ${(props) => props.theme.mobile} {
      padding-top:calc(100vw*(14/428));
    }
`
const Box = styled.div`
  width:100%;
  margin-bottom:14px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.container} {
      margin-bottom:calc(100vw*(14/1436));
    }

  @media ${(props) => props.theme.mobile} {
      margin-bottom:calc(100vw*(15/428));
    }
`
const BoxTitle = styled.p`
  font-size:12px;color:#4a4a4a;
  margin-bottom:9px;
  padding-left:7px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(12/1436));
      margin-bottom:calc(100vw*(9/1436));
      padding-left:calc(100vw*(7/1436));
    }

  @media ${(props) => props.theme.mobile} {
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
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(15/1436));
      height:calc(100vw*(43/1436));
      line-height:calc(100vw*(43/1436));
      &::placeholder{font-size:calc(100vw*(15/1436));}
    }

  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(14/428));
      height:calc(100vw*(43/428));
      line-height:calc(100vw*(43/428));
      &::placeholder{font-size:calc(100vw*(14/428));}
    }
`
const Checkbox = styled.div`
  margin:30px 0;
  text-align:center;
  @media ${(props) => props.theme.container} {
      margin:calc(100vw*(30/1436)) 0;
    }
  @media ${(props) => props.theme.mobile} {
      margin:calc(100vw*(25/428)) 0;
    }

`
const CheckInput = styled.input`
  display:none;
  &:checked + .check_label .chk_on_off{width:16px;height:16px;background:url(${Checked}) no-repeat;background-size:100% 100%;}
  @media ${(props) => props.theme.container} {
    &:checked + .check_label .chk_on_off{width:calc(100vw*(16/1436));height:calc(100vw*(16/1436));background:url(${Checked}) no-repeat;background-size:100% 100%;}
    }
  @media ${(props) => props.theme.mobile} {
    &:checked + .check_label .chk_on_off{width:calc(100vw*(16/428));height:calc(100vw*(16/428));background:url(${Checked}) no-repeat;background-size:100% 100%;}
    }
`
const Label = styled.label`
  font-size:12px;
  transform:skew(-0.1deg);
  font-weight:bold;color:#4a4a4a;
  @media ${(props) => props.theme.container} {
    font-size:calc(100vw*(12/1436));
  }
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    }

`
const Span = styled.span`
  display:inline-block;
  margin-right:12px;
  width:16px;height:16px;
  background:url(${Check}) no-repeat;
  background-size:100% 100%;
  vertical-align:middle;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
    margin-right:calc(100vw*(12/1436));
    width:calc(100vw*(16/1436));height:calc(100vw*(16/1436));
  }
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(12/428));
    width:calc(100vw*(16/428));height:calc(100vw*(16/428));
  }
`
const ViewTerm = styled.p`
  display:inline-block;
  font-size:12px;
  color:#a0a0a0;
  font-weight:600;
  transform:skew(-0.1deg);
  vertical-align:text-bottom;
  margin-left:20px;
  @media ${(props) => props.theme.container} {
    font-size:calc(100vw*(12/1436));
    margin-left:calc(100vw*(20/1436));
  }
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-left:calc(100vw*(12/428));
  }
`
const ModalBtn = styled.div`
    width:100%;
`
const Confirm = styled.div`
    width:100%;text-align:center;
    background:#979797;
    border:3px solid #e4e4e4;
    border-radius:11px;
    height:66px;
    line-height:60px;
    color:#fff;
    font-size:20px;font-weight:600;
    @media ${(props) => props.theme.container} {
      height:calc(100vw*(66/1436));
      line-height:calc(100vw*(60/1436));
      font-size:calc(100vw*(20/1436));
    }
    @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(60/428));
      line-height:calc(100vw*(54/428));
      font-size:calc(100vw*(15/428));
    }
`
