//react
import React ,{useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import serverController from '../../../../server/serverController';

//css
import styled from "styled-components";

//Img
import AppleImg from "../../../../img/member/apple.png";
import FacebookImg from "../../../../img/member/facebook.png";
import KakaoImg from "../../../../img/member/kakao.png";
import NaverImg from "../../../../img/member/naver.png";

export default function JoinSns() {

    //각 버튼 눌를시에 각 버튼 관련된 sns링크화면을 제공한다. 로그인이 이미 되어 세션제공되는것은 바로 된다. 그 화면을 제공은 해야함.
    const facebook_register_click = async(e) => {
      let res = await serverController.connectFetchController('/auth/social/facebook','get');
      console.log('res results:',res);


    }
    return (
        <Container>
          <SnsButtons>
            <Facebook>
              <Link className="data_link" onClick={facebook_register_click}></Link>
              <FacebookImage src={FacebookImg}/>
              <Txt>SIGN UP WITH FACEBOOK</Txt>
            </Facebook>
            <Kakao>
              <Link className="data_link"></Link>
              <KakaoImage src={KakaoImg}/>
              <Txt>SIGN UP WITH KAKAO</Txt>
            </Kakao>
            <Naver>
              <Link className="data_link"></Link>
              <NaverImage src={NaverImg}/>
              <Txt>SIGN UP WITH NAVER</Txt>
            </Naver>
            <Apple>
              <Link className="data_link"></Link>
              <AppleImage src={AppleImg}/>
              <Txt>SIGN UP WITH APPLE</Txt>
            </Apple>
          </SnsButtons>
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
    margin:0 auto;
    padding-bottom:150px;
    margin-top:30px;
    padding-top:30px;
    border-top:1px solid #f2f2f2;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(370/428));
      padding-bottom:calc(100vw*(100/428));
      margin-top:calc(100vw*(25/428));
      padding-top:calc(100vw*(40/428));
    }
`
const SnsButtons = styled.div`
    width:410px;
    margin:0 auto;
    @media ${(props) => props.theme.mobile} {
      width:100%;
    }


`
const Facebook = styled.div`
    position:relative;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    height:56px;
    line-height:56px;
    padding-left:24px;
    margin-bottom:17px;
    text-align:center;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
    background:#435e99;
    border-radius:8px;
    @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(50/428));
      line-height:calc(100vw*(56/428));
      padding-left:calc(100vw*(22/428));
      margin-bottom:calc(100vw*(15/428));
    }
`
const FacebookImage = styled.img`
    width:40px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(40/428));
    }
`
const Txt = styled.p`
    font-size:18px;
    margin-left:50px;
    color:#fff;
    font-weight:800;
    @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
      margin-left:calc(100vw*(42/428));
    }
`
const Kakao = styled(Facebook)`
    background:#ffe800;
`
const Naver = styled(Facebook)`
    background:#05cf5d;
`
const Apple = styled(Facebook)`
    background:#000;
    margin-bottom:0;
`
const KakaoImage = styled(FacebookImage)`

`
const NaverImage = styled(FacebookImage)`

`
const AppleImage = styled(FacebookImage)`

`
