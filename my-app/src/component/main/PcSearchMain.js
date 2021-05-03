//react
import React ,{useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";

//css
import styled from "styled-components"
import IconSearch from '../../img/main/icon_search.png';

export default function PcSearchMain({activeText}) {
  const [searchShow,setSearchShow] = useState(false);
  const history=useHistory();

  const oonClickSearch = () => {
    // 검색버튼 눌렀을 때 정보 가져와서 api 연동하기 
    history.push(`/Map/${activeText}`);
  }

  const showModal =()=>{
    setSearchShow(!searchShow);
  }


  return (
    <Container>
        <WrapMainSearch>
            <MainSearch>
              <SearchInput type="text" name="" placeholder="지역,지하철,대학교,물건명 검색" onClick={() =>{setSearchShow(true)}}/>
              {/* <Link to={`/Map/${activeText}`} > */}
                <SearchBtn type="submit" name="" onClick={() => oonClickSearch()}/>
              {/* </Link> */}
            </MainSearch>
        {/*검색 기록 관련_SearchResult... */}
        {
          searchShow ?
          <SearchResult>
            <Bg onClick={()=>{setSearchShow(false)}}/>
          {/* 검색 기록이 없을때.(최초검색박스 클릭시) */}
            <NoneHisto>
              <SearchArea>
                <TopTxt>지역</TopTxt>
              {/*검색어를 입력했을때*/}
                <SearchList style={{display:"none"}}>
                  <Listtxt>
                    <Link to="#">지역이름</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">지역이름</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">지역이름</Link>
                  </Listtxt>
                </SearchList>
              </SearchArea>
              <Line/>
              <SearchSubway>
                <TopTxt>지하철</TopTxt>
                <NoneHistory>최근검색기록이 없습니다.</NoneHistory>
              {/*검색어를 입력했을때*/}
                <SearchList style={{display:"none"}}>
                  <Listtxt>
                    <Link to="#">지하철 내용</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">지하철 내용</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">지하철 내용</Link>
                  </Listtxt>
                </SearchList>
              </SearchSubway>
              <Line/>
              <SearchUniv>
                <TopTxt>대학교</TopTxt>
              {/*검색어를 입력했을때*/}
                <SearchList style={{display:"none"}}>
                  <Listtxt>
                    <Link to="#">대학교 이름</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">대학교 이름</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">대학교 이름</Link>
                  </Listtxt>
                </SearchList>
              </SearchUniv>
              <WrapDeleteBtn>
                <Link to="#">
                  <DeleteMsg>최근검색기록 삭제</DeleteMsg>
                </Link>
              </WrapDeleteBtn>
            </NoneHisto>
          {/*검색기록이 있을 때(한번이라도 검색했으면)*/}
            <HaveHisto style={{display:"none"}}>
              <History>
                <HistoryList>
                  <Link>강남역</Link>
                </HistoryList>
                <HistoryList>
                  <Link>강남역</Link>
                </HistoryList>
              </History>
              <WrapDeleteBtn>
                <Link to="#">
                  <DeleteMsg>최근검색기록 삭제</DeleteMsg>
                </Link>
              </WrapDeleteBtn>
            </HaveHisto>
          </SearchResult>
          :
          null
        }

        </WrapMainSearch>
    </Container>
  );
}
const Container = styled.div`

`
const WrapMainSearch = styled.div`
  position:relative;
  width:100%;
  height:auto;
  border-radius:9px;
  /*border:1px solid #D0D0D0;*/

`
const MainSearch = styled.div`
  display:inline-flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
  height:48px;
  background:#f8f7f7;
  padding:13px 23.3px 14px 34px;
  box-sizing:border-box;
  border-radius:9px;
  position:relative;
  z-index:2;

`
const SearchInput = styled.input`
  width:375px;
  background:none;
  font-size:16px;
  transform: skew(-0.1deg);
  color:#707070;
  font-weight:bold;
  &::placeholder{color:#979797;}
`
const SearchBtn = styled.button`
  width:30px;
  height:30px;
  background:transparent url(${IconSearch}) no-repeat center center;
  background-size:19px 18px;
`

const SearchResult = styled.div`
  position:Absolute;
  width:100%;
  top:44px;
  @media ${(props) => props.theme.container} {
      width:90%;
      height:calc(100vw*(460/1436));
    }
`
const Bg = styled.div`
  position:fixed;
  width:100%;height:100%;
  left:0;top:0;display:block;content:'';
  background:transparent;
`
const NoneHisto = styled.div`
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  top:4px;
  display:flex;justify-content:space-between;
  width:1029px;
  height:460px;
  background:#fff;
  padding:26px 20px;
  border:1px solid #e2e2e2;
  z-index:2;
  @media ${(props) => props.theme.container} {
      width:1000px;
      left:58%;
    }

`
const SearchArea = styled.div`
  width:301px;
  @media ${(props) => props.theme.container} {
      width:calc(100vw*(301/1436));
    }
`
const TopTxt = styled.div`
  position:relative;
  width:100%;
  font-size:16px;
  color:#4a4a4a;
  padding-bottom:15px;
  padding-left:20px;
  font-weight:600;
  transform:skew(-0.1deg);
  &:after{
    position:absolute;left:0;bottom:0px;content:'';display:block;
    width:100%;height:1px;
    border-bottom:1px solid #4a4a4a;}

`
const SearchSubway = styled(SearchArea)`
`
const SearchUniv = styled(SearchArea)`
`
const Line = styled.div`
  width:1px; height:100%;background:#f2f2f2;
`
const NoneHistory = styled.p`
  position:absolute;
  left:50%;
  top:186px;
  transform:translateX(-50%) skew(-0.1deg);
  font-size:14px;color:#979797;font-weight:600;
`
const WrapDeleteBtn = styled.div`
  position:absolute;
  right:16px;
  bottom:10px;
  z-index:3;
`
const DeleteMsg = styled.p`
  display:inline-block;
  font-size:13px;
  margin-left:11px;
  height:18px;
  line-height:18px;
  font-weight:600;
  color:#898989;transform:skew(-0.1deg);
`
const HaveHisto = styled.div`
  position:absolute;
  width:100%;
  padding:33px 36px;
  top:4px;
  left:0;
  height:460px;
  background:#fff;border:1px solid #e2e2e2;box-sizing:border-box;
  z-index:2;
`
const History = styled.ul`

`
const HistoryList = styled.li`
  font-size:16px;
  font-weight:600;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:10px;
`
const SearchList = styled.ul`
  padding:0 22px;
  width:100%;
  margin-top:17px;
`
const Listtxt = styled(HistoryList)`
`
