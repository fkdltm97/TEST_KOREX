//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//style
import styled from "styled-components";

//img
import CloseIcon from "../../../img/main/modal_close.png";
import Check from "../../../img/member/check.png";
import Checked from "../../../img/member/checked.png";
import Prev from "../../../img/member/slick_prev.png";
import Arrow from "../../../img/member/arrow_down.png";
import Add from '../../../img/member/add_Btn.png';
import Close from '../../../img/main/modal_close.png';

import ModalCommon from '../modal/ModalCommon';

export default function ModalCal({cal, setCal, updatePageIndex, SelectDate, selectTime}){
  const [Name,setName] = useState("");
  const [Phone,setPhone] = useState("");/*기본값*/
  const [active,setActive] = useState(false);

  const phoneChange = (e) =>{ setPhone(e.target.value); }
  const nameChange = (e) =>{ setName(e.target.value); }
  
  const [userList, setuserList] = useState([]);

  const Add =()=>{
    if(Name !== "" && Phone !== ""){
      setuserList([
        ...userList,
        {name : Name, phone : Phone}
      ])
    }else{
      finalModal()
    }
  }

  const checkVaildate = () =>{
    return Phone.length > 9 && Name.length > 0
   }

  useEffect(()=>{
    if(checkVaildate())
       setActive(true);
    else
        setActive(false);
  },)

const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreennone:{},content:{}});

//여기 두개가 핵심이에여
//모달 끄는 식
const offModal = ()=>{
  let option = JSON.parse(JSON.stringify(modalOption));
  option.show = false;
  setModalOption(option);
}

const finalModal= () =>{
  setModalOption({
    show:true,
    setShow:offModal,
    title:"등록",
    content:{type:"text",text:`이름과 이메일을 확인해주세요.`,component:""},
    submit:{show:false , title:"" , event : ()=>{offModal(); }},
    cancle:{show:false , title:"" , event : ()=>{offModal(); }},
    confirm:{show:false , title:"확인" , event : ()=>{offModal();}},
    confirmgreennone:{show:true , title:"확인" , event : ()=>{offModal();}}
  });
}

//등록되었습니다 모달
const comfirmModal= () =>{
  // 서버 통신이 이루어져야한다.
  // 날짜
  // console.log(`${new Date(SelectDate).getFullYear()}-${new Date(SelectDate).getMonth() + 1}-${new Date(SelectDate).getDate()}`);
  // 시간
  // console.log(`${new Date(selectTime).getHours()} : ${new Date(selectTime).getMinutes()}`);
  // 이름 
  // console.log(Name);
  // 번호 
  // console.log(Phone);

  // input 창이 비어있을때 나오는 이벤트입니다.
  // if(!Name || !Phone){
  //   console.log(" 비어있어요!! ")
  //   return;
  // }

  setModalOption({
    show:true,
    setShow:offModal,
    title:"등록",
    content:{type:"text",text:`등록되었습니다.`,component:""},
    submit:{show:false , title:"" , event : ()=>{offModal(); }},
    cancle:{show:false , title:"" , event : ()=>{offModal(); }},
    confirm:{show:false , title:"확인" , event : ()=>{offModal();}},
    confirmgreennone:{show:true , title:"확인" , event : ()=>{offModal();setCal(false);updatePageIndex(0)}}
  });
}

const onRemove = item =>{
  setuserList(userList.filter(user =>user.phone !== item.phone ))
}

if(cal == false)
return null;
return (
  <Container>
        <Wraplive>
          <ModalClose>
            <Link
              onClick={() => {
                setCal(false);
                updatePageIndex(0);
              }}
            >
              <CloseImg src={CloseIcon} />
            </Link>
          </ModalClose>
          <ModalTop>
            <Title>방문 예약</Title>
          </ModalTop>
          <Label>동반고객 정보</Label>
          <Desc>
            분양대행사와 보수 정산 시, 증거자료로 활용하실 수 있으니, <br />
            동반고객 정보를 정확하게 입력하시길 바랍니다.
            <br />
            <br />
            동반고객 휴대폰 중간번호 4자리는 보안 처리되어 분양대행사에
            <br />
            제공됩니다.
          </Desc>
          <WrapAdd>
            <InputInvite>
              <InputTitle>이름</InputTitle>
              <InputTxt
                type="text"
                name="username"
                placeholder="이름을 입력하여주세요."
                value={Name}
                onChange={nameChange}
              />
              <WrapPhone>
                <InputTitle>휴대폰번호</InputTitle>
                <WrapInput>
                  <Input
                    type="tel"
                    name="userphoneNum"
                    placeholder="휴대번호를 ’-‘를 빼고 입력하여주세요."
                    value={Phone}
                    onChange={phoneChange}
                    maxLength="15"
                  />
                  <Delete
                    src={Close}
                    alt="delete"
                    onClick={() => {
                      setPhone("");
                    }}
                  />
                </WrapInput>
              </WrapPhone>
            </InputInvite>

            <AddBtn type="button" onClick={Add} />

            <InviteList>
              {
                userList.map((item)=>{
                  return (
                    <EaWrap>
                      <EaName>{item.name}</EaName>
                      <EaPhone>{item.phone}</EaPhone>
                      <EaDelete src={Close} onClick={(e)=>{onRemove(item)}}/>
                    </EaWrap>
                  );
                })
              }
              {
                // ==== 위에 식으로 참고 부탁드리겠습니다. //
              }
              {/* {UserName.map((item) => {
                return (
                    <EaName>{item}</EaName>
                );
              })}
              {UserPhone.map((item) => {
                  return (
                      <EaPhone>{item}</EaPhone>
                  );
                })} */}
              
            </InviteList>

            <InviteButton>
              <Invite
                type="submit"
                active={active}
                onClick={() => {
                  comfirmModal();
                }}
              >
                확인
              </Invite>
            </InviteButton>
          </WrapAdd>
        </Wraplive>
        <ModalCommon modalOption={modalOption} />
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
  width:535px;height:700px;
  background:#fff;
  border-radius:24px;
  border:1px solid #f2f2f2;
  left:50%;top:50%;transform:translate(-50%,-50%);
  padding:49px 49px 50px 63px;
  overflow-y:scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;}
  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(395/428));
      height:calc(100vw*(632/428));
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
const Label = styled.label`
  margin:10px 0;
  font-size:12px;display:inline-block;font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(12/428));
      margin:calc(100vw*(10/428)) 0;
    }
`
const Desc = styled.div`
  font-size:15px;transform:skew(-0.1deg);
  line-height:1.33;color:#4a4a4a;
  margin:15px 0;
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(13/428));
      margin:calc(100vw*(15/428)) 0;
    }
`
const WrapAdd = styled.div`
  width:410px; margin:30px auto 0;
  display:flex;justify-content:flex-start;
  align-items:flex-start;flex-wrap:wrap;
  @media ${(props) => props.theme.modal} {
    width:100%;
    margin:calc(100vw*(25/428)) auto 0;
  }
`
const InputTitle = styled.label`
  display:inline-block;
  width:100%;
  font-size:12px;
  padding-left:7px;
  margin-bottom:10px;
  font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(12/428));
      padding-left:calc(100vw*(7/428));
      margin-bottom:calc(100vw*(9/428));
    }
`
const InputInvite = styled.div`
  width:100%;
  margin-bottom:10px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(8/428));
    &:last-child{margin-bottom:0;}
    }
`
const WrapPhone = styled.div`
  width:100%;position:relative;
  margin-top:15px;
  @media ${(props) => props.theme.modal} {
    margin-top:calc(100vw*(8/428));
    }
`
const WrapInput = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;height:43px;
  border-radius:4px;text-align:center;
  border:1px solid #e4e4e4;
  @media ${(props) => props.theme.modal} {
    width:100%;
    height:calc(100vw*(43/428));
    }
`
const Input = styled.input`
  width:100%;height:100%;
  border-radius:4px;text-align:center;
  font-size:15px;color:#707070;font-weight:600;transform:skew(-0.1deg);
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.modal} {
    width:100%;
    height:100%;
    font-size:calc(100vw*(15/428));
    }
`
const InputTxt = styled(Input)`
  width:100%;border:1px solid #e4e4e4;
  height:43px;
  @media ${(props) => props.theme.modal} {
    width:100%;
    height:calc(100vw*(43/428));
    }
`

const Delete = styled.img`
  display:inline-block;
  cursor:pointer;
  width:15px;margin:0 10px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(15/428));
    margin:0 calc(100vw*(10/428));
    
    }
`
const AddBtn = styled.div`
  cursor:pointer;
  width:43px;height:43px;
  border-radius:4px;border:1px solid #707070;
  background:#f8f7f7 url(${Add}) no-repeat center center;background-size:19px 19px;
  margin:20px auto 40px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(35/428));
    height:calc(100vw*(35/428));
    margin:calc(100vw*(20/428)) auto calc(100vw*(40/428));
    background:#f8f7f7 url(${Add}) no-repeat center center;background-size:calc(100vw*(19/428)) calc(100vw*(19/428));
    }
`
const InviteButton = styled.div`
  width:100%;
`
const Invite = styled.button`
  width: 100%;
  height: 66px;
  line-height:60px;
  border-radius: 11px;
  transition:all 0.3s;
  color:#fff;
  font-size:20px;font-weight:800;transform:skew(-0.1deg);
  background:${({active}) => active ? "#01684b" : "#979797"};
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  @media ${(props) => props.theme.modal} {
    width:100%;
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
const InviteList = styled.div`
  width:100%;margin-bottom:30px;
`
const EaWrap = styled.div`
  width:100%;margin-bottom:10px;
  position:relative;
`
const EaName = styled.div`
  position:relative;
  font-size:15px;transform:skew(-0.1deg);
  font-weight:600;display:inline-block;
  margin-right:15px;
  padding-left:15px;
  &:before{position:absolute;left:0;top:50%;transform:translateY(-50%);width:4px;height:4px;display:block;content:'';background:#04966d;border-radius:100%;}
`
const EaPhone = styled(EaName)`
  margin-right:0;
  padding-left:0;
  &:before{display:none;}
`
const EaDelete = styled.img`
  display:inline-block;
  width:10px;cursor:pointer;
  position:absolute;right:0;top:50%;transform:translateY(-50%);
`