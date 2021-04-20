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
import Picture from '../../../../img/member/picture.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import SearchApartOfficetel from "./SearchApartOfficetel";
import SearchStoreOffice from "./SearchStoreOffice";
import SearchApartOfficetelSelectInfo from "./SearchApartOfficetelSelectInfo";
import ModalBrokerRequest from './modal/ModalBrokerRequest';

export default function Request({setPicture}) {
  const [activeIndex,setActiveIndex] = useState(-1);
  const [openMore, setOpenMore] = useState(false);
  const [park,setPark] = useState(false);

  const rotate=()=>{
    if(openMore == true) {
      return "rotate(180deg)"
    }else{
      return "rotate(0deg)"
    }
  }

  const OptionInside =[
  {oi_id : 0,label:"침대",default:true},
  {oi_id : 1,label:"붙박이장",default:false},
  {oi_id : 2,label:"옷장",default:false},
  {oi_id : 3,label:"신발장",default:false},
  {oi_id : 4,label:"싱크대",default:false},
  {oi_id : 5,label:"가스레인지",default:false},
  {oi_id : 6,label:"인덕션",default:false},
  {oi_id : 7,label:"냉장고",default:false},
  {oi_id : 8,label:"세탁기",default:false},
  {oi_id : 9,label:"샤워부스",default:false},
  {oi_id : 10,label:"비데",default:false},
  {oi_id : 11,label:"벽걸이에어컨",default:false},
  {oi_id : 12,label:"스탠드에어컨",default:false},
  {oi_id : 13,label:"천장에어컨",default:false}
]
const OptionProtect =[
  {op_id : 0,label:"CCTV",default:true},
  {op_id : 1,label:"경비원",default:false},
  {op_id : 2,label:"사설경비",default:false},
  {op_id : 3,label:"현관보안",default:false},
  {op_id : 4,label:"방범창",default:false},
  {op_id : 5,label:"비디오폰",default:false},
  {op_id : 6,label:"인터폰",default:false},
  {op_id : 7,label:"카드키",default:false},
  {op_id : 8,label:"화재경보기",default:false},
  {op_id : 9,label:"무인택배함",default:false}
]

    return (
        <Container>
          <WrapRequest>
            <TopTitle>추가정보 입력/수정</TopTitle>
            <WrapBox>
              <Box>
                <SubTitle>
                  <Title>물건정보</Title>
                  <Line/>
                </SubTitle>
                <InputBox>
                  <Label>방수/욕실수<Pilsu>*</Pilsu></Label>
                  <Widthbox>
                    <InboxRoom>
                      <InputRoom type="text" placeholder="방수 입력"/>
                    </InboxRoom>
                    <SpanRoom>개</SpanRoom>
                    <InboxRoom>
                      <InputRoom type="text" placeholder="욕실수 입력"/>
                    </InboxRoom>
                    <SpanRoom>개</SpanRoom>
                  </Widthbox>
                </InputBox>
            {/*오피스텔일때 복층여부~반려동물 추가*/}
                <MoreBox>
                  <Label>복층여부<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="floor" id="floor1" defaultChecked/>
                      <RadioLabel for="floor1">
                        <RadioSpan/>
                        단층
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="floor" id="floor2"/>
                      <RadioLabel for="floor2">
                        <RadioSpan/>
                        복층
                      </RadioLabel>
                    </Radiobox>
                  </WrapCheck>
                </MoreBox>
                <MoreBox>
                  <Label>주차<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="parking" id="park1" defaultChecked/>
                      <RadioLabel for="park1" onClick={()=>{setPark(false)}}>
                        <RadioSpan/>
                        불가
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="parking" id="park2"/>
                      <RadioLabel for="park2" onClick={()=>{setPark(true)}}>
                        <RadioSpan/>
                        가능
                      </RadioLabel>
                    </Radiobox>
                    {
                      park ?
                      <InputPark type="text" placeholder="(e.g 1대 가능)"/>
                      :
                      null
                    }
                  </WrapCheck>
                </MoreBox>
                <MoreBox>
                  <Label>엘리베이터<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="elevate" id="elevate1" defaultChecked/>
                      <RadioLabel for="elevate1">
                        <RadioSpan/>
                        없음
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="elevate" id="elevate2"/>
                      <RadioLabel for="elevate2">
                        <RadioSpan/>
                        있음
                      </RadioLabel>
                    </Radiobox>
                  </WrapCheck>
                </MoreBox>
                <MoreBox>
                  <Label>반려동물<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="pet" id="pet1" defaultChecked/>
                      <RadioLabel for="pet1">
                        <RadioSpan/>
                        불가
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="pet" id="pet2"/>
                      <RadioLabel for="pet2">
                        <RadioSpan/>
                        가능
                      </RadioLabel>
                    </Radiobox>
                  </WrapCheck>
                </MoreBox>


                <InputBox>
                  <Label>사진<Pilsu>*</Pilsu></Label>
                  <Widthbox>
                    <InputFileLabel for="picture" onClick={()=>{setPicture(true)}}>사진 추가</InputFileLabel>
                  </Widthbox>
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
                  <SelectBox>
                    <Label>방향</Label>
                    <SelectMb>
                      <Option>방향을 선택하여주세요.</Option>
                      <Option>남향</Option>
                      <Option>남동향</Option>
                    </SelectMb>
                  </SelectBox>
                  {/*현관구조*/}
                  <SelectBox>
                    <Label>현관구조</Label>
                    <SelectMb>
                      <Option>현관구조를 선택하여주세요.</Option>
                      <Option>복도식</Option>
                      <Option>계단식</Option>
                    </SelectMb>
                  </SelectBox>
                  {/*현관구조*/}
                  <SelectBox>
                    <Labelblock>난방</Labelblock>
                    <SelectMbShort>
                      <Option>방식 선택</Option>
                      <Option>개별난방</Option>
                      <Option>중앙난방</Option>
                    </SelectMbShort>
                    <SelectMbShort>
                      <Option>연료 선택</Option>
                      <Option>도시가스</Option>
                      <Option>LPG</Option>
                    </SelectMbShort>
                  </SelectBox>
                {/*아파트일때 옵션(공간)*/}
                  <MoreBox style={{display:"none"}}>
                    <Label>옵션(공간)</Label>
                    <WrapCheck>
                      <Checkbox>
                        <Check type="checkbox" id="option1" defaultChecked/>
                        <CheckLabel for="option1">
                          <CheckSpan/>
                          발코니
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="option2"/>
                        <CheckLabel for="option2">
                          <CheckSpan/>
                          베란다
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="option3"/>
                        <CheckLabel for="option3">
                          <CheckSpan/>
                          테라스
                        </CheckLabel>
                      </Checkbox>
                    </WrapCheck>
                  </MoreBox>

              {/*오피스텔,상가,사무실일때 옵션*/}
                  <MoreBox>
                    <TopOptionTxt>옵션</TopOptionTxt>
                    <Label>내부</Label>
                    <WrapCheck>
                    {
                      OptionInside.map((value) => {
                        return(
                          <Checkbox>
                            <Check type="checkbox" id={"option1"+value.oi_id} defaultChecked={value.default ? true:false}/>
                            <CheckLabel for={"option1"+value.oi_id}>
                              <CheckSpan/>
                              {value.label}
                            </CheckLabel>
                          </Checkbox>
                        )}
                      )}
                    </WrapCheck>
                  </MoreBox>
                  <MoreBox>
                    <Label>보안</Label>
                    <WrapCheck>
                    {
                      OptionProtect.map((value) => {
                        return(
                          <Checkbox>
                            <Check type="checkbox" id={"option2"+value.op_id} defaultChecked={value.default ? true:false}/>
                            <CheckLabel for={"option2"+value.op_id}>
                              <CheckSpan/>
                              {value.label}
                            </CheckLabel>
                          </Checkbox>
                        )}
                      )}
                    </WrapCheck>
                  </MoreBox>
                  <MoreBox>
                    <Label>공간</Label>
                    <WrapCheck>
                      <Checkbox>
                        <Check type="checkbox" id="option2"/>
                        <CheckLabel for="option2">
                          <CheckSpan/>
                          베란다
                        </CheckLabel>
                      </Checkbox>
                      <Checkbox>
                        <Check type="checkbox" id="option3"/>
                        <CheckLabel for="option3">
                          <CheckSpan/>
                          테라스
                        </CheckLabel>
                      </Checkbox>
                    </WrapCheck>
                  </MoreBox>
                </MoreView>
                :
                null

              }
              </WrapMoreView>
              <Box>
                <SubTitle>
                  <Title>거래정보</Title>
                  <Line/>
                </SubTitle>
                <MoreBox>
                  <Label>계약갱신권 행사여부<Pilsu>*</Pilsu></Label>
                  <WrapCheck>
                    <Radiobox>
                      <Radio type="radio" name="possible" id="radi1" defaultChecked/>
                      <RadioLabel for="radi1">
                        <RadioSpan/>
                        미확인
                      </RadioLabel>
                    </Radiobox>
                    <Radiobox>
                      <Radio type="radio" name="possible" id="radi2"/>
                      <RadioLabel for="radi2">
                        <RadioSpan/>
                        확인
                      </RadioLabel>
                    </Radiobox>
                  </WrapCheck>
                </MoreBox>
                <InputBox>
                  <Label>융자금</Label>
                  <Example>(e.g 1억 5,000)</Example>
                  <Flex>
                    <InputMidi type="text" placeholder="가격 입력"/>
                    <Dan>만원</Dan>
                  </Flex>
                </InputBox>
                <InputBox>
                  <Label>기보증금 / 월세</Label>
                  <Example>(e.g 1억 5,000)</Example>
                  <Flex>
                    <InputMidi type="text" placeholder="가격 입력"/>
                    <Dan>만원</Dan>
                  </Flex>
                </InputBox>
                <InputBox>
                  <Label>설명</Label>
                  <InputTxt type="text" placeholder="매물 요약 입력"/>
                  <Textarea type="textarea" placeholder="매물 설명 입력"/>
                </InputBox>
              </Box>
            </WrapBox>
      {/*!!!!다음 버튼 , 조건문 맞춰서 액티브 됐을때 색상 바뀌어야함..!!!! */}
            <NextButton>
              <Link>
                <Next type="button">확인</Next>
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
const SelectBox = styled.div`
  width:100%;
  display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;
`
const Label = styled.label`
  display:inline-block;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);color:#4a4a4a;
  margin-bottom:10px;
`
const Labelblock = styled(Label)`
  display:block;width:100%;
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
  text-align-last:center;
  border: solid 1px #e4e4e4;
  border-radius:4px;
  appearance:none;color:#707070;
  font-size:15px;transform:Skew(-0.1deg);
  background:url(${ArrowDown}) no-repeat 92% center;background-size:11px;
`
const SelectMb = styled(Select)`
  margin-bottom:30px;
`
const SelectMbShort = styled(Select)`
  width:190px;margin-bottom:30px;
`
const Option = styled.option`
 transform:skew(-0.1deg);
 font-family:'nbg',sans-serif;
`
const WrapInputBox = styled.div`
  width:100%;
`
const InputBox = styled.div`
  position:relative;
  margin-bottom:25px;
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
const Textarea = styled.textarea`
  width:100%;height:220px;
  resize:none;border:1px solid #e4e4e4;
  border-radius:4px;padding:15px;
  font-size:15px; transform:skeW(-0.1deg);
  color:#4a4a4a;margin-top:10px;

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
const InboxRoom = styled(Inbox)`
  width:150px;
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
const Part = styled.div`
  display:inline-block;
  margin:0 9px;
`
const InputRoom = styled(InputShort)`
  width:100%
`
const InputFileLabel = styled.label`
  width:100%;height:43px;border-radius:4px;
  border:1px solid #e4e4e4;cursor:pointer;
  text-align:center;vertical-align:middle;line-height:43px;
  font-size:15px;color:#707070;transform:skew(-0.1deg);
  background:url(${Picture}) no-repeat 95% center; background-size:21px;
`

const Span = styled.span`
  vertical-align:middle;
  font-size:15px;font-weight:600;
  color:#4a4a4a;transform:skew(-0.1deg);
  margin-left:10px;
`
const SpanRoom =styled(Span)`
  color:#707070;
  margin-left:0;
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
  display:inline-block;
  font-size:12px;transform:skew(-0.1deg);
  color:#4a4a4a;margin-left:5px;
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
  padding-bottom:25px;
`
const MoreBox = styled.div`

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
  flex-wrap:wrap;margin-top:10px;
  margin-bottom:30px;
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
  font-size:15px;font-family:'nbg',sans-serif;
  transform:skew(-0.1deg);color:#4a4a4a;
`
const CheckSpan = styled.span`
  display:inline-block;width:20px;height:20px;
  background:url(${CheckImg}) no-repeat; background-size:100% 100%;
  margin-right:8px;
`
const Radiobox = styled.div`
  margin-right:30px;
  &:last-child{margin-right:0;}
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
  font-size:15px;font-family:'nbg',sans-serif;
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
const InputPark = styled(InputTxt)`
  width:183px;
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
const TopOptionTxt = styled.div`
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  margin-bottom:30px;
`
