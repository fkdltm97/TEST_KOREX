//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//Img
import Close from "../../../../img/main/modal_close.png"

export default function SearchResult() {

  /*사업자 번호 유효성*/
  const [reginum1,setReginum1] = useState("");/*기본값*/
  const [reginum2,setReginum2] = useState("");/*기본값*/
  const [reginum3,setReginum3] = useState("");/*기본값*/

  const [active,setActive] = useState(false);

  const regiChange1 = (e) =>{ setReginum1(e.target.value); }
  const regiChange2 = (e) =>{ setReginum2(e.target.value); }
  const regiChange3 = (e) =>{ setReginum3(e.target.value); }

  const checkVaildate = () =>{
    return reginum1.length == 3 && reginum2.length == 2 && reginum3.length == 5
   }

  /*사업자 번호 오류 모달*/
   const [errorNum, setErrorNum] = useState(false);

   useEffect(()=>{
     if(checkVaildate())
         setActive(true);
     else
         setActive(false);
   },)

    return (
        <Container>
          <WrapBusiness>
            <InputTop>
              <InputTitle>사업자 등록번호</InputTitle>
              <RegistInput type="text" name="" onChange={regiChange1}/>
              <Dash>-</Dash>
              <RegistInput type="text" name="" onChange={regiChange2}/>
              <Dash>-</Dash>
              <RegistInput type="text" name="" onChange={regiChange3}/>
            </InputTop>
            <SubmitButton>
              {/*사업자 번호가 유효하지 않은 경우!*/}
              <Link to="/BrokerJoinAgree">
                <NextBtn type="button" name="" active={active}>다음</NextBtn>
              </Link>
              {/*사업자 번호가 유효하지 않은 경우!*/}
              <Link onClick={()=>{setErrorNum(true)}} style={{display:"none"}}>
                <ErrorBtn type="button" name="" active={active}>다음</ErrorBtn>
              </Link>
              {/*에러 모달창*/}
            {
              errorNum ?

              <ErrorModal>
                <Bg onClick={()=>{setErrorNum(false)}}/>
                <WrapError>
                  <CloseBtn>
                    <Link onClick={()=>{setErrorNum(false)}}>
                      <CloseImg src={Close}/>
                    </Link>
                  </CloseBtn>
                  <Title>접수 오류</Title>
                  <BodyTxt>
                    사업자상태가 유효하지 않습니다.<br/>
                    사업자번호를 다시 확인바랍니다.
                  </BodyTxt>
                  <ConfirmBtn type="button" name="" onClick={()=>{setErrorNum(false)}}>확인</ConfirmBtn>
                </WrapError>
              </ErrorModal>
              :
              null
            }

            </SubmitButton>
          </WrapBusiness>


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
const WrapBusiness = styled.div`
    width:410px;
    margin:0 auto;
    @media ${(props) => props.theme.mobile} {
        width:100%;
      }
`

const InputTop = styled.div`
    position:relative;
    width:100%;
    margin:0 auto;
    padding-bottom:60px;
    @media ${(props) => props.theme.mobile} {
        padding-bottom:calc(100vw*(50/428));
      }
`
const InputTitle = styled.label`
    display:block;
    font-size:12px;
    padding-left:7px;
    margin-bottom:10px;
    font-weight:600;
    transform:skew(-0.1deg);
    @media ${(props) => props.theme.mobile} {
        font-size:calc(100vw*(12/428));
        padding-left:calc(100vw*(7/428));
        margin-bottom:calc(100vw*(9/428));
      }
`
const RegistInput = styled.input`
  width:124px;height:43px;
  text-align:center;
  font-weight:600;
  font-size:15px;
  color:#4a4a4a;
  border-radius:4px;
  border:1px solid #e4e4e4;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(113/428));
      font-size:calc(100vw*(14/428));
      height:calc(100vw*(43/428));
    }
`
const Dash = styled.span`
  display:inline-block;
  margin:0 6px;vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
      margin:0 calc(100vw*(5/428));
      font-size:calc(100vw*(10/428));
    }
`

const SubmitButton = styled.div`
  width:100%;
`
const NextBtn = styled.button`
  width:100%;
  height:66px;
  line-height:60px;
  font-size:20px;
  color:#fff;
  border-radius:11px;
  border:3px solid #e4e4e4;
  transition:all 0.3s;
  font-weight:800;
  background:${({active}) => active ? "#01684b" : "#979797"};
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(60/428));
      line-height:calc(100vw*(54/428));
      font-size:calc(100vw*(15/428));
    }
`
const ErrorBtn = styled(NextBtn)`
`
const ErrorModal = styled.div`
  width:100%;
  position:fixed;
  left:0;top:0;height:100%;
  z-index:4;
`
const Bg = styled.div`
  position:fixed;
  left:0;top:0;
  width:100%;height:100%;background:rgba(0,0,0,0.2);
  z-index:1;content:'';display:block;
`

const WrapError = styled.div`
  position:Absolute;
  width:535px;height:520px;
  padding:87px 64px 0;
  border-radius:24px;
  border:1px solid #f2f2f2;
  left:50%;top:50%;transform:translate(-50%,-50%);
  background:#fff;
  z-index:2;box-sizing:border-box;
  @media ${(props) => props.theme.container} {
      height:calc(100vw*(650/1436));
    }

  @media ${(props) => props.theme.mobile} {
      width:90%;
      height:calc(100vw*(400/428));
      padding:calc(100vw*(64/428)) calc(100vw*(20/428)) 0;
    }
`
const CloseBtn = styled.div`
  position:absolute;
  right:48px;top:48px;
  @media ${(props) => props.theme.mobile} {
      right:calc(100vw*(24/428));
      top:calc(100vw*(24/428));
    }
`
const CloseImg = styled.img`
  width:15px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(12/428));
    }
`
const Title = styled.h2`
  font-size:20px;color:#707070;
  padding-bottom:20px;transform:skew(-0.1deg);
  font-weight:600;
  border-bottom:1px solid #a3a3a3;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
      padding-bottom:calc(100vw*(15/428));
    }
`
const BodyTxt = styled.div`
  padding:85px 0;text-align:center;transform:skew(-0.1deg);
  font-size:15px;color:#4a4a4a;line-height:2;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
      padding:calc(100vw*(70/428)) 0;
    }
`
const ConfirmBtn = styled.button`
  width:100%;height:66px;line-height:60px;color:#fff;
  background:#01684b;border:3px solid #04966d;transform:skew(-0.1deg);
  border-radius:11px;font-size:20px;font-weight:600;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
      height:calc(100vw*(60/428)); line-height:calc(100vw*(54/428));
    }
`
