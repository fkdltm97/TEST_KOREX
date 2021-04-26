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
import ModalCommon from '../../../common/modal/ModalCommon';
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
          title:"중개의뢰 가능한 단지 선택",
          content:{type:"components",text:`Testsetsetsetsetestse`,component:<ModalDanjiSelect/>},
          submit:{show:true , title:"확인" , event : ()=>{offModal(); setSelectInfo(true);}},
          cancle:{show:true , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
      });
    }

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
                    <Link onClick={() => {updateModal();}} className="data_link"/>
                    <Title>반포자이</Title>
                    <ResultAddress>서울 특별시 서초구 반포동</ResultAddress>
                  </ResultBox>
                  <ResultBox>
                    <Link onClick={() => {updateModal();}} className="data_link"/>
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
            <ModalCommon modalOption={modalOption}/>
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
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(380/428));
  }
`
const WrapSearch = styled.div`
  width:100%;
  margin-top:35px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(40/428));
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
    margin-bottom:calc(100vw*(10/428));
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
  @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(380/428));
    }
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
  background:#fff url(${SearchImg}) no-repeat center center;
  background-size:19px 18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(43/428));
    height:calc(100vw*(43/428));
    background-size:calc(100vw*(19/428)) calc(100vw*(18/428));
  }
`
const SearchResult = styled.div`
  width:408px;
  position:absolute;
  left:-1px;top:35px;background:#fff;
  border:1px solid #e4e4e4;z-index:2;border-top:0;border-radius:3px;
  display:${({active}) => active ? "block" : "none"};
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(380/428));
    top:calc(100vw*(38/428));
  }
`
const ResultBox = styled.div`
  position:relative;
  width:100%;
  padding:13px 28px;
  background:#fff;
  border-radius:3px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(13/428)) calc(100vw*(28/428));
  }
`
const Title = styled.h5`
    font-size:15px;font-weight:600;
    transform:skew(-0.1deg);
    margin-bottom:10px;
    color:#4a4a4a;
    @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
      margin-bottom:calc(100vw*(10/428));
    }
`
const ResultAddress = styled.p`
  font-size:15px;font-weight:500;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const NoResult =styled.p`
  font-size: 15px;transform:skew(-0.1deg);
  line-height: 1.13;
  text-align: center;
  color: #979797;
  padding:35px 0;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding:calc(100vw*(35/428)) 0;
    line-height:1.5;
  }
`
const WhiteCloseImg = styled.div`
  position:absolute;
  display:flex;align-items:center;justify-content:center;
  right:43px;top:0;
  width:43px;height:43px;
  cursor:pointer;
  display:${({active}) => active ? "flex" : "none"};
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(43/428));height:calc(100vw*(43/428));
    right:calc(100vw*(43/428));
  }
`
const ResetSearch = styled.div`
  display:inline-block;
  border-radius:100%;
  width:20px;height:20px;
  background:#cecece url(${WhiteClose}) no-repeat center center;
  background-size:8px 8px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));height:calc(100vw*(20/428));
    background-size:calc(100vw*(8/428)) calc(100vw*(8/428));;
  }
`
