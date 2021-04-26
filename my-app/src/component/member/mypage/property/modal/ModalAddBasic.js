//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import ArrowDown from '../../../../../img/member/arrow_down.png';
import Check from '../../../../../img/map/radio.png';
import Checked from '../../../../../img/map/radio_chk.png';

//필터 모달
export default function AddBasic({addBasic}) {

  //Add 모달창
    return (
        <Container>
            <WrapAddSelect>
              <BoxWeek>
                <Label>요일</Label>
                <WrapWeek>
                  <InBox>
                    <InputCheck type="checkbox" name="" id="sun"/>
                    <CheckLabelPt for="sun">
                      <SpanAbsolute/>
                      일
                    </CheckLabelPt>
                  </InBox>
                  <InBox>
                    <InputCheck type="checkbox" name="" id="mon"/>
                    <CheckLabelPt for="mon">
                      <SpanAbsolute/>
                      월
                    </CheckLabelPt>
                  </InBox>
                  <InBox>
                    <InputCheck type="checkbox" name="" id="tue"/>
                    <CheckLabelPt for="tue">
                      <SpanAbsolute/>
                      화
                    </CheckLabelPt>
                  </InBox>
                  <InBox>
                    <InputCheck type="checkbox" name="" id="wed"/>
                    <CheckLabelPt for="wed">
                      <SpanAbsolute/>
                      수
                    </CheckLabelPt>
                  </InBox>
                  <InBox>
                    <InputCheck type="checkbox" name="" id="thr"/>
                    <CheckLabelPt for="thr">
                      <SpanAbsolute/>
                      목
                    </CheckLabelPt>
                  </InBox>
                  <InBox>
                    <InputCheck type="checkbox" name="" id="fri"/>
                    <CheckLabelPt for="fri">
                      <SpanAbsolute/>
                      금
                    </CheckLabelPt>
                  </InBox>
                  <InBox>
                    <InputCheck type="checkbox" name="" id="sat"/>
                    <CheckLabelPt for="sat">
                      <SpanAbsolute/>
                      토
                    </CheckLabelPt>
                  </InBox>
                </WrapWeek>
              </BoxWeek>
              {/*상태 select*/}
                <AddBox>
                  <Label>시간</Label>
                  <AddSelectCondition>
                    <LineBox>
                      <InputCheck type="checkbox" name="" id="time1"/>
                      <CheckLabelInBox for="time1">
                        <Span/>
                        오전 1T
                      </CheckLabelInBox>
                    </LineBox>
                    <LineBox>
                      <InputCheck type="checkbox" name="" id="time2"/>
                      <CheckLabelInBox for="time2">
                        <Span/>
                        오후 1T
                      </CheckLabelInBox>
                    </LineBox>
                    <LineBox>
                      <InputCheck type="checkbox" name="" id="time3"/>
                      <CheckLabelInBox for="time3">
                        <Span/>
                        오후 2T
                      </CheckLabelInBox>
                    </LineBox>
                  </AddSelectCondition>
                </AddBox>
            {/*선택항목수 select*/}
                <AddBox>
                  <Label>선택 항목수(일자)</Label>
                  <AddSelectCondition>
                    <AddSelectConditionList>
                      <InOption selected disabled>갯수 선택</InOption>
                      <InOption>-</InOption>
                      <InOption>-</InOption>
                      <InOption>-</InOption>
                    </AddSelectConditionList>
                  </AddSelectCondition>
                </AddBox>
            {/*수임방식 select*/}
            <AddBox>
                  <Label>공휴일 제외여부</Label>
                  <AddSelectCondition>
                    <LineBox>
                      <InputCheck type="checkbox" name="" id="hday"/>
                      <CheckLabelInBox for="hday">
                        <Span/>
                        공휴일 제외
                      </CheckLabelInBox>
                    </LineBox>
                  </AddSelectCondition>
                </AddBox>
              </WrapAddSelect>

        </Container>
  );
}

const Container = styled.div`
`
const WrapAddSelect = styled.div`
  width:100%;
  margin-bottom:40px;
    padding:0 20px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(40/428));
    padding:0 calc(100vw*(15/428));
  }
`
const AddBox = styled.div`
  position:relative;
  width:100%;
  margin-bottom:30px;

  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(20/428));
  }
`
const AddLabel = styled.label`
display:inline-block;
  font-size:12px;color:#4a4a4a;
  transform:skew(-0.1deg);
  font-family:'nbg', sans-serif;
  margin-bottom:9px;
  padding-left:3px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(9/428));
    font-size:calc(100vw*(12/428));
    padding-left:calc(100vw*(3/428));
  }
`
const AddSelectSort = styled.div`
  width:100%;
`
const AddSelectCondition = styled(AddSelectSort)`
  z-index:99;
`
const LineBox = styled.div`
  width:100%;
  margin-bottom:20px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(20/428));
  }
`
const AddSelectSortList = styled.select`
  width:100%;
  height:43px;
  text-align-last:center;
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  border-radius:4px;border:1px solid #a3a3a3;
  background:#fff;
  appearance:none;
  background:url(${ArrowDown}) no-repeat 92% center;background-size:11px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(14/428));
    height:calc(100vw*(43/428));
    background-size:calc(100vw*(11/428));
  }
`
const Option = styled.option`
  font-family:'nbg',sans-serif;

`
const InOption = styled(Option)`
  padding:8px 0;
  background:#fff;
  &:hover{background:#f8f7f7;}
  @media ${(props) => props.theme.modal} {
    padding:calc(100vw*(8/428)) 0;
  }
`
const AddSelectConditionList = styled(AddSelectSortList)`
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
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(180/428));
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
const InputCheck = styled.input`
  display:none;
  &:checked+label span{background:url(${Checked}) no-repeat;background-size:100% 100%;}
`
const CheckLabel = styled.label`
  display:inline-block;
  font-size:15px;font-weight:600;transform:skew(-0.1deg);
  color:#4a4a4a;
  font-family:'NanumSquare', sans-serif;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
  }
`
const BoxWeek = styled.div`
  margin-bottom:30px;  
  padding:0 3px 0 0;
  @media ${(props) => props.theme.modal} {
    padding:0 calc(100vw*(3/428)) 0 0;
    margin-bottom:calc(100vw*(35/428));
  }
`
const WrapWeek = styled.div`
  width:100%;
  display:flex;justify-content:space-between;align-items:center;
`
const InBox = styled.div`
  position:relative;
`
const CheckLabelInBox = styled(CheckLabel)`
`
const CheckLabelPt = styled(CheckLabelInBox)`
  padding-top:25px;
  @media ${(props) => props.theme.modal} {
    padding-top:calc(100vw*(25/428));
  }
`
const Span = styled.span`
  display:inline-block;
  width:20px;height:20px;
  background:url(${Check}) no-repeat;background-size:100% 100%;
  margin-right:10px;
  vertical-align:middle;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));
    margin-right:calc(100vw*(10/428));
  }
`
const SpanAbsolute = styled(Span)`
  position:absolute;
  left:50%;transform:translateX(-50%);
  top:0;
`

const Label = styled.label`
  display:block;
  font-size:12px;color:#4a4a4a;
  font-weight:600;transform:skew(-0.1deg);
  line-height:1.33;margin-bottom:10px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(10/428));
  }
`