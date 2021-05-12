//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Set from '../../../../img/member/setting.png';
import Check from '../../../../img/map/radio.png';
import Checked from '../../../../img/map/radio_chk.png';

import { Mobile, PC } from "../../../../MediaQuery"

export default function Request({tridchklist_function,cancleModal,confirmModal,mapModal,value,select,cond,opacity,time_distance,time_status,setSelect,editModal,editResultModal}) {
  
  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

  if(time_status == 'mirae'){
    var message='+'+time_distance+'일후';
  }else if(time_status == 'today'){
    var message='오늘';
  }else if(time_status == 'passed'){
    var message='마감';
  }

  if(cond!=''){
    var message='예약해제';
  }
  
  const trid_chk_change = (e) => {
    console.log('각 체크박스요소 체크여부:',e.target,e.target.value);

    if(e.target.checked){
      //변화 발생시점에 체크가 된 상황이라면 해당 요소의 ischk 고유값은 변화
      //setIschk(true);//각 개별 요소 변화시킨다.
      //각 요소에 대해서 체크발생시 기존 배열에 해당 요소 추가,set으로 관리. 해제하면 기존배열에서(set)에서 대상요소 제거
      tridchklist_function(e.target.value,'add');
    }else{
      //체크해제시에 
      //setIschk(false);
      tridchklist_function(e.target.value,'remove');
    }
  }
  /*useEffect( () => {
    console.log('managelist요소 useEfeect 형태 실행:::',ischk_val);

    setIschk(ischk_val);
  });*/
    
  console.log('managleilist element for loops:',value.r_tr_id);
    return (
      <Container>
          <Li opacity={opacity}>
            <Infos>
              <WrapLeft>
                {
                  select ?
                  <WrapRight>
                    <CheckBox>
                      <InputCheckEa type="checkbox" name="tour" id={"ea"+value.r_tr_id} value={value.r_tr_id} onClick={trid_chk_change}/>
                      <CheckLabelEa for={"ea"+value.r_tr_id}/>
                    </CheckBox>
                  </WrapRight>
                  :
                  null
                }
                <ItemImg>
                  <Img src={value.p_prd_img}/>
                </ItemImg>
              </WrapLeft>
              <InBox>
                <ConditionDiv>
                  상태 : <Condition>{message }({value.r_tr_id})({value.t_tour_start_date}) <Number>{value.p_prd_identity_id}</Number></Condition>
                </ConditionDiv>
                <Line>
                  <Left>예약자명</Left>
                  <Right>{value.r_tr_name}</Right>
                </Line>
                <Line>
                  <Left>휴대폰번호</Left>
                  <RightOg>
                    <Call href={"tel:"+value.r_tr_phone}>{value.r_tr_phone}</Call>
                  </RightOg>
                </Line>
                <Line>
                  <Left>건물명</Left>
                  <RightCursor onClick={()=>{mapModal();}}>{value.p_prd_name}</RightCursor>
                </Line>
                <Line>
                  <Left>거래유형</Left>
                  <Right>{value.p_prd_sel_type}</Right>
                </Line>
                <Line>
                  <Left>거래금액</Left>
                  <Right>{value.p_prd_price}</Right>
                </Line>
              </InBox>
            </Infos>
            <RightMenu>
              <Alarm>
                <AlarmCheck type="checkbox" id={"check"+value.r_tr_id} name=""/>
                <Label for={"check"+value.r_tr_id}/>
              </Alarm>
              <Menu>
                <div onClick={showModal} className="linkToDiv">
                  <MenuIcon/>
                    {
                      menu ?
                      <InMenu>
                      {/*검토대기 상태일때*/}
                        <Div>
                          <div onClick={()=>{cancleModal(value.r_tr_id);}}  className={["data_link", "linkToDiv"]}/>
                          <InDiv>예약 해제</InDiv>
                        </Div>
                        <Div>
                          <div onClick={()=>{
                            console.log('=>>>>value.선택한 상품prd_identity_id값:',value.p_prd_identity_id);
                            editModal(value.p_prd_identity_id,value.r_tr_id);//선택한 매물id값에 대해서 보낸다.어떤 매물에 대한 셋팅리스트 보여준다. 또한 어떤 tr_id에 대한 예약접수내역을 클릭한지 여부 구한다.

                            }}  className={["data_link", "linkToDiv"]}/>
                          <InDiv>수정</InDiv>
                        </Div>
                      </InMenu>
                      :
                      null
                    }
                </div>
              </Menu>
            </RightMenu>
          </Li>
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
`
const RequestList = styled.ul`
  width:100%;
`
const Li = styled.li`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
  position:relative;
  padding:29px 24px 29px 20px;
  border-bottom:1px solid #f7f8f8;
  opacity:${({opacity}) => opacity};
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(29/428)) 0;
    align-items:center;
  }
`
const WrapLeft = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  margin-right:40px;
  @media ${(props) => props.theme.mobile} {
    margin-right:0;
  }
`
const ItemImg = styled.div`
  width:106px;height:106px;border: solid 1px #e4e4e4;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(80/428));height:calc(100vw*(80/428));
  }
`
const Img = styled.img`
  width:100%;height:100%;border-radius:3px;
`
const Infos = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:100%;margin: 0 auto;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    justify-content:space-between;
  }
`
const Date = styled.div`
  display:block;
  font-size:15px;
  font-weight:800;color:#4a4a4a;
  transform:skew(-0.1deg);
  margin-bottom:7px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(3/428));
  }
`
const ConditionDiv = styled(Date)`
  display:inline-block;
  color:#979797;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    margin-bottom:calc(100vw*(5/428));
  }
`
const Condition = styled(ConditionDiv)`
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    margin-bottom:0;
  }
`
const Number = styled.p`
  font-size:14px;color:#979797;
  transform:skew(-0.1deg);
  display:inline-block;
  margin-left:5px;
  font-weight:600;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-left:calc(100vw*(5/428));
  }
`
const Line = styled.h2`
  display:flex;justify-content:space-between;align-items:flex-start;
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
  }
`
const Left = styled.p`
  font-size:15px;font-weight:600;
  transform:skew(-0.1deg);color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`

const Right = styled(Left)`
  color:#979797;
  text-align:right;
  width:330px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(190/428));
    }
`
const RightOg = styled(Right)`
  color:#fe7a01;
  text-decoration:underline;
`
const RightCursor = styled(Right)`
  cursor:pointer;
`
const Call = styled.a`
`
const WrapRight = styled.div`
  margin-right:20px;
  @media ${(props) => props.theme.modal} {
      margin-right:calc(100vw*(10/428));
    }
`
const CheckBox = styled.div`
`
const InputCheckEa = styled.input`
  display:none;
  &:checked+label{background:url(${Checked}) no-repeat;background-size:100% 100%}
`
const CheckLabelEa = styled.label`
  display:inline-block;
  width:20px;height:20px;
  background:url(${Check}) no-repeat;background-size:100% 100%;
  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(20/428));
      height:calc(100vw*(20/428));
    }
`
const RightMenu = styled.div`
    position:absolute;
    right:0;
    top:20px;
    @media ${(props) => props.theme.mobile} {
      top:calc(100vw*(10/428));
      transform:none;
      display:flex;justify-content:flex-start;
    }
`
const Alarm = styled.div`
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:0;
    margin-right:calc(100vw*(5/428));
  }

`
const AlarmCheck = styled.input`
  display:none;
  &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:20px 20px}
  @media ${(props) => props.theme.mobile} {
    &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428))}
  }
`
const Label = styled.label`
  display:inline-block;
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Bell}) no-repeat center center; background-size:20px 20px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    background:url(${Bell}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428));
  }
`
const Menu = styled(Alarm)`
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    margin-right:0;
  }
`
const MenuIcon = styled.div`
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Set}) no-repeat center center; background-size:20px 20px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    background:url(${Set}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428));
  }
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
  z-index:2;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(35/428));
    left:calc(100vw*(-30/428));
    width:calc(100vw*(100/428));
  }

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
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    padding:calc(100vw*(4/428)) 0 calc(100vw*(4/428)) calc(100vw*(12/428));
    &:first-child{padding-top:calc(100vw*(8/428));}
    &:last-child{padding-bottom:calc(100vw*(8/428));}
  }
`
const InDiv = styled.div`
  width:100%;height:100%;
`
const InBox = styled.div`

`