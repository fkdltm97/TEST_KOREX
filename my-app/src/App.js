import React ,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch ,Link} from "react-router-dom";
import "./App.css"
import { Mobile, PC } from "./MediaQuery"

/* page */
import Intro from './page/IntroPage';
import Main from './page/MainPage';
import MbSearch from './page/mobile/MbSearchPage';
import MbBunyang from './page/mobile/MbBunyang';
import MbBunyangDetail from './page/mobile/MbBunyangDetail';
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
import MyProfileSetting from './page/member/mypage/MyProfileSetting';
import EmailChange from './page/member/mypage/EmailChange';
import PhoneChange from './page/member/mypage/PhoneChange';
import PasswordChange from './page/member/mypage/PasswordChange';
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
import MyMemberAdd from './page/member/mypage/MyMemberAdd';
import MyLive from './page/member/mypage/MyLive';
import MyAlarm from './page/member/mypage/MyAlarm';
import MyAlarmSetting from './page/member/mypage/MyAlarmSetting';
import PropertyManagement from './page/member/mypage/PropertyManagement';
import BrokerReservation from './page/member/mypage/BrokerReservation';
import MyLiveSetting from './page/member/mypage/MyLiveSetting';
import MyVisitSetting from './page/member/mypage/MyVisitSetting';
import MyLiveManage from './page/member/mypage/MyLiveManage';
import MyLiveManageInvite from './page/member/mypage/MyLiveManageInvite';
import MyVisitManage from './page/member/mypage/MyVisitManage';
import AddProperty from './page/member/mypage/AddProperty';
import AddPropertyBasicInfo from './page/member/mypage/AddPropertyBasicInfo';
import AddPropertySecond from './page/member/mypage/AddPropertySecond';
import AddPropertyThird from './page/member/mypage/AddPropertyThird';
import ConditionChange from './page/member/mypage/ConditionChange';
import RequestReview from './page/member/mypage/RequestReview';
import RequestReviewEdit from './page/member/mypage/RequestReviewEdit';
import RequestReviewEditSecond from './page/member/mypage/RequestReviewEditSecond';
import PropertyTourSetting from './page/member/mypage/PropertyTourSetting';
import PropertyTourManage from './page/member/mypage/PropertyTourManage';

/*map*/
import Map from './page/map/Map';

/*added devlop redux elements 설정등 추가*/
import { useSelector } from 'react-redux';
import { MyActions, UserActions} from './store/actionCreators';

export default function App(){

  console.log('App js 실행================================');
    const my= useSelector(data => data.my);
    const users= useSelector(data => data.user);

    console.log('data.my globe info refer:',my);
    console.log('data.users globe info refer:',users);

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
            <Route exact path="/MyProfileSetting" component={MyProfileSetting}/>{/*내 계정설정*/}
            <Route exact path="/EmailChange" component={EmailChange}/>{/*계정설정 > 이메일변경*/}
            <Route exact path="/PhoneChange" component={PhoneChange}/>{/*계정설정 > 휴대전화변경*/}
            <Route exact path="/PasswordChange" component={PasswordChange}/>{/*계정설정 > 비밀번호변경*/}
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
            <Route exact path="/MyMemberAdd" component={MyMemberAdd}/>{/*팀원관리 > 팀원추가*/}
            <Route exact path="/MyMemberEdit" component={MyMemberEdit}/>{/*팀원관리 > 팀원수정*/}
            <Route exact path="/MyLive" component={MyLive}/>{/*내 라이브 시청예약*/}
            <Route exact path="/MyAlarm" component={MyAlarm}/>{/*내 알림*/}
            <Route exact path="/MyAlarmSetting" component={MyAlarmSetting}/>{/*내 알림 설정*/}
            <Route exact path="/PropertyManagement" component={PropertyManagement}/>{/*물건관리*/}
            <Route exact path="/BrokerReservation" component={BrokerReservation}/>{/*내 방문예약 */}
            <Route exact path="/MyLiveSetting" component={MyLiveSetting}/>{/*Live 시청 예약 세팅*/}
            <Route exact path="/MyLiveManage" component={MyLiveManage}/>{/*Live 시청예약접수관리*/}
            <Route exact path="/MyVisitSetting" component={MyVisitSetting}/>{/*방문 예약 세팅*/}
            <Route exact path="/MyLiveManageInvite" component={MyLiveManageInvite}/>{/*live 시청예약관리 > 초대 */}
            <Route exact path="/MyVisitManage" component={MyVisitManage}/>{/*방문예약관리 */}
            <Route exact path="/AddProperty" component={AddProperty}/>{/*내 물건관리 > 물건(외부수임)등록*/}
            <Route exact path="/AddPropertyBasicInfo" component={AddPropertyBasicInfo}/>{/*내 물건관리>물건(외부수임)등록> 의뢰인정보입력*/}
            <Route exact path="/AddPropertySecond" component={AddPropertySecond}/>{/*내 물건관리 > 물건(외부수임)등록 > 기본정보입력*/}
            <Route exact path="/AddPropertyThird" component={AddPropertyThird}/>{/*내 물건관리 > 물건(외부수임)등록 > 추가정보입력*/}
            <Route exact path="/ConditionChange" component={ConditionChange}/>{/*내 물건관리 > 상태변경내역*/}
            <Route exact path="/RequestReview" component={RequestReview}/>{/*내 물건관리 > 의뢰접수검토*/}
            <Route exact path="/RequestReviewEdit" component={RequestReviewEdit}/>{/*내 물건관리 > 물건 수정(기본정보)*/}
            <Route exact path="/RequestReviewEditSecond" component={RequestReviewEditSecond}/>{/*내 물건관리 > 물건 수정(추가정보)*/}
            <Route exact path="/PropertyTourSetting" component={PropertyTourSetting}/>{/*내 물건관리 > 물건투어예약셋팅*/}
            <Route exact path="/PropertyTourManage" component={PropertyTourManage}/>{/*물건투어예약접수관리*/}

          {/* mobile */}
            <Route exact path="/MbSearch" component={MbSearch}/>{/*모바일 분양써치*/}
            <Route exact path="/MbBunyang" component={MbBunyang}/>{/*모바일 분양리스트*/}
            <Route exact path="/MbBunyangDetail" component={MbBunyangDetail}/>{/*모바일 분양상세페이지*/}

            {/*map*/}
            <Route exact path="/Map" component={Map}/>
        </Router>

    );
}
