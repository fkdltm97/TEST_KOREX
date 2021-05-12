

//react
import React ,{useState, useEffect} from 'react';


//css
import styled from "styled-components"

const CommonTopInfo = ({length, leftComponent}) => {

    return(
        <TopInfo>
            <All>총 <GreenColor>{length}</GreenColor> 건</All>
            {leftComponent}
        </TopInfo>
    )
};

export default CommonTopInfo;

const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;
  margin-top:30px;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(30/428));
    padding:calc(100vw*(22/428)) calc(100vw*(10/428));
    }
`
const All = styled.span`
  font-size:17px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`

const GreenColor = styled(All)`
  color:#01684b;
`