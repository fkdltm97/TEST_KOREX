//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//img

import Check from "../../../../img/map/radio.png";
import Checked from "../../../../img/map/radio_chk.png";

import { Mobile, PC } from "../../../../MediaQuery"

export default function ItemTabList({value}) {

  const [menu2,setMenu2] = useState(false);
  const showModal2 =()=>{
    setMenu2(!menu2);
  }

    return (
        <Container>
            <TabContent>
              <WrapCheckBox>
                <Checkbox>
                  <Input type="checkbox" id="check1" defaultChecked/>
                  <Label for="check1">
                    <Span/>
                    마케팅 정보 수신에 대한 동의
                  </Label>
                  <Desc>
                  (2020.00.00)
                  </Desc>
                </Checkbox>
              </WrapCheckBox>
            </TabContent>
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
    @media ${(props) => props.theme.mobile} {
      width:100%;
      margin:calc(100vW*(80/428)) auto;
      }
`
const TabContent = styled.div`
  position:relative;
  width:100%;
  padding:30px 0;margin-top:17px;
  margin:0 auto 17px;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding:0 calc(100vw*(27/428)) calc(100vw*(23/428));
    margin:calc(100vw*(23/428)) auto;
    }
`
const WrapCheckBox = styled.div`
  width:550px;
  padding-left:30px;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding-left:calc(100vw*(30/428));
    }
`
const Checkbox = styled.div`
  width:100%;
  margin-bottom:40px;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    margin-bottom:calc(100vw*(50/428));
    }
`
const Input = styled.input`
  display:none;
  &:checked+label span{ background:url(${Checked}) no-repeat; background-size:100% 100%;}
`
const Label = styled.label`
  display:inline-block;
  font-size:15px;color:#4a4a4a;
  font-weight:500;transform:skeW(-0.1deg);
  font-family:'nbg',sans-serif;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
const Span = styled.span`
  display:inline-block;
  width:20px;height:20px;
  background:url(${Check}) no-repeat; background-size:100% 100%;
  vertical-align:middle;
  margin-right:10px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vW*(20/428));
    margin-right:calc(100vw*(10/428));
    }
`
const Desc = styled.div`
  padding-left:30px;
  font-size: 15px;
  margin-top:15px;transform:skew(-0.1deg);
  line-height: 1.33;
  text-align: left;
  color: #979797;
  @media ${(props) => props.theme.mobile} {
    padding-left:calc(100vw*(30/428));
    font-size:calc(100vW*(13/428));
    margin-top:calc(100vw*(15/428));
    }
`
