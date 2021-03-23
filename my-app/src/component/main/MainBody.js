//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

import MainTop from './MainTop';
import MainBodyTop from './MainBodyTop';
import MainBodyBottom from './MainBodyBottom';

export default function MainBody() {
    return (
        <Container>
          <MainTop/>
          <MainBodyTop/>
          <MainBodyBottom/>
        </Container>
  );
}
const Container = styled.div`
    width: 100%;
    padding-bottom:60px;
    min-height:calc(100vh - 309px);
    @media ${(props) => props.theme.mobile} {
          min-height:calc(100vh - calc(100vw*(420/428)));
          padding-bottom:calc(100vw*(180/428));
      }


`
