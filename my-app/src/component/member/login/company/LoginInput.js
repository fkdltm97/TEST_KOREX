//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import serverController from '../../../../server/serverController';

//css
import styled from "styled-components"

export default function JoinInput() {
  const [phone,setPhone] = useState("");/*기본값*/
  const [pwd,setPwd] = useState("");/*기본값*/
  const [active,setActive] = useState(false);

  const phoneChange = (e) =>{ setPhone(e.target.value); }
  const pwdChange = (e) =>{ setPwd(e.target.value); }

  const checkVaildate = () =>{
    return phone.length > 9 && pwd.length > 7
   }
   useEffect(()=>{
     console.log('comapnylogin inputs>>useEffect호출상태변화=============',phone,pwd);
     if(checkVaildate())
             setActive(true);
     else
         setActive(false);
   },)

   const company_login_submit = async (e) => {
     console.log('company_login_submit 기업 로그인 submit onclick발생=============',phone,pwd,active);

     if(active==true){
       let body_info={
         login_phone: phone,
         login_password: pwd
       };
       console.log('JSON.STRINGIFY(BODY_INFO):',JSON.stringify(body_info));

       let res= await serverController.connectFetchController("/api/auth/company/login","POST",JSON.stringify(body_info),function(){},function(test){console.log(test)});
       console.log('res results:',res);
       //alert(res);

      if(!res.success){
         document.getElementById('loginfail').style.display='block';
       }else{
         document.getElementById('loginfail').style.display='none';
         alert(res.message);
       }
       //로그인 성공시 페이지 이동=->>>>
     }
   }

    return (
        <Container>
          <WrapJoinInput>
            <TopTxt>관리자외 소속팀원은 팀원추가 후 로그인 가능합니다.</TopTxt>
            <InputTop>
              <InputTitle>휴대전화</InputTitle>
              <Input type="text" name="" placeholder="휴대번호를 '-' 빼고 입력해주세요." onChange={phoneChange}/>
              <InputTitle>비밀번호</InputTitle>
              <Input type="password" name="" placeholder="비밀번호를 입력해주세요." onChange={pwdChange}/>
              {/*아이디 또는 비밀번호가 일치하지 않을때 Msg*/}
              <ErrorMsg style={{display:"none"}} id='loginfail'>휴대폰번호 또는 비밀번호가 일치하지 않습니다.</ErrorMsg>
            </InputTop>
            <SubmitButton>
              <Submit type="submit" name="" active={active} onClick={company_login_submit}>로그인</Submit>
              <BottomBtns>
                <Div>
                  <Link to="/CompanyJoin">
                    <GoTxt>회원가입</GoTxt>
                  </Link>
                </Div>
                <Div>
                  <Link>
                    <GoTxt>아이디찾기 /</GoTxt>
                  </Link>
                  <Link>
                    <GoTxt>비밀번호찾기</GoTxt>
                  </Link>
                </Div>
              </BottomBtns>
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
        padding-bottom:calc(100vw*(30/428));
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
  &:nth-child(6){margin-bottom:0;}
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(43/428));
      font-size:calc(100vw*(14/428));
      margin-bottom:calc(100vw*(15/428));
    }
`

const SubmitButton = styled.div`
  width:100%;
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
const ErrorMsg = styled.p`
  position:absolute;
  left:0;
  bottom:30px;
  width:100%;
  font-size:12px;color:#fe0101;
  font-weight:600;transform:skew(-0.1deg);
  text-align:center;
  @media ${(props) => props.theme.mobile} {
      bottom:calc(100vw*(15/428));
      font-size:calc(100vw*(12/428));
    }
`
const BottomBtns = styled.div`
  width:100%;
  margin-top:10px;
  display:flex;justify-content:space-between;
  align-items:center;
  @media ${(props) => props.theme.mobile} {
      margin-top:calc(100vw*(10/428));
    }
`
const Div = styled.div`

  @media ${(props) => props.theme.mobile} {

    }
`
const GoTxt = styled.p`
  font-size:13px;
  font-weight:600;
  display:inline-block;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    }
`
