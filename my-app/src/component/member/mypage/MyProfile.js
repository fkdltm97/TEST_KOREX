//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
//css
import styled from "styled-components";

//img
import Img from '../../../img/member/no_profile.png';
import Louder from '../../../img/member/louder.png';
import Checking from '../../../img/member/checking.png';
import RightArrow from '../../../img/notice/right_arrow.png';
import Plus from '../../../img/member/plus.png';
import Marker from '../../../img/member/mark.png';
//component
import PersonalAndCompany from './mypageTop/PersonalAndCompany';
import ProfessionalBroker from './mypageTop/ProfessionalBroker';
import Agency from './mypageTop/Agency';

import ProfileBottomElement from './mypageBottom/profileBottom';

//redux addons assetss
import {useSelector} from 'react-redux';

export default function JoinInput({profileedit,profileeditCheck}) {

  // console.log('myProfile컴포넌트 실행=========== 실행시마다 리덕스에서 로그인여부 검사하고 로그인됐으면 정보 가져와서 뿌리기');

  const login_userinfodata= useSelector(data => data.login_user);

  // console.log('data.login_userinfo refer infoi:',login_userinfodata);

  const [open, setOpen] = useState(false);//profileBOTTOM사용 STATE값들..
  const [inputValue, setInputValue] = useState("");

  const valueChk = () =>{
    return profileeditCheck;
  }

  const profilehead = () => {
    // console.log('profilehead함수 호출==========>>>',login_userinfodata.user_type);
    console.log("sjh---------------------------")
    console.log(login_userinfodata);
    console.log(login_userinfodata.is_login);
    console.log(login_userinfodata.user_type);

    if(login_userinfodata.is_login == 1){
      switch(login_userinfodata.user_type){
        case '전문중개사':
           {/*전문중개사일때 나오는 부분 ( BrokerKinds : 관리자 / 맴버 )*/}
           return (
            <BrokerTag>
              <BrokerKinds>관리자</BrokerKinds>
              <MarkerImg>전문</MarkerImg>
            </BrokerTag> 
          );
        // break;
        case '분양대행사':
          {/*분양대행사일때 나오는 부분 ( BrokerKinds : 관리자 / 맴버 )*/}
          return(
              <BrokerTag>
                <BrokerKinds>관리자</BrokerKinds>
              </BrokerTag>
            );
          // break;
       }
    }else{
      //로그인 오류 or 로그인 안된 상태일경우에도 일단 띄운다. 테스트용도로 비로그인상태라면 딱히 중개사or분양대행사 상태는 아니기에 두 관련 상태는 x
    }
     
  }

  const profilemiddle_display = () => {
    console.log('profilemiddle함수 호출 =================>>',login_userinfodata.user_type);
    
    if(login_userinfodata.is_login == 1){
      switch(login_userinfodata.user_type){
        case '개인':
           return(
            <ProfileMiddle> 
              <PersonalAndCompany/>
            </ProfileMiddle>
           );
        break;
  
        case '기업':
          return(
            <ProfileMiddle>
              <PersonalAndCompany/>
            </ProfileMiddle>
           );
        break;
  
        case '전문중개사':
            return(
            <ProfileMiddle>
              <ProfessionalBroker/>
            </ProfileMiddle>
            );
        break;
  
        case '분양대행사':
            return(
            <ProfileMiddle>
              <Agency/>
            </ProfileMiddle>
            );
        break;
      }
    }else{
      return(
        <ProfileMiddle> 
          <PersonalAndCompany/>
        </ProfileMiddle>
      );
    }  
  }
  
  const usernameChange = (e) =>{
    setInputValue(e.target.value);
    //  console.log('상태값username 변화:',e.target.value);
  }
  //사업자번호1,2,3 부분별 입력. 3-2-5자리.
 
  // -- 수정코드입니다.
  const profilelist = () => {
    return (
      <ProfileTop>
        {
          profileedit == 1?
          <ProfileImg>
            <Profile src={Img}/>
          </ProfileImg>
          :
          <ProfileImg>
            <Profile src={Img}/>
            <File type="file" name="" id="file"/>
            <Label for="file"/>
          </ProfileImg>
        }
        <ProfileName>
          {/* --원래 코드입니다. */}
          {/* <Input type="email" name="user_name" placeholder="이름을 설정해주세요." value="" onChange={usernameChange}/>*/}
          {/* -- 수정코드입니다. */}
          <Input type="text" name="user_name" placeholder="이름을 설정해주세요." value={inputValue} onChange={usernameChange}/>
          {
            profilehead()
          }
        </ProfileName>
        <ProfileBtns>
          <MySetting>
            <Link to="/MyProfileSetting">계정설정</Link>
          </MySetting>
          {/*
            개인, 기업일때 중개의뢰하기
            <LinkBtn>
              <Link to="/AddRequest">중개의뢰하기</Link>
            </LinkBtn>
            중개사(+전문중개사)일때 물건등록하기 / 분양대행사는 계정설정만!!
            <LinkBtn>
              <Link to="/AddProperty">물건등록하기</Link>{/*전문중개사는 바로 물건등록 페이지로 이동
            </LinkBtn>
            <LinkBtn>
              <Link onClick={()=>{proBrokerModal();}}>물건등록하기</Link>{/*일반중개사일경우 모달창뜨고 페이지로 이동
            </LinkBtn>
            */}
        </ProfileBtns>
      </ProfileTop>
    );
  }

//   수정버튼  --원래 코드입니다.
//   const profilelist = () => {
//       switch(profileedit){
//           case 1 :
//                   return (
//                     <ProfileTop>
//                       <ProfileImg>
//                         <Profile src={Img}/>
//                       </ProfileImg>

//                       <ProfileName>
//                         <Input type="email" name="user_name" placeholder="이름을 설정해주세요." value='' onChange={usernameChange}/>
//                         {
//                           profilehead()
//                         }
//                       </ProfileName>
//                       <ProfileBtns>
//                         <MySetting>
//                           <Link to="/MyProfileSetting">계정설정</Link>
//                         </MySetting>
// {/*
//                         {/*개인, 기업일때 중개의뢰하기
//                         <LinkBtn>
//                           <Link to="/AddRequest">중개의뢰하기</Link>
//                         </LinkBtn>
//                         {/*중개사(+전문중개사)일때 물건등록하기 / 분양대행사는 계정설정만!!
//                         <LinkBtn>
//                           <Link to="/AddProperty">물건등록하기</Link>{/*전문중개사는 바로 물건등록 페이지로 이동
//                         </LinkBtn>
//                         <LinkBtn>
//                           <Link onClick={()=>{proBrokerModal();}}>물건등록하기</Link>{/*일반중개사일경우 모달창뜨고 페이지로 이동
//                         </LinkBtn>

// */}                      </ProfileBtns>
//                     </ProfileTop>
//                   );
//           case 2 :
//                   return (
//                     <ProfileTop>
//                       <ProfileImg>
//                         <Profile src={Img}/>
//                         <File type="file" name="" id="file"/>
//                         <Label for="file"/>
//                       </ProfileImg>
//                       <ProfileName>
//                         <InputBorder type="email" name="user_name" placeholder="이름을 설정해주세요." value='' onChange={usernameChange}/>
//                         {
//                           profilehead()
//                         }
//                       </ProfileName>
//                       <ProfileBtns>
//                         <MySetting>
//                           <Link to="/MyProfileSetting">계정설정</Link>{/*분양대행사는 계정설정버튼만 노출됨*/}
//                         </MySetting>
// {/*
//                         {/*개인, 기업일때 중개의뢰하기
//                         <LinkBtn>
//                           <Link to="/AddRequest">중개의뢰하기</Link>
//                         </LinkBtn>
//                         {/*중개사(+전문중개사)일때 물건등록하기 / 분양대행사는 계정설정만!!
//                         <LinkBtn>
//                           <Link to="/AddProperty">물건등록하기</Link>{/*전문중개사는 바로 물건등록 페이지로 이동
//                         </LinkBtn>
//                         <LinkBtn>
//                           <Link onClick={()=>{proBrokerModal();}}>물건등록하기</Link>{/*일반중개사일경우 모달창뜨고 페이지로 이동
//                         </LinkBtn>          
// */}    
//                       </ProfileBtns>
//                     </ProfileTop>
//                   );
//           default : return null;
//       }
//   }

    return (
        <Container>
          <WrapProfile>
            <MypageTxt>마이페이지</MypageTxt>
            {
              profilelist()
            }
            {
              profilemiddle_display()
            }
            

          <ProfileBottom>
            <ProfileBottomElement open={open} setOpen={setOpen}/>
          </ProfileBottom>

          </WrapProfile>
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
    padding:40px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(370/428));
      padding:calc(100vw*(40/428)) 0 calc(100vw*(150/428));
      }
`
const WrapProfile = styled.div`
  width:100%;
`
const MypageTxt = styled.h2`
  font-size:20px;font-weight:600;transform:skew(-0.1deg);
  padding-left:30px;color:#707070;
  margin-bottom:35px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(20/428));
    margin-bottom:calc(100vw*(35/428));
    }
`
const ProfileTop = styled.div`
  width:100%;position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  padding-left:100px;
  @media ${(props) => props.theme.mobile} {
    padding-left:0;
    justify-content:center;
    }
`
const ProfileImg = styled.div`
  position:relative;
  width:95px;height:95px;
  border-radius:100%;
  border:5px solid #979797;
  display:inline-block;
  margin-right:24px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(72/428));
    height:calc(100vw*(72/428));
    margin-right:calc(100vw*(24/428));
    }
`
const ProfileBtns = styled.div`
  position:absolute;right:40px;top:50%;
  width:90px;height:auto;
  transform:translateY(-50%);
  @media ${(props) => props.theme.mobile} {
    display:flex;justify-content:flex-start;align-itmes:center;
    width:auto;
    top: calc(100vw*(-37/428));
    right: calc(100vw*(11/428));
  }
`
const MySetting = styled.button`
width:100%;padding:0 5px;box-sizing:border-box;
height: 30px;line-height:30px;color:#4a4a4a;
font-size:13px;font-weight:600;transform:skew(-0.1deg);
border-radius: 3px;
border: solid 1px #4a4a4a;
background-color: #ffffff;
margin-bottom:6px;
transition:all 0.3s;
&:hover{background:#4a4a4a;color:#fff}
@media ${(props) => props.theme.mobile} {
    width:calc(100vw*(75/428));
    height:calc(100vw*(30/428));
    font-size:calc(100vw*(13/428));
    line-height:calc(100vw*(30/428));
    margin-bottom:0;
    margin-right:calc(100vw*(5/428));
  }
`
const LinkBtn = styled(MySetting)`
  background:#01684b;
  width:100%;color:#fff;border:1px solid transparent;
  transition:all 0.3s;
  &:hover{background:#fff;border:1px solid #01684b;color:#01684b;}
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(100/428));

  }
`
const File = styled.input`
  display: none;
`
const Label = styled.label`
  display:inline-block;
  width:27px;height:27px;
  position:absolute;right:0;bottom:0;
  background:url(${Plus}) no-repeat;background-size:100% 100%;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(27/428));
    height:calc(100vw*(27/428));
    right:calc(100vw*(-5/428));
    bottom:calc(100vw*(-5/428));
    }
`
const Profile = styled.img`
  width:100%;height:100%;
`
const ProfileName = styled.div`
  display:inline-block;
  width:295px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(250/428));
    }

`
const Input = styled.input`
  width:100%;height:43px;
  color:#454545;
  padding-left:28px;
  font-size:15px;
  
  font-weight:800;transform:skew(-0.1deg);
  &::placeholder{color:#4a4a4a;font-weight:600;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    height:calc(100vw*(43/428));
    padding-left:calc(100vw*(20/428));
    }
`
const InputBorder = styled(Input)`
  border:1px solid #e4e4e4;
  border-radius:5px;
`
const ProfileMiddle = styled.div`
  width:100%;
  border-top:6px solid #f2f2f2;
  border-bottom:6px solid #f2f2f2;
  padding:40px 0;
  margin-top:30px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(40/428)) 0;
    margin-top:calc(100vw*(30/428));
    }
`
const FlexBox = styled.div`
  display:flex;width:100%;
  justify-content:center;align-items:center;
  margin-bottom:25px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(25/428));
    }
`
const Left = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  margin-right:88px;
`
const Icon = styled.img`
  display:inline-block;
  width:20px;margin-right:12px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    margin-right:calc(100vw*(12/428));
    }
`
const SubTitle = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const Right = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
`
const Txt = styled.p`
  font-size:15px;color:#4a4a4a;
  color:#979797;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const TxtHave = styled(Txt)`
  color:#4a4a4a;
`
const Part = styled.p`
  width:1px;height:16px;
  background:#979797;vertical-align:middle;
  margin:0 12px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(1/428));
    height:calc(100vw*(16/428));
    margin:0 calc(100vw*(12/428));
    }
`
const ProfileBottom = styled.div`
  width:100%;
`
const Ul = styled.ul`
  width:100%;
`
const Li = styled.li`
  position:relative;
  width:100%;
  display:felx;justify-content:space-between;align-items:center;flex-wrap:wrap;
  padding:36px 40px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(30/428)) calc(100vw*(20/428)) calc(100vw*(30/428)) calc(100vw*(30/428));
    }
`
const LiPJ = styled.div`
width:100%;
position:relative;
display:flex;justify-content:space-between;align-items:center;
`
const SubDepth = styled.ul`
  width:100%;
  padding:25px 0 0 15px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(15/428)) 0 0 calc(100vw*(15/428));
    }
`
const SubLi = styled.li`
  position:Relative;
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:10px;
  &:last-child{margin-bottom:0;}
`
const LinkTxt = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const Arrow = styled.img`
  width:8px;vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(8/428));
    }
`
const ArrowRotate= styled(Arrow)`
  transform:rotate(90deg);
`
const BrokerTag = styled.div`
  padding-left:28px;
  display:${({is_agency})=> true ? 'block' : 'none'};
  display:${({is_realtor})=> true ? 'block' : 'none'};
  @media ${(props) => props.theme.mobile} {
    padding-left:calc(100vw*(20/428));
    }
`
const BrokerKinds = styled.span`
  font-size:15px;font-weight:600;transform:skew(-0.1deg);
  color:#979797;font-family:'nbg',sans-serif;
  vertical-align:middle;display:inline-block;margin-top:0;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    margin-top:calc(100vw*(3/428));
    }
`
const MarkerImg = styled.span`
  display:inline-block;
  margin-left:17px;
  width: 42px;
  height: 20px;
  border-radius: 4px;
  border: solid 1px #2b664d;
  background-color: #fbfbfb;
  line-height:20px;
  color:#2b664d;font-size:10px;font-family:'nbg',sans-serif;
  font-weight:600;
  padding-left:17px;
  background:url(${Marker}) no-repeat 4.5px center; background-size:9px 9px;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(8/428));
    padding-left:calc(100vw*(17/428));
    width:calc(100vw*(42/428));
    height:calc(100vw*(20/428));
    line-height:calc(100vw*(20/428));
    font-size:calc(100vw*(10/428));
    background:url(${Marker}) no-repeat calc(100vw*(5/428)) center; background-size:calc(100vw*(9/428)) calc(100vw*(9/428));
    }
`
