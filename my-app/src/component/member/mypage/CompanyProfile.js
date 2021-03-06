//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
//server process
import serverController from '../../../server/serverController';

//css
import styled from "styled-components"

//img
import Img from '../../../img/member/company_no.png';
import Louder from '../../../img/member/louder.png';
import Checking from '../../../img/member/checking.png';
import RightArrow from '../../../img/notice/right_arrow.png';
import Plus from '../../../img/member/plus.png';

export default function JoinInput() {
  const [companyName,setCompanyName] = useState("");
  const [address1,setAddress1] = useState("");
  const [address2,setAddress2] = useState("");
  const [address3,setAddress3] = useState("");
  const [phone, setPhone] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [ceoPhone, setCeoPhone] = useState("");
  const [hash, setHash] = useState("");

  const [active,setActive] = useState(false);

  const companyNameChange = (e) =>{ setCompanyName(e.target.value); }
  const addressChange1 = (e) =>{ 
    setAddress1(e.target.value);
  }
  const addressChange2 = (e) =>{setAddress2(e.target.value);}
  const addressChange3 = (e) =>{ setAddress3(e.target.value);}
  const phoneChange = (e) =>{ setPhone(e.target.value); }
  const ceoNameChange = (e) =>{ setCeoName(e.target.value); }
  const ceoPhoneChange = (e) =>{ setCeoPhone(e.target.value); }
  const hashTagChange = (e) =>{setHash(e.target.value);}

  
  const checkVaildate = () =>{
    return companyName.length > 0 && address1.length > 2
    && address2.length > 2 && address3.length > 2 && phone.length > 9
    && ceoName.length > 1 && ceoPhone.length > 9
   }

   useEffect( async ()=>{
     /*if(checkVaildate())
        setActive(true);
     else
        setActive(false);
     */
     console.log('내부 컴포넌트의 미시적 변화때마다 실행하지는 않고, 아무런 컴포넌트 미감지하겠다, 최초 실행시점때만 실행');
     
     let body_info = {
       //임의 관리자가 선택한(들어온) 소속기업(companyid)에 해당하는 것에 대한 조회 및 수정처리한다.
       //comapany_id : xxxxxx
     }
     let view_info= await serverController.connectFetchController('/api/mypage/companyprofileView','POST',JSON.stringify(body_info));
     console.log(view_info);

     try{
       let result_data=view_info.result_data;
      setAddress2(result_data[0].address.split('  ')[0]);
      setAddress3(result_data[0].address.split('  ')[1]);
      setPhone(result_data[0].phone);
      setCeoName(result_data[0].ceo_name);
      setCeoPhone(result_data[0].ceo_phone);
      setCompanyName(result_data[0].biz_name);
     }catch(e){
       console.log('error message:',e);
     }
   },[])

   const store_submit = async () => {
     console.log('회사프로필설정 submit발생=>>>>>>>>>>>>>');

     console.log(companyName,address1,address2,address3,phone,ceoName,ceoPhone,active);

     //바로 serverController fetch api진행. 회사프로필지정진행 어디소속(companyid:관리자 추가한 소속기업<>팀원계정)에 대해서 수정을 가하는지 
     //각팀원게정들은 자신의 부모 생성자가 누구인지 참조필요?? 생성시점때 생성하는 root기업 mem_id or companyid지정필요 (mother_memid, mother_companyid) 부모 memid관리자생성자, companyid부모생성기업.관리자가 자신자체를 수정하는경우도? 자신자체는 곧 최초 회원가입시 입력한 회사정보등(사업자번호)등 기반으로 한 root기업 수정.

     let body_info = {
       companyname : companyName,
       address1 : address1,
        address2 : address2,
        address3 : address3,
        phone : phone,
        ceoname : ceoName,
        ceophone : ceoPhone,
     }
     console.log('edit store company profileinfo json post sender:',JSON.stringify(body_info));

     let res= await serverController.connectFetchController('/api/mypage/companyprofileEdit','POST',JSON.stringify(body_info));
     console.log(res);

     if(res.success){
       alert('수정되었습니다.');
     }
   };
   
   //edit page load 일때 정보 async fetch load data

    return (
        <Container>
          <WrapProfile>
            <MypageTxt>회사 프로필 설정</MypageTxt>
            <ProfileTop>
              <ProfileImg>
                <Profile src={Img}/>
                <File type="file" name="" id="file"/>
                <Label for="file"/>
              </ProfileImg>
              <ProfileName>
                <InputBusinessNumber type="text" name="" value="사업자번호" disabled/>
              {/*중개사일경우 중개업소 등록번호 노출*/}
              {/*  <InputBrokerNumber type="text" name="" value="중개업소등록번호" disabled/> */}
                <InputName type="text" name="" value="초기등록자소속프로필의 이름" disabled/>
                <InputPhoneNumber type="text" name="" value="초기등록자계정의 휴대폰번호" disabled/>
              </ProfileName>
            </ProfileTop>

            <ProfileMiddle>
              <OutInputBox>
                <InputTitle>상호명</InputTitle>
                <InputBox type="text" name="" placeholder="상호명을 입력해주세요." onChange={companyNameChange} value={companyName}/>
              </OutInputBox>
              <OutInputBoxAddress>
                <InputTitle>주소</InputTitle>
                <Flex>
                  <InputBoxShort type="text" name="" onChange={addressChange1}/>
                  <SearchAddressBtn type="button" name="">주소 검색</SearchAddressBtn>
                </Flex>
                <InputBoxMarginbt type="text" name="" onChange={addressChange2} value={address2}/>
                <InputBoxMarginbt type="text" name="" placeholder="상세 주소를 입력해주세요." onChange={addressChange3} value={address3}/>
              </OutInputBoxAddress>
              <OutInputBox>
                <InputTitle>전화번호</InputTitle>
                <InputBox type="text" name="" placeholder="전화번호를 ’-‘를 빼고 입력하여주세요." onChange={phoneChange} value={phone}/>
              </OutInputBox>
              <OutInputBox>
                <InputTitle>대표명</InputTitle>
                <InputBox type="text" name="" placeholder="이름을 입력하여주세요." onChange={ceoNameChange} value={ceoName}/>
              </OutInputBox>
              <OutInputBox>
                <InputTitle>대표 휴대폰 번호</InputTitle>
                <InputBox type="text" name="" placeholder="휴대번호를 ’-‘를 빼고 입력하여주세요." onChange={ceoPhoneChange} value={ceoPhone}/>
              </OutInputBox>
            {/*전문 중개사인 경우에만 해쉬태그 노출*/}
            {/*
              <OutInputBox>
                <InputTitle>해쉬태그 입력 (e.g 상가 , 사무실 , 아파트·현대아이리스 etc)</InputTitle>
                <InputBox type="text" name="" placeholder=" ’#‘를 빼고 입력하여주세요." onChange={hashTagChange}/>
              </OutInputBox>
            */}
            </ProfileMiddle>
          {/*버튼*/}
            <Button>
              <ProfileButton type="submit" name="" active={active} onClick={store_submit}>저장</ProfileButton>
            </Button>
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
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
  padding-left:65px;
  padding-bottom:42px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding-left:0;
    justify-content:center;
    }
`
const ProfileImg = styled.div`
  position:relative;
  width:101px;height:101px;
  border-radius: 9px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  margin-right:52px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(79/428));
    height:calc(100vw*(79/428));
    margin-right:calc(100vw*(30/428));
    }
`
const File = styled.input`
  display:none;
`
const Label = styled.label`
  display:inline-block;
  width:27px;height:27px;
  position:absolute;right:-5px;bottom:-5px;
  background:url(${Plus}) no-repeat;background-size:100% 100%;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(27/428));
    height:calc(100vw*(27/428));
    }
`
const Profile = styled.img`
  width:100%;height:100%;
`
const ProfileName = styled.div`
  display:inline-block;
  width:295px;height:auto;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(200/428));
    }

`
const InputBusinessNumber = styled.input`
  width:100%;height:100%;
  color:#707070;
  font-size:15px;
  background:transparent;
  font-weight:600;transform:skew(-0.1deg);
  margin-bottom:13px;
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    margin-bottom:calc(100vw*(10/428));
    }
`
const InputName = styled(InputBusinessNumber)`
  color:#4a4a4a;
  font-weight:800;
`
const InputBrokerNumber = styled(InputName)`
`
const InputPhoneNumber = styled(InputName)`
  margin-bottom:0;
`
const ProfileMiddle = styled.div`
  width:408px;margin:30px auto 0;
  @media ${(props) => props.theme.mobile} {
    width:95%;
    margin:calc(100vw*(30/428)) auto 0;
    }
`
const OutInputBox = styled.div`
  width:100%;margin-bottom:17px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(17/428));
    }
`
const InputTitle = styled.label`
  font-size:12px;font-family:'nbg',sans-serif;
  color:#4a4a4a;
  padding-left:7px;display:inline-block;
  margin-bottom:9px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    padding-left:calc(100vw*(7/428));
    margin-bottom:calc(100vw*(9/428));
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
const OutInputBoxAddress = styled(OutInputBox)`
`
const Flex = styled.div`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
  margin-bottom:4px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(4/428));
    }
`
const InputBoxShort = styled(InputBox)`
  width:280px;margin-right:4px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(244/428));
    margin-right:calc(100vw*(4/428));
    }
`
const InputBoxMarginbt = styled(InputBox)`
  margin-bottom:4px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(4/428));
    }
`
const SearchAddressBtn = styled.button`
  width: 123px;
  height: 43px;
  font-size:15px;color:#4a4a4a;font-family:'nbg',sans-serif;
  border-radius: 4px;
  border: solid 2px #979797;
  background-color: #fbfbfb;
  line-height:39px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(122/428));
    height:calc(100vw*(43/428));
    line-height:calc(100vw*(39/428));
    font-size:calc(100vw*(14/428));
    }
`
const Button = styled.div`
  width: 408px;
  margin:80px auto 0;
  @media ${(props) => props.theme.mobile} {
    width:95%;
    margin:calc(100vw*(60/428)) auto 0;
    }
`
const ProfileButton = styled.button`
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
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
    }
`
