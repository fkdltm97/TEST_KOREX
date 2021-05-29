//react
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//css
import styled from "styled-components";

//img
import Check from "../../../../img/map/radio.png";
import Checked from "../../../../img/map/radio_chk.png";
import ArrowDown from "../../../../img/member/arrow_down.png";

import { Mobile, PC } from "../../../../MediaQuery";

import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import "../../../../react-datepicker.css";
import ko from "date-fns/locale/ko";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import ModalCommon from "../../../common/modal/ModalCommon";

export default function VisitSetting({ setCal, setAdd, setEdit, setCancle }) {
  const [active, setActive] = useState(false);

  const [onOff, setOnOff] = useState(true);

  //... 눌렀을때(메뉴)
  const [menu, setMenu] = useState(false);
  const showModal = () => {
    setMenu(!menu);
  };

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

    const [StartDay, setStartDay] = useState(new Date());
    const [EndDay, setEndDay] = useState(new Date("2021/07/08"));

  const [Interval, setInterval] = useState(30); //간격 값 저장

  const change = (e) => {
    setInterval(e.target.value);
  };

  const [modalOption, setModalOption] = useState({
    show: false,
    setShow: null,
    link: "",
    title: "",
    submit: {},
    submitnone: {},
    cancle: {},
    confirm: {},
    confirmgreennone: {},
    content: {},
  });

  const offModal = () => {
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  };

  //등록되었습니다 모달
  const comfirmModal = () => {
    if (onOff === false) {  //비활성화 상태
      setModalOption({
        show: true,
        setShow: offModal
        ,title: "방문예약세팅",
        content: {type: "text", text: `방문예약세팅을 활성화 하시겠습니까?`,component: "",},
        submitnone: {show: true,title: "확인",event: () => {offModal();setOnOff(!onOff);},},
        cancle: {show: true,title: "취소",event: () => { offModal(); },},
        confirm: { show: false,title: "확인",event: () => {offModal(); }, },
        confirmgreennone: { show: false,title: "확인", event: () => {offModal();setCal(false); },},
      });
    } else {
      setModalOption({ //활성화 상태
        show: true,
        setShow: offModal,
        title: "방문예약세팅",
        content: {type: "text",text: `방문예약세팅을 비활성화 하시겠습니까?`,component: "",},
        submitnone: {show: true,title: "확인",event: () => {offModal();setOnOff(!onOff);},},
        cancle: {show: true,title: "취소",event: () => {offModal();},},
        confirm: {show: false,title: "확인",event: () => {offModal();},},
        confirmgreennone: {show: false,title: "확인",event: () => {offModal();setCal(false);},},
      });
    }
  };

  const SecendComfirmModal= () =>{
    setModalOption({
        show:true,
        setShow:offModal,
        title:"등록",
        content:{type:"text",text:`완료되었습니다.`,component:""},
        submit:{show:false , title:"" , event : ()=>{offModal(); }},
        cancle:{show:false , title:"" , event : ()=>{offModal(); }},
        confirm:{show:true , title:"확인" , event : ()=>{offModal();}},
        confirmgreennone:{show:false , title:"확인" , event : ()=>{offModal();setCal(false);}}
    });
  }



  return (
    <Container>
      <WrapVisit>
        <TopTitle>방문예약세팅</TopTitle>
        <TopInfo>
          <InputCheck type="checkbox" id="off" />
          <CheckLabel
            for="off"
            onClick={() => {
              comfirmModal();
            }}
          >
            <Span />
            비활성화
          </CheckLabel>
          <ModalCommon modalOption={modalOption} />
        </TopInfo>
        {onOff ? (
          <VisitInfo>
            <Box>
              <Label>기간</Label>
              <WrapDate>
                <Dates className="date_pick">
                  <DatePicker
                    className="absolute"
                    selected={StartDay}
                    onChange={(date) => setStartDay(date)}
                    selectsStart
                    startDate={StartDay}
                    endDate={EndDay}
                    dateFormat="yyyy.MM.dd"
                    />
                </Dates>
                <Dates className="date_pick">
                  <DatePicker
                    className="absolute"
                    selected={EndDay}
                    onChange={(date) => setEndDay(date)}
                    selectsEnd
                    startDate={StartDay}
                    endDate={EndDay}
                    minDate={StartDay}
                    dateFormat="yyyy.MM.dd"
                  />
                </Dates>
              </WrapDate>
            </Box>
            <Box>
              <Label>공휴일 제외여부</Label>
              <InputCheck type="checkbox" id="holiday" />
              <CheckLabel for="holiday">
                <Span />
                공휴일 제외
              </CheckLabel>
            </Box>
            <BoxWeek>
              <Label>제외 요일</Label>
              <WrapWeek>
                <InBox>
                  <InputCheck type="checkbox" name="" id="sun" />
                  <CheckLabelInBox for="sun">
                    <SpanAbsolute />일
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="mon" />
                  <CheckLabelInBox for="mon">
                    <SpanAbsolute />월
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="tue" />
                  <CheckLabelInBox for="tue">
                    <SpanAbsolute />화
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="wed" />
                  <CheckLabelInBox for="wed">
                    <SpanAbsolute />수
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="thr" />
                  <CheckLabelInBox for="thr">
                    <SpanAbsolute />목
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="fri" />
                  <CheckLabelInBox for="fri">
                    <SpanAbsolute />금
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="sat" />
                  <CheckLabelInBox for="sat">
                    <SpanAbsolute />토
                  </CheckLabelInBox>
                </InBox>
              </WrapWeek>
            </BoxWeek>
            <BoxZindex>
              <Label>시간</Label>
              <WrapTime>
                <Time>
                  <DatePicker
                    className="date_time_mobile"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={Interval} //간격 설정
                    timeCaption="Time"
                    dateFormat="h:mm aa" // 시간 타입(보여주는)
                    minTime={setHours(setMinutes(new Date(), 0), 0)} //시작 시간 세팅
                    maxTime={setHours(setMinutes(new Date(), 0), 23)} // 종료 시간 세팅
                  />
                </Time>
                <Time>
                  <DatePicker
                    className="date_time_mobile"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={Interval} //간격 설정
                    timeCaption="Time"
                    dateFormat="h:mm aa" // 시간 타입(보여주는)
                    minTime={setHours(setMinutes(new Date(), 0), 0)} //시작 시간 세팅
                    maxTime={setHours(setMinutes(new Date(), 0), 23)} // 종료 시간 세팅
                  />
                </Time>
              </WrapTime>
            </BoxZindex>
            <Box>
              <Label>간격</Label>
              <SelectWd100 onChange={change}>
                <Option>30</Option>
                <Option>60</Option>
              </SelectWd100>
            </Box>
            <Confirm>
              <ConfirmBtn
                type="submit"
                active={active}
                onClick={() => {
                  SecendComfirmModal();
                }}
              >
                확인
              </ConfirmBtn>
            </Confirm>
          </VisitInfo>
        ) : (
          <VisitInfo style={{ opacity: 0.5 }}>
            <Box>
              <Label>기간</Label>
              <WrapDate>
                <InputDate type="date" placeholder="시작일" disabled />
                <InputDate type="date" placeholder="종료일" disabled />
              </WrapDate>
            </Box>
            <Box>
              <Label>공휴일 제외여부</Label>
              <InputCheck type="checkbox" id="holiday" disabled />
              <CheckLabel for="holiday">
                <Span />
                공휴일 제외
              </CheckLabel>
            </Box>
            <BoxWeek>
              <Label>요일</Label>
              <WrapWeek>
                <InBox>
                  <InputCheck type="checkbox" name="" id="sun" disabled />
                  <CheckLabelInBox for="sun">
                    <SpanAbsolute />일
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="mon" disabled />
                  <CheckLabelInBox for="mon">
                    <SpanAbsolute />월
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="tue" disabled />
                  <CheckLabelInBox for="tue">
                    <SpanAbsolute />화
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="wed" disabled />
                  <CheckLabelInBox for="wed">
                    <SpanAbsolute />수
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="thr" disabled />
                  <CheckLabelInBox for="thr">
                    <SpanAbsolute />목
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="fri" disabled />
                  <CheckLabelInBox for="fri">
                    <SpanAbsolute />금
                  </CheckLabelInBox>
                </InBox>
                <InBox>
                  <InputCheck type="checkbox" name="" id="sat" disabled />
                  <CheckLabelInBox for="sat">
                    <SpanAbsolute />토
                  </CheckLabelInBox>
                </InBox>
              </WrapWeek>
            </BoxWeek>
            <Box>
              <Label>시간</Label>
              <WrapTime>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={Interval} //간격 설정
                  timeCaption="Time"
                  dateFormat="h:mm aa" // 시간 타입(보여주는)
                  minTime={setHours(setMinutes(new Date(), 0), 0)} //시작 시간 세팅
                  maxTime={setHours(setMinutes(new Date(), 0), 23)} // 종료 시간 세팅
                />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={Interval} //간격 설정
                  timeCaption="Time"
                  dateFormat="h:mm aa" // 시간 타입(보여주는)
                  minTime={setHours(setMinutes(startDate, 0), startDate)} //시작 시간 세팅
                  maxTime={setHours(setMinutes(new Date(), 0), 22)} // 종료 시간 세팅
                />
              </WrapTime>
            </Box>
            <Box>
              <Label>간격</Label>
              <SelectWd100 disabled>
                <Option>30</Option>
                <Option>60</Option>
              </SelectWd100>
            </Box>
          </VisitInfo>
        )}
      </WrapVisit>
    </Container>
  );
}

const Pb = styled.b`
  display: block;
  @media ${(props) => props.theme.mobile} {
    display: inline;
  }
`;
const Mb = styled.b`
  display: inline;
  @media ${(props) => props.theme.mobile} {
    display: block;
  }
`;
const Container = styled.div`
  width: 680px;
  margin: 0 auto;
  padding: 24px 0 250px;
  @media ${(props) => props.theme.mobile} {
    width: calc(100vw * (380 / 428));
    padding: calc(100vw * (30 / 428)) 0 calc(100vw * (150 / 428));
  }
`;
const WrapVisit = styled.div`
  width: 100%;
`;
const TopTitle = styled.h2`
  font-size: 20px;
  color: #707070;
  text-align: left;
  padding-left: 30px;
  font-weight: 800;
  transform: skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size: calc(100vw * (14 / 428));
    padding-left: calc(100vw * (16 / 428));
  }
`;
const TopInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 40px;
  margin-top: 40px;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top: calc(100vw * (30 / 428));
    padding: calc(100vw * (22 / 428)) calc(100vw * (18 / 428));
  }
`;
const InputCheck = styled.input`
  display: none;
  &:checked + label span {
    background: url(${Checked}) no-repeat;
    background-size: 100% 100%;
  }
`;
const CheckLabel = styled.label`
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  transform: skew(-0.1deg);
  color: #4a4a4a;
  font-family: "NanumSquare", sans-serif;
  @media ${(props) => props.theme.mobile} {
    font-size: calc(100vw * (15 / 428));
  }
`;
const Span = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(${Check}) no-repeat;
  background-size: 100% 100%;
  margin-right: 10px;
  vertical-align: middle;
  @media ${(props) => props.theme.mobile} {
    width: calc(100vw * (20 / 428));
    height: calc(100vw * (20 / 428));
    margin-right: calc(100vw * (10 / 428));
  }
`;
const VisitInfo = styled.div`
  padding-top: 40px;
  width: 408px;
  margin: 0 auto;
  @media ${(props) => props.theme.mobile} {
    width: calc(100vw * (375 / 428));
    padding: calc(100vw * (40 / 428)) calc(100vw * (5 / 428)) 0;
    margin: 0 auto;
  }
`;
const Dates = styled.div`
  width:200px;text-align:center;position:relative;z-index:3;
  border-radius:4px;border:1px solid #e4e4e4;height:43px;
  font-size:15px;transform:skew(-0.1deg);line-height:43px;
  background:#fff;z-index:8;
  @media ${(props) => props.theme.modal} {
    width:100%;
    margin-bottom:calc(100vw*(15/428));
    height:calc(100vw*(43/428));line-height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
  }
`
const Box = styled.div`
  margin-bottom: 35px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom: calc(100vw * (35 / 428));
  }
`;
const Label = styled.label`
  display: block;
  font-size: 12px;
  color: #4a4a4a;
  font-weight: 600;
  transform: skew(-0.1deg);
  line-height: 1.33;
  margin-bottom: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: calc(100vw * (12 / 428));
    margin-bottom: calc(100vw * (10 / 428));
  }
`;
const WrapDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap:wrap;
`;
const InputDate = styled.input`
  display: inlnie-block;
  width: 195px;
  height: 43px;
  font-size: 15px;
  text-align: center;
  color: #707070;
  transform: skew(-0.1deg);
  font-weight: 600;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  @media ${(props) => props.theme.mobile} {
    width: calc(100vw * (170 / 428));
    height: calc(100vw * (43 / 428));
    font-size: calc(100vw * (15 / 428));
  }
`;
const BoxWeek = styled(Box)`
  padding: 0 3px 0 0;
  @media ${(props) => props.theme.mobile} {
    padding: 0 calc(100vw * (3 / 428)) 0 0;
  }
`;
const WrapWeek = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InBox = styled.div`
  position: relative;
`;
const CheckLabelInBox = styled(CheckLabel)`
  padding-top: 25px;
  @media ${(props) => props.theme.mobile} {
    padding-top: calc(100vw * (25 / 428));
  }
`;
const SpanAbsolute = styled(Span)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
`;
const WrapTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Select = styled.select`
  display: inlnie-block;
  width: 195px;
  height: 43px;
  font-size: 15px;
  text-align: center;
  color: #707070;
  transform: skew(-0.1deg);
  font-weight: 600;
  border-radius: 4px;
  text-align-last: center;
  border: solid 1px #e4e4e4;
  background: url(${ArrowDown}) no-repeat 90% center;
  background-size: 11px;
  appearance: none;
  @media ${(props) => props.theme.mobile} {
    width: calc(100vw * (170 / 428));
    height: calc(100vw * (43 / 428));
    font-size: calc(100vw * (15 / 428));
    background-size:calc(100vw*(11/428));
  }
`;
const Time = styled.div`
  position:relative;
  width: 195px;
  height: 43px;
  font-size: 15px;
  text-align: center;
  color: #707070;
  transform: skew(-0.1deg);
  font-weight: 600;
  @media ${(props) => props.theme.mobile} {
    width: calc(100vw * (170 / 428));
    height: calc(100vw * (43 / 428));
    font-size: calc(100vw * (15 / 428));
  }
`
const BoxZindex = styled(Box)`
  position:relative;z-index:2;
`
const Option = styled.option`
  font-size: 15px;
  text-align: center;
  font-family: "nbg", sans-serif;
  color: #707070;
  transform: skew(-0.1deg);
  font-weight: 600;
  @media ${(props) => props.theme.mobile} {
    font-size: calc(100vw * (15 / 428));
  }
`;
const SelectWd100 = styled(Select)`
  width: 100%;
  background: url(${ArrowDown}) no-repeat 90% center;
  background-size: 11px;
  @media ${(props) => props.theme.mobile} {
    background-size: calc(100vw * (11 / 428));
  }
`;
const Confirm = styled.div`
  width: 100%;
  margin-top: 60px;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: calc(100vw * (60 / 428));
  }
`;
const ConfirmBtn = styled.button`
  width: 100%;
  height: 66px;
  line-height: 60px;
  border-radius: 11px;
  transition: all 0.3s;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  transform: skew(-0.1deg);
  background: ${({ active }) => (active ? "#01684b" : "#979797")};
  border: ${({ active }) =>
    active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: calc(100vw * (60 / 428));
    line-height: calc(100vw * (54 / 428));
    font-size: calc(100vw * (15 / 428));
  }
`;
