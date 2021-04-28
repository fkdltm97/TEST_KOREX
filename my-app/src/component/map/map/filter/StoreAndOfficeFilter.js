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
import StoreAndOfficeItem from "./StoreAndOfficeItem";
import OfficetelFilterItem from "./OfficetelFilterItem";
import ApartFilterItem from "./ApartFilterItem";

// redux
import { MapFilterRedux } from '../../../../store/actionCreators';
import { useSelector } from 'react-redux';

// Range
import Rheostat from "rheostat";
import 'rheostat/initialize';
import './slider.css';

export default function MapFilter({openBunyang, rank, status}) {

    const mapFilterRedux = useSelector(state=>{ return state.mapFilter});

    // 가격
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100); 
    const [dropdownValue, setDropdownValue] = useState([0, 100])
    const [snapArr, setSnapArr] = useState([]);
    const [priceText, setPriceText] = useState("");

    // 관리비 
    const [minPriceMana, setMinPriceMana] = useState(0);
    const [maxPriceMana, setMaxPriceMana] = useState(75); 
    const [dropdownValueMana, setDropdownValueMana] = useState([0, 75])
    const [snapManaArr, setSnapManaArr] = useState([]);
    const [manaText, setManaText] = useState("");
    
    // 면적 
    const [minArea, setMinArea] = useState(0);
    const [maxArea, setMaxArea] = useState(100); 
    const [dropdownValueArea, setDropdownValueArea] = useState([0, 100])
    const [snapAreaArr, setSnapAreaArr] = useState([]);
    const [areaText, setAreaText] = useState("");

    const makeRangeSnaps = (maxValue, setSnap, unit) => {
      let i = 0;
      let max = maxValue;
      let snapArr = [];
      while (true) {
        if (max == 0) {
          break;
        } else {
          snapArr.push(i * unit);
          i++;
          max -= unit;
        }
      }
      snapArr.push(i * unit);
      setSnap(snapArr);
    };
  
    useEffect(() => {
      makeRangeSnaps(maxPrice, setSnapArr, 1);
      makeRangeSnaps(maxPriceMana, setSnapManaArr, 1);
      makeRangeSnaps(maxArea, setSnapAreaArr, 1);
    }, [])

    useEffect(() => {
      if(dropdownValue[0] == minPrice && dropdownValue[1] == maxPrice){
        setPriceText("전체");
        return;
      }
      let min = dropdownValue[0];
      let max = dropdownValue[1];
      rangeText(min, max, minPrice, maxPrice, priceToKor(min), priceToKor(max), setPriceText, "");
    }, [dropdownValue])

    useEffect(() => {
      if(dropdownValueMana[0] == minPriceMana && dropdownValueMana[1] == maxPriceMana){
        setManaText("전체");
        return;
      }
      let min = dropdownValueMana[0];
      let max = dropdownValueMana[1];
      rangeText(min, max, minPriceMana, maxPriceMana, min, max, setManaText, "만");
    }, [dropdownValueMana])

    useEffect(() => {
      if(dropdownValueArea[0] == minArea && dropdownValueArea[1] == maxArea){
        setAreaText("전체");
        return;
      }
      let min = dropdownValueArea[0];
      let max = dropdownValueArea[1];
      rangeText(min, max, minArea, maxArea, min, max, setAreaText, "평");
    }, [dropdownValueArea])

    // 매매 억/천 단위
    const priceToKor = (num) => {
      let newNum = String(num).split('');
      if(newNum.length == 1){
        newNum.splice(1, 0, '천');
        newNum = newNum.join('');
        return newNum;
      }
      newNum.splice(1, 0, '억');
      if(newNum[2] == "0"){
        newNum.pop();
      }else{
        newNum.splice(3, 0, '천');
      }
      newNum = newNum.join('');
      return newNum;
    }

    // 범위 텍스트
    const rangeText = (min, max, minPrice, maxPrice, minText, maxText, setText, unit) => {
      if(min == minPrice){
        setText(maxText + unit);
      }else if(max == maxPrice){
        setText(`${minText}${unit}~전체`);
      }else{
        setText(`${minText}${unit}~${maxText}${unit}`)
      }
    }

    // 층수
    const onChangeFloor = (e) => {
      let data = JSON.parse(JSON.stringify(mapFilterRedux.filterArr));
      data.floor = e.target.dataset.text;
      MapFilterRedux.updateFilterArr({  filterArr: data});
    } 

    // 사용승인일
    const onChangeUse = (e) => {
      let data = JSON.parse(JSON.stringify(mapFilterRedux.filterArr));
      data.use = e.target.dataset.text;
      MapFilterRedux.updateFilterArr({  filterArr: data});
    }

    // 관리비
    const onClickAdmin = (e) => {
      console.log(e.target.checked)
    }


    const filterType = () => {
      if(status == "apart"){
        return <ApartFilterItem/>
      }
      else if(status == "officetel"){
        return <OfficetelFilterItem/>
      }
      else if(status == "storeOffice"){
        return <StoreAndOfficeItem/>
      }
    }

    // 아파트 총세대수
    const onChangeDanji = (e) => {
      let data = JSON.parse(JSON.stringify(mapFilterRedux.filterArr));
      data.danji = e.target.dataset.text;
      MapFilterRedux.updateFilterArr({  filterArr: data});
    }

    return (
        <Container>
          <WrapApart>
            {/* ---------------------- */}

            {/*가격*/}
            <Box>
              <SubTitle>매매</SubTitle>
              <WrapFilter>
                <PriceView>{priceText}</PriceView>
                <WrapRange>
                  {/* <LeftRange/> */}
                  {/* <RightRange/> */}
                  {/*실제 영역 바*/}
                  {/* <GreenBar/> */}
                  {/*바닥에 깔리는 바*/}
                  {/* <GrayBar/> */}
                  <Rheostat
                    min={minPrice}
                    max={maxPrice}
                    values={dropdownValue}
                    onChange={(e) => {
                      setDropdownValue(e.values);
                    }}
                    snap
                    snapPoints={snapArr}
                  />
                </WrapRange>
                <BottomBar>
                  <BarTxt>최소</BarTxt>
                  <BarTxt>3억</BarTxt>
                  <BarTxt>7억</BarTxt>
                  <BarTxt>최대</BarTxt>
                </BottomBar>
              </WrapFilter>
            </Box>
            
            {/*관리비*/}
            <Box>
              <SubTitle>관리비</SubTitle>
              <WrapFilter>
                <SwitchButton>
                  <Switch type="checkbox" onClick={(e) => {onClickAdmin(e)}} id="switch"/>
                  <SwitchLabel for="switch">
                    <SwitchSpan/>
                  </SwitchLabel>
                  <Span>관리비 없는것만 보기</Span>
                </SwitchButton>
                <PriceView>{manaText}</PriceView>
                <WrapRange>
                  {/* <LeftRange2/> */}
                  {/* <RightRange2/> */}
                  {/*실제 영역 바*/}
                  {/* <GreenBar2/> */}
                  {/*바닥에 깔리는 바*/}
                  {/* <GrayBar/> */}

                  <Rheostat
                    min={minPriceMana}
                    max={maxPriceMana}
                    values={dropdownValueMana}
                    onChange={(e) => {
                      setDropdownValueMana(e.values);
                    }}
                    snap
                    snapPoints={snapManaArr}
                  />
                </WrapRange>
                <BottomBar>
                  <BarTxt>최소</BarTxt>
                  <BarTxt>25만</BarTxt>
                  <BarTxt>50만</BarTxt>
                  <BarTxt>최대</BarTxt>
                </BottomBar>
              </WrapFilter>
            </Box>
            
            {/*면적(공급면적)*/}
            <Box>
                <SubTitle>면적(공급면적)</SubTitle>
                <WrapFilter>
                  <PriceView>{areaText}</PriceView>
                  <WrapRange>
                    {/* <LeftRange/> */}
                    {/* <RightRange/> */}
                    {/*실제 영역 바*/}
                    {/* <GreenBar/> */}
                    {/*바닥에 깔리는 바*/}
                    {/* <GrayBar/> */}
                    <Rheostat
                      min={minArea}
                      max={maxArea}
                      values={dropdownValueArea}
                      onChange={(e) => {
                        setDropdownValueArea(e.values);
                      }}
                      snap
                      snapPoints={snapAreaArr}
                    />
                  </WrapRange>
                  <BottomBar>
                    <BarTxt>최소</BarTxt>
                    <BarTxt>30평</BarTxt>
                    <BarTxt>70평</BarTxt>
                    <BarTxt>최대</BarTxt>
                  </BottomBar>
                </WrapFilter>
              </Box>
            

            {/* ---------------------- */}
            {/*층수*/}
            <Box>
                <SubTitle>층수</SubTitle>
                <WrapFilter>
                  <WrapRadio>
                    <RadioBox>
                      <InputR type="radio" data-text="전체" onChange={(e) => {onChangeFloor(e)}} name="floor" id="floor1" defaultChecked/>
                      <LabelR for="floor1" >
                        <SpanR/>
                        전체
                      </LabelR>
                    </RadioBox>
                    <RadioBox>
                      <InputR type="radio" data-text="1층" onChange={(e) => {onChangeFloor(e)}} name="floor" id="floor2"/>
                      <LabelR for="floor2">
                        <SpanR/>
                        1층
                      </LabelR>
                    </RadioBox>
                    <RadioBox>
                      <InputR type="radio" data-text="5층이상" onChange={(e) => {onChangeFloor(e)}} name="floor" id="floor3"/>
                      <LabelR for="floor3">
                        <SpanR/>
                        5층이상
                      </LabelR>
                    </RadioBox>
                    <RadioBox>
                      <InputR type="radio" data-text="5층이하" onChange={(e) => {onChangeFloor(e)}} name="floor" id="floor4"/>
                      <LabelR for="floor4">
                        <SpanR/>
                        5층이하
                      </LabelR>
                    </RadioBox>
                  </WrapRadio>
                </WrapFilter>
              </Box>

            {/* 필터 */}
            {filterType()}

            {/*사용승인일*/}
            <Box>
              <SubTitle>사용승인일</SubTitle>
              <WrapFilter>
                <WrapRadio>
                  <RadioBox>
                    <InputR type="radio" data-text="전체" onChange={(e) => {onChangeUse(e)}} name="use" id="use1" defaultChecked/>
                    <LabelR for="use1">
                      <SpanR/>
                      전체
                    </LabelR>
                  </RadioBox>
                  <RadioBox>
                    <InputR type="radio" data-text="5년 이내" onChange={(e) => {onChangeUse(e)}} name="use" id="use2"/>
                    <LabelR for="use2">
                      <SpanR/>
                      5년 이내
                    </LabelR>
                  </RadioBox>
                  <RadioBox>
                    <InputR type="radio" data-text="10년 이내" onChange={(e) => {onChangeUse(e)}} name="use" id="use3"/>
                    <LabelR for="use3">
                      <SpanR/>
                      10년 이내
                    </LabelR>
                  </RadioBox>
                  <RadioBox>
                    <InputR type="radio" data-text="20년 이내" onChange={(e) => {onChangeUse(e)}} name="use" id="use4"/>
                    <LabelR for="use4">
                      <SpanR/>
                      20년 이내
                    </LabelR>
                  </RadioBox>
                  <RadioBox>
                    <InputR type="radio" data-text="20년 이상" onChange={(e) => {onChangeUse(e)}} name="use" id="use5"/>
                    <LabelR for="use5">
                      <SpanR/>
                      20년 이상
                    </LabelR>
                  </RadioBox>
                </WrapRadio>
              </WrapFilter>
            </Box>
          
            {/* ->아파트<- 총세대수 */}
            {
              status == "apart"?
              <Box>
                <SubTitle>총세대수</SubTitle>
                <WrapFilter>
                  <WrapRadio>
                    <RadioBoxWidth50>
                      <InputR type="radio" onClick={(e) => onChangeDanji(e)} data-text="전체" name="danji" id="danji1" defaultChecked/>
                      <LabelR for="danji1">
                        <SpanR/>
                        전체
                      </LabelR>
                    </RadioBoxWidth50>
                    <RadioBoxWidth50>
                      <InputR type="radio" onClick={(e) => onChangeDanji(e)} data-text="200세대 이상" name="danji" id="danji2"/>
                      <LabelR for="danji2">
                        <SpanR/>
                        200세대 이상
                      </LabelR>
                    </RadioBoxWidth50>
                    <RadioBoxWidth50>
                      <InputR type="radio" onClick={(e) => onChangeDanji(e)} data-text="500세대 이상" name="danji" id="danji3"/>
                      <LabelR for="danji3">
                        <SpanR/>
                        500세대 이상
                      </LabelR>
                    </RadioBoxWidth50>
                    <RadioBoxWidth50>
                      <InputR type="radio" onClick={(e) => onChangeDanji(e)} data-text="1000세대 이상" name="danji" id="danji4"/>
                      <LabelR for="danji4">
                        <SpanR/>
                        1000세대 이상
                      </LabelR>
                    </RadioBoxWidth50>
                    <RadioBoxWidth50>
                      <InputR type="radio" onClick={(e) => onChangeDanji(e)} data-text="2000세대 이상" name="danji" id="danji5"/>
                      <LabelR for="danji5">
                        <SpanR/>
                        2000세대 이상
                      </LabelR>
                    </RadioBoxWidth50>
                  </WrapRadio>
                </WrapFilter>
              </Box>
              :
              <></>
            }
          
          </WrapApart>
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
const PriceView = styled.div`
  width:100%;
  font-size:15px;font-weight:800;transform:skew(-0.1deg);
  color:#01684b;
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(20/428));
  }
`
const WrapRange = styled.div`
  width:95%;
  position:relative;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
    width:98%;
  }
`
const LeftRange = styled.div`
  position:absolute;
  left:0;top:-8px;
  width:19px;height:19px;border-radius:100%;
  border: solid 2px #01684b;
  background-color: #ffffff;
  z-index:3;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(19/428));
    height:calc(100vw*(19/428));
    top:calc(100vw*(-8/428));
  }
`
const RightRange = styled.div`
  position:absolute;
  right:0;top:-8px;
  width:19px;height:19px;border-radius:100%;
  border: solid 2px #01684b;
  background-color: #ffffff;
  z-index:3;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(19/428));
    height:calc(100vw*(19/428));
    top:calc(100vw*(-8/428));
  }
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
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(3/428));
  }
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
  padding-top:35px;
  @media ${(props) => props.theme.mobile} {
    width:102%;
    height:calc(100vw*(3/428));
    padding-top:calc(100vw*(40/428));
  }
`
const BarTxt = styled.p`
  position:relative;
  font-size:14px;color:#979797;
  font-weight:600;transform:skew(-0.1deg);
  &:before{position:absolute;content:'';display:block;left:50%;top:-15px;transform:translateX(-50%);width:1px;height:8px;background:#c7c7c7;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    &:before{top:calc(100vw*(-10/428));height:calc(100vw*(8/428));}
  }
`
const SwitchButton = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(20/428));
  }
`
const Switch = styled.input`
  display:none;
  &:checked+label{background:#009053}
  &:checked+label span{left:22px;}
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
const Span = styled.span`
  display:inline-block;font-size:15px;
  font-weight:normal;transform:skew(-0.1deg);color:#4a4a4a;
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-left:calc(100vw*(10/428));
  }

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
  }
`
const SpanC = styled(SpanR)`
  background:url(${Check}) no-repeat;background-size:100% 100%;

`
