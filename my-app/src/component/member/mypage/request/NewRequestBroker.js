//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//img

import Arrow from "../../../../img/map/filter_next.png";
import ArrowDown from "../../../../img/map/filter_down_arrow.png";
import Detail from "../../../../img/map/detail_img.png";
import Trade from "../../../../img/map/trade.png";
import Report from "../../../../img/map/report.png";
import ChangeM from "../../../../img/map/change_m.png";
import Change from "../../../../img/member/change.png";
import Exit from "../../../../img/main/exit.png";
import Checked from "../../../../img/map/checked.png";
import Check from "../../../../img/main/heart.png";
import Profile from "../../../../img/map/profile_img.png";
import Like from '../../../../img/member/like.png';
import Smile from '../../../../img/member/smile.png';
import OrangeStar from '../../../../img/member/star_orange.png';
import GreenStar from '../../../../img/member/star_green.png';
import WhiteStar from '../../../../img/member/star_white.png';
import View from '../../../../img/main/icon_view.png';
import RadioImg from '../../../../img/map/radi.png';
import RadioChkImg from '../../../../img/map/radi_chk.png';

import { Mobile, PC } from "../../../../MediaQuery";

//component
import NewRequestTopInfos from './NewRequestTopInfos';

//reudx addons asssets;
import {useSelector } from 'react-redux';
import {tempBrokerRequestActions} from '../../../../store/actionCreators';

export default function Request({setFilter,value,type}) {
  const [radion, setRadion] = useState(false);
  const [active,setActive] = useState(false);

  const [select_brokerid,setSelect_brokerid] = useState('');//더미용 으로 뜨는 or 추천되는 전문중개사리스트에서 선택한 id값 구함.
  
  const login_user_redux= useSelector(data=> data.login_user);

  const border=()=>{
    if(radion == true) {
      return "solid 3px #04966d"
    }else{
      return "solid 3px #e4e4e4"
    }
  }
  const bg=()=>{
    if(radion == true) {
      return "#01684b"
    }else{
      return "#979797"
    }
  }
  const selectbg=()=>{
    if(radion == true) {
      return "#e4e4e4"
    }else{
      return "#fff"
    }
  }

  const BrokerListItem =[
  {
    b_id : 0,
    src:Profile,
    path:"/",
    tag1:"아파트·현대아이리스",
    tag2:"상가",
    tag3:"사무실",
    com_name:"럭키공인중개사",
    name:"홍길동",
    address:"강남구 논현동 104-5",
    sell1:"2",
    sell2:"7",
    sell3:"9"
  },
  {
    b_id : 9,
    src:Profile,
    path:"/",
    tag1:"아파트·현대아이리스",
    tag2:"상가",
    tag3:"사무실",
    com_name:"중개사물산테스티",
    name:"홍길동",
    address:"강남구 논현동 104-5",
    sell1:"2",
    sell2:"7",
    sell3:"9"
  },
]

const nextStep = (e) => {
  if(radion){
    //리덕스 저장.
    tempBrokerRequestActions.companyidchange({companyids: select_brokerid});
    tempBrokerRequestActions.requestmemidchange({requestmemids: login_user_redux.memid});
  }else{
    e.preventDefault();
  }
};

    return (
        <Container>
          <WrapRequest>
            <TopTitle>전문중개사 선임</TopTitle>
            {/*05.21 상단 컴포넌트 부분 추가*/}
            <NewRequestTopInfos/>
            {
            BrokerListItem.map((value) => {
              return(
                <WrapFlexBox>
                  <Radiobox>
                    <Radio type="radio" name="broker" id={"radio"+value.b_id} value={value.b_id} onClick={(e) =>{
                      setRadion(true);
                      console.log('각 라디오 전문중개사 요소 클릭:',e.target.value);
                      setSelect_brokerid(e.target.value);//클릭한 전문중개사b_id 어떤 전문중개업소 company_id?를 택한건지?
                    }}/>
                    <RadioLabel for={"radio"+value.b_id}/>
                  </Radiobox>
                  <TopContent>
                    <ProfileDetail>
                        <TopBox>
                          <Tag>{value.tag1}</Tag>
                          <Tag>{value.tag2}</Tag>
                          <Tag>{value.tag3}</Tag>
                        </TopBox>
                        <BottomBox>
                          <LeftContent>
                            <ItemInfo>
                              <ComName>{value.com_name}</ComName>
                              <Name>{value.name}</Name>
                              <Address>{value.address}</Address>
                              <SellList>
                                <List>매매<ColorOrange>{value.sell1}</ColorOrange></List>
                                <Part/>
                                <List>전세 <ColorOrange>{value.sell2}</ColorOrange></List>
                                <Part/>
                                <List>월세 <ColorOrange>{value.sell3}</ColorOrange></List>
                              </SellList>
                            </ItemInfo>
                          </LeftContent>
                          <RightContent>
                            <ItemImg src={value.src}/>
                          </RightContent>
                        </BottomBox>
                    </ProfileDetail>
                    <InfoDetail>
                      <FlexBox>
                        <Left>
                          <Icon src={Like} alt="icon"/>
                          <SubTitle>전문성</SubTitle>
                        </Left>
                        <RightStar>
                          <Star src={OrangeStar}/>
                          <Star src={OrangeStar}/>
                          <Star src={OrangeStar}/>
                          <Star src={OrangeStar}/>
                          <Star src={OrangeStar}/>
                        </RightStar>
                        </FlexBox>
                        <FlexBox>
                          <Left>
                            <Icon src={Smile} alt="icon"/>
                            <SubTitle>중개매너</SubTitle>
                          </Left>
                          <RightStar>
                            <Star src={GreenStar}/>
                            <Star src={GreenStar}/>
                            <Star src={GreenStar}/>
                            <Star src={GreenStar}/>
                            <Star src={WhiteStar}/>
                          </RightStar>
                      </FlexBox>
                    </InfoDetail>
                  </TopContent>
                </WrapFlexBox>
              )}
            )
          }
          {/*라디오 박스 선택됐을때 다음 버튼 활성화*/}
            <NextButton>
              <Link to="/AddRequestBrokerSecond" onClick={nextStep}>
                <Next type="button"border={border} bg={bg}>다음</Next>
              </Link>
            </NextButton>
           </WrapRequest>
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
      width:calc(100vw*(380/428));
      padding:calc(100vw*(30/428)) 0 calc(100vw*(150/428));
      }
`
const WrapRequest = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  padding-bottom:35px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const WrapFlexBox = styled.div`
  width:100%;margin:0 auto;display:flex;justify-content:space-between;align-items:center;
   @media ${(props) => props.theme.mobile} {
    width:100%;
    }
`
const Radiobox = styled.div`
  margin-right:20px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(20/428));
    }
`
const Radio = styled.input`
  display:none;
  &:checked+label{background:url(${RadioChkImg}) no-repeat; background-size:100% 100%;}
`
const RadioLabel = styled.label`
display:inline-block;width:20px;height:20px;
background:url(${RadioImg}) no-repeat; background-size:100% 100%;
margin-right:8px;
@media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));height:calc(100vw*(20/428));
    margin-right:calc(100vw*(8/428));
    }
`
const TopContent = styled.div`
  position:relative;
  width:100%;
  padding:25px 0;
  border-bottom: 1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding:calc(100vw*(25/428)) 0;

  }
`
const ProfileDetail = styled.div`
  position:relative;
  width:100%;
  padding:0 40px;
  margin-bottom:24px;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding:0 calc(100vw*(10/428));
    margin-bottom:calc(100vw*(20/428));
  }
`
const TopBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  flex-wrap:wrap;
  width:100%;
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(15/428));
  }
`
const Tag = styled.div`
  border-radius: 15px;
  border: solid 1px #e4e4e4;
  background-color: #f8f7f7;
  height:30px;
  padding:7px 16px;
  margin-right:5px;
  font-size:15px;color:#01684b;
  font-weight:600;transform:skew(-0.1deg);
  text-align:center;
  margin-bottom:5px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    padding:calc(100vw*(6/428)) calc(100vw*(10/428));
    margin-right:calc(100vw*(5/428));
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(5/428));
  }
`
const BottomBox = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`
const LeftContent = styled.div`
`
const ItemInfo = styled.div`
`
const ComName = styled.h2`
  font-size:25px;font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(20/428));
    margin-bottom:calc(100vw*(9/428));
  }
`
const Name = styled.div`
  font-size:20px;
  font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(17/428));
    margin-bottom:calc(100vw*(13/428));
  }
`
const Address = styled.div`
  display:inline-block;
  font-size:15px;color:#4a4a4a;
  font-weight:700;transform:skew(-0.1deg);
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(13/428));
  }
`

const ColorOrange = styled.span`
  display:inline-block;
  font-size:15px;color:#fe7a01;
  vertical-align:middle;
  margin-left:3px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-left:calc(100vw*(3/428));
  }
`
const SellList = styled.div`
  width:100%;display:flex;
  justify-content:flex-start;align-items:center;
`
const List = styled(ColorOrange)`
  color:#4a4a4a;
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(7/428));
  }
`
const Part = styled.div`
  display:inline-block;
  width:1px;height:12px;
  background:#4a4a4a;
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(7/428));
    height:calc(100vw*(10/428));
  }
`

const InfoDetail = styled.div`
  width:100%;
  padding:22px 0;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(20/428)) 0;
  }
`
const Icon = styled.img`
  display:inline-block;
  width:20px;margin-right:12px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    margin-right:calc(100vw*(12/428));
    }
`
const SubTitle = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const RightContent = styled.div`
  position:relative;
  width:95px;height:95px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(95/428));
    height:calc(100vw*(95/428));
  }
`
const ItemImg = styled.img`
  width:100%;height:100%;
  border-radius:100%;
`

const FlexBox = styled.div`
  display:flex;width:100%;
  justify-content:center;align-items:center;
  margin-bottom:25px;
  &:nth-child(3){margin-top:60px;}
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(25/428));
    &:nth-child(3){margin-top:calc(100vw*(40/428));}
    }
`
const Left = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(100/428));
    }
`
const Star = styled.img`
  display:inline-block;
  width:16px;
  margin-right:9px;
  &:last-child{margin-right:0;}
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(16/428));
    margin-right:calc(100vw*(9/428));
    }
`

const RightStar = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:184px;
  margin-left:40px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(184/428));
    }
`
const CallBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:465px;
  height: 84px;
  padding:0 16px;
  margin:16px auto 0;
  border-radius: 20px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 3px #efefef;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(398/428));
    height:calc(100vw*(84/428));
    padding:0;
    margin:calc(100vw*(14/428)) auto 0;
  }
`
const ToCall = styled.div`
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
`
const BottomImg = styled.img`
  width:20px;height:20px;
  display:inline-block;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));
  }
`
const BottomTxt = styled.p`
  font-size:18px;font-weight:800;
  transform:skew(-0.1deg);margin-left:10px;
  color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(18/428));
    margin-left:calc(100vw*(10/428));
  }
`
const ToChat = styled(ToCall)`
`
const LongPart = styled.p`
  width:1px;height:30px;background:#979797;
  margin:0 50px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    margin:0 calc(100vw*(40/428));
  }
`
const NextButton = styled.div`
  width:100%;text-align:center;
  margin-top:70px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(70/428));
    }
`
const Next = styled.button`
  display:inline-block;
  width:408px;
  height: 66px;
  line-height: 60px;
  font-size:20px;font-weight:800;color:#fff;
  transform:skew(-0.1deg);text-align:center;
  border-radius: 11px;
  transition:all 0.3s;
  border:${({border}) => border};
  background:${({bg}) => bg};
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));font-size:calc(100vw*(15/428));
    }
`
