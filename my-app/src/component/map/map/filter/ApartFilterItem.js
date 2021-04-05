//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//img
import Radio from '../../../../img/map/radi.png';
import RadioChk from '../../../../img/map/radi_chk.png';
import Check from '../../../../img/map/radio.png';
import Checked from '../../../../img/map/radio_chk.png';
import ArrowTop from '../../../../img/map/arrow_top.png';

// components
import { Mobile, PC } from "../../../../MediaQuery";
export default function ApartFilter() {
    const [open, setOpen] = useState(false);
    const showOpen =()=>{
      setOpen(!open);
    }
    return (
        <Container>
        {/*물건상세*/}
            <DetailOption>
              <DetailTopBox onClick={showOpen}>
                <DetailTitle>물건상세</DetailTitle>
                <Line/>
                <ArrowImg src={ArrowTop}/>
              </DetailTopBox>

              {
                open ?
                        <SubDepth>
                          <BoxNoneBorder>
                            <SubTitle>방수</SubTitle>
                            <WrapFilter>
                              <WrapRadio>
                                <RadioBox>
                                  <InputR type="radio" name="room" id="room1" defaultChecked/>
                                  <LabelR for="room1">
                                    <SpanR/>
                                    전체
                                  </LabelR>
                                </RadioBox>
                                <RadioBox>
                                  <InputR type="radio" name="room" id="room2"/>
                                  <LabelR for="room2">
                                    <SpanR/>
                                    1개
                                  </LabelR>
                                </RadioBox>
                                <RadioBox>
                                  <InputR type="radio" name="room" id="room3"/>
                                  <LabelR for="room3">
                                    <SpanR/>
                                    2개
                                  </LabelR>
                                </RadioBox>
                                <RadioBox>
                                  <InputR type="radio" name="room" id="room4"/>
                                  <LabelR for="room4">
                                    <SpanR/>
                                    3개
                                  </LabelR>
                                </RadioBox>
                                <RadioBox>
                                  <InputR type="radio" name="room" id="room5"/>
                                  <LabelR for="room5">
                                    <SpanR/>
                                    4개이상
                                  </LabelR>
                                </RadioBox>
                              </WrapRadio>
                            </WrapFilter>
                          </BoxNoneBorder>
                          <Box>
                            <SubTitle>욕실수</SubTitle>
                            <WrapFilter>
                              <WrapRadio>
                                <RadioBox>
                                  <InputR type="radio" name="bath" id="bath1" defaultChecked/>
                                  <LabelR for="bath1">
                                    <SpanR/>
                                    전체
                                  </LabelR>
                                </RadioBox>
                                <RadioBox>
                                  <InputR type="radio" name="bath" id="bath2"/>
                                  <LabelR for="bath2">
                                    <SpanR/>
                                    1개
                                  </LabelR>
                                </RadioBox>
                                <RadioBox>
                                  <InputR type="radio" name="bath" id="bath3"/>
                                  <LabelR for="bath3">
                                    <SpanR/>
                                    2개이상
                                  </LabelR>
                                </RadioBox>
                                <RadioBox>
                                  <InputR type="radio" name="bath" id="bath4"/>
                                  <LabelR for="bath4">
                                    <SpanR/>
                                    3개이상
                                  </LabelR>
                                </RadioBox>
                              </WrapRadio>
                            </WrapFilter>
                          </Box>
                      {/*옵션*/}
                          <Box>
                            <SubTitle>옵션</SubTitle>
                            <WrapFilter>
                              <WrapRadio>
                                <RadioBox>
                                  <InputC type="checkbox" name="option" id="option1"/>
                                  <LabelC for="option1">
                                    <SpanC/>
                                    발코니
                                  </LabelC>
                                </RadioBox>
                                <RadioBox>
                                  <InputC type="checkbox" name="option" id="option2"/>
                                  <LabelC for="option2">
                                    <SpanC/>
                                    베란다
                                  </LabelC>
                                </RadioBox>
                                <RadioBox>
                                  <InputC type="checkbox" name="option" id="option3"/>
                                  <LabelC for="option3">
                                    <SpanC/>
                                    테라스
                                  </LabelC>
                                </RadioBox>
                              </WrapRadio>
                            </WrapFilter>
                          </Box>
                        </SubDepth>
                :
                null

              }

            </DetailOption>{/*물건상세 끝*/}
        </Container>
  );
}

const Container = styled.div`
`
const WrapApart = styled.div`
  width:100%;
`
const Box = styled.div`
  width:100%;
  padding:22px 17px;
  border-top:1px solid #f2f2f2;
`
const BoxNoneBorder = styled(Box)`
  border-top:none;
  padding-top:0;
`
const SubTitle = styled.h5`
  font-size:12px;
  color:#4a4a4a;transform:skew(-0.1deg);
  margin-bottom:13px;
`
const WrapFilter = styled.div`
  width:100%;
`
const PriceView = styled.div`
  width:100%;
  font-size:15px;font-weight:800;transform:skew(-0.1deg);
  color:#01684b;
  margin-bottom:20px;
`
const WrapRange = styled.div`
  width:100%;
  position:relative;
`
const LeftRange = styled.div`
  position:absolute;
  left:0;top:-20%;
  width:19px;height:19px;border-radius:100%;
  border: solid 2px #01684b;
  background-color: #ffffff;
  z-index:3;cursor:pointer;
`
const RightRange = styled.div`
  position:absolute;
  right:0;top:-20%;
  width:19px;height:19px;border-radius:100%;
  border: solid 2px #01684b;
  background-color: #ffffff;
  z-index:3;cursor:pointer;
`
const GreenBar = styled.div`
  position:absolute;z-index:2;
  left:50%;top:0;
  transform:translateX(-50%);
  width:100%;
  margin:0 auto;
  height:3px;
  background:#01684b;
  border-radius:6px;
`
const GreenBar2 = styled(GreenBar)`
  width:50%;
  left:15%;
  transform:translateX(0);
`
const LeftRange2 = styled(LeftRange)`
  left:15%;
`
const RightRange2 = styled(RightRange)`
  right:35%;
`
const GrayBar = styled(GreenBar)`
  background:#e4e4e4;
  width:100%;
  z-index:1;
`
const BottomBar = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding-top:25px;
`
const BarTxt = styled.p`
  position:relative;
  font-size:14px;color:#979797;
  font-weight:600;transform:skew(-0.1deg);
  &:before{position:absolute;content:'';display:block;left:50%;top:-6px;transform:translateX(-50%);width:1px;height:5px;background:#c7c7c7;}
`
const SwitchButton = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;
  margin-bottom:20px;
`
const Switch = styled.div`
  width:41px;
  height:15px;background:#e4e4e4;

`
const Span = styled.span`
  display:inline-block;font-size:15px;
  font-weight:normal;transform:skew(-0.1deg);color:#4a4a4a;
  margin-left:5px;
`
const WrapRadio = styled.div`
  width:100%;display:flex;justify-content:flex-start;align-items:center;
  flex-wrap:wrap;
`
const RadioBox = styled.div`
  width:33%;
`
const RadioBoxWidth50 = styled.div`
  width:50%;
`
const InputR = styled.input`
  display:none;
  &:checked+label span{background:url(${RadioChk}) no-repeat; background-size:100% 100%;}
`
const InputC = styled.input`
  display:none;
  &:checked+label span{background:url(${Checked}) no-repeat; background-size:100% 100%;}
`
const LabelR = styled.label`
  display:inline-block;
  font-size:15px;color:#4a4a4a;
  margin-bottom:10px;
  font-weight:normal;transform:skew(-0.1deg);
`
const LabelC = styled(LabelR)`
`
const SpanR = styled.span`
  display:inline-block;width:22px;height:22px;
  margin-right:8px;vertical-align:middle;
  background:url(${Radio}) no-repeat;background-size:100% 100%;
`
const SpanC = styled(SpanR)`
  background:url(${Check}) no-repeat;background-size:100% 100%;

`
const DetailOption = styled.div`
  width:100%;
`
const DetailTopBox = styled.div`
  width:100%;cursor:pointer;
  padding:22px 17px;
  border-top:1px solid #f2f2f2;
  display:flex;justify-content:space-between;align-items:center;
`
const DetailTitle = styled.h2`
  font-size:15px;color:#4e4e4e;font-weight:600;
  transform:skew(-0.1deg);
`
const Line = styled.div`
  width:200px;
  height:1px; background:#cecece;
`
const ArrowImg = styled.img`
  display:inline-block;
  width:26px;
`
const SubDepth = styled.div`
  width:100%;
`
