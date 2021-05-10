// React
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

// Img
import ChangeM from "../../../img/map/change_m.png";

// Css
import styled from "styled-components"

const ListEL = ({title, desc, ChangeM}) => {


    return(
        <Li>
            <SubTitle>{title}</SubTitle>
            <SubDesc>
                {desc}
                {
                    ChangeM&&
                    <Link>
                        <ChangeMImg src={ChangeM}/>
                    </Link>
                }
            </SubDesc>
        </Li>
    )
};

export default ListEL;

const Li = styled.li`
  width:100%;display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;
  padding:15px 20px;
  border-bottom:1px solid #f2f2f2;
  &:last-child{border-bottom:none;}
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(15/428)) calc(100vw*(10/428));
  }
`
const SubTitle = styled.p`
  font-size:15px; color:#898989;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const SubDesc = styled(SubTitle)`
  color:#4a4a4a;
`
const ChangeMImg = styled.img`
  width:20px;margin-left:10px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    margin-left:calc(100vw*(10/428));
  }
`