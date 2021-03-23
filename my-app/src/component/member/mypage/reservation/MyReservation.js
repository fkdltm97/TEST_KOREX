//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../img/member/filter.png';
import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Location from '../../../../img/member/loca.png';
import Set from '../../../../img/member/setting.png';
import Item from '../../../../img/main/item01.png';
import Noimg from '../../../../img/main/main_icon3.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

export default function Reserve({setMap,setFilter,setReserve}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

  /*data map*/
  const ReserveListItem =[
    {
      reserve_id : 0,
      src:Item,
      path:"/",
      condition:"오늘",
      number:"1234567889",
      address:"충남내포신도시2차대방엘리움더센트럴",
      locaImg:Location,
      date:"2020.01.01 (월)",
      time:"오전1T (09:00-12:00)",
      type:"today"
    },
    {
      reserve_id : 1,
      src:Item,
      path:"/",
      condition:"2일후",
      number:"1234567889",
      address:"충남내포신도시2차대방엘리움더센트럴",
      locaImg:Location,
      date:"2020.01.01 (월)",
      time:"오전1T (09:00-12:00)",
      type:"days"
    },
    {
      reserve_id : 2,
      src:Item,
      path:"/",
      condition:"예약취소",
      number:"1234567889",
      address:"충남내포신도시2차대방엘리움더센트럴",
      locaImg:Location,
      date:"2020.01.01 (월)",
      time:"오전1T (09:00-12:00)",
      type:"cancel"
    }
]

    return (
        <Container>
          <WrapReserve>
            <TopTitle>내 물건 투어 예약</TopTitle>
            <TopInfo>
              <All>총 <GreenColor>3</GreenColor> 건</All>
              <Link onClick={() => setFilter(true)}>
                <FilterImg src={Filter} alt="filter"/>
              </Link>
            </TopInfo>
            <ReserveList>
            {
            ReserveListItem.map((value) => {

              const type=()=>{
                if(value.type == "today") {
                  return "#fe7a01"
                }else if(value.type == "cancel") {
                  return "#707070"
                } else if(value.type == "days") {
                  return "#01684b"
                }
              }
              const type2=()=>{
                if(value.type == "today") {
                  return 1
                }else if(value.type == "cancel") {
                  return 0.5
                } else if(value.type == "days") {
                  return 1
                }
              }

              return(
                <Li opacity={type2}>
                  <Img>
                    <ItemImg src={value.src} alt="img"/>
                  {/*상품이미지가 없을경우*/}
                    {/* <ItemImg src={Noimg} alt="img"/> */}
                  </Img>
                  <Infos>
                    <Condition>상태:<Orange color={type}>{value.condition}</Orange></Condition>
                    <Number>등록번호 {value.number}</Number>
                    <Address>
                      <Link onClick={() => {setMap(true)}}>
                        <AddressTitle>{value.address}</AddressTitle>
                        <LocaImg src={value.locaImg}/>
                      </Link>
                    </Address>
                    <DateTime>
                      <Date>{value.date}</Date>
                      <Time>{value.time}</Time>
                    </DateTime>
                  </Infos>
                  <RightMenu>
                    <Alarm>
                      <AlarmCheck type="checkbox" id="alarm_check" name=""/>
                      <Label for="alarm_check"/>
                    </Alarm>
                    <Menu>
                      <Link onClick={showModal}>
                        <MenuIcon/>
                          {
                            menu ?
                            <InMenu>
                              <Div><Link onClick={()=>{setReserve(false)}}>예약취소</Link></Div>
                              <Div><Link>수정</Link></Div>
                              <Div><Link>삭제</Link></Div>
                            </InMenu>
                            :
                            null
                          }
                      </Link>
                    </Menu>
                  </RightMenu>
                </Li>
              )
            })
          }
        </ReserveList>
      </WrapReserve>
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
    width:680px;
    margin:0 auto;
    padding:24px 0 250px;
    @media ${(props) => props.theme.mobile} {

      }
`
const WrapReserve = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
`
const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;
  margin-top:40px;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
`
const All = styled.span`
  font-size:17px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
`
const GreenColor = styled(All)`
  color:#01684b;
`
const FilterImg = styled.img`
  display:inline-block;
  width:18px;
`
const ReserveList = styled.ul`
  width:100%;
`
const Li = styled.li`
  width:100%;
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  padding:29px 24px 29px 20px;
  border-bottom:1px solid #f7f8f8;
  opacity:${({opacity}) => opacity};
`
const Img = styled.div`
  width:106px;
  height:106px;
  margin-right:40px;
`
const ItemImg = styled.img`
  width:100%;
  height:100%;border-radius:3px;
  border:1px solid #e4e4e4;
`
const Infos = styled.div`
`
const Condition = styled.h4`
  font-size:15px;color:#707070;font-weight:800;
  transform:skew(-0.1deg);
  margin-bottom:5px;
`
const Orange = styled(Condition)`
  color:${({color}) => color};
  display:inline-block;
  margin-left:5px;
  margin-bottom:0;
`
const Green = styled(Orange)`
  color:#01684b;
`
const Gray = styled(Orange)`
  color:#707070;
  opacity:0.5;
`
const Number = styled.p`
  font-size:14px;color:#979797;
  transform:skew(-0.1deg);
  margin-bottom:8px;
`
const Address = styled.div`
  width:100%;
`
const AddressTitle = styled.div`
  display:inline-block;
  font-size:18px;margin-bottom:8px;
  font-weight:800;color:#4a4a4a;
  transform:skew(-0.1deg);
`
const LocaImg = styled.img`
  display:inline-block;width:20px;margin-left:5px;
`
const DateTime = styled.div`
  width:100%;
`
const Date = styled.div`
  display:inline-block;
  font-weight:800;color:#4a4a4a;
  transform:skew(-0.1deg);
`
const Time = styled(Date)`
  margin-left:5px;
`
const RightMenu = styled.div`
    position:absolute;
    right:0;
    top:50%;transform:translateY(-50%);
`
const Alarm = styled.div`
  margin-bottom:6px;
`
const AlarmCheck = styled.input`
  display:none;
  &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:20px 20px}
`
const Label = styled.label`
  display:inline-block;
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Bell}) no-repeat center center; background-size:20px 20px;
`
const Menu = styled(Alarm)`
  margin-bottom:0;
`
const MenuIcon = styled.div`
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Set}) no-repeat center center; background-size:20px 20px;
`
const Bg = styled.div`
  position:fixed;width:100%;height:100%;
  background:rgba(0,0,0,0.2);left:0;top:0;
`
const InMenu = styled.ul`
  position:absolute;
  top:46px;left:44px;
  width:112px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;

`
const Div = styled.li`
  font-size:13px;
  transform:skew(-0.1deg);
  border-radius:8px;
  padding:4px 0 4px 17px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
  &:first-child{padding-top:8px;}
  &:last-child{padding-bottom:8px;}
`
const WrapModalMap = styled.div`
  width:100%;
`
const ModalMapBg = styled.div`
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;content:'';
  z-index:2;
`
const ModalMap = styled.div`
  position:absolute;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:535px;border-radius:24px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
`
const MapCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
`
const MapCloseImg = styled.img`
  display:inline-block;width:15px;
`
const ModalMapTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
`
const ModalMapAddress = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 5px;
`
const AddressTxt = styled.p`
  font-size:15px;color:#4a4a4a;font-weight:800;
  transform:skew(-0.1deg);
`
const ChangeAddress = styled.div`

`
const ChangeImg = styled.img`
  display:inline-block;
  width:15px;
`
const ChangeTxt = styled.p`
  display:inline-block;
  font-size:10px;font-weight:800;
  transform:skew(-0.1deg);color:#979797;
  margin-left:8px;
  margin-top:2px;
`
const ShowMap = styled.div`
  width:100%;height:240px;
  position:relative;
`
const InMapBox = styled.div`
  width:100%;height:100%;
  background:#eee;
`
const MapMarker = styled.div`
  position:absolute;
  width:50px;height:66px;
  left:60%;
  bottom:20px;
`
const MapMarkerImg = styled.img`
  display:inline-block;width:100%;height:100%;
`
const WrapFilterModal = styled(WrapModalMap)`
`
const ModalFilterBg = styled(ModalMapBg)`
`
const ModalFilter = styled(ModalMap)`
  height:520px;
`
const FilterCloseBtn = styled(MapCloseBtn)`
`
const FilterCloseImg = styled(MapCloseImg)`
`
const ModalFilterTitle = styled(ModalMapTitle)`
  margin-bottom:12px;
`
const WrapFilterSelect = styled.div`
  width:100%;
`
const FilterBox = styled.div`
  position:relative;
  width:100%;
  margin-bottom:70px;
  &:last-child{margin-bottom:0;}
`
const FilterLabel = styled.label`
  font-size:12px;color:#4a4a4a;
  transform:skew(-0.1deg);
  font-family:'nbg', sans-serif;
  margin-bottom:9px;
`
const FilterSelectSort = styled.div`
  position:Absolute;
  top:22px;
  width:100%;
  text-align:center;
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  border-radius:4px;border:1px solid #a3a3a3;
  background:url(${ArrowDown}) no-repeat 400px 16px; background-size:13px 8px;
  z-index:9999;
`
const FilterSelectCondition = styled(FilterSelectSort)`
  z-index:99;
`
const FilterSelectSortList = styled.div`

  width:100%;
`
const Option = styled.div`
  padding:12px 0;
  text-align:center;
  cursor:pointer;
  transition:all 0.3s;

`
const InOption = styled(Option)`
  padding:8px 0;
  background:#fff;
  &:hover{background:#f8f7f7;}
`
const FilterSelectConditionList = styled(FilterSelectSortList)`
  top:200px;
  height:100px;
  overflow-y:scroll;
`
const WrapFilterButtons = styled.div`
  position:Absolute;
  left:50%;bottom:78px;transform:translateX(-50%);
  width:100%;
  display:flex;justify-content:center;align-items:center;
`
const ResetBtn = styled.button`
  width: 200px;
  height: 66px;
  border-radius: 11px;
  border: solid 3px #e4e4e4;
  background: #979797;
  line-height:60px;color:#fff;
  font-size:20px;font-weight:800;transform:skew(-0.1deg);
  text-align:center;
`
const SaveBtn = styled(ResetBtn)`
  background:#01684b;
  border:3px solid #04966d;
  margin-left:8px;
`
