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

//component
import ModalDanjiSelect from './modal/ModalDanjiSelect';

export default function SearchApartOfficetel({selectInfo, setSelectInfo}) {
  const [activeIndex,setActiveIndex] = useState(-1);

  const [searchword, setSearchWord] = useState("");
  const searchWord = (e) =>{setSearchWord(e.target.value);}
  const [active,setActive] = useState(false);

  /*모달 & show,hide */
  const [modalDanji,setModalDanji] = useState(false);


  const checkVaildate = () =>{
    return searchword.length > 0
   }

  useEffect(()=>{
    if(checkVaildate())
        setActive(true);
    else
        setActive(false);
  },)

    return (
        <Container>
          <WrapSearch>
            <Box>
              <Label>중개의뢰 가능한 단지 검색</Label>
              <SearchBox>
                <Search type="search" placeholder="중개의뢰 가능한 단지 검색 예: 반포자이" onChange={searchWord}/>
                <SearchBtn type="button"/>
                <WhiteCloseImg active={active}>
                  <ResetSearch/>
                </WhiteCloseImg>
            {/*검색했을때 나오는 부분 */}
                <SearchResult active={active}>
                  <ResultBox>
                    <Link onClick={() => {setModalDanji(true)}} className="data_link"/>
                    <Title>반포자이</Title>
                    <ResultAddress>서울 특별시 서초구 반포동</ResultAddress>
                  </ResultBox>
                  <ResultBox>
                    <Link onClick={() => {setModalDanji(true)}} className="data_link"/>
                    <Title>반포 센트럴자이</Title>
                    <ResultAddress>서울 특별시 서초구 잠원동</ResultAddress>
                  </ResultBox>
                  {/*검색결과가 없을 경우*/}
                  <ResultBox style={{display:"none"}}>
                    <NoResult>
                    현재 전문중개사가 배정된 단지가 아닙니다.<br/>
                    빠른 시일내로 서비스하도록 하겠습니다.
                    </NoResult>
                  </ResultBox>
                </SearchResult>
              </SearchBox>
            </Box>
            {
              modalDanji ?
              <ModalDanjiSelect setModalDanji={setModalDanji} setSelectInfo={setSelectInfo}/>
              :
              null

            }
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
  background:#fff url(${SearchImg}) no-repeat center center;
  background-size:19px 18px;
`
const SearchResult = styled.div`
  width:408px;
  position:absolute;
  left:-1px;top:35px;background:#fff;
  border:1px solid #e4e4e4;z-index:2;border-top:0;border-radius:3px;
  display:${({active}) => active ? "block" : "none"};
`
const ResultBox = styled.div`
  position:relative;
  width:100%;
  padding:13px 28px;
  background:#fff;
  border-radius:3px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
`
const Title = styled.h5`
    font-size:15px;font-weight:600;
    transform:skew(-0.1deg);
    margin-bottom:10px;
    color:#4a4a4a;
`
const ResultAddress = styled.p`
  font-size:15px;font-weight:500;
  transform:skew(-0.1deg);
  color:#4a4a4a;
`
const NoResult =styled.p`
  font-size: 15px;transform:skew(-0.1deg);
  line-height: 1.13;
  text-align: center;
  color: #979797;
  padding:35px 0;
`
const WhiteCloseImg = styled.div`
  position:absolute;
  display:flex;align-items:center;justify-content:center;
  right:43px;top:0;
  width:43px;height:43px;
  cursor:pointer;
  display:${({active}) => active ? "flex" : "none"};
`
const ResetSearch = styled.div`
  display:inline-block;
  border-radius:100%;
  width:20px;height:20px;
  background:#cecece url(${WhiteClose}) no-repeat center center;
  background-size:8px 8px;
`
