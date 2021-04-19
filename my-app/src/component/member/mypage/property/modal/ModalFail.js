//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../../img/member/filter.png';
import Bell from '../../../../../img/member/bell.png';
import BellActive from '../../../../../img/member/bell_active.png';
import Location from '../../../../../img/member/loca.png';
import Set from '../../../../../img/member/setting.png';
import Item from '../../../../../img/main/item01.png';
import Noimg from '../../../../../img/main/main_icon3.png';
import Close from '../../../../../img/main/modal_close.png';
import Change from '../../../../../img/member/change.png';
import Marker from '../../../../../img/member/marker.png';
import ArrowDown from '../../../../../img/member/arrow_down.png';

//필터 모달
export default function ModalDanjiSelect({fail,setFail}) {
    return (
        <Container>
          <WrapModal>
            <ModalBg onClick={() => {setFail(false)}}/>
            <Modal>
              <FilterCloseBtn>
                <Link onClick={() => {setFail(false)}}>
                  <FilterCloseImg src={Close}/>
                </Link>
              </FilterCloseBtn>
              <TopInfo>
                <Title>물건(외부수임) 등록</Title>
              </TopInfo>
              <Body>
              해당물건은 전속매물이 아닙니다.<br/>
              이미 다른 중개사에게 의뢰되었거나<br/>
              거래중인 물건은 시스템에 등록할 수 없습니다. <br/>
              상기 사유에 해당하지 않는 경우,<br/>
              고객센터로 문의해주세요.
              </Body>
              <Buttons>
                <Link to="/AddPropertyBasicInfo" onClick={() => {setFail(false)}}>
                  <OkBtn type="button">확인</OkBtn>
                </Link>
              </Buttons>
            </Modal>
          </WrapModal>
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
const WrapModal = styled.div`
  width:100%;
`
const ModalBg = styled.div`
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;content:'';
  z-index:3;
`
const Modal = styled.div`
  position:absolute;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:535px;border-radius:24px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(395/428));
    padding:calc(100vw*(33/428)) calc(100vw*(15/428));
  }
`
const FilterCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(22/428));
  }
`
const FilterCloseImg = styled.img`
  display:inline-block;width:15px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(12/428));
  }
`
const TopInfo = styled.div`

`
const Title = styled.h3`
font-size:20px;font-weight:600;transform:skew(-0.1deg);
padding-bottom:22px;border-bottom:1px solid #a3a3a3;
`
const Body = styled.div`
  padding:50px 0;
  text-align:center;
  font-size:15px; transform:skew(-0.1deg);
  font-weight:normal;
  line-height:2;
`
const Box = styled.div`
  position:relative;
  width:100%;
  margin-bottom:14px;
  &:last-child{margin-bottom:0;}
`
const Label = styled.label`
  display:block;text-align:left;
  font-size:12px;font-family:'nbg',sans-serif;
  margin-bottom:9px;color:#4a4a4a;
`
const TxtBox = styled.input`
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  text-align:center;font-weight:600;
  width:100%;height:43px;border-radius:4px;border:1px solid #e4e4e4;
  &::placeholder{color:#979797;font-weight:500;}
`
const TxtBoxMt = styled(TxtBox)`
  margin-top:9px;
`
const SearchTitle = styled.p`
  font-size: 15px;
  line-height: 1.2;
  font-weight:500;
  font-family:'nbg',sans-serif;
  color: #4a4a4a;transform:skeW(-0.1deg);
`
const SearchResultAddress = styled(SearchTitle)`
`
const Question = styled(SearchTitle)`
  margin-top:30px;
  text-align:center;
`
const Buttons = styled.div`
  width:100%;
`
const ConfirmBtn = styled.button`
  width:100%;height:66px;
  text-align:center;
  color:#fff;font-size:20px;font-weight:800;
  transform:skew(-0.1deg);
  border-radius: 11px;
  transition:all 0.3s;
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  background:${({active}) => active ? "#01684b" : "#979797"};
`
const OkBtn = styled.button`
  width:100%;height:66px;
  text-align:center;
  color:#fff;font-size:20px;font-weight:800;
  transform:skew(-0.1deg);
  border-radius: 11px;
  transition:all 0.3s;
  background:#01684b;
  border:3px solid #04966d;
`
