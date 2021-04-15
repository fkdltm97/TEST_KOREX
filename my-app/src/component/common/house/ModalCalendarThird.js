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

export default function ModalCal({cal, setCal,updatePageIndex}){
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");/*기본값*/
  const [active,setActive] = useState(false);

  const phoneChange = (e) =>{ setPhone(e.target.value); }
  const nameChange = (e) =>{ setName(e.target.value); }
  const checkVaildate = () =>{
    return phone.length > 9 && name.length > 0
   }

  useEffect(()=>{
    if(checkVaildate())
       setActive(true);
    else
        setActive(false);
  },)

  if(cal == false)
    return null;
    return (
      <Container>
        <Wraplive>
          <ModalClose>
              <Link onClick={()=>{setCal(false);updatePageIndex(0)}}>
              <CloseImg src={CloseIcon}/>
            </Link>
          </ModalClose>
          <ModalTop>
            <Title>방문 예약</Title>
          </ModalTop>
          <Label>동반고객 정보</Label>
          <Desc>
          분양대행사와 보수 정산 시, 증거자료로 활용하실 수 있으니, <br/>
          동반고객 정보를 정확하게 입력하시길 바랍니다.<br/>
          <br/>
          동반고객 휴대폰 중간번호 4자리는 보안 처리되어 분양대행사에<br/>
          제공됩니다.
          </Desc>

          <WrapAdd>
            <InputInvite>
              <InputTitle>이름</InputTitle>
              <InputTxt type="text" name="" placeholder="이름을 입력하여주세요." onChange={nameChange}/>
              <WrapPhone>
                <InputTitle>휴대폰번호</InputTitle>
                <Input type="email" name="" placeholder="휴대번호를 ’-‘를 빼고 입력하여주세요." onChange={phoneChange}/>
                <Delete src={Close} alt="delete"/>
              </WrapPhone>
            </InputInvite>

            <AddBtn/>
            <InviteButton>
              <Invite type="submit" active={active} onClick={() => {alert('방문예약이 완료되었습니다.');setCal(false);updatePageIndex(0)}}>확인</Invite>
            </InviteButton>
          </WrapAdd>
        </Wraplive>
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
  width:535px;height:740px;
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
const Label = styled.label`
  margin:10px 0;
  font-size:12px;display:inline-block;font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(12/428));
      margin:calc(100vw*(10/428));
    }
`
const Desc = styled.div`
  font-size:15px;transform:skew(-0.1deg);
  line-height:1.33;color:#4a4a4a;
  margin:15px 0;
`
const WrapAdd = styled.div`
  width:410px; margin:30px auto 0;
  display:flex;justify-content:flex-start;
  align-items:flex-start;flex-wrap:wrap;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    margin:calc(100vw*(40/428)) auto 0;
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
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(12/428));
      padding-left:calc(100vw*(7/428));
      margin-bottom:calc(100vw*(9/428));
    }
`
const InputInvite = styled.div`
  width:100%;
  margin-bottom:10px;
  border-bottom:1px solid #e4e4e4;
  padding-bottom:15px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(8/428));
    &:last-child{margin-bottom:0;}
    }
`
const WrapPhone = styled.div`
  width:100%;position:relative;
  margin-top:15px;
`
const Input = styled.input`
  width:370px;height:43px;
  border-radius:4px;text-align:center;
  border:1px solid #e4e4e4;
  font-size:15px;color:#707070;font-weight:600;transform:skew(-0.1deg);
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(350/428));
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    }
`
const InputTxt = styled(Input)`
  width:100%;
`

const Delete = styled.img`
  display:inline-block;position:absolute;right:0;
  top:69%;transform:translateY(-50%);
  cursor:pointer;
  width:15px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(15/428));
    }
`
const AddBtn = styled.div`
  cursor:pointer;
  width:43px;height:43px;
  border-radius:4px;border:1px solid #707070;
  background:#f8f7f7 url(${Add}) no-repeat center center;background-size:19px 19px;
  margin:20px auto 60px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(43/428));
    height:calc(100vw*(43/428));
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
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
