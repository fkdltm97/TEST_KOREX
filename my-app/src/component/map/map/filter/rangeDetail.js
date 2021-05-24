import React from 'react';

//css
import styled from "styled-components"


// Range
import Rheostat from "rheostat";
import 'rheostat/initialize';

const RangeDetail = ({bool, id, title, price, min, max, value, onChange, snapPoints, txt, txt2, txt3, txt4, btn}) => {

    if(!bool){return(<></>)}

    return(
        <Box id={id}>
            <SubTitle>{title}</SubTitle>
            <WrapFilter>
                {btn?<>{btn()}</>:null}
                <PriceView>{price}</PriceView>
                <WrapRange className="changeBtnRange">
                <Rheostat
                    min={min}
                    max={max}
                    values={value}
                    onChange={onChange}
                    snap
                    snapPoints={snapPoints}
                />
                </WrapRange>
                <BottomBar>
                <BarTxt>{txt}</BarTxt>
                <BarTxtMl>{txt2}</BarTxtMl>
                <BarTxtMR2>{txt3}</BarTxtMR2>
                <BarTxt>{txt4}</BarTxt>
                </BottomBar>
            </WrapFilter>
        </Box>
    )
};

export default RangeDetail;

const Box = styled.div`
  width:100%;
  padding:22px 17px;
  border-top:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(22/428)) calc(100vw*(33/428));
  }

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
const BarTxtMl = styled(BarTxt)`
  margin-left:-40px;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(-55/428));
  }
`
const BarTxtMR = styled(BarTxt)`
  margin-right:-30px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(-40/428));
  }
`
const BarTxtMR2 = styled(BarTxt)`
margin-right:-26px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(-36/428));
  }
`
const BarTxtMl2 = styled(BarTxt)`
  margin-left:-10px;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(-16/428));
  }
`