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
import ModalFail from './modal/ModalFail';

export default function SearchApartOfficetel() {
  const [activeIndex,setActiveIndex] = useState(-1);

  const [active,setActive] = useState(false);

  /*모달*/
  const [modalDanji,setModalDanji] = useState(false);
  const [fail,setFail] = useState(false);

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
              <Select>
                <Option selected style={{color:"#979797"}}>동 선택</Option>
                <Option>101동</Option>
                <Option>102동</Option>
                <Option>103동</Option>
              </Select>
              <Select>
                <Option selected style={{color:"#979797"}}>층 선택</Option>
                <Option>1층</Option>
                <Option>2층</Option>
                <Option>3층</Option>
              </Select>
              <Select>
                <Option selected style={{color:"#979797"}}>호 선택</Option>
                <Option>101호</Option>
                <Option>102호</Option>
                <Option>103호</Option>
              </Select>
            </WrapSelectBox>
            <Next>
      {/*조회 성공했을때(물건이 전속매물일 경우)*/}
              {/*<Link className="data_link" to="/AddPropertyBasicInfo"/>*/}
              <NextBtn type="button" onClick={()=>{setFail(true)}}>조회</NextBtn>
            </Next>
          </WrapSearch>
      {/*조회 실패했을때 모달창*/}
          {
            fail ?
            <ModalFail setFail={setFail}/>
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
