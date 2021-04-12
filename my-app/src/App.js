import React ,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch ,Link} from "react-router-dom";
import "./App.css"
import { Mobile, PC } from "./MediaQuery"

/* page */
import Intro from './page/IntroPage';
import Main from './page/MainPage';
import MbSearch from './page/mobile/MbSearchPage';
import MbHouse from './page/mobile/MbHouse';
import MbHouseDetail from './page/mobile/MbHouseDetail';
import Notice from './page/notice/NoticeList';
import NoticeDetail from './page/notice/NoticeDetail';
import Faq from './page/faq/FaqList';
import FaqDetail from './page/faq/FaqDetail';
/*개인*/
import MemberJoin from './page/member/member/Join';
import MemberLogin from './page/member/member/Login';
import MemJoinAgree from './page/member/member/MemJoinAgree';
/*기업*/
import CompanyJoin from './page/member/company/Join';
import CompanyJoinInfo from './page/member/company/JoinInfo';
import CompanyJoinAgree from './page/member/company/CompanyJoinAgree';
import CompanyLogin from './page/member/company/Login';
/*중개사*/
import BrokerJoin from './page/member/broker/Join';
import JoinSearchResult from './page/member/broker/JoinSearchResult';
import JoinBusinessNumber from './page/member/broker/JoinBusinessNumber';
import BrokerJoinAgree from './page/member/broker/BrokerJoinAgree';
import BrokerRegistration from  './page/member/broker/BrokerRegistration';
import BrokerLogin from './page/member/broker/Login';
/*분양대행사*/
import AgencyJoin from './page/member/agency/Join';
import AgencyJoinInfo from './page/member/agency/JoinInfo';
import AgencyJoinAgree from './page/member/agency/AgencyJoinAgree';
import AgencyLogin from './page/member/agency/Login';

/*mypage*/
import Mypage from './page/member/mypage/Mypage';
import Reservation from './page/member/mypage/Reservation';
import Team from './page/member/mypage/Team';
import CompanyProfile from './page/member/mypage/CompanyProfile';
import Request from './page/member/mypage/Request';
import AddRequest from './page/member/mypage/AddRequest';//중개의뢰 추가 페이지
import AddRequestSecond from './page/member/mypage/AddRequestSecond';// 중개의뢰 > 기본정보입력
import AddRequestBroker from './page/member/mypage/AddRequestBroker'//중개의뢰 > 중개사 선택
import AddRequestBrokerSecond from './page/member/mypage/AddRequestBrokerSecond'//중개의뢰 > 중개사 기본정보입력

import MyLike from './page/member/mypage/MyLike';
import MyMember from './page/member/mypage/MyMember';
import MyMemberEdit from './page/member/mypage/MyMemberEdit';

/*map*/
import Map from './page/map/Map';

export default function App(){

  return (
        <Router>
            {/* main */}
             <Route exact path="/" component={Main}/>
             <Route exact path="/Notice" component={Notice}/>
             <Route exact path="/NoticeDetail" component={NoticeDetail}/>
             <Route exact path="/Faq" component={Faq}/>
             <Route exact path="/FaqDetail" component={FaqDetail}/>
            {/*member 개인*/}
             <Route exact path="/MemberJoin" component={MemberJoin}/>
             <Route exact path="/MemberLogin" component={MemberLogin}/>
             <Route exact path="/MemJoinAgree" component={MemJoinAgree}/>
            {/*company 기업*/}
            <Route exact path="/CompanyJoin" component={CompanyJoin}/>
            <Route exact path="/CompanyJoinInfo" component={CompanyJoinInfo}/>
            <Route exact path="/CompanyJoinAgree" component={CompanyJoinAgree}/>
            <Route exact path="/CompanyLogin" component={CompanyLogin}/>
            {/*broker 중개사*/}
            <Route exact path="/BrokerJoin" component={BrokerJoin}/>
            <Route exact path="/JoinSearchResult" component={JoinSearchResult}/>
            <Route exact path="/JoinBusinessNumber" component={JoinBusinessNumber}/>
            <Route exact path="/BrokerJoinAgree" component={BrokerJoinAgree}/>
            <Route exact path="/BrokerRegistration" component={BrokerRegistration}/>
            <Route exact path="/BrokerLogin" component={BrokerLogin}/>
            {/*분양대행사*/}
            <Route exact path="/AgencyJoin" component={AgencyJoin}/>
            <Route exact path="/AgencyJoinInfo" component={AgencyJoinInfo}/>
            <Route exact path="/AgencyJoinAgree" component={AgencyJoinAgree}/>
            <Route exact path="/AgencyLogin" component={AgencyLogin}/>

            {/*mypage*/}
            <Route exact path="/Mypage" component={Mypage}/>{/*마이페이지 기본*/}
            <Route exact path="/Reservation" component={Reservation}/>{/*내 물건투어예약*/}
            <Route exact path="/Team" component={Team}/>{/*소속선택*/}
            <Route exact path="/CompanyProfile" component={CompanyProfile}/>{/*회사 프로필설정*/}
            <Route exact path="/Request" component={Request}/>{/*내 중개의뢰 */}
            <Route exact path="/AddRequest" component={AddRequest}/>{/*중개의뢰 추가*/}
            <Route exact path="/AddRequestSecond" component={AddRequestSecond}/>{/*중개의뢰>기본정보입력*/}
            <Route exact path="/AddRequestBroker" component={AddRequestBroker}/>{/*중개의뢰 중개사 선택*/}
            <Route exact path="/AddRequestBrokerSecond" component={AddRequestBrokerSecond}/>{/*중개의뢰 중개사 기본정보입력*/}
            <Route exact path="/MyLike" component={MyLike}/>{/*내 관심*/}
            <Route exact path="/MyMember" component={MyMember}/>{/*팀원관리*/}
            <Route exact path="/MyMemberEdit" component={MyMemberEdit}/>{/*팀원관리 > 팀원수정*/}

            {/* mobile */}
            <Route exact path="/MbSearch" component={MbSearch}/>{/*모바일 분양써치*/}
            <Route exact path="/MbHouse" component={MbHouse}/>{/*모바일 분양리스트*/}
            <Route exact path="/MbHouseDetail" component={MbHouseDetail}/>{/*모바일 분양상세페이지*/}

            {/*map*/}
            <Route exact path="/Map" component={Map}/>
        </Router>

    );
}
