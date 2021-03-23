//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

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
            <TopTxt>
              국가공간정보포털의 부동산중개업 정보에 등록된 <br/>
              대표공인중개사만 회원가입 가능합니다.<br/>
              <br/>
              소속공인중개사, 중개보조원은 팀원 추가되면 로그인할 수 있습니다.
            </TopTxt>
        </Container>
  );
}

const Container = styled.div`
    width:450px;
    margin:50px auto 0;
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(370/428));
        margin:calc(100vw*(40/428)) auto 0;
      }
`
const TopTxt = styled.h2`
  font-size:15px;
  font-weight:800;
  transform:skew(-0.1deg);
  text-align:center;
  margin-bottom:40px;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(13/428));
      margin-bottom:calc(100vw*(40/428));
    }
`
