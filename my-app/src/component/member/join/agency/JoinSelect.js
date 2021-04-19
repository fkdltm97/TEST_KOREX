//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import serverController from '../../../../server/serverController';

//css
import styled from "styled-components"

//img
import Check from "../../../../img/member/check.png";
import Checked from "../../../../img/member/checked.png";

//added redux actions go
import {useSelector} from 'react-redux';
import {tempRegisterUserdataActions } from '../../../../store/actionCreators';

export default function JoinTab() {

  console.log('component>member>agency>joinselect 컴포넌트 실행=================');
  const tempregisteruserdata= useSelector(data => data.temp_register_userdata);

  console.log('tdata.temp_register_userdata refer info:',tempregisteruserdata,tempRegisterUserdataActions);

  const [name,setName] = useState("");/*기본값*/
  const [phone,setPhone] = useState("");/*기본값*/
  const [cernum,setCernum] = useState("");/*기본값*/
  const [verify_cernum,setVerify_cernum] = useState("");
  const [isceo,setIsceo] = useState(undefined); //대표인가 여부 (분양대행사회원)

  const [nextshow,setNextShow] = useState(false);

  const [active,setActive] = useState(false);
  const [active2,setActive2] = useState(false);

  const nameChange = (e) =>{ setName(e.target.value); }
  const phoneChange = (e) =>{ setPhone(e.target.value); }
  const cernumChange = (e) =>{ setCernum(e.target.value); }
 
  //coolsms문자 전송 api사용
  const coolSmsSend = async(e) => {
    console.log('coolsmssmSEND발송 함수 호출,broker company joinselect.js요소 고유 email,name,phone,cernum값 등 조회 현재의 값:',name,phone,cernum);

    let body_info={number:phone};
    let res= await serverController.connectFetchController('/api/coolsms/sendprocess','post',JSON.stringify(body_info));
    console.log('res result:',res);

    document.getElementById('inputcernum').style.display='block';

    //누른시점때에 체크된 라디오값에 따라서 달리
    var is_company_ceo_radios=document.getElementsByClassName('is_agency_ceo');
    var check_id;
    for(var ss=0; ss<is_company_ceo_radios.length; ss++){
      if(is_company_ceo_radios[ss].checked){
        check_id=is_company_ceo_radios[ss].id;//check1,2
      }
    }
    console.log('인증번호 발송버튼 누른시점에 라디오 체크값여부:',check_id);
    if(check_id){
      switch(check_id){
        case 'check1':
          //사업자 대표이면 사업자정보등록페이지 넘기는 companyjoininfo버튼 제공
          document.getElementById('agencyJoinInfo_move').style.display='block';
          document.getElementById('agencyJoinAgree_move').style.display='none';
        break;
  
        case 'check2':
          //사업자 대표가 아니라면 약관동의페이지로 compnayjoinagree링크 버튼 제공
          document.getElementById('agencyJoinAgree_move').style.display='block';
          document.getElementById('agencyJoinInfo_move').style.display='none';
        break;
      }
    }else{
      //체크되어있는게 없다면 다음 버튼 보이지 않음. default값으로써, 사업자대표일때 넘기는 companyjoininfo버튼 제공
        document.getElementById('agencyJoinInfo_move').style.display='block';
        document.getElementById('agencyJoinAgree_move').style.display='none';
    }
    setNextShow(true);//다음버튼 누른시점부터 true값 항상 띈다.발송을 눌렀기에.

    setVerify_cernum(res.sms_message);
  }

  //라디오(대표 여부 변화에 따른 다음 버튼 달리 노출)
  const is_agency_ceo_changes = (e) => {
    console.log('라디오 대표 여부 변화에 따른 선택값:',e,e.target);

      //인증번호 발송버튼 누른 이후시점(눌러서 인증번호input이랑, 기본적 다음버튼 제공은 되는 상황이후부터만 수행가능)
      //누른시점때에 체크된 라디오값에 따라서 달리
      var is_company_ceo_radios=document.getElementsByClassName('is_agency_ceo');
      var check_id;
      for(var ss=0; ss<is_company_ceo_radios.length; ss++){
        if(is_company_ceo_radios[ss].checked){
          check_id=is_company_ceo_radios[ss].id;//check1,2
        }
      }
      if(check_id){
        if(nextshow){
          switch(check_id){
            case 'check1':
              //사업자 대표이면 사업자정보등록페이지 넘기는 companyjoininfo버튼 제공
              document.getElementById('agencyJoinInfo_move').style.display='block';
              document.getElementById('agencyJoinAgree_move').style.display='none';
              setIsceo(true);
            break;
      
            case 'check2':
              //사업자 대표가 아니라면 약관동의페이지로 compnayjoinagree링크 버튼 제공
              document.getElementById('agencyJoinAgree_move').style.display='block';
              document.getElementById('agencyJoinInfo_move').style.display='none';
              setIsceo(false);
            break;
          }
        }else{
          switch(check_id){
            case 'check1':
              //인증번호발송 버튼을 누르지 않은 상태에서 체크박스 한경우
              setIsceo(true);
            break;

            case 'check2':
              setIsceo(false);
            break;
          }
        }
      }else{
      //체크되어있는게 없다면 다음 버튼 보이지 않음.
      }    
  }

  const checkVaildate = () =>{
    return name.length > 2 && phone.length > 9
   }

   const checkVaildate2 = () =>{
     return name.length > 2 && phone.length > 9 && (isceo != undefined) && (cernum == verify_cernum)
    }

   useEffect(()=>{
     console.log('useEffect상태값변화(분양대행사 가입):',name,phone,cernum,verify_cernum,isceo);
     if(checkVaildate())
             setActive(true);
     else
         setActive(false);

     if(checkVaildate2())
             setActive2(true);
     else
         setActive2(false);
   },)

   //다음단계 버튼 누를때 넘길지 말지 여부
   const nextStep = (e) => {
     console.log('nextStep 다음 스탭 a링크 클릭:',e,e.target);

     if(checkVaildate2()){
       setActive2(true);

       console.log('인증번호 인증까지 통과시엔 통과되게끔!');
       console.log('현재 최종적 확인update값:',name,phone,cernum,verify_cernum,isceo);

       //redux사용 코드 넣기 정보 redux저장 기억
       tempRegisterUserdataActions.namechange({names:name});
       tempRegisterUserdataActions.phonechange({phones:phone});
     }else{
       setActive2(false);
       console.log('인증번호 관련 인증 미통과시엔 이동 기본이벤트 막기');
       e.preventDefault();
     }
   }

    return (
        <Container>
          <TopTxt>소속팀원은 팀원이 추가되면 로그인할 수 있습니다.</TopTxt>
          <WrapChooseBox>
            <ChooseBox>
              <Checkbox type="radio" name="company" id="check1" className='is_agency_ceo' onChange={is_agency_ceo_changes}/>
                <Label for="check1" className="chk_label">
                  <Span className="chk_on_off"></Span>
                  본인은 사업자 대표입니다.
                </Label>
            </ChooseBox>
            <ChooseBox>
              <Checkbox type="radio" name="company" id="check2" className='is_agency_ceo' onChange={is_agency_ceo_changes}/>
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
              <InputCerNum type="text" name="" placeholder="인증번호를 입력하세요." id='inputcernum' onChange={cernumChange} style={{display:"none"}}/>
              {/*인증번호가 일치하지 않을때 Msg*/}
              <ErrorMsg style={{display:"none"}}>휴대전화 인증번호가 일치하지 않습니다.</ErrorMsg>
            </InputTop>
            <SubmitButton>
                <NextBtn type="button" name="" active={active} onClick={coolSmsSend}>인증번호 발송</NextBtn>
                {/*NextBtn(인증번호발송) 눌렀을때 show*/}
                {/*  1) 사업자 대표가 아닙니다 선택시 ( 약관동의 페이지 MemJoinAgree 로 넘어간다.) */}
                <Link to="/AgencyJoinAgree">
                  <Submit type="submit" name="" className='nextButtons' active2={active2} id='agencyJoinAgree_move' style={{display:"none"}} onClick={nextStep}>다음</Submit>
                </Link>
                {/*  2) 사업자 대표 선택시 ( 사업자 정보 등록페이지로 넘어간다 ) */}
                <Link to="/AgencyJoinInfo">
                  <GoNextPage type="submit" name="" className='nextButtons' active2={active2} id='agencyJoinInfo_move' style={{display:"none"}} onClick={nextStep}>다음</GoNextPage>
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
