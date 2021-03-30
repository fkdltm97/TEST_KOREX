//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

//css
import styled from "styled-components"
import IconSearch from '../../img/main/icon_search.png';
import IconMenu from '../../img/main/icon_view.png';
import Close from '../../img/main/modal_close.png';

export default function SearchFaq() {
  /*Faq Search*/
   const [showSearch, setShowSearch] = useState(false);
   const [searchword, setSearchWord] = useState("");
   const searchWord = (e) =>{setSearchWord(e.target.value);}

   const [active,setActive] = useState(false);

   const checkVaildate = () =>{
     return searchword.length > 0
    }
    /*Faq menu(최신순, 과거순)*/
    const [showMenu, setShowMenu] = useState(false);
    const showModal =()=>{
      setShowMenu(!showMenu);
    }

    useEffect(()=>{
      if(checkVaildate())
          setActive(true);
      else
          setActive(false);
    },)

    return (
        <Container>
          <WrapSearch>
            <Search>
              <Link onClick={()=>{setShowSearch(true)}}>
                <ImgSearch src={IconSearch}/>
              </Link>
            </Search>
            <Menu>
              <Link onClick={showModal}>
                <ImgMenu src={IconMenu}/>
              </Link>
                {
                  showMenu ?
                  <RecentSubdepth>
                    <MenuBg onClick={() => {setShowMenu(false)}}/>
                    <ReceentSubList>최신순</ReceentSubList>
                    <ReceentSubList>과거순</ReceentSubList>
                  </RecentSubdepth>
                  :
                  null
                }
            </Menu>
          </WrapSearch>

          {/*search 눌렀을때 나오는 검색창!!!*/}
          {
            showSearch ?
            <WrapSearchInput>
              <SearchInput>
                <InputSearch src={IconSearch}/>
                <Input type="text" name="" placeholder="질문을 검색해주세요." onChange={searchWord}/>
                <CloseBtn type="submit" name="" onClick={()=>{setShowSearch(false)}}>
                  <CloseImg src={Close}/>
                </CloseBtn>
              </SearchInput>
          {/*검색어 입력했을때 나와야함*/}
              <WriteWord active={active}>
                <Link>
                  <Result>부동산 관리에 대해 문의 드립니다.</Result>
                </Link>
                <Link>
                  <Result>부동산 관리에 대해 문의 드립니다.</Result>
                </Link>
              </WriteWord>
            </WrapSearchInput>
            :
            null

          }

        </Container>
  );
}

const Container = styled.div`
  width:530px;
  margin:0 auto 35px;
  position:relative;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(360/428));
    margin:0 auto;
  }

`
const WrapSearch = styled.div`
  width:100%;
  padding:30px 0 0;
  display:flex;justify-content:space-between;align-items:center;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding:calc(100vw*(20/428));
  }
`
const Search = styled.div`
  width:19px;height:18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(19/428));
    height:calc(100vw*(18/428));
  }
`
const ImgSearch = styled.img`
  width:100%;
`
const Menu = styled(Search)`
  position:relative;
`
const ImgMenu = styled.img`
  width:100%;
`
const RecentSubdepth = styled.div`
  width:100%;height:auto;
  position:Absolute;left:35px;top:0;background:#fff;
  border-radius:8px;border:1px solid #707070;
  width:70px;
`
const MenuBg = styled.div`
  position:fixed;width:100%;height:100%;
  content:'';display:block;left:0;top:0;
  background:transparent;
`
const ReceentSubList = styled.div`
  font-size:13px;color:#707070;
  text-align:center;
  border-radius:8px;
  padding:7px 15px;
  font-weight:600;transform:skew(-0.1deg);
  cursor:pointer;
  background:#fff;
  transition:all 0.3s;
  &:last-child{margin-bottom:0;}
  &:hover{background:#f8f7f7}
  position:relative;
  z-index:3;
`
const WrapSearchInput = styled.div`
  position:absolute;
  left:0;top:15px;
  width:100%;
  border-radius:9px;
  border:1px solid #d0d0d0;
  z-index:2;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(7/428));
  }
`
const SearchInput = styled.div`
  width:100%;height:48px;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;
  background:#f8f7f7;border-radius:9px;
  padding: 0 24px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(43/428));
    padding:0 calc(100vw*(16/428));
  }
`
const InputSearch = styled.img`
  display:inline-block;
  width:19px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(16/428));
  }
`
const Input = styled.input`
  width:80%;background:transparent;
  font-size:16px;color:#4a4a4a;text-align:center;
  height:100%;transform:skew(-0.1deg);
  font-weight:600;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
  }
`
const CloseBtn = styled.button`
  width:30px;height:30px;
  line-height:30px;
  background:none;text-align:center;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));
  }
`
const CloseImg = styled.img`
  display:inline-block;
  width:11px;vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(11/428));
  }
`
const WriteWord = styled.div`
  width:100%;background:#fff;border-radius:9px;
  display:none;
  transition:all 0.3s;
  display:${({active}) => active ? "block" : "none"};
  @media ${(props) => props.theme.mobile} {
  }
`
const Result = styled.p`
  text-align:center;font-size:15px;color:#4a4a4a;
  transform:skew(-0.1deg);font-weight:500;
  padding:15px 0;
  background:#fff;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}



  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
