//★★★★상가, 사무실 중개의뢰 입니다★★★★

//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import SearchImg from '../../../../img/map/search.png';
import Close from '../../../../img/main/modal_close.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import SearchStoreOfficeApi from './SearchStoreOfficeApi';

//redux addons asseets
import {useSelector} from 'react-redux';
import {tempBrokerRequestActions } from '../../../../store/actionCreators';

export default function SearchApartOfficetel({setActiveIndex,activeIndex}) {
  
  const [hosu,setHosu] = useState(false);
  const [addressApi,setAddressApi] = useState(false);
  
  //사용자 입력데이터.
  const [search_address,setSearch_address]= useState('');//검색api에 의한 액션에 의해서만 처리되는것(사용자 직접 능동입력형태x)
  const [floor,setFloor] = useState('');
  const [hosil,setHosil] = useState('');

  console.log('searchStoreoffice요소 실행요소 dispay:',tempBrokerRequestActions,activeIndex);
  
  const floorchange = (e) => {setFloor(e.target.value);}
  const hosilchange = (e) => {setHosil(e.target.value);}
  
  const nextStep = (e) => {
     console.log('다음단계 클릭>>>>',floor,hosil,search_address);//소재지 주소값,층수,호실값 확인

     //리덕스 저장한다.
     tempBrokerRequestActions.floorchange({floors : floor});
     tempBrokerRequestActions.hosilchange({hosils: hosil});
     tempBrokerRequestActions.dangiaddresschange({dangiaddresss: search_address});//단지주소(아파트,오피스텔,상가,사무실 모두 포함한다.)

     switch(activeIndex){
      case 0:
        tempBrokerRequestActions.maemultypechange({maemultypes: '아파트'});
      break;
      case 1:
        tempBrokerRequestActions.maemultypechange({maemultypes: '오피스텔'});
      break;
      case 2:
        tempBrokerRequestActions.maemultypechange({maemultypes: '상가'});
      break;
      case 3:
        tempBrokerRequestActions.maemultypechange({maemultypes: '사무실'});
      break;
    }
  };
    return (
        <Container>
          <WrapSearch>
            <Box>
              <Label>물건 소재지</Label>
              <SearchBox onClick={() => setAddressApi(true)}>
                <Search type="search" placeholder="물건 소재지 주소 검색"/>
                <SearchBtn type="button"/>
              </SearchBox>
              {
                addressApi ?
                <AddressApi>
                  <CloseImg src={Close} onClick={() => setAddressApi(false)}/>
                  <SearchStoreOfficeApi setSearch_address={setSearch_address} setAddressApi={setAddressApi}/>
                </AddressApi>
                :
                null
              }
          {/*주소 검색 후에 나오는 부분*/}
              <WrapBottomBox>
                <SearchBox>
                  <Search type="search" value={search_address}/>
                  <SearchBtn type="button"/>
                </SearchBox>
                <SelectFloor onChange={floorchange}>
                  <Option selected>층 선택</Option>
                  <Option value='1'>1층</Option>
                  <Option value='2'>2층</Option>
                  <Option value='3'>3층</Option>
                </SelectFloor>
                <Hosu>
                  <Label>호수</Label>
                  <SwitchButton>
                    <Switch type="checkbox" id="switch"/>
                    <SwitchLabel for="switch" onClick={()=>{setHosu(!hosu)}}>
                      <SwitchSpan/>
                      <SwithTxtOff className="no">없음</SwithTxtOff>
                      <SwithTxtOn className="yes">있음</SwithTxtOn>
                    </SwitchLabel>
                  </SwitchButton>
                 {
                    hosu ?
                    <Flex>
                      <InputMidi type="text" placeholder="호 입력" onChange={hosilchange}/>
                      <Dan>호</Dan>
                    </Flex>
                    :
                    null

                  }
                </Hosu>
                
              </WrapBottomBox>
            </Box>
            {/*버튼 액티브 됐을때 색상 변경돼야함 // 하단 css */}
            <NextButton>
              <Link to="/AddRequestSecond" onClick={nextStep}>
                <Next type="button">다음</Next>
              </Link>
            </NextButton>
          </WrapSearch>
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
  width:408px;
  margin:0 auto;
`
const WrapSearch = styled.div`
  width:100%;
  margin-top:35px;
`
const Box = styled.div`
  width:100%;
`
const AddressApi = styled.div`
  position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);
  width:450px;height:auto;z-index:2;
  border:1px solid #eee;
  background:#fff;
  padding:70px 10px 0;
`
const CloseImg = styled.img`
  position:Absolute;top:20px;right:10px;
  width:18px;
  cursor:pointer;
`

const WrapBottomBox = styled.div`
  width:100%;
  margin-top:9px;
`
const SelectFloor = styled.select`
  margin-top:9px;
  width:125px;height:43px;
  border-radius:4px;
  border:1px solid #e4e4e4;
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
`
const Option = styled.option`
`
const Hosu = styled.div`
  width:100%;
  margin-top:14px;
`
const Label = styled.label`
  display:block;
  font-size:12px;transform:skew(-0.1deg);
  font-weight:600;
  margin-bottom:10px;color:#4a4a4a;
`
const SearchBox = styled.div`
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;
  height:43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
`
const Search = styled.input`
  display:inline-block;
  width:100%;
  height:100%;
  text-align:center;
  font-size:15px;transform:skew(-0.1deg);
  font-weight:600;
  color:#4a4a4a;background:transparent;
  &::placeholder{color:#979797;}
`
const SearchBtn = styled.button`
  position:absolute;right:0;top:50%;transform:translateY(-50%);
  width:43px;height:43px;
  background:url(${SearchImg}) no-repeat center center;
  background-size:19px 18px;
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
const Flex = styled.div`
  width:125px;height:43px;
  border:1px solid #e4e4e4;border-radius:4px;
  display:flex;justify-content:center;align-items:center;
`
const InputMidi = styled.input`
  width:70%;
  height:100%;
  background:none;
  font-size:15px;color:#4a4a4a;
  text-align:center;
  font-weight:600;transform:skew(-0.1deg);
  &::placeholder{font-weight:500;color:#979797;}
`
const Dan = styled.p`
font-size:15px;color:#4a4a4a;
font-weight:600;transform:skew(-0.1deg);
`
const NextButton = styled.div`
  width:100%;
  margin-top:70px;
`
const Next = styled.button`
  width:100%;
  height:66px;
  line-height:60px;
  font-size:20px;font-weight:800;color:#fff;
  border-radius: 11px;
  border: solid 3px #e4e4e4;
  background-color: #979797;
  border-radius: 11px;
  text-align:center;
  /*액티브 됐을 때*/
  /*
  border: solid 3px #04966d;
  background-color: #01684b;
  */
`
