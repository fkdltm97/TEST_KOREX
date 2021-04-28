//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import Check from '../../../../img/map/radio.png';
import Checked from '../../../../img/map/radio_chk.png';
import Search from '../../../../img/map/search.png';
import Close from '../../../../img/main/modal_close.png';


import { Mobile, PC } from "../../../../MediaQuery";

import MapApi from './MapApi.js';

export default function Regist({}) {
const [addressApi,setAddressApi] = useState(false);

    return (
        <Container>
          <WrapMember>
            <TopTitle>전문 종목 선택</TopTitle>
            <TopDesc>

                전문중개업소로 승인된 중개사회원만<br/>
                KOREX 전속매물을 등록 거래할 수 있습니다.<br/>
                <br/>
                종목별로 복수 선택은 가능하며, 단지는 아파트, <br/>
                오피스텔별로 각각 1개씩만 신청 가능합니다.<br/> 
                <br/>
                전문중개업소 심사를 위해서 담당매니저가 <br/>
                신청서 확인 후 연락 드립니다.
            </TopDesc>
            <Line/>
            <BasicInfos>
                <Box>
                    <CheckBox>
                        <InputCheck type="checkbox" name="pro" id="pro1" defaultChecked/>
                        <CheckLabel for="pro1">
                            <Span/>
                            아파트
                        </CheckLabel>
                    </CheckBox>
                    <SearchBox>
                        <Label>중개의뢰 가능한 단지 검색</Label>
                        <InBox>
                            <InputSearch type="search" placeholder="중개의뢰 가능한 단지 검색" onClick={() =>{setAddressApi(true);}}/>
                            <SearchIcon/>
                        </InBox>
                    </SearchBox>
                </Box>
                <Box>
                    <CheckBox>
                        <InputCheck type="checkbox" name="pro" id="pro2"/>
                        <CheckLabel for="pro2">
                            <Span/>
                            오피스텔
                        </CheckLabel>
                    </CheckBox>
                    <SearchBox>
                        <Label>중개의뢰 가능한 단지 검색</Label>
                        <InBox>
                            <InputSearch type="search" placeholder="중개의뢰 가능한 단지 검색" onClick={() =>{setAddressApi(true);}}/>
                            <SearchIcon/>
                        </InBox>
                    </SearchBox>
                    <OffictelName>
                        <Label>오피스텔명</Label>
                        <InputText type="text" placeholder="오피스텔의 정확한 이름을 입력하여주세요."/>
                    </OffictelName>
                </Box>
                <Box>
                    <CheckBox>
                        <InputCheck type="checkbox" name="pro" id="pro3"/>
                        <CheckLabel for="pro3">
                            <Span/>
                            상가
                        </CheckLabel>
                    </CheckBox>
                </Box>
                <Box>
                    <CheckBox>
                        <InputCheck type="checkbox" name="pro" id="pro4"/>
                        <CheckLabel for="pro4">
                            <Span/>
                            사무실
                        </CheckLabel>
                    </CheckBox>
                </Box>

                <Button>
                    {/*사업자등록증이 DB에 없다면 사업자등록증 첨부 페이지( Second로 이동 )*/}
                    <Link to="/RegistProBrokerSecond" className="data_link"/>
                    {/*사업자등록증이 DB에 있다면 신청서확인페이지( Third로 이동 )*/}
                    {/*<Link to="/RegistProBrokerSecond" className="data_link"/>*/}
                    <Next type="submit">다음</Next>
                </Button>



                {
                    addressApi ?
                    <AddressApi>
                        <CloseImg src={Close} onClick={() => setAddressApi(false)}/>
                        <MapApi/>
                    </AddressApi>
                    :
                    null
                }

            </BasicInfos>
      </WrapMember>
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
const WrapMember = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const TopDesc = styled.div`
    font-size: 15px;
    margin-top:65px;
    font-weight: 600;transform:skew(-0.1deg);
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: #4a4a4a;
    @media ${(props) => props.theme.mobile} {
        font-size:calc(100vw*(15/428));
        margin-top:calc(100vw*(65/428));
    }

`
const Line = styled.div`
    width:100%;
    height:1px;
    background:#f2f2f2;
    margin:60px 0 50px;
    @media ${(props) => props.theme.mobile} {
        margin:calc(100vw*(60/428)) 0 calc(100vw*(40/428));
    }
`
const BasicInfos = styled.div`
    width:408px;
    margin:0 auto;
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(360/428));
    }
`
const Box = styled.div`
    width:100%;margin-bottom:25px;
    @media ${(props) => props.theme.mobile} {
        margin-bottom:calc(100vw*(25/428));
    }
`
const CheckBox = styled.div`
    width:100%;
    display:flex;justify-content:flex-start;align-items:center;
`
const InputCheck = styled.input`
    display:none;
    &:checked+label span{background:url(${Checked}) no-repeat;background-size:100% 100%}
`
const CheckLabel = styled.label`
    display:inline-block;
    font-size: 15px;font-family:'NanumSquare', sans-serif;
    font-weight: 600;color:#4a4a4a;
    transform:skew(-0.1deg);
    @media ${(props) => props.theme.mobile} {
        font-size:calc(100vw*(15/428));
    }
`
const Span = styled.span`
    display:inline-block;
    width:20px;height:20px;vertical-align:middle;
    margin-right:10px;
    background:url(${Check}) no-repeat;background-size:100% 100%;
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(20/428));height:calc(100vw*(20/428));
        margin-right:calc(100vw*(10/428));
    }
`
const SearchBox = styled.div`
    width:100%;
    margin-top:16px;
    @media ${(props) => props.theme.mobile} {
        margin-top:calc(100vw*(16/428));
    }
`
const Label = styled.label`
    display:inline-block;
    margin-bottom:10px;
    font-size:12px;padding-left:7px;
    color:#4a4a4a;transform:skew(-0.1deg);font-weight:600;
    @media ${(props) => props.theme.mobile} {
        margin-bottom:calc(100vw*(16/428));
        font-size:calc(100vw*(12/428));
        padding-left:calc(100vw*(7/428));
    }
`
const InBox = styled.div`
    width: 408px;
    height: 43px;
    border-radius: 4px;
    border: solid 1px #e4e4e4;
    background-color: #ffffff;
    display:flex;justify-content:space-between;align-items:center;
    @media ${(props) => props.theme.mobile} {
        width:100%;
        height:calc(100vw*(43/428));
    }
`
const InputSearch = styled.input`
    width:100%;
    height:100%;text-align:center;
    padding-left:40px;
    font-size:15px; transform:skew(-0.1deg);
    font-weight:600;color:#707070;background:transparent;
    &::placeholder{ font-weight:500;color:#979797;}
    @media ${(props) => props.theme.mobile} {
        padding-left:calc(100vw*(40/428));
        font-size:calc(100vw*(15/428));
    }
`
const OffictelName = styled.div`
    width:100%;margin-top:15px;
    @media ${(props) => props.theme.mobile} {
        margin-top:calc(100vw*(15/428));
    }
`
const InputText = styled(InputSearch)`
    border:1px solid #e4e4e4;border-radius:4px;
    display:inline-block;height:43px;width:100%;
    padding-left:0;
    @media ${(props) => props.theme.mobile} {
        height:calc(100vw*(43/428));
    }
`
const SearchIcon = styled.div`
    width:43px;height:43px;
    margin-right:10px;
    background:url(${Search}) no-repeat center center; background-size:19px;
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(43/428));
        height:calc(100vw*(43/428));
        margin-right:calc(100vw*(10/428));
        background-size:calc(100vw*(18/428));
    }
`
const AddressApi = styled.div`
  position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);
  width:450px;height:auto;z-index:2;
  border:1px solid #eee;
  background:#fff;
  padding:70px 10px 0;
  @media ${(props) => props.theme.mobile} {
        width:90%;
        padding:calc(100vw*(70/428)) calc(100vw*(10/428)) 0;
    }
`
const CloseImg = styled.img`
  position:Absolute;top:20px;right:10px;
  width:18px;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
        top:calc(100vw*(20/428));right:calc(100vw*(10/428));
        width:calc(100vw*(18/428));
    }
`
const Button = styled.div`
    width:100%;position:relative;
    margin-top:65px;
    @media ${(props) => props.theme.mobile} {
        margin-top:calc(100vw*(65/428));
    }
`
const Next = styled.button`
    width:100%;height:66px;
    line-height:60px;
    border-radius: 11px;
    border: solid 3px #e4e4e4;
    background-color: #979797;
    font-weight: 800;
    font-style: 800;font-size:20px;
    text-align: center;
    color: #ffffff;
    transform:skew(-0.1deg);
    /*
        액티브 됐을때
        border: solid 3px #429370;
        background-color: #2b664d;
    */
    @media ${(props) => props.theme.mobile} {
        height:calc(100vw*(60/428));
        line-height:calc(100vw*(54/428));
        font-size:calc(100v*(15/428));
    }
`