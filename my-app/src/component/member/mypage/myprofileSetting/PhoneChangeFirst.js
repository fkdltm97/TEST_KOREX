//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

export default function EmailChange({updatePageIndex,cerModal}) {

  const [phone,setPhone] = useState("");
  const [active,setActive] = useState(false);

  const phoneChange = (e) =>{ setPhone(e.target.value); }

  const checkVaildate = () =>{
    return phone.length > 9
   }

   useEffect(()=>{
     if(checkVaildate())
        setActive(true);
     else
        setActive(false);
   },)

    return (
        <Container>
            <ProfileTop>
              <WrapInputBox>
                <Box>
                  <Label>휴대전화</Label>
                  <InputBox type="text" value="01012345678"/>
                </Box>
                <Box>
                  <Label>변경 휴대전화</Label>
                  <InputBox type="text" placeholder="휴대번호를 '-'를 빼고 입력하여주세요." onChange={phoneChange}/>
                </Box>
              </WrapInputBox>
            </ProfileTop>
          {/*버튼*/}
            <Button>
              <ChangeBtn type="submit" name="" active={active} onClick={() => {updatePageIndex(1);cerModal();}}>인증번호 발송</ChangeBtn>
            </Button>
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
`
const ProfileTop = styled.div`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
  padding-bottom:42px;
  @media ${(props) => props.theme.mobile} {
    justify-content:center;
    }
`
const WrapInputBox = styled.div`
  width:100%;
`
const Box = styled.div`
  width:100%;
  margin-bottom:54px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(30/428));
    }
`
const Label = styled.label`
  display:inline-block;
  font-size:12px;font-weight:600;transform:skew(-0.1deg);
  padding-left:7px;margin-bottom:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    padding-left:calc(100vw*(7/428));
    margin-bottom:calc(100vw*(10/428));
    }
`
const InputBox = styled.input`
  width:100%;height:43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  text-align:center;
  transform:skew(-0.1deg);
  font-size:15px;
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    height:calc(100vw*(43/428));
    }
`
const Button = styled.div`
  width: 408px;
  display:flex;justify-content:space-between;align-items:center;
  margin:50px auto 0;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    margin:calc(100vw*(50/428)) auto;
    }
`
const ChangeBtn = styled.button`
  width:100%;
  height: 66px;
  line-height:60px;
  text-align:center;
  color:#fff;
  font-size:20px;transform:skew(-0.1deg);
  font-weight:800;
  border-radius: 11px;
  transition:all 0.3s;
  background:${({active}) => active ? "#01684b" : "#979797"};
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(180/428));
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
    }
`
