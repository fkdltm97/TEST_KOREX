//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";

//style
import styled from "styled-components";
import "../../../react-datepicker.css";

//img
import CloseIcon from "../../../img/main/modal_close.png";
import Check from "../../../img/member/check.png";
import Checked from "../../../img/member/checked.png";

import ko from "date-fns/locale/ko";
registerLocale("ko", ko); // 달력 한글화...

export default function ModalCal({cal, setCal,updatePageIndex,SelectDate, setSelectDate}){
  const [startDate, setStartDate] = useState(new Date());
  
  
  const Change = (date)=>{
    setStartDate(date); 
    updatePageIndex(1);
    //calendar second로 데이터 넘기기
    setSelectDate(date);
  }

  const MyContainer = ({ className, children }) => {
    return (
      <div>
        <CalendarContainer className={className}>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };


  if(cal == false)
    return null;
    return (
      <Container>
        <Wraplive>
          <ModalClose>
              <Link onClick={()=>{setCal(false);updatePageIndex(0)}}>
              <CloseImg src={CloseIcon}/>
            </Link>
          </ModalClose>
          <ModalTop>
            <Title>방문 예약</Title>
          </ModalTop>
          <Label>방문일시</Label>
          <DatePicker
            locale="ko"
            // selected={startDate}
            calendarContainer={MyContainer}
            onChange={Change}
            inline
            choseDate={startDate}
            dateFormat="yyyy.mm.dd(eee)"
          />
        </Wraplive>
      </Container>
    );
}

const Container = styled.div`
  width:100%;

`
const CalendarContainer  = styled.div`
height:100%
`
const Wraplive = styled.div`
  position:fixed;z-index:1002;
  width:535px;height:auto;
  background:#fff;
  border-radius:24px;
  border:1px solid #f2f2f2;
  left:50%;top:50%;transform:translate(-50%,-50%);
  padding:49px 49px 50px 63px;
  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(395/428));
      height:auto;
      padding:calc(100vw*(24/428)) calc(100vw*(20/428)) calc(100vw*(50/428));
    }
`
const ModalClose = styled.div`
  width:100%;
  text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.modal} {
      margin-bottom:calc(100vw*(25/428));
    }
`
const CloseImg = styled.img`
  display:inline-block;
  width:15px;height:16px;
  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(12/428));
      height:calc(100vw*(13/428));
    }
`
const ModalTop = styled.div`
  width:100%;padding-bottom:20px;
  border-bottom:1px solid #a3a3a3;
  @media ${(props) => props.theme.modal} {
      padding-bottom:calc(100vw*(15/428));
    }
`
const Title = styled.div`
  font-size:20px;
  font-weight:800;
  color:#707070;
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(15/428));
    }
`
const ModalBody = styled.div`
  width:100%;
  padding-top:11px;
  @media ${(props) => props.theme.modal} {
      padding-top:calc(100vw*(14/428));
    }
`
const Label = styled.label`
  margin:10px 0;
  font-size:12px;display:inline-block;
  transform:skew(-0.1deg);font-weight:600;
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(12/428));
      margin-top:calc(100vw*(10/428));
    }
`
const Box = styled.div`
  width:100%;
  margin-bottom:14px;
  &:last-child{margin-bottom:0;}

  @media ${(props) => props.theme.modal} {
      margin-bottom:calc(100vw*(15/428));
    }
`
const BoxTitle = styled.p`
  font-size:12px;color:#4a4a4a;
  margin-bottom:9px;
  padding-left:7px;
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(12/428));
      margin-bottom:calc(100vw*(9/428));
      padding-left:calc(100vw*(7/428));
    }
`
const InputText = styled.input`
  font-size:15px;color:#979797;
  transform:skew(-0.1deg);
  text-align:center;
  width:100%;
  height:43px;
  line-height:43px;
  border:1px solid #e4e4e4;
  &::placeholder{font-size:15px;color:#979797;}
  @media ${(props) => props.theme.modal} {
      font-size:calc(100vw*(14/428));
      height:calc(100vw*(43/428));
      line-height:calc(100vw*(43/428));
      &::placeholder{font-size:calc(100vw*(14/428));}
    }
`
const Checkbox = styled.div`
  margin:30px 0;
  text-align:center;

  @media ${(props) => props.theme.modal} {
      margin:calc(100vw*(25/428)) 0;
    }

`
const CheckInput = styled.input`
  display:none;
  &:checked + .check_label .chk_on_off{width:16px;height:16px;background:url(${Checked}) no-repeat;background-size:100% 100%;}
  @media ${(props) => props.theme.modal} {
    &:checked + .check_label .chk_on_off{width:calc(100vw*(16/428));height:calc(100vw*(16/428));background:url(${Checked}) no-repeat;background-size:100% 100%;}
    }
`

const Span = styled.span`
  display:inline-block;
  margin-right:12px;
  width:16px;height:16px;
  background:url(${Check}) no-repeat;
  background-size:100% 100%;
  vertical-align:middle;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.modal} {
    margin-right:calc(100vw*(12/428));
    width:calc(100vw*(16/428));height:calc(100vw*(16/428));
  }
`
const ViewTerm = styled.p`
  display:inline-block;
  font-size:12px;
  color:#a0a0a0;
  font-weight:600;
  transform:skew(-0.1deg);
  vertical-align:text-bottom;
  margin-left:20px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(12/428));
    margin-left:calc(100vw*(12/428));
  }
`
const ModalBtn = styled.div`
    width:100%;
`
const Confirm = styled.div`
    width:100%;text-align:center;
    background:#979797;
    border:3px solid #e4e4e4;
    border-radius:11px;
    height:66px;
    line-height:60px;
    color:#fff;
    font-size:20px;font-weight:600;
    @media ${(props) => props.theme.modal} {
      height:calc(100vw*(60/428));
      line-height:calc(100vw*(54/428));
      font-size:calc(100vw*(15/428));
    }
`
