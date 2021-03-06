//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";



//css
import styled from "styled-components"
import BackBtn from '../../../../img/notice/back_btn.png';
import RightArrow from '../../../../img/notice/right_arrow.png';
import EditBtn from '../../../../img/member/edit_btn.png';
import SaveBtn from '../../../../img/member/save_btn.png';


export default function SubTitle({title,updatePageIndex,historyInfo,value}) {
    //back button
    const history = useHistory();
    const goBack = () =>{
        history.goBack();
    }
    return (
        <Container>
          <WrapSubTitle>
            <InSubTitle>
              <div className="linkToDiv" onClick={()=>{updatePageIndex(historyInfo.prevIndex.length == 0 ? -1 : historyInfo.prevIndex.pop())}}>
                <BackImg src={BackBtn}/>
              </div>
              <TitleTxt>{title}</TitleTxt>
            </InSubTitle>
          </WrapSubTitle>
        </Container>
  );
}

const Container = styled.div`
  width:100%;
  height:68px;
  background:#f8f7f7;

  @media ${(props) => props.theme.container} {

    }
  @media ${(props) => props.theme.mobile} {
        width:100%;
        height:calc(100vw*(60/428));
    }
`
const WrapSubTitle = styled.div`
  position:relative;
  width:100%;
  height:100%;
  margin:0 auto;
  text-align:center;
  @media ${(props) => props.theme.mobile} {
        width:100%;
        height:100%;
    }
`
const InSubTitle = styled.div`
  width:100%;

`
const BackImg = styled.img`
  position:absolute;left:36px;top:50%;
  transform:translateY(-50%);
  width:10px;
  text-align:center;
  z-index:2;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(10/428));
      left:calc(100vw*(36/428));
    }
`
const TitleTxt = styled.h2`
  font-size:20px;
  line-height:68px;
  color:#4a4a4a;
  font-weight:700;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(16/428));
      line-height:calc(100vw*(60/428));
    }
`
const EditImg = styled.img`
  position:absolute;right:0;
  top:50%;transform:translateY(-50%);
  width:22px;
  @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(20/428));
        right:calc(100vw*(36/428));
    }

`
const Arrow = styled.span`
  display:inline-block;
  font-size:12px;
  color:#979797;
  vertical-align:middle;

`
const SaveImg = styled(EditImg)`
`
