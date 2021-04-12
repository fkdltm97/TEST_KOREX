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
    const rotate=()=>{
      if(open == true) {
        return "rotate(180deg)"
      }else{
        return "rotate(0deg)"
      }
    }
    return (
        <Container>
        {/*물건상세*/}
            <DetailOption>
              <DetailTopBox onClick={showOpen}>
                <DetailTitle>물건상세</DetailTitle>
                <Line/>
                <ArrowImg src={ArrowTop} rotate={rotate}/>
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
                                  <InputC type="checkbox" name="option" id="option1" defaultChecked/>
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
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(22/428)) calc(100vw*(33/428));
  }
`
const BoxNoneBorder = styled(Box)`
  border-top:none;
  padding-top:0;
`
const SubTitle = styled.h5`
  font-size:12px;
  color:#4a4a4a;transform:skew(-0.1deg);
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(13/428));
    font-weight:600;
  }
`
const WrapFilter = styled.div`
  width:100%;
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
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(20/428));
  }
`
const LabelC = styled(LabelR)`
`
const SpanR = styled.span`
  display:inline-block;width:22px;height:22px;
  margin-right:8px;vertical-align:middle;
  background:url(${Radio}) no-repeat;background-size:100% 100%;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));
    margin-right:calc(100vW*(10/428));
  }
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
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(22/428)) calc(100vw*(33/428));
  }
`
const DetailTitle = styled.h2`
  font-size:15px;color:#4e4e4e;font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const Line = styled.div`
  width:200px;
  height:1px; background:#cecece;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(230/428));
  }
`
const ArrowImg = styled.img`
  display:inline-block;
  width:26px;
  transition:all 0.2s;
  transform:${({rotate}) => rotate};
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(26/428));
  }
`
const SubDepth = styled.div`
  width:100%;
`
