//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import ArrowTop from '../../../../img/map/arrow_top.png';
import ArrowDown from '../../../../img/member/arrow_down.png';
import Enter from '../../../../img/member/enter.png';
import CheckImg from '../../../../img/map/radio.png';
import CheckedImg from '../../../../img/map/radio_chk.png';
import RadioImg from '../../../../img/map/radi.png';
import RadioChkImg from '../../../../img/map/radi_chk.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import SearchApartOfficetel from "./SearchApartOfficetel";
import SearchStoreOffice from "./SearchStoreOffice";
import SearchApartOfficetelSelectInfo from "./SearchApartOfficetelSelectInfo";
import ModalBrokerRequest from './modal/ModalBrokerRequest';

export default function Request({setFilter,value,type}) {
  const [activeIndex,setActiveIndex] = useState(-1);
  const [openMore, setOpenMore] = useState(false);
  const [viewInput, setViewInput] = useState(false);//관리비 있음일때 input박스 노출
  const [viewDate, setViewDate] = useState(false);//입주가능일 선택할 경우 date박스
  const [job, setJob] = useState(false);//현재업종 선택할 경우 box show/hide
  const [modalBroker,setModalBroker] = useState(false);

  const rotate=()=>{
    if(openMore == true) {
      return "rotate(180deg)"
    }else{
      return "rotate(0deg)"
    }
  }
    return (
        <Container>
          <WrapRequest>
            <TopTitle>기본정보 입력/수정</TopTitle>
            <WrapBox>
              <Box>
                <SubTitle>
                  <Title>전속정보</Title>
                  <Line/>
                </SubTitle>
                <TopDesc>
                  전속기간의 기산일은 전문중개사의 의뢰 수락 후<br/>
                  의뢰인의 거래 개시 승인일 다음날부터입니다.
                </TopDesc>
                <SelectBox>
                  <Label>전속기간<Pilsu>*</Pilsu></Label>
                  <Select>
                    <Option>기간 선택</Option>
                    <Option>00 개월</Option>
                  </Select>
                </SelectBox>
              </Box>
          {/*물건정보*/}
              <Box>
                <SubTitle>
                  <Title>물건정보</Title>
                  <Line/>
                </SubTitle>
                <WrapInputBox>
                  <InputBox>
                    <Label>물건종류</Label>
                    <InputDisabled type="text" value="물건종류(ex:아파트)" disabled/>
                  </InputBox>
                  <InputBox>
                    <Label>주소</Label>
                    <InputDisabled type="text" value="주소" disabled/>
                  </InputBox>
                  <InputBox>
                    <Label>상세<Pilsu>호수는 공개되지 않습니다.</Pilsu></Label>
                    <InputDisabled type="text" value="OO층 OO호" disabled/>
                  </InputBox>
                </WrapInputBox>
                <WrapItemInfo>
                  <LongLine/>
                  <InputBox>
                    <Label>건물명<Pilsu>*</Pilsu></Label>
                    <InputTxt type="text" placeholder="건물명을 입력하여주세요."/>
                  </InputBox>
          {/*!!!!!!현재 업종은 상가일때만 노출됩니다. display:none처리!!!!*/}
                  <InputBox style={{display:"none"}}>
                    <Label>현재업종<Pilsu>*</Pilsu></Label>
                    <SwitchButton>
                      <Switch type="checkbox" id="switch_job"/>
                      <SwitchLabel for="switch_job" onClick={()=>{setJob(!job)}}>
                        <SwitchSpan/>
                        <SwithTxtOff className="no">없음</SwithTxtOff>
                        <SwithTxtOn className="yes">있음</SwithTxtOn>
                      </SwitchLabel>
                    </SwitchButton>
                    {
                      job ?
                      <Flex>
                        <InputTxt type="text" placeholder="현재 업종 입력"/>
                      </Flex>
                      :
                      null
                    }
                  </InputBox>
                  <InputBox>
                    <Label>전용면적<Pilsu>*</Pilsu></Label>
                    <Widthbox>
                      <Inbox>
                        <InputShort type="text" placeholder="m² 선택 or 입력"/>
                        <Span>m²</Span>
                      </Inbox>
                      <Same>=</Same>
                      <Inbox>
                        <InputShort type="text" placeholder="m² 선택 or 입력"/>
                        <Span>평</Span>
                      </Inbox>
                    </Widthbox>
                  </InputBox>
                  <InputBox>
                    <Label>공급면적<Pilsu>*</Pilsu></Label>
                    <Widthbox>
                      <Inbox>
                        <InputShort type="text" placeholder="m² 선택 or 입력"/>
                        <Span>m²</Span>
                      </Inbox>
                      <Same>=</Same>
                      <Inbox>
                        <InputShort type="text" placeholder="m² 선택 or 입력"/>
                        <Span>평</Span>
                      </Inbox>
                    </Widthbox>
                  </InputBox>
                </WrapItemInfo>
              </Box>
          {/*거래정보*/}
              <Box>
                <SubTitle>
                  <Title>거래정보</Title>
                  <Line/>
                </SubTitle>
                <SelectBox>
                  <Label>거래유형<Pilsu>*</Pilsu></Label>
                  <SelectMb>
                    <Option>거래유형을 선택하여주세요.</Option>
                    <Option>매매</Option>
                    <Option>전세</Option>
                    <Option>월세</Option>
                  </SelectMb>
                </SelectBox>
                <InputBox>
                  <Label>가격<Pilsu>*</Pilsu></Label>
                  <Example>(e.g 1억 5,000)</Example>
                  <Flex>
                    <InputMidi type="text" placeholder="가격 입력"/>
                    <Dan>만원</Dan>
                  </Flex>
                </InputBox>
              </Box>
            {/*더보기*/}
              <WrapMoreView>
                <SubTitle onClick={()=>{setOpenMore(!openMore)}} style={{cursor:"pointer"}}>
                  <EnterImg src={Enter}/>
                  <Title>더보기</Title>
                  <ShortLine/>
                  <ArrowTopImg src={ArrowTop} rotate={rotate}/>
                </SubTitle>
              {
                openMore ?
                <MoreView>
                  <MoreBox>
                    <Label>관리비<Pilsu>*</Pilsu></Label>
                    <SwitchButton>
                      <Switch type="checkbox" id="switch"/>
                      <SwitchLabel for="switch" onClick={()=>{setViewInput(!viewInput)}}>
                        <SwitchSpan/>
                        <SwithTxtOff className="no">없음</SwithTxtOff>
                        <SwithTxtOn className="yes">있음</SwithTxtOn>
                      </SwitchLabel>
                    </SwitchButton>
                  {
                    viewInput ?
                    <Flex>
                      <InputMidi type="text" placeholder="가격 입력"/>
                      <Dan>만원</Dan>
                    </Flex>
                    :
                    null

                  }

                  </MoreBox>
                {/*관리비 포함*/}
                  <MoreBox>
                    <Label>관리비 포함<Pilsu>*</Pilsu></Label>
                    <WrapCheck>
                      <Checkbox>
                        <Check type="checkbox" id="check1" defaultChecked/>
                        <CheckLabel for="check1">
                          <CheckSpan/>
                          전기
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="check2"/>
                        <CheckLabel for="check2">
                          <CheckSpan/>
                          수도
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="check3"/>
                        <CheckLabel for="check3">
                          <CheckSpan/>
                          가스
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="check4"/>
                        <CheckLabel for="check4">
                          <CheckSpan/>
                          인터넷
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="check5"/>
                        <CheckLabel for="check5">
                          <CheckSpan/>
                          티비
                        </CheckLabel>
                      </Checkbox>
                    </WrapCheck>
                  </MoreBox>
              {/*입주가능일*/}
                  <MoreBox>
                    <Label>입주가능일<Pilsu>*</Pilsu></Label>
                    <WrapCheck>
                      <Radiobox>
                        <Radio type="radio" name="possible" id="radi1" defaultChecked/>
                        <RadioLabel for="radi1" onClick={()=>{setViewDate(false)}}>
                          <RadioSpan/>
                          즉시
                        </RadioLabel>
                      </Radiobox>
                      <Radiobox>
                        <Radio type="radio" name="possible" id="radi2"/>
                        <RadioLabel for="radi2" onClick={()=>{setViewDate(true)}}>
                          <RadioSpan/>
                          날짜 선택
                        </RadioLabel>
                      {
                        viewDate ?
                        <InputDate type="date"/>
                        :
                        null
                      }
                      </Radiobox>
                    </WrapCheck>
                  </MoreBox>

                </MoreView>
                :
                null

              }

              </WrapMoreView>
            </WrapBox>
      {/*!!!!다음 버튼 , 조건문 맞춰서 액티브 됐을때 색상 바뀌어야함..!!!! */}
            <NextButton>
              <Link onClick={()=>{setModalBroker(true)}}>
                <Next type="button">다음</Next>
              </Link>
            </NextButton>

            {
              modalBroker ?
              <ModalBrokerRequest modalBroker={modalBroker} setModalBroker={setModalBroker}/>
              :
              null

            }
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
  margin-bottom:40px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const WrapBox = styled.div`
  width:408px;margin:0 auto;
`
const Box = styled.div`
  width:100%;
  margin-bottom:55px;
`
const SubTitle = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  margin-bottom:40px;
`
const Title = styled.h2`
  font-size:15px;color:#4e4e4e;
  font-weight:800;transform:skew(-0.1deg);
  margin-right:7px;
`
const Line = styled.div`
  width:340px;height:1px;
  background:#cecece;
`
const TopDesc = styled.div`
    padding:0 0 35px;
    font-size:15px;color:#4a4a4a;
    font-weight:600;transform:skew(-0.1deg);
    line-height:1.33;text-align:center;
`
const SelectBox = styled.div`
  width:100%;
`
const Label = styled.label`
  display:block;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);color:#4a4a4a;
  margin-bottom:10px;
`
const Pilsu = styled.span`
  display:inline-block;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);color:#fe7a01;
  vertical-align:middle;
  margin-left:5px;
`
const Select = styled.select`
  width:100%;height:43px;
  font-weight:600;transform:skew(-0.1deg);
  margin-right:7px;
  text-align-last:center;
  border: solid 1px #e4e4e4;
  border-radius:4px;
  appearance:none;color:#707070;
  font-size:15px;transform:Skew(-0.1deg);
  background:url(${ArrowDown}) no-repeat 380px center;background-size:11px;
`
const SelectMb = styled(Select)`
  margin-bottom:30px;
`
const Option = styled.option`
`
const WrapInputBox = styled.div`
  width:100%;
`
const InputBox = styled.div`
  position:relative;
  margin-bottom:14px;
  &:last-child{margin-bottom:0;}
`
const InputDisabled = styled.input`
  width:100%;height:43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #fbfbfb;
  color:#979797;
  font-size:15px;font-weight:500;
  text-align:center;
  transform:skew(-0.1deg);
`
const InputTxt= styled.input`
  width:100%;
  height:43px;
  text-align:center;
  background:transparent;
  font-size:15px;color:#4a4a4a;
  transform:skew(-0.1deg);
  border-radius: 4px;font-weight:600;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  &::placeholder{color:#979797;}
`
const WrapItemInfo = styled.div`
`

const Widthbox = styled.div`
  width:100%;display:flex;justify-content:space-between;
  align-items:center;
`
const Inbox = styled.div`
  display:flex;justify-content:center;
  align-items:center;
  width: 177px;
  height: 43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
`
const InputShort = styled.input`
  width:70%;
  height:100%;
  text-align:center;
  background:transparent;font-weight:600;
  font-size:15px;color:#4a4a4a;
  transform:skew(-0.1deg);
  &::placeholder{color:#979797}
`
const Span = styled.span`
  vertical-align:middle;
  font-size:15px;font-weight:600;
  color:#4a4a4a;transform:skew(-0.1deg);
  margin-left:10px;
`
const Same = styled.span`
  font-size:15px;font-weight:600;
  color:#4a4a4a;transform:skew(-0.1deg);
  vertical-align:middle;
`
const LongLine = styled.div`
  width:100%;height:1px;
  background:#cecece;
  margin:26px 0 40px;
`
const Example = styled.p`
  position:absolute;right:0;
  top:0;
  font-size:12px;transform:skew(-0.1deg);
  color:#4a4a4a;
`
const Flex = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`
const InputMidi = styled.input`
  width: 353px;
  height: 43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  font-size:15px;color:#4a4a4a;
  font-weight:600;
  transform:skew(-0.1deg);text-align:center;
  &::placeholder{color:#979797}
`
const Dan = styled.p`
  font-size:15px;color:#4a4a4a;
  transform:skew(-0.1deg);
`
const WrapMoreView = styled.div`
  width:100%;
  margin-top:50px;
`
const EnterImg = styled.img`
  display:inline-block;
  width:19px;
  margin-right:27px;
  margin-top:-13px;
`
const ShortLine = styled(Line)`
  width:250px;
`
const ArrowTopImg = styled.img`
  display:inline-block;
  width:26px;
  cursor:pointer;
  transition:all 0.3s;
  transform:${({rotate}) => rotate};
`
const MoreView = styled.div`
  transition:all 0.3s;
`
const MoreBox = styled.div`
  margin-top:30px;
`
const SwitchButton = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;
  margin-top:20px;
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(20/428));
  }
`
const Switch = styled.input`
  display:none;
  &:checked+label{background:#009053}
  &:checked+label span{left:22px;}
  &:checked+label .no{opacity:0;}
  &:checked+label .yes{opacity:1;}
  @media ${(props) => props.theme.mobile} {
    &:checked+label span{left:calc(100vw*(24/428));}
  }
`
const SwitchLabel = styled.label`
  position:relative;display:inline-block;
  width:41px;
  height:15px;background:#e4e4e4;
  border-radius: 18px;
  border: solid 1px #d6d6d6;
  transition:all 0.3s;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(41/428));
    height:calc(100vw*(15/428));
  }
`
const SwithTxtOff = styled.p`
  position:absolute;
  width:100px;
  display:inline-block;
  left:50px;top:-3px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: normal;
  text-align: left;
  color: #4a4a4a;
  opacity:1;
  transition:all 0.3s;
  @media ${(props) => props.theme.mobile} {
  }
`
const SwithTxtOn = styled(SwithTxtOff)`
  opacity:0;
`
const SwitchSpan = styled.span`
  position:absolute;left:-1px;top:50%;transform:translateY(-50%);
  width:18px;height:18px;border-radius:100%;
  border: solid 1px #888888;
  background-color: #ffffff;
  transition:all 0.3s;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
    height:calc(100vw*(18/428));
  }
`
const Sub = styled.span`
  display:inline-block;font-size:15px;
  font-weight:normal;transform:skew(-0.1deg);color:#4a4a4a;
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-left:calc(100vw*(10/428));
  }
`
const WrapCheck = styled.div`
  display:flex;justify-content:felx-start;align-items:center;
  flex-wrap:wrap;margin-top:20px;
`
const Checkbox = styled.div`
  width:33%;
  margin-bottom:20px;
`
const Check = styled.input`
  display:none;
  &:checked+label span{background:url(${CheckedImg}) no-repeat; background-size:100% 100%;}
`
const CheckLabel = styled.label`
  font-size:15px;
  transform:skew(-0.1deg);color:#4a4a4a;
`
const CheckSpan = styled.span`
  display:inline-block;width:20px;height:20px;
  background:url(${CheckImg}) no-repeat; background-size:100% 100%;
  margin-right:8px;
`
const Radiobox = styled.div`
  width:100%;
  margin-bottom:20px;
`
const RadioboxJob = styled.div`
  width:65px;
  margin-bottom:0;

`
const Radio = styled.input`
  display:none;
  &:checked+label span{background:url(${RadioChkImg}) no-repeat; background-size:100% 100%;}
`
const RadioLabel = styled.label`
  font-size:15px;
  transform:skew(-0.1deg);color:#4a4a4a;
`
const RadioSpan = styled.span`
  display:inline-block;width:20px;height:20px;
  background:url(${RadioImg}) no-repeat; background-size:100% 100%;
  margin-right:8px;
`
const InputDate = styled(InputTxt)`
  margin-top:20px;
`
const NextButton = styled.div`
  width:100%;text-align:center;
  margin-top:70px;
`
const Next = styled.button`
  display:inline-block;
  width:408px;
  height: 66px;
  line-height: 60px;
  font-size:20px;font-weight:800;color:#fff;
  transform:skew(-0.1deg);text-align:center;
  border-radius: 11px;
  border: solid 3px #e4e4e4;
  background-color: #979797;
  /* 액티브 됐을때

  border: solid 3px #04966d;
  background-color: #01684b; */
`
