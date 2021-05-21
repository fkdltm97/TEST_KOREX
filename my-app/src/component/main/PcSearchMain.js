//react
import React ,{useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";

//css
import styled from "styled-components"
import IconSearch from '../../img/main/icon_search.png';

// Init
import initFilter from '../map/initFilter';

//server process
import serverController from '../../server/serverController';

// redux
import { MapProductEls } from '../../store/actionCreators';
import { useSelector } from 'react-redux';

export default function PcSearchMain({activeText}) {
  const [searchShow,setSearchShow] = useState(false);
  const history=useHistory();
  
  //메인 start검색에 따라 갱신될수있는 state변수 값들(해당 변수state들 변화감지해야함)
  const [metro_list,setMetro_list] = useState([]);
  const [university_list,setUniversity_list] = useState([]);

  const oonClickSearch = async (search_type,id) => {
    // 검색버튼 눌렀을 때 정보 가져와서 api 연동하기
    localStorage.setItem( "filterData", JSON.stringify(initFilter));
    //누른 id값에 해당하는 search_type,id 조회.
    console.log('==>>검색결과리스트 중 임의 요소 클릭:',search_type,id, MapProductEls);

    //임의 요소 클릭한 순간에 그냥 정보 저장 리덕스에 해버린다. 저장을 해버리고, 그 정보를 로컬에 저장해버린다.로컬에 정보가 있으면 그 정보의 위치로 표시한다. 마지막 로컬에 있던것으로 지도 위치 초기화한다. 그 검색하려는 지점에 대해서 중심으로 해서 그 주변 반경 화면px기준 계산하여 요청한 당시때의 화면 크기(브라우저화면크기 가로,세로)크기의 해당하는 크기만큼으로 처리한다.
    console.log('===>>window.innerWIdth,height::',window.innerWidth,window.innerHeight);
    let body_info={
      search_type_val : search_type,
      id_val : id,
      screen_width : window.innerWidth,//px
      screen_height : window.innerHeight,
      level : 3
    };
    let searchdetail_originresult= await serverController.connectFetchController('/api/matterial/main_searchresult_clickDetail','POST',JSON.stringify(body_info));

    if(searchdetail_originresult){
      console.log('====>>>main searchdetail_originresult::',searchdetail_originresult);

      localStorage.setItem('searchdetail_origin',JSON.stringify(searchdetail_originresult.result[0]));
      //나온 단지들데이터들, 지도에 나타내는것 자체는 단지 자체이다. 그 단지에 관련된 단지별 실거래들도 불러옴 단지,단지별 실거래(단지자체의x,y기준 지도에 불러오기) 리덕스 저장이 나을듯??
      //관련 리덕스 데이터에 저장하는게 좋을것임. 그것을 지도에 마커랑, 클러스터화해서 보여줄필요가있음.  단지별,단지실거래 데이터들 저장 + 매물데이터들 저장하기, 전문중개사 데이터 저장 및 보여주기. product, company, compelx data
      MapProductEls.updateBlock({block : searchdetail_originresult.match_matterial[2]});
    }

    history.push(`/Map/${activeText}`);//저기로 이동을 해버리면, 저기 페이지 요소가 실행되겠지.
  }

  const showModal =()=>{
    setSearchShow(!searchShow);
  }

  const search_map_main = async (e) => {
    console.log('검색어 입력 시작:',e.target.value);
    let search_keyword=e.target.value; //검색어 지역명,지하철명관련,대학교명관련, 물건명 관련 검색. 물건명의 경우 안나옴 일단은 현재는... 지역,지하철,대학교만 제공.
     //해당 string기반 검색을 한다. 지역명은 지역의 이름, 대학교는 대학교명 ,지하철명 물건명으로 검색.
    if(search_keyword !=''){
      let body_info = {
        search_keyword_val : search_keyword
      };
      console.log('검색 키워드 (지역명,지하철명or대학교명)::',body_info);
      let search_result= await serverController.connectFetchController('/api/matterial/main_searchStart','POST',JSON.stringify(body_info));
  
      if(search_result){
        console.log('===>>main search results:::',search_result);
  
        let metro_list= search_result.result[0];
        let university_list = search_result.result[1];
  
        setMetro_list(metro_list);
        setUniversity_list(university_list);
      }
    }else{
      setMetro_list([]);
      setUniversity_list([]);
    }
    
  };
  useEffect( () => {
    console.log('metro_list,uni9viertyysit_list변화감지에 따라 요소 리랜더링:',metro_list,university_list);
  },[metro_list,university_list]);

  return (
    <Container>
        <WrapMainSearch>
            <MainSearch>
              <SearchInput type="text" name="" placeholder="지역,지하철,대학교,물건명 검색" onClick={() =>{setSearchShow(true)}} onChange={search_map_main}/>
              {/* <Link to={`/Map/${activeText}`} > */}
                <SearchBtn type="submit" name=""/>
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
                <SearchList style={{display:"block"}}>
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
                {/*<NoneHistory>최근검색기록이 없습니다.</NoneHistory>*/}
              {/*검색어를 입력했을때*/}
                <SearchList style={{display:"block"}}>
                  {/*<Listtxt>
                    <Link to="#">지하철 내용</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">지하철 내용</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">지하철 내용</Link>
                  </Listtxt>*/}
                  {
                    metro_list.map( (value) => {
                      return(
                        <Listtxt>
                          <Link to='#' onClick={() => oonClickSearch('metro',value.id)}>{value.mtr_name}({value.mtr_line})</Link>
                        </Listtxt>
                      )
                    })
                  }
                </SearchList>
              </SearchSubway>
              <Line/>
              <SearchUniv>
                <TopTxt>대학교</TopTxt>
              {/*검색어를 입력했을때*/}
                <SearchList style={{display:"block"}}>
                  {/*<Listtxt>
                    <Link to="#">대학교 이름</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">대학교 이름</Link>
                  </Listtxt>
                  <Listtxt>
                    <Link to="#">대학교 이름</Link>
                  </Listtxt>*/}
                  {
                    university_list.map ( (value) => {
                      return(
                        <Listtxt>
                          <Link to='#'onClick={() => oonClickSearch('university',value.id)}>{value.uvs_name}</Link>
                        </Listtxt>
                      )
                    })
                  }
                </SearchList>
              </SearchUniv>
              <WrapDeleteBtn>
                <Link to="#">
                  <DeleteMsg>최근검색기록 삭제</DeleteMsg>
                </Link>
              </WrapDeleteBtn>
            </NoneHisto>
          {/*검색기록이 있을 때(한번이라도 검색했으면) 검색기록 문자열들 히스토리로컬스토리지정보.*/}
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
  width:301px;height:100%;overflow-y:auto;
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
