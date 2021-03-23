//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//Img
import AllImg from "../../../../img/member/all_check.png";
import Check from "../../../../img/member/check.png";
import Checked from "../../../../img/member/checked.png";
export default function JoinSns({pwd, pwdConfirm, active}) {
    //전체 선택 체크박스 ! !
    const [allCheck, setAllCheck] = useState(false);

    return (
        <Container>
      {/*전체 체크 항목*/}
          <AgreeAll>
            <WrapAllCheck>
              <Checkbox>
                <AllCheck type="checkbox" name="" id="all_check"></AllCheck>
                <AllCheckLabel for="all_check" className="check_label">
                <AllCheckImg className="chk_on_off"></AllCheckImg>
                   전체동의
                </AllCheckLabel>
              </Checkbox>
              <ViewTerm>
                <Link>약관 보러가기</Link>
              </ViewTerm>
            </WrapAllCheck>
        {/*개별적 체크 항목 */}
            <WrapCheck>
              <CheckList>
                <List>
                  <ListCheck type="checkbox" name="" id="list_check"></ListCheck>
                  <ListCheckLabel for="list_check" className="check_label">
                    <ListCheckImg className="chk_on_off"></ListCheckImg>
                     (필수) 만14세 이상입니다.
                  </ListCheckLabel>
                </List>
                <List>
                  <ListCheck type="checkbox" name="" id="list_check1"></ListCheck>
                  <ListCheckLabel for="list_check1" className="check_label">
                    <ListCheckImg className="chk_on_off"></ListCheckImg>
                     (필수) 이용약관 동의
                  </ListCheckLabel>
                  <ViewListTerm>
                    <Link>보기</Link>
                  </ViewListTerm>
                </List>
                <List>
                  <ListCheck type="checkbox" name="" id="list_check2"></ListCheck>
                  <ListCheckLabel for="list_check2" className="check_label">
                    <ListCheckImg className="chk_on_off"></ListCheckImg>
                     (필수) 개인정보 수집 및 이용 동의
                  </ListCheckLabel>
                  <ViewListTerm>
                    <Link>보기</Link>
                  </ViewListTerm>
                </List>
                <List>
                  <ListCheck type="checkbox" name="" id="list_check3"></ListCheck>
                  <ListCheckLabel for="list_check3" className="check_label">
                    <ListCheckImg className="chk_on_off"></ListCheckImg>
                     (필수) 개인정보 제3자 제공 동의
                  </ListCheckLabel>
                  <ViewListTerm>
                    <Link>보기</Link>
                  </ViewListTerm>
                </List>
                <List>
                  <ListCheck type="checkbox" name="" id="list_check4"></ListCheck>
                  <ListCheckLabel for="list_check4" className="check_label">
                    <ListCheckImg className="chk_on_off"></ListCheckImg>
                     (선택) 마케팅 정보 수신 동의
                  </ListCheckLabel>
                </List>
              </CheckList>
            </WrapCheck>
          </AgreeAll>
        {/*가입 버튼*/}
          <JoinBtn type="submit" name="" active={active}>가입</JoinBtn>
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
    margin-top:20px;
    padding-top:20px;
    border-top:1px solid #f2f2f2;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(370/428));
      padding-bottom:calc(100vw*(100/428));
      margin-top:calc(100vw*(20/428));
      padding-top:calc(100vw*(20/428));
    }
`
const AgreeAll = styled.div`
  width:100%;
`
const WrapAllCheck = styled.div`
  width:100%;
  margin:0 auto;
  height:42px;
  background:#fbfbfb;
  display:flex;justify-content:space-between;align-items:center;
  padding:0 32px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(42/428));
    padding:0 calc(100vw*(16/428));
  }
`
const Checkbox = styled.div`
  display:inline-block;
`
const AllCheck = styled.input`
  display:none;
  &:checked + .check_label .chk_on_off{width:15px;height:15px;background:url(${AllImg}) no-repeat;background-size:100% 100%;}
  @media ${(props) => props.theme.mobile} {
    &:checked + .check_label .chk_on_off{width:calc(100vw*(15/428));height:calc(100vw*(15/428));background:url(${AllImg}) no-repeat;background-size:100% 100%;}
  }
`
const AllCheckLabel = styled.label`
  font-size:15px;
  transform:skew(-0.1deg);
  font-weight:bold;color:#707070;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }

`
const AllCheckImg = styled.span`
  display:inline-block;
  margin-right:12px;
  width:15px;height:15px;
  background:url(${Check}) no-repeat;
  background-size:100% 100%;
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(15/428));
    height:calc(100vw*(15/428));
    margin-right:calc(100vw*(12/428));
  }
`
const ViewTerm = styled.p`
  font-size:13px;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  font-weight:bold;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
  }
`
const WrapCheck = styled.div`
  width:387px;
  margin:12px auto 0;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(337/428));
    margin:calc(100vw*(8/428)) auto 0;
  }
`
const CheckList = styled.ul`
  width:100%;
`
const List = styled.li`
  position:relative;
  width:100%;
  margin-bottom:12px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(8/428));
  }
`
const ListCheck = styled.input`
  display:none;
  &:checked + .check_label .chk_on_off{width:15px;height:15px;background:url(${Checked}) no-repeat;background-size:100% 100%;}
  @media ${(props) => props.theme.mobile} {
    &:checked + .check_label .chk_on_off{width:calc(100vw*(15/428));height:calc(100vw*(15/428));background:url(${Checked}) no-repeat;background-size:100% 100%;}
  }
`
const ListCheckLabel = styled(AllCheckLabel)`
  font-size:13px;
  transform:skew(-0.1deg);
  font-weight:normal;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
  }
`
const ListCheckImg = styled(AllCheckImg)`
`
const ViewListTerm = styled.p`
  position:absolute;
  right:0;top:50%;transform:translateY(-50%) skew(-0.1deg);
  font-size:13px;font-weight:800;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
  }
`
const JoinBtn = styled.button`
  width:100%;
  height:66px;
  line-height:60px;
  font-size:20px;
  margin-top:46px;
  font-weight:800;
  transform:skew(-0.1deg);
  color:#fff;
  border-radius: 11px;
  transition:all 0.3s;
  background:${({active}) => active ? "#01684b" : "#979797"};
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    margin-top:calc(100vw*(40/428));
    font-size:calc(100vw*(15/428));

  }
`
