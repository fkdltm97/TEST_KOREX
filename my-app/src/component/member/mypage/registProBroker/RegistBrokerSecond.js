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
import AddFileImg from "../../../../img/member/add_file.png";
import Delete from "../../../../img/member/delete_icon.png";

import { Mobile, PC } from "../../../../MediaQuery";

import MapApi from './MapApi.js';

export default function RegistSecond({}) {

const [image, setImage] = useState("");
const [image2, setImage2] = useState("");
const onFileChange = (e) => {
    const {
        target : {files},
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) =>{
        const {currentTarget : { result }} = finishedEvent;
        setImage(result);
    }
}
const onFileChange2 = (e) => {
    const {
        target : {files},
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) =>{
        const {currentTarget : { result }} = finishedEvent;
        setImage2(result);
    }
}
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
            {/*사진첨부*/}
            <AddFile>
              <Box>
                <InputTitle>사업자 등록증 첨부</InputTitle>
                <Files>
                  {image ? (
                  	<ImgOn>
                  		<UploadImg src={image} alt="img"/>
                      <GoDelete>
                        <Link onClick={()=>{setImage(false)}}>
                          <DeleteImg src={Delete}/>
                        </Link>
                      </GoDelete>
                  	</ImgOn>
                  )
                :
                <>
                  <InFile>
                    <InputFile type="file" name="" id="file1" onChange={onFileChange}/>
                    <Label for="file1"/>
                  </InFile>
                </>
              }
                </Files>
              </Box>
              {/*중개등록증*/}
              <Box>
                <InputTitle>중개등록증 첨부</InputTitle>
                <Files>
                    {image2 ? (
                      <ImgOn>
                        <UploadImg src={image2} alt="img"/>
                        <GoDelete>
                          <Link onClick={()=>{setImage2(false)}}>
                            <DeleteImg src={Delete}/>
                          </Link>
                        </GoDelete>
                      </ImgOn>
                    )
                  :
                  <>
                    <InFile>
                      <InputFile type="file" name="" id="file2" onChange={onFileChange2}/>
                      <Label for="file2"/>
                    </InFile>
                  </>
                }
                </Files>
              </Box>
              <Button>
                <Link to="/RegistProBrokerThird" className="data_link"/>
                <Next type="submit">다음</Next>
              </Button>
            </AddFile>
            
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
const AddFile = styled.div`
  width:408px;
  display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(360/428));
      margin:0 auto;
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

const Box = styled.div`
  width:195px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(170/428));
    }

`
const Files = styled.div`
  width:100%;height:auto;
`
const InFile = styled.div`
  width:100%;
  height:106px; border-radius:4px;border:1px solid #a3a3a3;
  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(96/428));
    }
`
const InputFile = styled.input`
  display:none;
`
const Label = styled.label`
  display:inline-block;
  width:100%;height:100%;cursor:pointer;
  background:url(${AddFileImg}) no-repeat center center;background-size:46px 46px;
  @media ${(props) => props.theme.mobile} {
      background-size:calc(100vw*(38/428)) calc(100vw*(38/428));
    }
`
const ImgOn = styled.div`
  position:relative;
  width:100%;max-height:260px;
  border:1px solid #a3a3a3;border-radius:4px;
  @media ${(props) => props.theme.mobile} {
      max-height:calc(100vw*(260/428));
    }
`
const UploadImg = styled.img`
  width:100%;
`
const GoDelete = styled.div`
  position:absolute;
  right:5px;top:5px;
  width:29px;height:29px;
  text-align:center;
  border-radius:3px;border:1px solid #d0d0d0;
  background:#fff;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(29/428));
      height:calc(100vw*(29/428));
      right:calc(100vw*(5/428));top:calc(100vw*(5/428));
    }
`
const DeleteImg = styled.img`
  display:inline-block;
  width:17px;margin-top:5px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(17/428));
      margin-top:calc(100vw*(5/428));
    }
`

const Button = styled.div`
    width:100%;position:relative;
    margin-top:85px;
    @media ${(props) => props.theme.mobile} {
        margin-top:calc(100vw*(85/428));
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