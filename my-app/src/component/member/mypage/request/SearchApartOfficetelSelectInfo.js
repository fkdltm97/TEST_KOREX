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
import ModalAddUserInfo from './modal/ModalAddUserInfo';

//redux addon sassetss.
import {useSelector } from 'react-redux';
import {tempBrokerRequestActions } from '../../../../store/actionCreators';

//server process
import serverController from '../../../../server/serverController';

export default function SearchApartOfficetel({setActiveIndex, activeIndex}) {

  console.log('searchApartofficeselectinfo요소 실행 요소 display:',tempBrokerRequestActions,activeIndex);

  const [active,setActive] = useState(false);
  
  const [dong,setDong] = useState('');
  const [floor,setFloor] = useState('');
  const [hosil,setHosil] = useState('');
  const [dongname,setDongname] = useState('');
  const [floorname, setfloorname] = useState('');
  const [hosilname, sethosilname] = useState('');

  /*모달*/
  const [modalDanji,setModalDanji] = useState(false);
  const [userInfo,setUserInfo] = useState(false);
  
  const dongchange =  (e) => { setDong(e.target.value.split(',')[0]); setDongname(e.target.value.split(',')[1])} //선택한 건물bld_id정보(동정보)저장.
  const floorchange = (e) => { setFloor(e.target.value.split(',')[0]); setfloorname(e.target.value.split(',')[1])}  //선택한 층 정보flr_id저장
  const hosilchange = (e) => { setHosil(e.target.value.split(',')[0]); sethosilname(e.target.value.split(',')[1])}  //선택한 ho_info ho_id저장
  
  //선택한 단지(오피,아파트)와 매칭되는 관련되는 buidlings(동),floor(층),hosil(호실) 정보들 조회저장.
  const [donglist,setdonglist] = useState([]);
  const [floorlist,setfloorlist] = useState([]);
  const [hosillist,sethosillist] = useState([]);

  //임시저장된 단지정보 complex정보 조회저장.
  const temp_selectComplexinfo = useSelector(data => data.temp_selectComplexinfo);
  console.log('=>>>temp_selecdtComplexinfo::',temp_selectComplexinfo);

  useEffect( async () => {
    
    let body_info ={
      complexid: temp_selectComplexinfo.complexid,
      bldpk : temp_selectComplexinfo.bldpk
    };
    var res_result=await serverController.connectFetchController('/api/matterial/complexdetail_join_search','POST',JSON.stringify(body_info));
    if(res_result){
      console.log('res_result::',res_result);

      if(res_result.result[0]){
        setdonglist(res_result.result[0])
      }
      if(res_result.result[1]){
        setfloorlist(res_result.result[1]);
      }
      if(res_result.result[2]){
        sethosillist(res_result.result[2]);
      }
    }
  },[]);

  useEffect( () => {
    console.log('donglist,floorlist,hosillist변할시마다 :',donglist,floorlist,hosillist);
  },[donglist,floorlist,hosillist]);
    return (
        <Container>
          <WrapSearch>
            <Box>
              <SearchBox>
                <Search type="search" value={temp_selectComplexinfo.complexname}/>
                <SearchBtn type="button"/>
                <WhiteCloseImg>
                  <ResetSearch/>
                </WhiteCloseImg>
              </SearchBox>
            </Box>
            <WrapSelectBox>
              <Select name='dong' onChange={dongchange}>
                <Option selected style={{color:"#979797"}}>동 선택</Option>
                {/*<Option value='101'>101동</Option>
                <Option value='102'>102동</Option>
                <Option value='103'>103동</Option>*/}
                {
                  donglist.map((value) => {
                    console.log('donglist:',value);
                    return (
                      <Option value={value['bld_id']+','+value['dong_name']}>{value['dong_name']}</Option>
                    )
                  })
                }
              </Select>
              <Select name='floor' onChange={floorchange}>
                <Option selected style={{color:"#979797"}}>층 선택</Option>
                {/*<Option value='1'>1층</Option>
                <Option value='2'>2층</Option>
              <Option value='3'>3층</Option>*/}
                {
                  floorlist.map((value) => {
                    return(
                      <Option value={value['flr_id']+','+(value['flr_type']+' '+value['floor'])}>{value['flr_type']+' '+value['floor']}</Option>
                    )
                  })
                }
              </Select>
              <Select name='hosil' onChange={hosilchange}>
                {/*<Option selected style={{color:"#979797"}}>호 선택</Option>
                <Option value='101'>101호</Option>
                <Option value='102'>102호</Option>
              <Option value='103'>103호</Option>*/}
                 {
                   hosillist.map((value)=> {
                     return(
                       <Option value={value['ho_id']+','+value['ho_name']+'호'}>{value['ho_name']}호{value['floor']}</Option>
                     )
                   })
                 }
              </Select>
            </WrapSelectBox>
            <Next>
      {/*휴대전화번호 정보가 있을경우 다음페이지로 넘아갑니다. ((일단 주석처리....))*/}
              {/*<Link className="data_link" to="/AddRequestSecond"/>*/}
              <NextBtn type="button" onClick={()=>{
                
                setUserInfo(true);

                //리덕스 정보 저장. state정보 -> 리덕스 저장(동,층,호실, 단지명,단지주소등 저장.)
                tempBrokerRequestActions.dongchange({dongs: dong});
                tempBrokerRequestActions.floorchange({floors: floor});
                tempBrokerRequestActions.hosilchange({hosils: hosil});
                tempBrokerRequestActions.dongnamechange({dongnames: dongname });
                tempBrokerRequestActions.floornamechange({floornames: floorname});
                tempBrokerRequestActions.hosilnamechange({hosilnames: hosilname});

                tempBrokerRequestActions.dangichange({dangis : temp_selectComplexinfo.complexname});
                tempBrokerRequestActions.dangijibunaddresschange({ dangijibunaddress : temp_selectComplexinfo.addrjibun});
                tempBrokerRequestActions.dangiroadaddresschange({ dangiroadaddress: temp_selectComplexinfo.addrroad});
                tempBrokerRequestActions.xchange({x_pos : temp_selectComplexinfo.x});
                tempBrokerRequestActions.ychange({y_pos : temp_selectComplexinfo.y});

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
              }}>다음</NextBtn>
            </Next>
          </WrapSearch>
      {/*휴대전화번호 정보가 없을경우 '본인정보추가 모달이 나와야함!!'*/}
          {
            userInfo ?
            <ModalAddUserInfo setUserInfo={setUserInfo}/>
            :
            null
          }
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
  margin-top:8px;
`
const Box = styled.div`
  width:100%;
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
`
const SearchBtn = styled.button`
  position:absolute;right:0;top:0;
  width:43px;height:43px;
  background:url(${SearchImg}) no-repeat center center;
  background-size:19px 18px;
`
const WhiteCloseImg = styled.div`
  position:absolute;
  display:flex;align-items:center;justify-content:center;
  right:43px;top:0;
  width:43px;height:43px;
  cursor:pointer;
`
const ResetSearch = styled.div`
  display:inline-block;
  border-radius:100%;
  width:20px;height:20px;
  background:#cecece url(${WhiteClose}) no-repeat center center;
  background-size:8px 8px;
`
const WrapSelectBox = styled.div`
  width:100%;
  display:flex;justify-content:space-between;align-items:center;
  margin-top:8px;
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
`
const Option = styled.option`
`
const Next = styled.div`
  position:relative;
  width: 100%;
  margin-top:70px;
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
`
