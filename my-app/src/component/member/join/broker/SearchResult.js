//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

export default function SearchResult() {

    return (
        <Container>
          <WrapSearchResult>
            <WrapResultBox>
              <TopTxt>조회결과</TopTxt>
              <Ul>
                <Li>중개사무소등록번호 : OOO</Li>
                <Li>중개사무소명 : OOO</Li>
                <Li>중개사무소주소 : OOO</Li>
                <Li>대표자명 : OOO</Li>
              </Ul>
              <Div>본인 맞으십니까?</Div>
            </WrapResultBox>
            <ConfirmBtn>
              <Link to="/BrokerRegistration">
                <NoBtn type="button" name="">아니오</NoBtn>
              </Link>
              <Link to="/JoinBusinessNumber">
                <YesBtn type="button" name="">예</YesBtn>
              </Link>
            </ConfirmBtn>
          </WrapSearchResult>
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
    width:450px;
    margin:35px auto 0;
    padding-bottom:150px;
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(370/428));
        margin:calc(100vw*(35/428)) auto 0;
        padding-bottom:calc(100vw*(100/428));
      }
`
const WrapSearchResult = styled.div`
    width:100%;
`
const WrapResultBox = styled.div`
    width:100%;
    padding:30px 0 30px 40px;
    margin-bottom:50px;
    border-top:1px solid #f2f2f2;
    border-bottom:1px solid #f2f2f2;
    @media ${(props) => props.theme.mobile} {
        width:100%;
        padding:calc(100vw*(37/428)) 0 calc(100vw*(37/428)) calc(100vw*(40/428));
        margin-bottom:calc(100vw*(50/428));
      }
`

const Ul = styled.ul`
  width:100%;
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
      width:100%;
      margin-bottom:calc(100vw*(20/428));
    }

`
const TopTxt = styled.h2`
  font-size:16px;font-weight:800;transform:skew(-0.1deg);
  margin-bottom:17px;
  color:#fe7a01;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(16/428));
      margin-bottom:calc(100vw*(17/428));
    }
`

const Li = styled.li`
  font-size:15px;font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`
const Div = styled.div`
  font-size:15px;font-weight:600;transform:skew(-0.1deg);
  color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`
const ConfirmBtn = styled.div`
    display:flex;justify-content:center;align-items:center;
    width:100%;
`
const NoBtn = styled.button`
    width:200px;height:66px;line-height:60px;
    background:#979797;color:#fff;font-size:20px;
    border:3px solid #e4e4e4;font-weight:600;transform:skew(-0.1deg);
    border-radius:11px;
    @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(180/428));
        height:calc(100vw*(60/428));
        line-height:calc(100vw*(54/428));
        font-size:calc(100vw*(15/428));
      }
`
const YesBtn = styled(NoBtn)`
    background:#01684b;
    border:3px solid #04966d;
    margin-left:8px;
    @media ${(props) => props.theme.mobile} {
        margin-left:calc(100vw*(10/428));
      }
`
