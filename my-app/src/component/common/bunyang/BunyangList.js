//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//style
import styled from "styled-components"

//img
import ItemImg from "../../../img/main/item01.png";
import Heart from "../../../img/main/heart.png";
import HeartCheck from "../../../img/main/heart_check.png";
import IconSearch from "../../../img/main/icon_search.png";
import IconRecent from "../../../img/main/icon_view.png";

//component
import ModalCommon from "../modal/ModalCommon";
import ModalFilter from "../modal/ModalFilter";

const BunyangListItem =[
  {
    bunyang_id : 0,
    src:ItemImg,
    path:"/MbBunyangDetail",
    number:"2D0000324",
    title:"충남내포신도시2차대방엘리움더센트럴",//프로젝트명
    option:"충청남도 / 아파트 / 민간분양",
    address:"충청남도 홍성군 홍북읍 신경리",
    desc1:"831세대", //분양세대
    desc2:"103㎡ ~ 114㎡", //분양면적
    desc3:"77㎡ ~ 85㎡", //전용면적
    desc4:"35,599 ~ 44,049 만원", //분양가격
    LiveChecked : true, //라이브 방소예고
    LikeChecked : false //좋아요
    //모델하우스 주소
    //중개보수
    //Live 방송일시
  },
  {
    bunyang_id : 1,
    src:ItemImg,
    path:"/MbBunyangDetail",
    number:"2D0000325",
    title:"충남내포신도시2차",
    option:"충청남도 / 테스트 / 테스트",
    address:"충청남도 홍성군 홍북읍 신경리",
    desc1:"500세대",
    desc2:"103㎡ ~ 114㎡",
    desc3:"77㎡ ~ 85㎡",
    desc4:"35,599 ~ 44,049 만원",
    LiveChecked : false,
    LikeChecked : true
  },
]


export default function BunyangList({updatePageIndex , setBunyangDate, setClickId}){
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});
  
  const [searchVal, setSearchVal] = useState("");
  
  const [BYDate, setBYDate] = useState(BunyangListItem)

 //Like 버튼 클릭시 동작..... 
  const LikeButton =(value)=>{
      console.log(value);
  }

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
        title:"필터",
        content:{type:"components",text:`Testsetsetsetsetestse`,component:<ModalFilter/>},
        submit:{show:true , title:"적용" , event : ()=>{offModal(); }},
        cancle:{show:true , title:"초기화" , event : ()=>{offModal(); }},
        confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
    });
  }

    // 리스트 클릭 시 발생하는 함수입니다.
  // updatePageIndex값을 바꾸고 부모에게 클릭한 아이디값을 전달합니다.
  const onClickList = (value) => {
    setClickId(value.bunyang_id);
    setBunyangDate(value);
    updatePageIndex(1);
  }

  // 검색버튼 눌렀을때 검색값을 서버에 보내 리스트 데이터를 얻어와야합니다.
  // 받아온 데이터는 BYDate안에 넣습니다.
  const onClickSearch = () => {
    // setBYDate([])
    console.log(searchVal);
  }


    return (
      <Container>
{/*bunyangtop*/}
      <ModalTop>
        <Title>분양</Title>
      </ModalTop>
{/*bunyang select*/}
      <ModalSelect>
        <Search>
          <SearchInput type="text" placeholder="검색어를 입력하여주세요." value={searchVal} onChange={(e) => setSearchVal(e.target.value)}/>
          <SearchIcon type="button" onClick={() => onClickSearch()}/>
        </Search>
        <SortRecent>
          <RecentList>
            <Link onClick={() => {updateModal(); }}>
              <Span><RecentImg src={IconRecent}/></Span>
            </Link>
          </RecentList>
        </SortRecent>
      </ModalSelect>
{/*bunyang List*/}
        <ListTop>총 <Green>{BYDate.length}</Green>건</ListTop>
        <WrapList>
          <ListUl>
          {
            BYDate.map((value) => {
              if(value.LiveChecked === true){
                return(
                  <Li>
                    <LiTop className="clearfix">
                      <Link onClick={() => onClickList(value)}>
                        <LiImg src={value.src}/>
                        <LiDesc>
                          <LiTitle>{value.title}
                          <Number>{value.number}</Number> 
                            <LiveView>Live 방송 예고</LiveView>
                          </LiTitle>
                          <Option>{value.option}</Option>
                          <Address>{value.address}</Address>
                        </LiDesc>
                      </Link>
                      <LikeBtn>
                        <Like type="checkbox" name="" id="Like1" checked={value.LikeChecked} onClick={()=>{LikeButton(value)}}></Like>
                        <Label for="Like1" className="check_label"></Label>
                      </LikeBtn>
                    </LiTop>
                  </Li>
                )
              }
              return(
                <Li>
                  <LiTop className="clearfix">
                    <Link onClick={() => onClickList(value)}>
                      <LiImg src={value.src}/>
                      <LiDesc>
                        <LiTitle>{value.title}
                        <Number>{value.number}</Number>
                          {value.LiveCheckded&&<LiveView>Live 방송 예고</LiveView>}
                        </LiTitle>
                        <Option>{value.option}</Option>
                        <Address>{value.address}</Address>
                      </LiDesc>
                    </Link>
                    <LikeBtn>
                      <Like type="checkbox" name="" id="Like1" checked={value.LikeChecked}></Like>
                      <Label for="Like1" className="check_label"></Label>
                    </LikeBtn>
                  </LiTop>
                </Li>
              )
            })
          }
          </ListUl>
        </WrapList>
        <ModalCommon modalOption={modalOption}/>
      </Container>
    );
}

const Container = styled.div`
  width:100%;

`
const ModalTop = styled.div`
  width:100%;
  margin-bottom:22px;
  @media ${(props) => props.theme.container} {
      margin-bottom:calc(100vw*(22/1436));
    }
`
const ModalFilterBg = styled.div`
  background:rgba(0,0,0,0);
`
const Title = styled.h1`
  font-size:20px;
  color:#707070;
  font-weight:800;
  padding-left:20px;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }
`
const ModalSelect = styled.div`
  width:100%;
  height:68px;
  display:flex;justify-content:center;align-items:center;
  background:#f8f7f7;border-top:1px solid #b9b9b9;

`
const Search = styled.div`
  position:relative;
  display:flex;justify-content:space-between;align-items:center;
  width:300px;background:#fff;
  height:43px;margin-right:30px;
  border:1px solid #e4e4e4;border-radius:4px;
`
const SearchInput = styled.input`
  display:inline-block;
  width:100%;height:100%;background:transparent;
  padding-left:20px;
  font-size:15px; transform:skew(-0.1deg);color:#4a4a4a;
  &::placeholder{color:#979797;}
`
const SearchIcon = styled.button`
  width:30px;height:30px;text-align:center;margin-right:10px;
  cursor:pointer;background:url(${IconSearch}) no-repeat center center;background-size:19px;
`

const WrapItem = styled.ul`
  width:81px;
  border-radius:4px;border:1px solid #979797;
  padding:6px 0;
  margin-right:5px;
  background:#fff;
  text-align:center;
  position:relative;
  z-index:2;
`
const ItemList = styled.li`
  position:relative;
  font-size:13px;color:#707070;
  text-align:center;cursor:pointer;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(13/1436));
    }

`
const Span = styled.span`
  font-size:13px;color:#707070;
  text-align:center;cursor:pointer;
  font-weight:600;transform:skew(-0.1deg);

`
const ItemSubdepth = styled.ul`
  width:100%;height:auto;
  margin-top:5px;
`
const ItemSubList = styled.li`
  font-size:13px;color:#707070;
  text-align:center;
  font-weight:600;transform:skew(-0.1deg);
  cursor:pointer;
  padding:4px 0;
  &:hover{background:#f8f7f7;}
`
const SortRecent = styled(WrapItem)`
  border:none;
  padding:0;background:none;
`
const RecentList = styled(ItemList)`
  width:30px;height:30px;padding:0;

`
const RecentImg = styled.img`
  width:19px;height:19px;vertical-align: -webkit-baseline-middle;

`
const ListTop = styled.div`
  width:100%;text-align:left;
  padding-left:26.5px;
  font-size:20px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  padding-bottom:19px;
  margin-top:19px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }
`
const Green = styled.span`
  font-size:20px;color:#01684b;margin:0 5px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }
`
const WrapList = styled.div`
  padding:20px 17.5px 20px 35px;
  height:395px;
  overflow-y:scroll;
  scrollbar:auto;
  @media ${(props) => props.theme.container} {
      height:calc(100vw*(395/1436));
    }
`
const ListUl = styled.ul`
  width:100%;
`
const Li = styled.li`
  width:100%;
  padding-bottom:20px;
  border-bottom:1px solid #b9b9b9;
  margin-bottom:11px;
  &:last-child{border-bottom:none;margin-bottom:0;}
`
const LiTop = styled.div`
  width:100%;
  position:relative;
`
const LiImg = styled.img`
  float:left;
  display:inline-block;
  width:106px;height:106px;border-radius:4px;
  margin-right:38px;
  border:1px solid #e4e4e4;
`
const LiDesc = styled.div`
  float:left;
  padding-top:10px;
`
const LiTitle = styled.h2`
  font-size:18px;font-weight:800;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:10px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
      margin-bottom:calc(100vw*(10/1436));
    }
`
const Number = styled.span`
  font-size:14px;color:#979797;
  display:inline-block;margin-left:15px;
  margin-right:23px;
  vertical-align:baseline;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(15/1436));
    }
`
const LiveView = styled.span`
  display:inline-block;
  width:82px;height:25px;border-radius:8px;
  line-height:25px;
  background:#fe7a01;
  text-align:center;
  font-size:10px;
  cursor:pointer;
  color:#fff;font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(10/1436));
      width:calc(100vw*(100/1436));
      height:calc(100vw*(25/1436));
      line-height:calc(100vw*(25/1436));
      border-radius:4px;
    }
  @media ${(props) => props.theme.mobile} {
    position:absolute;left:calc(100vw*(90/428));top:calc(100vw*(-8/428));
    width:calc(100vw*(82/428));height:calc(100vw*(25/428));
    line-height:calc(100vw*(25/428));
    font-size:calc(100vw*(10/428));
    }
`

const Option = styled.div`
  font-size:15px;font-weight:800;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:3px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(16/1436));
    }
`
const Address = styled(Option)`
  color:#707070;
  margin-bottom:0;
`
const LikeBtn = styled.div`
  position:Absolute;
  right:0;
  top:10px;
`
const Like = styled.input`
  display:none;
  &:checked + .check_label{width:29px;height:29px;background:url(${HeartCheck}) no-repeat center center;background-size:17px 17px;}
`
const Label = styled.label`
  display:inline-block;
  width:29px;height:29px;
  border:1px solid #d0d0d0;border-radius:3px;
  background:url(${Heart}) no-repeat center center;
  background-size:17px 17px;
`
const LiBottom = styled.div`
  width:100%;
  background:#f8f7f7;
  padding: 29px 70px 34px 51px;
  margin-top:10px;
`
const Desc = styled.div`
  display:flex;justify-content:space-between;
  align-items:center;
  margin-bottom:8px;
`
const DescTitle = styled.p`
  font-size:15px;color:#4a4a4a;
  text-align:left;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(16/1436));
    }
`
const DescInfo = styled(DescTitle)`
  text-align:right;
`
