//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Picture from '../../../../../img/member/picture.png';
import Item from '../../../../../img/map/detail_img.png';

//지도 모달
export default function ModalPicture() {
    return (
        <Container>
          <ModalMapPicture>
              <PictureTxt>
                <Color>사진은 최소 3장 이상 등록하세요.</Color><br/>
                대표사진은 좌측상단 썸네일입니다.<br/>
                마우스를 끌어서 사진 순서를 변경할 수 있습니다.
              </PictureTxt>
              <PicList>
                <Li>
                  <AddFile type="file" id="file"/>
                  <AddFileLabel for="file">사진추가</AddFileLabel>
                </Li>
                <Li>
                  <PicImg src={Item}/>
                </Li>
                <Li>
                  <NoneImg/>
                </Li>
                <Li>
                  <NoneImg/>
                </Li>
                <Li>
                  <NoneImg/>
                </Li>
                <Li>
                  <NoneImg/>
                </Li>
                <Li>
                  <NoneImg/>
                </Li>
                <Li>
                  <NoneImg/>
                </Li>
                <Li>
                  <NoneImg/>
                </Li>
                <Li>
                  <NoneImg/>
                </Li>
              </PicList>
          </ModalMapPicture>
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
    width:100%;
`
const ModalMapPicture = styled.div`
  padding:16px 5px;
  @media ${(props) => props.theme.modal} {
    padding:calc(100vw*(13/428)) calc(100vw*(5/428));
  }
`
const PictureTxt = styled.p`
  font-size:15px;color:#4a4a4a;font-weight:800;
  transform:skew(-0.1deg);line-height:1.33;
  text-align:center;margin-bottom:17px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(15/428));
  }
`
const Color = styled.span`
font-size:15px;color:#01684B;font-weight:800;
transform:skew(-0.1deg);line-height:1.33;
@media ${(props) => props.theme.modal} {
  font-size:calc(100vw*(15/428));
}
`
const PicList = styled.ul`
  width:100%;
  display:flex;justify-content:flex-start;
  align-items:center;flex-wrap:wrap;
`
const Li = styled.li`
  width:74px;height:74px;border:1px solid #e4e4e4;
  margin-right:10px;margin-bottom:10px;
  border-radius:3px;
  &:nth-child(5n){margin-right:0;}
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(66/428));
    height:calc(100vw*(66/428));
    margin-right:calc(100vw*(5/428));
    margin-bottom:calc(100vw*(5/428));
  }
`
const AddFile = styled.input`
  display:none;
`
const AddFileLabel = styled.label`
  display:inline-block;cursor:pointer;
  width:100%;height:100%;
  background:url(${Picture}) no-repeat 20px 10px;background-size:35px;
  padding-top:45px;
  font-size:11px;color:#707070;transform:skew(-0.1deg);
  text-align:center;
  @media ${(props) => props.theme.modal} {
    background:url(${Picture}) no-repeat calc(100vw*(20/428)) calc(100vw*(10/428));background-size:calc(100vw*(31/428));
    padding-top:calc(100vw*(45/428));
    font-size:calc(100vw*(11/428));
  }
`
const PicImg = styled.img`
  display:inline-block;cursor:pointer;
  width:100%;heigiht:100%;
  border-radius:3px;
`
const NoneImg = styled.div`
  width:100%;height:100%;
`
