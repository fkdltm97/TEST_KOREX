//react
import React ,{useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";

//server process
import serverController from '../../../../server/serverController';

//css
import styled from "styled-components"

//img

import ArrowTop from '../../../../img/map/arrow_top.png';
import ArrowDown from '../../../../img/member/arrow_down.png';
import Enter from '../../../../img/member/enter.png';
import CheckImg from '../../../../img/map/radio.png';
import CheckedImg from '../../../../img/map/radio_chk.png';
import RadioImg from '../../../../img/map/radi.png';
import RadioChkImg from '../../../../img/map/radi_chk.png';
import Picture from '../../../../img/member/picture.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import SearchApartOfficetel from "./SearchApartOfficetel";
import SearchStoreOffice from "./SearchStoreOffice";
import SearchApartOfficetelSelectInfo from "./SearchApartOfficetelSelectInfo";

import {useSelector} from 'react-redux';

export default function Request({setPicture}) {
  const [activeIndex,setActiveIndex] = useState(-1);
  const [openMore, setOpenMore] = useState(false);
  const [park,setPark] = useState(false);
  
  const history = useHistory();

  const rotate=()=>{
    if(openMore == true) {
      return "rotate(180deg)"
    }else{
      return "rotate(0deg)"
    }
  }

  const OptionInside =[
  {oi_id : 0,label:"침대",default:true},
  {oi_id : 1,label:"붙박이장",default:false},
  {oi_id : 2,label:"옷장",default:false},
  {oi_id : 3,label:"신발장",default:false},
  {oi_id : 4,label:"싱크대",default:false},
  {oi_id : 5,label:"가스레인지",default:false},
  {oi_id : 6,label:"인덕션",default:false},
  {oi_id : 7,label:"냉장고",default:false},
  {oi_id : 8,label:"세탁기",default:false},
  {oi_id : 9,label:"샤워부스",default:false},
  {oi_id : 10,label:"비데",default:false},
  {oi_id : 11,label:"벽걸이에어컨",default:false},
  {oi_id : 12,label:"스탠드에어컨",default:false},
  {oi_id : 13,label:"천장에어컨",default:false}
]
const OptionProtect =[
  {op_id : 0,label:"CCTV",default:true},
  {op_id : 1,label:"경비원",default:false},
  {op_id : 2,label:"사설경비",default:false},
  {op_id : 3,label:"현관보안",default:false},
  {op_id : 4,label:"방범창",default:false},
  {op_id : 5,label:"비디오폰",default:false},
  {op_id : 6,label:"인터폰",default:false},
  {op_id : 7,label:"카드키",default:false},
  {op_id : 8,label:"화재경보기",default:false},
  {op_id : 9,label:"무인택배함",default:false}
]

  const temp_brokerRequest=useSelector(data => data.tempBrokerRequest);
  const login_user=useSelector(data => data.login_user);//리덕스 로그인회원정보 데이터 접근(memid,companyid,유저이다이,폰,이메일,유저이름,usertype,registertype,memadmin,islogin,isexculsive전문중개사여부)

  console.log('>>>>유지된 정보들 기본입력정보들(inserted임시 입력정보들):',temp_brokerRequest);
  console.log('>>>>마이페이지 로그인 중개사회원 companyid(어떤중개사의회원):',login_user);

  //추가정보 입력페이지 입력정보들 state형태로 저장한다.
  const [roomcount,setRoomcount] = useState('');
  const [bathroomcount,setBathroomcount] = useState('');
  const [isduplexfloor,setIsduplexfloor] = useState('');
  const [isparking,setIsparking] = useState('');
  const [parkingoptions,setParkingoptions] = useState('');
  const [iselevator,setIselevator] = useState('');
  const [iswithpet,setIswithpet] = useState('');
  const [direction,setDirection] = useState('');
  const [entrance,setEntrance] = useState('');
  const [heatmethod,setHeatmethod] = useState('');
  const [heatfuel,setHeatfuel] = useState('');
  const [apartspaceoption,setApartspaceoption] = useState('');
  const [spaceoption,setSpaceoption] = useState('');
  const [securityoption,setSecurityoption] = useState('');
  const [spaceaddonoption,setSpaceaddonoption] = useState('');
  const [iscontractrenewal,setIscontractrenewal] = useState('');
  const [loanprice,setLoanprice] = useState('');
  const [guaranteeprice,setGuaranteeprice] = useState('');
  const [maemul_description,setMaemul_description] = useState('');
  const [maemul_descriptiondetail,setMaemul_descriptiondetail] = useState('');


  const change_roomcount = (e) => {
    setRoomcount(e.target.value);
  }
  const change_bathroomcount = (e) => {
    setBathroomcount(e.target.value);
  }
  const change_isduplexfloor = (e) => {
    setIsduplexfloor(e.target.value);
  }
  const change_isparking = (e) => {
    setIsparking(e.target.value);
  }
  const change_parkingoptions = (e) => {
    setParkingoptions(e.target.value);
  }
  const change_iselevator = (e) => {
    setIselevator(e.target.value);
  }
  const change_iswithpet = (e) => {
    setIswithpet(e.target.value);
  }
  const change_direction = (e) => {
    setDirection(e.target.value);
  } 
  const change_entrance = (e) => {
    setEntrance(e.target.value);
  }
  const change_heatmethod = (e) => {
    setHeatmethod(e.target.value);
  }
  const change_heatfuel = (e) => {
    setHeatfuel(e.target.value);
  }
  const change_apartspaceoption = (e) => {
    var apart_spaceoptions=document.getElementsByClassName('apartspaceoptions');
    
    var checked_apartspaceoptions=[];
    for(let i=0,c=0; i<apart_spaceoptions.length; i++){
      if(apart_spaceoptions[i].checked){
        console.log('채크된 항목:',apart_spaceoptions[i]);
        checked_apartspaceoptions[c]= apart_spaceoptions[i].value;
        c++;
      }
    }
    console.log('현재 체크된 변화상황 체크 아파트공간옵션요소:',checked_apartspaceoptions,checked_apartspaceoptions.join(','));
    setApartspaceoption(checked_apartspaceoptions.join(','));
  }
  const change_spaceoption = (e) => {
    var spaceoptions=document.getElementsByClassName('spaceoptions');
    
    var checked_spaceoptions=[];
    for(let i=0,c=0; i<spaceoptions.length; i++){
      console.log('공간옵션 상태체크여부:',spaceoptions[i].checked);
      if(spaceoptions[i].checked){
        console.log('체크된 항목:',spaceoptions[i]);
        checked_spaceoptions[c]= spaceoptions[i].value;
        c++;
      }
    }
    console.log('현재 체크된 변화상황 체크 공간옵션요소:',checked_spaceoptions,checked_spaceoptions.join(','));

    setSpaceoption(checked_spaceoptions.join(','));
  } 
  const change_securityoption = (e) => {
    var securityoptions=document.getElementsByClassName('securityoptions');
    
    var checked_securityoptions=[];
    for(let i=0,c=0; i<securityoptions.length; i++){
      if(securityoptions[i].checked){
        checked_securityoptions[c]= securityoptions[i].value;
        c++;
      }
    }
    console.log('현재 체크된 변화상황 체크 보안옵션요소:',checked_securityoptions,checked_securityoptions.join(','));

    setSecurityoption(checked_securityoptions.join(','));
  }
  const change_spaceaddonoption = (e) => {
    var spaceaddonoptions=document.getElementsByClassName('spaceaddonoptions');
    
    var checked_spaceaddonoptions=[];
    for(let i=0,c=0; i<spaceaddonoptions.length; i++){
      if(spaceaddonoptions[i].checked){
        checked_spaceaddonoptions[c]= spaceaddonoptions[i].value;
        c++;
      }
    }
    console.log('현재 체크된 변화상황 체크 공간addon옵션요소:',checked_spaceaddonoptions,checked_spaceaddonoptions.join(','));

    setSpaceaddonoption(checked_spaceaddonoptions.join(','));
  }
  const change_iscontractrenewal = (e) => {
    setIscontractrenewal(e.target.value);
  }
  const change_loanprice = (e) => {
    setLoanprice(e.target.value);
  }
  const change_guaranteeprice = (e) => {
    setGuaranteeprice(e.target.value);
  }
  const change_maemul_description = (e) => {
    setMaemul_description(e.target.value);
  }
  const change_maemul_descriptiondetail = (e) => {
    setMaemul_descriptiondetail(e.target.value);
  }

  
  //다음버튼 누릀때 서버로 지금껏 정보 모두 보낸다.(외부수임물건전달방식 전닭. 다른 처리로 외부수임처리이기에.)
  const nextStep = async () => {
    //지금껏까지의 모든 저장정보 mereeged하여 서버에 요청제출필요ㅕ하다.
    console.log('>>>유지된 정보들 기본입력정보들:',temp_brokerRequest);
    console.log('>>>추가입력정보들 state정보값들:',roomcount,bathroomcount,isduplexfloor,isparking,parkingoptions,iswithpet,direction,entrance,heatmethod,heatfuel,apartspaceoption,spaceoption,securityoption,spaceaddonoption,iscontractrenewal,loanprice,guaranteeprice,maemul_description,maemul_description,maemul_descriptiondetail);

    let body_info={
      address: temp_brokerRequest.dangiaddress,
      companyid: login_user.company_id,//어떤 로그인 중개사회원 중개사아이디인지.
      exculsivedimension: temp_brokerRequest.jeonyongdimension,
      exculsivepyeong: temp_brokerRequest.jeonyongpyeong,
      ibju_isinstant: temp_brokerRequest.ibju_isinstant,
      ibju_specifydate : temp_brokerRequest.ibju_specifydate,
      maemulname: temp_brokerRequest.maemulname,
      maemultype: temp_brokerRequest.maemultype,
      managecost : temp_brokerRequest.managecost,
      requestmanname: temp_brokerRequest.name,//여기선 외부수임요청자 정보(이름,휴대폰)
      requestmemphone: temp_brokerRequest.phone,
      sellprice: temp_brokerRequest.sellprice, 
      selltype : temp_brokerRequest.selltype, 
      supplydimension : temp_brokerRequest.supplydimension,
      supplypyeong: temp_brokerRequest.supplypyeong,

      dong: temp_brokerRequest.dong,
      hosil : temp_brokerRequest.hosil,
      floor : temp_brokerRequest.floor,
      dangi: temp_brokerRequest.dangi,
      exculsive_periods: temp_brokerRequest.exculsive_periods,
      managecostincludes: temp_brokerRequest.managecostincludes,

      roomcount_val :roomcount,
      bathroomcount_val : bathroomcount,
      isduplexfloor_val : isduplexfloor,
      isparking_val : isparking,
      parkingoptions_val : parkingoptions,
      iselevator_val : iselevator,
      iswithpet_val : iswithpet,
      direction_val : direction,
      entrance_val : entrance,
      heatmethod_val : heatmethod,
      heatfuel_val : heatfuel,
      apartspaceoption_val : apartspaceoption,
      spaceoption_val :spaceoption,
      securityoption_val : securityoption,
      spaceaddonoption_val : spaceaddonoption,
      iscontractrenewal_val : iscontractrenewal,
      loanprice_val : loanprice,
      guaranteeprice_val : guaranteeprice,
      maemul_description_val : maemul_description,
      maemul_descriptiondetail_val : maemul_descriptiondetail
    }

    console.log('>>>JSON SUBMIT DATA:',body_info,JSON.stringify(body_info));

    let res = await serverController.connectFetchController('/api/broker/user_brokerOuterRequest','POST',JSON.stringify(body_info));
    console.log('->>>>>res resultsss:',res);
    
    if(res.success){
      alert('외부수임 매물 등록 완료!');

      //history('/');
    }else{
      alert('처리에 문제가 있습니다.');
    }
  };
    return (
        <Container>
          <WrapRequest>
            <TopTitle>추가정보 입력/수정</TopTitle>
            <WrapBox>
              <Box>
                <SubTitle>
                  <Title>물건정보</Title>
                  <Line/>
                </SubTitle>
                <InputBox>
                  <Label>방수/욕실수<Pilsu>*</Pilsu></Label>
                  <Widthbox>
                    <InboxRoom>
                      <InputRoom type="text" placeholder="방수 입력" value={roomcount} onChange={change_roomcount}/>
                    </InboxRoom>
                    <SpanRoom>개</SpanRoom>
                    <InboxRoom>
                      <InputRoom type="text" placeholder="욕실수 입력" value={bathroomcount} onChange={change_bathroomcount}/>
                    </InboxRoom>
                    <SpanRoom>개</SpanRoom>
                  </Widthbox>
                </InputBox>
            {/*오피스텔일때 복층여부~반려동물 추가*/}
                <MoreBox>
                  <Label>복층여부<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="is_duplex_floor" id="floor1" defaultChecked value='0' onChange={change_isduplexfloor}/>
                      <RadioLabel for="floor1">
                        <RadioSpan/>
                        단층
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="is_duplex_floor" id="floor2" value='1' onChange={change_isduplexfloor}/>
                      <RadioLabel for="floor2">
                        <RadioSpan/>
                        복층
                      </RadioLabel>
                    </Radiobox>
                  </WrapCheck>
                </MoreBox>
                <MoreBox>
                  <Label>주차<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="parking" id="park1" defaultChecked value='0' onChange={change_isparking}/>
                      <RadioLabel for="park1" onClick={()=>{setPark(false)}}>
                        <RadioSpan/>
                        불가
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="parking" id="park2" value='1' onChange={change_isparking}/>
                      <RadioLabel for="park2" onClick={()=>{setPark(true)}}>
                        <RadioSpan/>
                        가능
                      </RadioLabel>
                    </Radiobox>
                    {
                      park ?
                      <InputPark type="text" placeholder="(e.g 1대 가능)" value={parkingoptions} onChange={change_parkingoptions}/>
                      :
                      null
                    }
                  </WrapCheck>
                </MoreBox>
                <MoreBox>
                  <Label>엘리베이터<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="elevate" id="elevate1" defaultChecked value='0' onChange={change_iselevator}/>
                      <RadioLabel for="elevate1">
                        <RadioSpan/>
                        없음
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="elevate" id="elevate2" value='1' onChange={change_iselevator}/>
                      <RadioLabel for="elevate2">
                        <RadioSpan/>
                        있음
                      </RadioLabel>
                    </Radiobox>
                  </WrapCheck>
                </MoreBox>
                <MoreBox>
                  <Label>반려동물<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="pet" id="pet1" defaultChecked value='0' onChange={change_iswithpet}/>
                      <RadioLabel for="pet1">
                        <RadioSpan/>
                        불가
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="pet" id="pet2" value='1' onChange={change_iswithpet}/>
                      <RadioLabel for="pet2">
                        <RadioSpan/>
                        가능
                      </RadioLabel>
                    </Radiobox>
                  </WrapCheck>
                </MoreBox>


                <InputBox>
                  <Label>사진<Pilsu>*</Pilsu></Label>
                  <Widthbox>
                    <InputFileLabel for="picture" onClick={()=>{setPicture(true)}}>사진 추가</InputFileLabel>
                  </Widthbox>
                </InputBox>
              </Box>
            {/*더보기*/}
              <WrapMoreView>
                <SubTitle onClick={()=>{setOpenMore(!openMore)}} style={{cursor:"pointer"}}>
                  <EnterImg src={Enter}/>
                  <Title>더보기</Title>
                  <ShortLine/>
                  <ArrowTopImg src={ArrowTop} rotate={rotate}/>
                </SubTitle>
              {
                openMore ?
                <MoreView>
                  <SelectBox>
                    <Label>방향</Label>
                    <SelectMb onChange={change_direction}>
                      <Option>방향을 선택하여주세요.</Option>
                      <Option value='남향'>남향</Option>
                      <Option value='남동향'>남동향</Option>
                    </SelectMb>
                  </SelectBox>
                  {/*현관구조*/}
                  <SelectBox>
                    <Label>현관구조</Label>
                    <SelectMb onChange={change_entrance}>
                      <Option>현관구조를 선택하여주세요.</Option>
                      <Option value='복도식'>복도식</Option>
                      <Option value='계단식'>계단식</Option>
                    </SelectMb>
                  </SelectBox>
                  {/*현관구조*/}
                  <SelectBox>
                    <Labelblock>난방</Labelblock>
                    <SelectMbShort onChange={change_heatmethod}>
                      <Option>방식 선택</Option>
                      <Option value='개별난방'>개별난방</Option>
                      <Option value='중앙난방'>중앙난방</Option>
                    </SelectMbShort>
                    <SelectMbShort onChange={change_heatfuel}>
                      <Option>연료 선택</Option>
                      <Option value='도시가스'>도시가스</Option>
                      <Option value='LPG'>LPG</Option>
                    </SelectMbShort>
                  </SelectBox>
                {/*아파트일때 옵션(공간)*/}
                  <MoreBox style={{display:"block"}}>
                    <Label>옵션(공간)</Label>
                    <WrapCheck>
                      <Checkbox>
                        <Check type="checkbox" id="apart_spaceoption1" value='발코니' className='apartspaceoptions' onChange={change_apartspaceoption} defaultChecked/>
                        <CheckLabel for="apart_spaceoption1">
                          <CheckSpan/>
                          발코니
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="apart_spaceoption2" value='베란다' className='apartspaceoptions' onChange={change_apartspaceoption}/>
                        <CheckLabel for="apart_spaceoption2">
                          <CheckSpan/>
                          베란다
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="apart_spaceoption3" value='테라스' className='apartspaceoptions' onChange={change_apartspaceoption}/>
                        <CheckLabel for="apart_spaceoption3">
                          <CheckSpan/>
                          테라스
                        </CheckLabel>
                      </Checkbox>
                    </WrapCheck>
                  </MoreBox>

              {/*오피스텔,상가,사무실일때 옵션*/}
                  <MoreBox>
                    <TopOptionTxt>옵션</TopOptionTxt>
                    <Label>내부</Label>
                    <WrapCheck>
                    {
                      OptionInside.map((value) => {
                        return(
                          <Checkbox>
                            <Check type="checkbox" id={"spaceoption"+value.oi_id} className='spaceoptions' onChange={change_spaceoption} value={value.label} defaultChecked={value.default ? true:false}/>
                            <CheckLabel for={"spaceoption"+value.oi_id}>
                              <CheckSpan/>
                              {value.label}
                            </CheckLabel>
                          </Checkbox>
                        )}
                      )}
                    </WrapCheck>
                  </MoreBox>
                  <MoreBox>
                    <Label>보안</Label>
                    <WrapCheck>
                    {
                      OptionProtect.map((value) => {
                        return(
                          <Checkbox>
                            <Check type="checkbox" id={"securityoption"+value.op_id} className='securityoptions' onChange={change_securityoption} value={value.label} defaultChecked={value.default ? true:false}/>
                            <CheckLabel for={"securityoption"+value.op_id}>
                              <CheckSpan/>
                              {value.label}
                            </CheckLabel>
                          </Checkbox>
                        )}
                      )}
                    </WrapCheck>
                  </MoreBox>
                  <MoreBox>
                    <Label>공간</Label>
                    <WrapCheck>
                      <Checkbox>
                        <Check type="checkbox" id="space_addon_option1" value='베란다' className='spaceaddonoptions' onChange={change_spaceaddonoption}/>
                        <CheckLabel for="space_addon_option1">
                          <CheckSpan/>
                          베란다
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="space_addon_option2" value='테라스' className='spaceaddonoptions' onChange={change_spaceaddonoption}/>
                        <CheckLabel for="space_addon_option2">
                          <CheckSpan/>
                          테라스
                        </CheckLabel>
                      </Checkbox>
                    </WrapCheck>
                  </MoreBox>
                </MoreView>
                :
                null

              }
              </WrapMoreView>
              <Box>
                <SubTitle>
                  <Title>거래정보</Title>
                  <Line/>
                </SubTitle>
                <MoreBox>
                  <Label>계약갱신권 행사여부<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" onChange={change_iscontractrenewal} value='0' name="is_contractrenewal" id="radi1" defaultChecked/>
                      <RadioLabel for="radi1">
                        <RadioSpan/>
                        미확인
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" onChange={change_iscontractrenewal} value='1' name="is_contractrenewal" id="radi2"/>
                      <RadioLabel for="radi2">
                        <RadioSpan/>
                        확인
                      </RadioLabel>
                    </Radiobox>
                  </WrapCheck>
                </MoreBox>
                <InputBox>
                  <Label>융자금</Label>
                  <Example>(e.g 1억 5,000)</Example>
                  <Flex>
                    <InputMidi type="text" placeholder="가격 입력" value={loanprice} onChange={change_loanprice}/>
                    <Dan>만원</Dan>
                  </Flex>
                </InputBox>
                <InputBox>
                  <Label>기보증금 / 월세</Label>
                  <Example>(e.g 1억 5,000)</Example>
                  <Flex>
                    <InputMidi type="text" placeholder="가격 입력" value={guaranteeprice} onChange={change_guaranteeprice}/>
                    <Dan>만원</Dan>
                  </Flex>
                </InputBox>
                <InputBox>
                  <Label>설명</Label>
                  <InputTxt type="text" placeholder="매물 요약 입력" value={maemul_description} onChange={change_maemul_description}/>
                  <Textarea type="textarea" placeholder="매물 설명 입력" value={maemul_descriptiondetail} onChange={change_maemul_descriptiondetail}/>
                </InputBox>
              </Box>
            </WrapBox>
      {/*!!!!다음 버튼 , 조건문 맞춰서 액티브 됐을때 색상 바뀌어야함..!!!! */}
            <NextButton>
              <Link onClick={nextStep}>
                <Next type="button">확인</Next>
              </Link>
            </NextButton>
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
      width:calc(100vw*(370/428));
      padding:calc(100vw*(30/428)) 0 calc(100vw*(100/428));
      }
`
const WrapRequest = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:40px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const WrapBox = styled.div`
  width:408px;margin:0 auto;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    }
`
const Box = styled.div`
  width:100%;
  margin-bottom:55px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(50/428));
    }
`
const SubTitle = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  margin-bottom:40px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(40/428));
    }
`
const Title = styled.h2`
  font-size:15px;color:#4e4e4e;
  font-weight:800;transform:skew(-0.1deg);
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-right:calc(100vw*(7/428));
    }
`
const Line = styled.div`
  width:340px;height:1px;
  background:#cecece;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(300/428));
    }
`
const SelectBox = styled.div`
  width:100%;
  display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;
`
const Label = styled.label`
  display:inline-block;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);color:#4a4a4a;
  margin-bottom:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(10/428));
    }
`
const Labelblock = styled(Label)`
  display:block;width:100%;
`
const Pilsu = styled.span`
  display:inline-block;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);color:#fe7a01;
  vertical-align:middle;
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-left:calc(100vw*(5/428));
    }
`
const Select = styled.select`
  width:100%;height:43px;
  font-weight:600;transform:skew(-0.1deg);
  text-align-last:center;
  border: solid 1px #e4e4e4;
  border-radius:4px;
  appearance:none;color:#707070;
  font-size:15px;transform:Skew(-0.1deg);
  background:url(${ArrowDown}) no-repeat 92% center;background-size:11px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(43/428));
    font-size:calc(100vW*(15/428));
    background-size:calc(100vw*(11/428));
    }
`
const SelectMb = styled(Select)`
  margin-bottom:30px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(30/428));
    }
`
const SelectMbShort = styled(Select)`
  width:190px;margin-bottom:30px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(170/428));
    margin-botom:calc(100vw*(30/428));
    }
`
const Option = styled.option`
 transform:skew(-0.1deg);
 font-family:'nbg',sans-serif;
`
const WrapInputBox = styled.div`
  width:100%;
`
const InputBox = styled.div`
  position:relative;
  margin-bottom:25px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(15/428));
    }
`
const InputDisabled = styled.input`
  width:100%;height:43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #fbfbfb;
  color:#979797;
  font-size:15px;font-weight:500;
  text-align:center;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    }
`
const InputTxt= styled.input`
  width:100%;
  height:43px;
  text-align:center;
  background:transparent;
  font-size:15px;color:#4a4a4a;
  transform:skew(-0.1deg);
  border-radius: 4px;font-weight:600;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    }
`
const Textarea = styled.textarea`
  width:100%;height:220px;
  resize:none;border:1px solid #e4e4e4;
  border-radius:4px;padding:15px;
  font-size:15px; transform:skeW(-0.1deg);
  color:#4a4a4a;margin-top:10px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(220/428));
    font-size:calc(100vw*(15/428));
    margin-top:calc(100vw*(10/428));
    }

`
const WrapItemInfo = styled.div`
`

const Widthbox = styled.div`
  width:100%;display:flex;justify-content:space-between;
  align-items:center;
`
const Inbox = styled.div`
  display:flex;justify-content:center;
  align-items:center;
  width: 177px;
  height: 43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(167/428));
    height:calc(100vw*(43/428));
    }
`
const InboxRoom = styled(Inbox)`
  width:150px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(150/428));
    }
`
const InputShort = styled.input`
  width:70%;
  height:100%;
  text-align:center;
  background:transparent;font-weight:600;
  font-size:15px;color:#4a4a4a;
  transform:skew(-0.1deg);
  &::placeholder{color:#979797}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
const Part = styled.div`
  display:inline-block;
  margin:0 9px;
  @media ${(props) => props.theme.mobile} {
    margin:calc(100vw*(9/428));
    }
`
const InputRoom = styled(InputShort)`
  width:100%
`
const InputFileLabel = styled.label`
  width:100%;height:43px;border-radius:4px;
  border:1px solid #e4e4e4;cursor:pointer;
  text-align:center;vertical-align:middle;line-height:43px;
  font-size:15px;color:#707070;transform:skew(-0.1deg);
  background:url(${Picture}) no-repeat 95% center; background-size:21px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    background-size:calc(100vw*(21/428));
    line-height:calc(100vw*(43/428));
    }
`

const Span = styled.span`
  vertical-align:middle;
  font-size:15px;font-weight:600;
  color:#4a4a4a;transform:skew(-0.1deg);
  margin-left:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-eleft:calc(100vw*(10/428));
    }
`
const SpanRoom =styled(Span)`
  color:#707070;
  margin-left:0;
`
const Same = styled.span`
  font-size:15px;font-weight:600;
  color:#4a4a4a;transform:skew(-0.1deg);
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
const LongLine = styled.div`
  width:100%;height:1px;
  background:#cecece;
  margin:26px 0 40px;
  @media ${(props) => props.theme.mobile} {
    margin:calc(100vw*(26/428)) 0 calc(100vw*(40/428));
    }
`
const Example = styled.p`
  display:inline-block;
  font-size:12px;transform:skew(-0.1deg);
  color:#4a4a4a;margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-left:calc(100vw*(5/428));
    }
`
const Flex = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`
const InputMidi = styled.input`
  width: 353px;
  height: 43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  font-size:15px;color:#4a4a4a;
  font-weight:600;
  transform:skew(-0.1deg);text-align:center;
  &::placeholder{color:#979797}
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(315/428));
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    }
`
const Dan = styled.p`
  font-size:15px;color:#4a4a4a;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
const WrapMoreView = styled.div`
  width:100%;
  margin-top:50px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(50/428));
    }
`
const EnterImg = styled.img`
  display:inline-block;
  width:19px;
  margin-right:27px;
  margin-top:-13px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(-13/428));
    margin-right:calc(100vw*(20/428));
    width:calc(100vw*(19/428));
    }
`
const ShortLine = styled(Line)`
  width:250px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(220/428));
    }
`
const ArrowTopImg = styled.img`
  display:inline-block;
  width:26px;
  cursor:pointer;
  transition:all 0.3s;
  transform:${({rotate}) => rotate};
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(26/428));
    }
`
const MoreView = styled.div`
  transition:all 0.3s;
  padding-bottom:25px;
  @media ${(props) => props.theme.mobile} {
    padding-bottom:calc(100vw*(25/428));
    }
`
const MoreBox = styled.div`

`
const SwitchButton = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;
  margin-top:20px;
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(20/428));
  }
`
const Switch = styled.input`
  display:none;
  &:checked+label{background:#009053}
  &:checked+label span{left:22px;}
  &:checked+label .no{opacity:0;}
  &:checked+label .yes{opacity:1;}
  @media ${(props) => props.theme.mobile} {
    &:checked+label span{left:calc(100vw*(24/428));}
  }
`
const SwitchLabel = styled.label`
  position:relative;display:inline-block;
  width:41px;
  height:15px;background:#e4e4e4;
  border-radius: 18px;
  border: solid 1px #d6d6d6;
  transition:all 0.3s;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(41/428));
    height:calc(100vw*(15/428));
  }
`
const SwithTxtOff = styled.p`
  position:absolute;
  width:100px;
  display:inline-block;
  left:50px;top:-3px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: normal;
  text-align: left;
  color: #4a4a4a;
  opacity:1;
  transition:all 0.3s;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    left:calc(100vw*(50/428));
    top:calc(100vw*(-3/428));
  }
`
const SwithTxtOn = styled(SwithTxtOff)`
  opacity:0;
`
const SwitchSpan = styled.span`
  position:absolute;left:-1px;top:50%;transform:translateY(-50%);
  width:18px;height:18px;border-radius:100%;
  border: solid 1px #888888;
  background-color: #ffffff;
  transition:all 0.3s;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
    height:calc(100vw*(18/428));
  }
`
const Sub = styled.span`
  display:inline-block;font-size:15px;
  font-weight:normal;transform:skew(-0.1deg);color:#4a4a4a;
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-left:calc(100vw*(10/428));
  }
`
const WrapCheck = styled.div`
  display:flex;justify-content:felx-start;align-items:center;
  flex-wrap:wrap;margin-top:10px;
  margin-bottom:30px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(20/428));
    margin-bottom:calc(100vw*(30/428));
  }
`
const Checkbox = styled.div`
  width:33%;
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(20/428));
  }
`
const Check = styled.input`
  display:none;
  &:checked+label span{background:url(${CheckedImg}) no-repeat; background-size:100% 100%;}
`
const CheckLabel = styled.label`
  font-size:15px;font-family:'nbg',sans-serif;
  transform:skew(-0.1deg);color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const CheckSpan = styled.span`
  display:inline-block;width:20px;height:20px;
  background:url(${CheckImg}) no-repeat; background-size:100% 100%;
  margin-right:8px;vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));margin-right:calc(100vw*(8/428));
  }
`
const Radiobox = styled.div`
  margin-right:30px;
  &:last-child{margin-right:0;}
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(30/428));
  }
`
const Radio = styled.input`
  display:none;
  &:checked+label span{background:url(${RadioChkImg}) no-repeat; background-size:100% 100%;}
`
const RadioLabel = styled.label`
  font-size:15px;font-family:'nbg',sans-serif;
  transform:skew(-0.1deg);color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const RadioSpan = styled.span`
  display:inline-block;width:20px;height:20px;
  background:url(${RadioImg}) no-repeat; background-size:100% 100%;
  margin-right:8px;vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));margin-right:calc(100vw*(8/428));
  }
`
const InputDate = styled(InputTxt)`
  margin-top:20px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(20/428));
  }
`
const InputPark = styled(InputTxt)`
  width:183px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(145/428));
  }
`
const NextButton = styled.div`
  width:100%;text-align:center;
  margin-top:70px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(70/428));
  }
`
const Next = styled.button`
  display:inline-block;
  width:408px;
  height: 66px;
  line-height: 60px;
  font-size:20px;font-weight:800;color:#fff;
  transform:skew(-0.1deg);text-align:center;
  border-radius: 11px;
  border: solid 3px #e4e4e4;
  background-color: #979797;
  /* 액티브 됐을때
  border: solid 3px #04966d;
  background-color: #01684b; */
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
const TopOptionTxt = styled.div`
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  margin-bottom:30px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
