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

//지도 모달
export default function AddModal({ add, setAdd }) {
  const [active,setActive] = useState(false);
  if(add == false)
    return null;
    return (
        <Container>
          <WrapModalAdd>
            <ModalAddBg onClick={()=>{setAdd(false)}}/>
            <ModalAdd>
              <AddCloseBtn>
                <Link onClick={()=>{setAdd(false)}}>
                  <AddCloseImg src={Close}/>
                </Link>
              </AddCloseBtn>
              <ModalAddTitle>등록</ModalAddTitle>
              <WrapInputBox>
                <Label>방송일</Label>
                <Input type="date" placeholder="날짜 선택"/>
                <Label>시간</Label>
                <WrapSelect>
                  <Select>
                    <Option selected disalbed>시</Option>
                    <Option>1시</Option>
                    <Option>2시</Option>
                  </Select>
                  <Select>
                    <Option selected disalbed>분</Option>
                    <Option>00분</Option>
                    <Option>10분</Option>
                  </Select>
                </WrapSelect>
              </WrapInputBox>
              <Confirm>
                <ConfirmBtn type="submit" active={active} onClick={() => {alert('Live 시청예약 등록이 완료되었습니다.');setAdd(false);}}>확인</ConfirmBtn>
              </Confirm>
            </ModalAdd>
          </WrapModalAdd>
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
    width:100%;
`

const WrapModalAdd = styled.div`
  width:100%;
`
const ModalAddBg = styled.div`
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;content:'';
  z-index:3;
`
const ModalAdd = styled.div`
  position:absolute;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:535px;border-radius:24px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(395/428));
    height:auto;
    padding:calc(100vw*(33/428)) calc(100vw*(15/428));
  }
`
const AddCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(22/428));
  }
`
const AddCloseImg = styled.img`
  display:inline-block;width:15px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(12/428));
  }
`
const ModalAddTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
    padding-bottom:calc(100vw*(15/428));
  }

`
const WrapInputBox = styled.div`
  width:100%;margin:30px 0;
  @media ${(props) => props.theme.modal} {
    margin:calc(100vw*(30/428)) 0;
  }
`
const Label = styled.label`
  display:inline-block;margin-bottom:9px;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);color:#4a4a4a;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(9/428));
    font-size:calc(100vw*(12/428));
  }
`
const Input = styled.input`
  width:100%;
  border-radius:4px; border:1px solid #e4e4e4;
  height:43px;font-size:15px;color:#707070;text-align:center;transform:skew(-0.1deg);
  margin-bottom:20px;
  @media ${(props) => props.theme.modal} {
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(20/428));
  }
`
const WrapSelect = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`
const Select = styled.select`
  width:205px;height:43px;font-size:15px;color:#707070;
  border-radius:4px; border:1px solid #e4e4e4;transform:skew(-0.1deg);
  background:url(${ArrowDown}) no-repeat 85% center; background-size:11px;
  text-align-last:center;
  appearance:none;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(180/428));
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    background-size:calc(100vw*(11/428));
  }
`
const Option = styled.option`
`
const Confirm = styled.div`
  width:100%;
  margin-top:30px;
  @media ${(props) => props.theme.modal} {
    margin-top:calc(100vw*(11/428));
  }
`
const ConfirmBtn = styled.button`
  width: 100%;
  height: 66px;
  line-height:60px;
  border-radius: 11px;
  transition:all 0.3s;
  color:#fff;
  font-size:20px;font-weight:800;transform:skew(-0.1deg);
  background:${({active}) => active ? "#01684b" : "#979797"};
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  @media ${(props) => props.theme.modal} {
    width:100%;
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
