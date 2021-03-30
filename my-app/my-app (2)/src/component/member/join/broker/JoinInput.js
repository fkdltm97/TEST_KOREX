//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"
//component
import JoinTopTxt from "./JoinTopTxt";

//img
import Check from "../../../../img/member/check.png";
import Checked from "../../../../img/member/checked.png";

export default function JoinTab() {

  const [phone,setPhone] = useState("");/*기본값*/
  const [cernum,setCernum] = useState("");/*기본값*/

  const [active,setActive] = useState(false);
  const [active2,setActive2] = useState(false);

  const phoneChange = (e) =>{ setPhone(e.target.value); }
  const cernumChange = (e) =>{ setCernum(e.target.value); }

  const checkVaildate = () =>{
    return phone.length > 9
   }

   const checkVaildate2 = () =>{
     return phone.length > 9 && cernum.length > 4
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
          {/*체크박스가 선택되면 아래 내용이 활성화 됩니다.( WrapChooseBox는 display:none처리되어야 함)*/}
          <WrapJoinInput>
            <InputTop>
              <InputTitle>휴대전화</InputTitle>
              <Input type="text" name="" placeholder="휴대번호를 '-'를 빼고 입력해주세요." onChange={phoneChange}/>
              {/*NextBtn(인증번호발송) 버튼 눌렀을때 show*/}
              <InputCerNum type="text" name="" placeholder="인증번호를 입력하세요." onChange={cernumChange} style={{display:"none"}}/>
              {/*인증번호가 일치하지 않을때 Msg*/}
              <ErrorMsg style={{display:"none"}}>휴대전화 인증번호가 일치하지 않습니다.</ErrorMsg>
            </InputTop>
            <SubmitButton>
                <NextBtn type="button" name="" active={active}>인증번호 발송</NextBtn>
                {/*NextBtn(인증번호발송) 눌렀을때 show*/}
                <Link to="/JoinSearchResult">
                  <Submit type="submit" name="" active2={active2} style={{display:"none"}}>다음</Submit>
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
    margin:50px auto 0;
    padding-bottom:150px;
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(370/428));
        margin:calc(100vw*(40/428)) auto 0;
        padding-bottom:calc(100vw*(100/428));
      }
`
const WrapJoinInput = styled.div`
    width:410px;
    margin:0 auto;
    @media ${(props) => props.theme.mobile} {
        width:100%;
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
  color:#4a4a4a;
  text-align:center;
  border-radius:4px;
  border:1px solid #e4e4e4;
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(43/428));
      font-size:calc(100vw*(14/428));
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
