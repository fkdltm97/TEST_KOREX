//★★★★상가, 사무실 중개의뢰 입니다★★★★

//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import SearchImg from '../../../../img/map/search.png';
import Close from '../../../../img/main/modal_close.png';
import ArrowDown from '../../../../img/member/arrow_down.png';
import { Mobile, PC } from "../../../../MediaQuery"

//component
import SearchStoreOfficeApi from './SearchStoreOfficeApi';
import ModalCommon from '../../../common/modal/ModalCommon';

//redux addons assettss
import {useSelector } from 'react-redux';
import {tempBrokerRequestActions } from '../../../../store/actionCreators';
import tempBrokerRequest from '../../../../store/modules/tempBrokerRequest';

//server process
import serverController from '../../../../server/serverController';

export default function SearchApartOfficetel({setActiveIndex,activeIndex}) {

  const [hosu,setHosu] = useState(false);
  const [addressApi,setAddressApi] = useState(false);

  const [fail,setFail] = useState(false);

  const [search_address,setSearch_address] = useState('');
  const [floor,setFloor] = useState('');
  const [floorname,setfloorname] = useState('');
  const [hosilname,sethosilname] = useState('');

  console.log('searchsoterfoffice물건외부관리 실행요소 display:',tempBrokerRequestActions,activeIndex)
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});
  
  //도로명 and 지번주소 검색한 관련된 flr_id리스트 여러개 다른 종류의 매물들 층 여러개 나올수있음
  const [flooridlist,setflooridlist] = useState([]);

  //여기 두개가 핵심이에여
  //모달 끄는 식
  const offModal = ()=>{
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  }

  //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
    const updateModal = () =>{
      nextStep();

      //여기가 모달 키는 거에엽
      setModalOption({
        show:true,
        setShow:offModal,
        title:"물건(외부수임) 등록",
        content:{type:"text",text:`해당물건은 전속매물이 아닙니다.\n이미 다른 중개사에게 의뢰되었거나\n거래중인 물건은 시스템에 등록할 수 없습니다.\n상기 사유에 해당하지 않는 경우,\n고객센터로 문의해주세요.`,component:""},
        submit:{show:false , title:"확인" , event : ()=>{offModal();}},
        cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
        confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
        confirmgreen:{show:true , title:"확인" , link:"/AddPropertyBasicInfo", event : ()=>{offModal(); }}
      });
    }

    const floorchange= (e) => {setFloor(e.target.value.split('|')[0]); setfloorname(e.target.value.split('|')[1]); console.log('floor change층수변경:',e.target.value);}
    const hosilnamechange = (e) => {sethosilname(e.target.value);}

    const nextStep = (e) => {
      console.log('다음단계 클릭 >>>>',floor,floorname,hosilname,search_address);

      //리덕스 저장한다.
      tempBrokerRequestActions.floorchange({floors:floor});
      tempBrokerRequestActions.floornamechange({floornames: floorname});
      tempBrokerRequestActions.hosilnamechange({hosilnames: hosilname});
      tempBrokerRequestActions.dangijibunaddresschange({dangijibunaddress : flooridlist[0]['addr_jibun']});
      tempBrokerRequestActions.dangiroadaddresschange({dangiroadaddress: flooridlist[0]['addr_road']});

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
    }

    useEffect( async () => {
      console.log('search_address값 변경 감지:',search_address);
      let jibun_address= search_address.jibunaddress_val;
      let road_address=search_address.roadaddress_val;

      let body_info = {
        jibunaddress : jibun_address,
        roadaddress: road_address
      };
      let res_result = await serverController.connectFetchController('/api/matterial/floorid_search_query','POST',JSON.stringify(body_info));
      if(res_result){
        if(res_result.result){
          let result_var=res_result.result;
          console.log('reuslt_var::',result_var);

          setflooridlist(result_var);
        }
      }
    },[search_address]);
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
                  <Search type="search" value={search_address.jibunaddress_val && search_address.roadaddress_val ? search_address.jibunaddress_val+'|'+search_address.roadaddress_val : ''}/>
                  <SearchBtn type="button"/>
                </SearchBox>
                <SelectFloor onChange={floorchange}>
                  <Option>층 선택</Option>
                  {/*<Option value='1'>1층</Option>
                  <Option value='2'>2층</Option>
                  <Option value='3'>3층</Option>
                  */}
                  {
                    flooridlist.map((value) => {
                      return (
                        <Option value={value['flr_id']+'|'+value['flr_type']+value['floor']}>{value['flr_type']+value['floor']}</Option>
                      );
                    })
                  }
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
                      <InputMidi type="text" placeholder="호 입력" onChange={hosilnamechange}/>
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
            {/*<Link to="/AddPropertyBasicInfo" className="data_link"/>*/}
                <Next type="button" onClick={()=>{updateModal();}}>다음</Next>
            </NextButton>
          </WrapSearch>
          <ModalCommon modalOption={modalOption}/>
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
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(380/428));
    }
`
const WrapSearch = styled.div`
  width:100%;
  margin-top:35px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(35/428));
    }
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
  @media ${(props) => props.theme.mobile} {
    width:90%;
    padding:calc(100vw*(70/428)) calc(100vw*(10/428)) 0;
    }
`
const CloseImg = styled.img`
  position:Absolute;top:20px;right:10px;
  width:18px;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
    top:calc(100vW*(20/428));right:calc(100vw*(10/428));
    }
`

const WrapBottomBox = styled.div`
  width:100%;
  margin-top:9px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vW*(9/428));
    }
`
const SelectFloor = styled.select`
  margin-top:9px;
  width:125px;height:43px;
  border-radius:4px;
  border:1px solid #e4e4e4;
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
  appearance:none;padding-left:15px;
  background:Url(${ArrowDown}) no-repeat 92% center;background-size:11px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vW*(130/428));height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));margin-top:calc(100vw*(9/428));
    background-size:calc(100vw*(11/428));padding-left:calc(100vw*(10/428));
    }
`
const Option = styled.option`
`
const Hosu = styled.div`
  width:100%;
  margin-top:14px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(15/428));
    }
`
const Label = styled.label`
  display:block;
  font-size:12px;transform:skew(-0.1deg);
  font-weight:600;
  margin-bottom:10px;color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vW*(10/428));
    font-size:calc(100vw*(12/428));
    }
`
const SearchBox = styled.div`
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;
  height:43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vW*(43/428));
    }
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
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vW*(15/428));
    }
`
const SearchBtn = styled.button`
  position:absolute;right:0;top:50%;transform:translateY(-50%);
  width:43px;height:43px;
  background:url(${SearchImg}) no-repeat center center;
  background-size:19px 18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vW*(43/428));height:calc(100vW*(43/428));
    background-size:calc(100vW*(19/428)) calc(100vW*(18/428));
    }
`
const SwitchButton = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;
  margin-top:20px;
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vW*(20/428));
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
    font-size:calc(100vW*(15/428));
    left:calc(100vW*(50/428));top:calc(100vW*(-3/428));
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
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(130/428));
    height:calc(100vw*(43/428));
  }
`
const InputMidi = styled.input`
  width:70%;
  height:100%;
  background:none;
  font-size:15px;color:#4a4a4a;
  text-align:center;
  font-weight:600;transform:skew(-0.1deg);
  &::placeholder{font-weight:500;color:#979797;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const Dan = styled.p`
font-size:15px;color:#4a4a4a;
font-weight:600;transform:skew(-0.1deg);
@media ${(props) => props.theme.mobile} {
  font-size:calc(100vw*(15/428));
}
`
const NextButton = styled.div`
  position:relative;
  width:100%;
  margin-top:70px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(70/428));
  }
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
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    height:calc(100vw*(60/428));line-height:calc(100vw*(54/428));
  }
`
