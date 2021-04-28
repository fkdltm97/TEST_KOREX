//★★★★아파트, 오피스텔 중개의뢰 입니다★★★★

//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"
import { Mobile, PC } from "../../../../MediaQuery"

//img
import SearchImg from '../../../../img/map/search.png';
import WhiteClose from '../../../../img/member/white_close.png';
import SelectArrow from '../../../../img/member/arrow_down.png';

//component
import ModalCommon from '../../../common/modal/ModalCommon';

//redux addon assestess
import {useSelector } from 'react-redux';
import {tempBrokerRequestActions } from '../../../../store/actionCreators';

export default function SearchApartOfficetel({setActiveIndex,activeIndex}) {
  
  console.log('searchApratofficetleselectinfo요소(외부수임물건관리) 실행요소:',tempBrokerRequestActions);

  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});

  //여기 두개가 핵심이에여
  //모달 끄는 식
  const offModal = ()=>{
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  }

  //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
    const updateModal = () =>{
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

    const [active,setActive] = useState(false);

    const [dong,setDong] = useState('');
    const [floor,setFloor] = useState('');
    const [hosil,setHosil] = useState('');
    const [userinfo,setUserinfo] = useState(false);

    const dongchange =(e) => {setDong(e.target.value);}
    const floorchange = (e) => {setFloor(e.target.value);}
    const hosilchange = (e) => {setHosil(e.target.value);}

    return (
        <Container>
          <WrapSearch>
            <Box>
              <SearchBox>
                <Search type="search" value="반포동 반포자이"/>
                <SearchBtn type="button"/>
                <WhiteCloseImg>
                  <ResetSearch/>
                </WhiteCloseImg>
              </SearchBox>
            </Box>
            <WrapSelectBox>
              <Select name='dong' onChange={dongchange}>
                <Option selected style={{color:"#979797"}}>동 선택</Option>
                <Option value='101'>101동</Option>
                <Option value='102'>102동</Option>
                <Option value='103'>103동</Option>
              </Select>
              <Select name='floor' onChange={floorchange}>
                <Option selected style={{color:"#979797"}}>층 선택</Option>
                <Option value='1'>1층</Option>
                <Option value='2'>2층</Option>
                <Option value='3'>3층</Option>
              </Select>
              <Select name='hosil' onChange={hosilchange}>
                <Option selected style={{color:"#979797"}}>호 선택</Option>
                <Option value='101'>101호</Option>
                <Option value='102'>102호</Option>
                <Option value='103'>103호</Option>
              </Select>
            </WrapSelectBox>
            <Next>
      {/*조회 성공했을때(물건이 전속매물일 경우)*/}
              {/*<Link className="data_link" to="/AddPropertyBasicInfo"/>*/}
              <NextBtn type="button" onClick={()=>{
                updateModal();
                
                //리덕스 정보 저장 state정보 ->리덕스 저장(동,층,호실 단지명,단지주소등 저장)
                tempBrokerRequestActions.dongchange({dongs: dong});
                tempBrokerRequestActions.floorchange({floors:floor});
                tempBrokerRequestActions.hosilchange({hosils:hosil});
                tempBrokerRequestActions.dangichange({dangis: '반포동 반포자이'});
                tempBrokerRequestActions.dangiaddresschange({dangiaddresss:'서울특별시 서초구 반포동'});

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
              }}>조회</NextBtn>
            </Next>
          </WrapSearch>
      {/*조회 실패했을때 모달창*/}
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
      width:100%;
    }
`
const WrapSearch = styled.div`
  width:100%;
  margin-top:8px;
  @media ${(props) => props.theme.mobile} {
      margin-top:calc(100vw*(8/428));
    }
`
const Box = styled.div`
  width:100%;
`
const Label = styled.label`
  display:block;
  font-size:12px;transform:skew(-0.1deg);
  font-weight:600;
  margin-bottom:10px;color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(12/428));
    }
`
const SearchBox = styled.div`
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  flex-wrap:wrap;
  width:100%;
  height:auto;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
`
const Search = styled.input`
  display:inline-block;
  width:100%;
  height:43px;
  text-align:center;
  font-size:15px;transform:skew(-0.1deg);
  font-weight:600;
  color:#4a4a4a;background:transparent;
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(43/428));
      font-size:calc(100vw*(15/428));
    }
`
const SearchBtn = styled.button`
  position:absolute;right:0;top:0;
  width:43px;height:43px;
  background:url(${SearchImg}) no-repeat center center;
  background-size:19px 18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(43/428));
    height:calc(100vw*(43/428));
    background-size:calc(100vw*(19/428)) calc(100vw*(18/428));
  }
`
const WhiteCloseImg = styled.div`
  position:absolute;
  display:flex;align-items:center;justify-content:center;
  right:43px;top:0;
  width:43px;height:43px;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    right:calc(100vw*(43/428));
    width:calc(100vw*(43/428));
    height:calc(100vw*(43/428));
  }
`
const ResetSearch = styled.div`
  display:inline-block;
  border-radius:100%;
  width:20px;height:20px;
  background:#cecece url(${WhiteClose}) no-repeat center center;
  background-size:8px 8px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));
    backgrond-size:calc(100vw*(8/428)) calc(100vw*(8/428));
  }
`
const WrapSelectBox = styled.div`
  width:100%;
  display:flex;justify-content:space-between;align-items:center;
  margin-top:8px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(8/428));
  }
`
const Select = styled.select`
  width:125px;
  height:43px;
  border-radius:4px;
  border:1px solid #e4e4e4;
  background:#fff;
  font-size:15px;
  font-weight:600;
  color:#4a4a4a;
  transform:skew(-0.1deg);
  padding-left:10px;
  appearance:none;
  background:url(${SelectArrow}) no-repeat 100px center; background-size:11px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(120/428));
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    padding-left:calc(100vw*(10/428));
  }
`
const Option = styled.option`
`
const Next = styled.div`
  position:relative;
  width: 100%;
  margin-top:70px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(50/428));
  }
`
const NextBtn = styled.button`
  width:100%;
  height: 66px;
  line-height:60px;
  font-size:20px;color:#fff;
  font-weight:800;transform:skew(-0.1deg);
  border-radius: 11px;
  border: solid 3px #e4e4e4;
  background-color: #979797;
  text-align:center;
  /*액티브 됐을때
  border: solid 3px #01684b;
  background-color: #01684b;
  */
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`