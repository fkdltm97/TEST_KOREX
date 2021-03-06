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

import { Mobile, PC } from "../../../../MediaQuery"
import ConditionChangeList from "./ConditionChangeList";
import RequestReviewBasicInfo from "./RequestReviewBasicInfo";

//added redux actions go
import {useSelector } from 'react-redux';

export default function RequsetReview({acceptModal,cancleModal,setAccept,setCancle,disabled}) {
  const [basic, setBasic] = useState(false);

  const rotatebasic=()=>{
    if(basic == true) {
      return "rotate(180deg)"
    }else{
      return "rotate(0deg)"
    }
  }

  const brokerRequest_product_data=useSelector(data => data.brokerRequest_product);
  console.log('brokerRequest_rpdoucdt data: (disabled_+value):',brokerRequest_product_data,disabled);

    return (
        <Container>
          <WrapCondition>
            <TopTitle>물건 (사용자의뢰) 수정</TopTitle>
            <WrapReview>
              <ReviewTop>
                <Condition>상태:<Gray>{brokerRequest_product_data.prd_status}</Gray></Condition>
                <TeamName>소속명</TeamName>
                <WrapFlexBox>
                  <FlexBox>
                    <Left>의뢰인명</Left>
                    <Right>{brokerRequest_product_data.requestmanname}</Right>
                  </FlexBox>
                  <FlexBox>
                    <Left>휴대폰번호</Left>
                    <Rightph>{brokerRequest_product_data.requestmemphone}</Rightph>
                  </FlexBox>
                  <FlexBox>
                    <Left>요청사항</Left>
                    <Rightwd>안녕하세요 요청사항 말씀드립니다 -안녕하세요 요청사항 말씀드립니다. 이렇게 이렇게 해주세요 등등.</Rightwd>
                  </FlexBox>
                </WrapFlexBox>
                <JunsokDate>
                  <Label>전속기간<Pilsu> *</Pilsu></Label>
                  <Input type="text" value="00개월"/>
                </JunsokDate>
                <Preview>미리보기</Preview>
              </ReviewTop>
            {/*기본정보*/}
              <ReviewMiddle>
                <BasicInfo onClick={() =>{setBasic(!basic);}}>
                  <BasicTitle>기본정보</BasicTitle>
                  <Arrow src={ArrowDown} rotatebasic={rotatebasic}/>
                </BasicInfo>
            {/*기본정보 내용*/}
                {basic ?
                    <RequestReviewBasicInfo disabled={disabled}/>
                    :
                    null
                }
                <RequestAccept>
                    <Link className="data_link" to="RequestReviewEditSecond"/>
                   <NextBtn type="button" onClick={()=> {
                     console.log('다음버튼 클릭 입력저보들 물건정보들:',brokerRequest_product_data);
                   }}>다음</NextBtn>
                </RequestAccept>
              </ReviewMiddle>
            </WrapReview>
      </WrapCondition>
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
    padding:43px 0 100px;
    @media ${(props) => props.theme.mobile} {
      width:100%;
      padding:calc(100vw*(30/428)) 0 calc(100vw*(100/428));
      }
`
const WrapCondition = styled.div`
  width:100%;
`
const WrapReview = styled.div`
  width:490px;
  margin:0 auto;
  padding-top:43px;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding-top:calc(100vw*(43/428));
    }
`

const ReviewTop = styled.div`
width:408px;
margin:0 auto 35px;
position:relative;
@media ${(props) => props.theme.mobile} {
  width:calc(100vw*(380/428));
  margin:0 auto calc(100vw*(30/428));
  }
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(36/428));
    }
`
const Condition = styled.div`
  font-size:15px;font-weight:600;
  transform:skew(-0.1deg);color:#707070;
  margin-bottom:15px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(15/428));
    }
`
const Gray = styled.span`
padding-left:5px;
font-size:15px;font-weight:600;vertical-align:middle;
transform:skeW(-0.1deg);color:#979797;
@media ${(props) => props.theme.mobile} {
  font-size:calc(100vw*(15/428));
  padding-left:calc(100vw*(5/428));
  }
`
const TeamName = styled.div`
  font-size:18px;
  font-weight:600;transform:skew(-0.1deg);
  color:#4a4a4a;margin-bottom:23px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(18/428));
    margin-bottom:calc(100vw*(23/428));
    }
`
const WrapFlexBox = styled.div`
  width:100%;
`
const FlexBox = styled.div`
  width:100%;display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(6/428));
    }
`
const Left = styled.p`
  font-size:15px;font-weight:800;
  transform:skeW(-0.1deg);color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
const Right = styled(Gray)`
  padding-left:0;
`
const Rightph = styled(Gray)`
  color:#fe7a01;
  text-decoration:underline;
`
const Rightwd = styled(Right)`
  width:100%;
  margin-top:8px;
  line-height:1.5;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(8/428));
    }
`
const JunsokDate = styled.div`
  width:408px;
  margin:43px auto 0;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    margin:calc(100vw*(43/428)) auto 0;
    }
`
const Preview = styled.div`
  position:absolute;
  right:0;top:0;cursor:pointer;
  width:80px;height:28px;
  line-height:26px;
  background:#fe7a01;border:2px solid #f0a764;
  font-size:13px;text-align:center;transform:skew(-0.1deg);
  color:#fff;border-radius:4px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(80/428));
    height:calc(100vw*(28/428));
    font-size:calc(100vw*(13/428));
    line-height:calc(100vw*(26/428));
    }
`

const Input = styled.input`
  width:100%;height:43px;
  display:inline-block;
  text-align:center;border-radius: 4px;
  border: solid 1px #a3a3a3;
  background-color: #ffffff;color:#4a4a4a;
  font-size:15px;font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    }
`
const ReviewMiddle = styled.div`
  width:490px;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    }

`
const BasicInfo = styled.div`
  width:100%;display:flex;justify-content:space-between;align-items:center;
  height:66px;padding:0 45px;
  background:#f8f7f7;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(66/428));
    padding:0 calc(100vw*(45/428));
    }
`
const BasicTitle = styled.h2`
  font-size:20px;font-weight:800;color:#4a4a4a;
  transform:skeW(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(20/428));
    }
`
const Arrow = styled.img`
  display:inline-block;
  width:13px;opacity:0.8;
  transition:all 0.3s;
  transform:${({rotatebasic}) => rotatebasic};
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(13/428));
    }
`
const Label = styled.label`
  display:block;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);color:#4a4a4a;
  margin-bottom:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(10/428));
    }
`
const Pilsu = styled.span`
  display:inline-block;
  font-size:12px;font-weight:600;
  transform:skew(-0.1deg);color:#fe7a01;
  vertical-align:middle;
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-left:calc(100vw*(5/428));
    }
`
const RequestAccept = styled.div`
position:relative;
  width:408px;
  margin:80px auto 0;
  @media ${(props) => props.theme.mobile} {
    margin:calc(100vw*(70/428)) 0 auto;
    width:100%;
    }
`
const NextBtn = styled.button`
  width: 100%;
  height: 66px;
  line-height:60px;
  text-align:center;
  font-size:20px;color:#fff;font-weight:800;transform:skeW(-0.1deg);
  border-radius: 11px;
  border: solid 3px #04966d;
  background-color: #01684b;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));font-size:calc(100vw*(15/428));
    }
`
