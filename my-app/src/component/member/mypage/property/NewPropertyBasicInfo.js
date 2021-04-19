//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../img/member/filter.png';
import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Location from '../../../../img/member/loca.png';
import Set from '../../../../img/member/setting.png';
import Item from '../../../../img/main/item01.png';
import Noimg from '../../../../img/member/company_no.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import SearchApartOfficetel from "./SearchApartOfficetel";
import SearchStoreOffice from "./SearchStoreOffice";
import SearchApartOfficetelSelectInfo from "./SearchApartOfficetelSelectInfo";

export default function NewBasicInfo() {
  const [name,setName] = useState("");/*기본값*/
  const [phone,setPhone] = useState("");/*기본값*/

  const [active,setActive] = useState(false);

  const nameChange = (e) =>{ setName(e.target.value); }
  const phoneChange = (e) =>{ setPhone(e.target.value); }

  const checkVaildate = () =>{
    return phone.length > 9 && name.length > 0
   }

   useEffect(()=>{
     if(checkVaildate())
        setActive(true);
     else
        setActive(false);
   },)

    return (
        <Container>
          <WrapRequest>
            <TopTitle>의뢰인정보 입력</TopTitle>
            <WrapBox>
              <Box>
                <Label>이름</Label>
                <Input type="text" placeholder="이름을 입력해주세요." onChange={nameChange}/>
              </Box>
              <Box>
                <Label>휴대전화</Label>
                <Input type="text" placeholder="휴대번호를 ’-‘를 빼고 입력해주세요." onChange={phoneChange}/>
              </Box>
              <SubmitButton>
                <Link to="/AddPropertySecond">
                  <Submit type="submit" name="" active={active}>다음</Submit>
                </Link>
              </SubmitButton>
            </WrapBox>
           </WrapRequest>
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
    width:680px;
    margin:0 auto;
    padding:24px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(380/428));
      padding:calc(100vw*(30/428)) 0 calc(100vw*(150/428));
      }
`
const WrapRequest = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const WrapBox = styled.div`
  width:408px;
  margin:50px auto 0;
`
const Box = styled.div`
  width:100%;
  margin-bottom:14px;
  &:last-child{margin-bottom:0;}
`
const Label = styled.label`
  display:block;
  padding-left:7px;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);
  margin-bottom:10px;
`
const Input = styled.input`
  display:inline-block;
  width:100%;height:43px;
  border-radius:4px;
  border:1px solid #e4e4e4;
  text-align:center;transform:skew(-0.1deg);
  font-size:15px;color:#979797;font-weight:600;
  &::placeholder{color:#979797;font-weight:500;}
`
const SubmitButton = styled.div`
  width:100%;
  margin-top:60px;
`
const Submit = styled.button`
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
