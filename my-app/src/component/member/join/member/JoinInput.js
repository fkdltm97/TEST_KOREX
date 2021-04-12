//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import serverController from '../../../../server/serverController';

//css
import styled from "styled-components"

//added redux actions go
import { useSelector} from 'react-redux';
import { MyActions , UserActions, tempRegisterUserdataActions } from '../../../../store/actionCreators';

export default function JoinInput() {
  console.log('compoent>member>joininput 컴포넌트 싫앵==================');

  const my = useSelector(data => data.my);
  const users = useSelector(data => data.user);
  const tempregisteruserdata = useSelector(data => data.temp_register_userdata);

  console.log('data.my globe info refer:',my);
  console.log('data.users globe info refer:',users);
  console.log('data.temp_register_userdata refer info:',tempregisteruserdata, tempRegisterUserdataActions);

  const [email,setEmail] = useState("");/*기본값*/
  const [name,setName] = useState("");/*기본값*/
  const [phone,setPhone] = useState("");/*기본값*/
  const [cernum,setCernum] = useState("");/*기본값*/
  const [verify_cernum,setVerify_cernum] = useState("");

  const [active,setActive] = useState(false);
  const [active2,setActive2] = useState(false);

  const emailChange = (e) =>{ setEmail(e.target.value); }
  const nameChange = (e) =>{ setName(e.target.value); }
  const phoneChange = (e) =>{ setPhone(e.target.value); }
  const cernumChange = (e) =>{ setCernum(e.target.value); }
  
  const coolSmsSend= async (e) => { 
    console.log('coolsmsSend발송 함수 호출, member joininput 요소 고유 email,name,phone,cernum값등 조회 현재의값',email,name,phone);
    
    let body_info={ number: phone };
    let res = await serverController.connectFetchController(`coolsms/sendprocess`,"POST",JSON.stringify(body_info));
    console.log('res result:',res);
    /*
    return fetch("http://localhost:55550/sendprocess",{
      credentials:'include',
      method:'POST',
      body:body_info?body_info:null
    }).then(function(res){
      console.log('res json _>>>:',res);
      return res.json();
    }).catch(function(e){

    });*/
    setVerify_cernum(res.sms_message);
  }

  const checkVaildate = () =>{
    console.log('useEffect로 내부의 임의 프로퍼티내부값의 하나적 미시적 변화감지하여 함수 호출:',email,name,phone,cernum,verify_cernum);
    return email.length > 10 && name.length > 2 && phone.length > 9
   }

   const cernum_checkValidate = () =>{
     console.log('현재 변화요소에 따른 프로퍼티 value값들:',email,name,phone,cernum,verify_cernum);
     return cernum.length >= 4 && cernum == verify_cernum;
    }

    const nextStep = (e) =>{
      console.log('nextStep 다음 스탭a링크 클릭:',e,e.target);

      if(cernum_checkValidate()){
        setActive2(true);
        console.log('인증번호 인증 통과시엔 통과되게끔');

        //다음단계로 통과시에 데이터 저장하여 넘어가게끔 redux에 저장하기. 여기엔 우선 이메일,이름,휴대폰,인증번호(제대로한것) 전달한다
        console.log('현재 최종적 확인update값:',name,email,phone);

        tempRegisterUserdataActions.emailchange({emails: email});
        tempRegisterUserdataActions.namechange({names: name});
        tempRegisterUserdataActions.phonechange({phones: phone});

      }else{
        setActive2(false);
        console.log('인증번호 관련 인증 미통과시엔 이동 기본이벤트 막기');
        e.preventDefault();
      }
    }

   useEffect(()=>{
     if(checkVaildate())
        setActive(true);
     else
         setActive(false);

     if(cernum_checkValidate())
        setActive2(true);
     else
        setActive2(false);
   },)

    return (
        <Container>
          <WrapJoinInput>
            <InputTop>
              <InputTitle>이메일</InputTitle>
              <Input type="email" name="" placeholder="이메일을 입력해주세요." onChange={emailChange}/>
              <InputTitle>이름</InputTitle>
              <Input type="text" name="" placeholder="이름을 입력해주세요." onChange={nameChange}/>
              <InputTitle>휴대전화</InputTitle>
              <Input type="text" name="" placeholder="휴대번호를 '-'를 빼고 입력해주세요." onChange={phoneChange}/>
              {/*NextBtn(인증번호발송) 버튼 눌렀을때 show*/}
              <InputCerNum type="text" name="" placeholder="인증번호를 입력하세요." onChange={cernumChange} />
              {/*인증번호가 일치하지 않을때 Msg*/}
              <ErrorMsg style={{display:"none"}}>휴대전화 인증번호가 일치하지 않습니다.</ErrorMsg>
            </InputTop>
            <SubmitButton>
                <NextBtn type="button" name="" active={active} onClick={coolSmsSend}>인증번호 발송</NextBtn>
                {/*NextBtn(인증번호발송) 눌렀을때 show*/}
                <Link to="/MemJoinAgree" onClick={nextStep}>
                  <Submit type="submit" name="" active2={active2} style={{display:"block"}}>다음</Submit>
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
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(370/428));
        margin:calc(100vw*(40/428)) auto 0;
      }
`
const WrapJoinInput = styled.div`
    width:410px;
    margin:0 auto;
    @media ${(props) => props.theme.mobile} {
        width:100%;
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
  &:nth-child(6){margin-bottom:0;}
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
