//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Check from "../../../../img/member/check.png";
import Checked from "../../../../img/member/checked.png";

export default function JoinTab() {

  const [name,setName] = useState("");/*기본값*/
  const [phone,setPhone] = useState("");/*기본값*/
  const [cernum,setCernum] = useState("");/*기본값*/

  const [active,setActive] = useState(false);
  const [active2,setActive2] = useState(false);

  const nameChange = (e) =>{ setName(e.target.value); }
  const phoneChange = (e) =>{ setPhone(e.target.value); }
  const cernumChange = (e) =>{ setCernum(e.target.value); }

  const checkVaildate = () =>{
    return name.length > 2 && phone.length > 9
   }

   const checkVaildate2 = () =>{
     return name.length > 2 && phone.length > 9 && cernum.length > 4
    }

   useEffect(()=>{
     if(checkVaildate())
             setActive(true);
     else
         setActive(false);

     if(checkVaildate2())
             setActive2(true);
     else
         setActive2(false);
   },)

    return (
        <Container>
          <TopTxt>소속팀원은 팀원이 추가되면 로그인할 수 있습니다.</TopTxt>
          <WrapChooseBox>
            <ChooseBox>
              <Checkbox type="radio" name="company" id="check1"/>
                <Label for="check1" className="chk_label">
                  <Span className="chk_on_off"></Span>
                  본인은 사업자 대표입니다.
                </Label>
            </ChooseBox>
            <ChooseBox>
              <Checkbox type="radio" name="company" id="check2"/>
              <Label for="check2" className="chk_label">
                <Span className="chk_on_off"></Span>
                본인은 사업자 대표가 아닙니다.
              </Label>
            </ChooseBox>
          </WrapChooseBox>

          {/*체크박스가 선택되면 아래 내용이 활성화 됩니다.( WrapChooseBox는 display:none처리되어야 함)*/}
          <WrapJoinInput>
            <InputTop>
              <InputTitle>이름</InputTitle>
              <Input type="text" name="" placeholder="이름을 입력해주세요." onChange={nameChange}/>
              <InputTitle>휴대전화</InputTitle>
              <Input type="text" name="" placeholder="휴대번호를 '-'빼고 입력해주세요." onChange={phoneChange}/>
              {/*NextBtn(인증번호발송) 버튼 눌렀을때 show*/}
              <InputCerNum type="text" name="" placeholder="인증번호를 입력하세요." onChange={cernumChange} style={{display:"none"}}/>
              {/*인증번호가 일치하지 않을때 Msg*/}
              <ErrorMsg style={{display:"none"}}>휴대전화 인증번호가 일치하지 않습니다.</ErrorMsg>
            </InputTop>
            <SubmitButton>
                <NextBtn type="button" name="" active={active}>인증번호 발송</NextBtn>
                {/*NextBtn(인증번호발송) 눌렀을때 show*/}
                {/*  1) 사업자 대표가 아닙니다 선택시 ( 약관동의 페이지 MemJoinAgree 로 넘어간다.) */}
                <Link to="/AgencyJAgree">
                  <Submit type="submit" name="" active2={active2} style={{display:"none"}}>다음</Submit>
                </Link>
                {/*  2) 사업자 대표 선택시 ( 사업자 정보 등록페이지로 넘어간다 ) */}
                <Link to="/AgencyJoinInfo">
                  <GoNextPage type="submit" name="" active2={active2} style={{display:"none"}}>다음</GoNextPage>
                </Link>
            </SubmitButton>
          </WrapJoinInput>
        </Container>
  );
}

const Pb = styled.b`
  display:block;
  @media ${(props) => props.theme.mobile} {
        display:inline;
    }
`
const Mb = styled.b`
  display:inline;
  @media ${(props) => props.theme.mobile} {
        display:block;
    }
`

const Container = styled.div`
    width:450px;
    margin:0 auto;
    padding-top:16px;
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(370/428));
        padding-top:calc(100vw*(0/428));
      }
`
const TopTxt = styled.h2`
  font-size:15px;
  font-weight:800;
  transform:skew(-0.1deg);
  text-align:center;
  margin-bottom:80px;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(13/428));
      margin-bottom:calc(100vw*(40/428));
    }
`
const WrapChooseBox = styled.div`
  width:100%;
  background:#f7f8f8;
  padding:70px 0px 70px 100px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(345/428));
      margin:0 auto;
      padding:calc(100vw*(70/428)) 0 calc(100vw*(40/428)) calc(100vw*(70/428));
    }
`
const ChooseBox = styled.div`
  width:100%;
  margin-bottom:15px;
  @media ${(props) => props.theme.mobile} {
      margin-bottom:calc(100vw*(35/428));
    }
`
const Checkbox = styled.input`
  display:none;
  &:checked + .chk_label .chk_on_off {
    width:16px;height:16px;background:url(${Checked}) no-repeat;background-size:100% 100%;
    }
    @media ${(props) => props.theme.mobile} {
      &:checked + .chk_label .chk_on_off {width:calc(100vw*(15/428));height:calc(100vw*(15/428));background-size:100% 100%}
      }
`
const Label = styled.label`
  font-size:15px;
  font-weight:500;transform:skew(-0.1deg);
  color:#4a4a4a;
  font-family:'nbg',sans-serif;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const Span = styled.span`
  width:16px;height:16px;display:inline-block;
  margin-right:24px;vertical-align:middle;
  background:url(${Check}) no-repeat; background-size:100% 100%;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(15/428));height:calc(100vw*(15/428));
    margin-right:calc(100vw*(20/428));
    }
`

const WrapJoinInput = styled.div`
    width:410px;
    margin:0 auto;
    padding-bottom:150px;
    @media ${(props) => props.theme.mobile} {
        width:100%;
        padding-bottom:calc(100vw*(100/428));
      }
`
const InputTop = styled.div`
    position:relative;
    width:100%;
    padding-bottom:60px;
    @media ${(props) => props.theme.mobile} {
        padding-bottom:calc(100vw*(50/428));
      }
`
const InputTitle = styled.label`
    display:inline-block;
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
const Input = styled.input`
  width:100%;
  height:43px;
  transform:skew(0.1deg);
  font-weight:600;
  font-size:15px;
  margin-bottom:15px;
  color:#4a4a4a;
  text-align:center;
  border-radius:4px;
  border:1px solid #e4e4e4;
  &:nth-child(4){margin-bottom:0;}
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(43/428));
      font-size:calc(100vw*(14/428));
      margin-bottom:calc(100vw*(15/428));
    }
`
const InputCerNum = styled(Input)`
  margin-top:10px;
  @media ${(props) => props.theme.mobile} {
      margin-top:calc(100vw*(10/428));
    }
`

const SubmitButton = styled.div`
  width:100%;
`
const NextBtn = styled.button`
  width:100%;
  height:66px;
  line-height:60px;
  font-size:20px;
  color:#fff;
  border-radius:11px;
  border:3px solid #e4e4e4;
  transition:all 0.3s;
  font-weight:800;
  background:${({active}) => active ? "#01684b" : "#979797"};
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(60/428));
      line-height:calc(100vw*(54/428));
      font-size:calc(100vw*(15/428));
    }
`
const Submit = styled(NextBtn)`
  background:${({active2}) => active2 ? "#01684b" : "#979797"};
  border:${({active2}) => active2 ? "3px solid #04966d" : "3px solid #e4e4e4"};
`
const GoNextPage = styled(Submit)`
  background:${({active2}) => active2 ? "#01684b" : "#979797"};
  border:${({active2}) => active2 ? "3px solid #04966d" : "3px solid #e4e4e4"};
`
const ErrorMsg = styled.p`
  position:absolute;
  left:0;
  bottom:30px;
  width:100%;
  font-size:12px;color:#fe0101;
  font-weight:600;transform:skew(-0.1deg);
  text-align:center;
  @media ${(props) => props.theme.mobile} {
      bottom:calc(100vw*(18/428));
      font-size:calc(100vw*(12/428));
    }
`
