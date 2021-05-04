//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//img
import Arrow from "../../../img/map/filter_next.png";
import Detail from "../../../img/map/detail_img.png";
import Trade from "../../../img/map/trade.png";
import Report from "../../../img/map/report.png";
import ChangeM from "../../../img/map/change_m.png";
import Change from "../../../img/member/change.png";
import Call from "../../../img/map/call.png";
import Chat from "../../../img/map/chat.png";
import Exit from "../../../img/main/exit.png";
import Checked from "../../../img/map/checked.png";
import Check from "../../../img/main/heart.png";
import Profile from "../../../img/map/profile_img.png";

// components
import { Mobile, PC } from "../../../MediaQuery";
import SideSubTitle from "./subtitle/SideSubTitle";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

//server process
import serverController from '../../../server/serverController';

import KakaoMapSide from '../map/KakaoMapSide';

SwiperCore.use([Navigation, Pagination]);


export default function SideItemDetail({openBunyang, rank, updatePageIndex,historyInfo,report,setReport ,reser,updateReserveModal,click_prdidentityid}) {
  const [slideUp, setSlideUp] = useState(false);
    
  console.log('sdieBarItemDetail요소 실행  클릭한 특정상품 prd_identity_id >>>:',updateReserveModal,click_prdidentityid);
  
  var week = ['일', '월', '화', '수', '목', '금', '토'];

  //해당 매물 아이템에 대한 투어예약셋팅 정보로써 고유한 state로써 취급한다.

  const [except_datelist,setExcept_datelist] = useState([]);//표현에서 제외할 특정날짜리스트
  const [result_usedatalist,setResult_usedatalist] = useState([]);//사용할 표현할 최종데이터리스트 초기값 배열

  useEffect( async () => {
    let body_info = {
      id : click_prdidentityid
    }
    let res = await serverController.connectFetchController('/api/broker/brokerProduct_toursetting_dates','POST',JSON.stringify(body_info));
    if(res){
      console.log('res result:',res);
      var result_data=res.result_data;
      
      var special_tourlist_array=[];
      var special_count=0;

      for(let key in result_data[1]){
        console.log('>>>special tour added list:',key,result_data[1][key]);
        special_tourlist_array[special_count] = {};
        special_tourlist_array[special_count]['specifydate'] = result_data[1][key]['set_specifydate'];
        special_tourlist_array[special_count]['specifydatetimes'] = result_data[1][key]['set_specifydatetimes'];
        special_tourlist_array[special_count]['tour_id'] = result_data[1][key]['tour_id'];
        special_tourlist_array[special_count]['tour_specifyday_except'] = result_data[1][key]['tour_specifyday_except'];
        special_tourlist_array[special_count]['tour_type'] = result_data[1][key]['tour_type'];

        special_count++;
      }
      //var except_special_specifydate_tourRowlist = result_data.except_special_specifydate_tourRowlist;
      //var except_specifydatelist= [];
      /*for(let e=0; e<except_special_specifydate_tourRowlist.length; e++){
        except_specifydatelist[e] = except_special_specifydate_tourRowlist[e]['tour_set_specifydate'];
      }*/
      console.log('->>>>>server load 특별추가&제외 날짜데이터들:',special_tourlist_array);

      //일반 추가 데이터들>>>
      var default_match_dates=[];//기본 일반 추가 리스트.날짜리스트
      var normal_count=0;
      for(let key in result_data[0]){
        console.log('>>>>normal tour added list, display count limit',key,result_data[0][key],result_data[0][key]['day_select_count']);

        var loca_display_count_limit = result_data[0][key]['day_select_count'];
        var loca_match_dates=result_data[0][key]['match_dates'];
        var loca_tourtype=result_data[0][key]['tour_type'];
        for(let inn=0; inn<loca_match_dates.length; inn++){

           if(inn < loca_display_count_limit){
             default_match_dates[normal_count] = loca_match_dates[inn];//표현할 수 만큼만 저장한다.
             default_match_dates[normal_count]['tour_type'] = loca_tourtype;

             normal_count++;
           }          
        }  
      }
      console.log('=>>>>>default match_dates::',default_match_dates);
      var merged_match_dates=[];
      for(let m=0; m<default_match_dates.length; m++){
        merged_match_dates[m]={};
        merged_match_dates[m]['tour_date']=default_match_dates[m]['tour_date'];
        merged_match_dates[m]['tour_id']=default_match_dates[m]['tour_id'];
        merged_match_dates[m]['setting_times']=default_match_dates[m]['setting_times'];
        merged_match_dates[m]['tour_type']=default_match_dates[m]['tour_type'];
      }

      for(let j=0; j<special_tourlist_array.length; j++){

        if(special_tourlist_array[j]['tour_specifyday_except'] == 0){
          //추가된 항목들에 대해서만 추가하려는 항목들에대해서만 돌린다.
        
          var special_tourlist_array_item = special_tourlist_array[j]; //일반 기본 날짜리스트에서 special 특별 add추가리스트를 추가하는 개념.이미 있는것에 대해 추가하려고 할시 덮어씌움.

          var is_overwraped=false;
          console.log('==>>>추가하려는 특별날짜 요소(outer for):',special_tourlist_array_item);

          //추가하려는 날짜가 이미 있는지 여부 이미 있으면 기존 겹치는 default날짜요소를 특별요소 관련 속성으로 덮어씌우고, 없는 새로운 요소라면 새로 추가한다.
          for(let s=0; s<merged_match_dates.length; s++){
            var merged_match_date_item=merged_match_dates[s];
            //console.log('==>>>>기존 default dates items요소 순환 (inner for):',merged_match_date_item);
            if( special_tourlist_array_item['specifydate'] == merged_match_date_item['tour_date']){
              //console.log('====>>>날짜 겹침 매칭 기존날짜::',merged_match_date_item['tour_date']);
              merged_match_date_item['setting_times'] = special_tourlist_array_item['specifydatetimes'];
              merged_match_date_item['tour_id'] = special_tourlist_array_item['tour_id'];
              merged_match_date_item['tour_type'] = special_tourlist_array_item['tour_type'];//일반->특별로 우선순위 대체 교체진행
              merged_match_date_item['is_normal_to_special_replaced'] = true;
              is_overwraped = true;
            }
          }
          if(is_overwraped == false){
            //중복되지 않는 특별추가요소는 그 요소에 대한것으로 새로이 추가.
            merged_match_dates.push({tour_date : special_tourlist_array_item['specifydate'], tour_id: special_tourlist_array_item['tour_id'], setting_times: special_tourlist_array_item['specifydatetimes'], tour_type: special_tourlist_array_item['tour_type']}); //특정 tourdate,tourid,settingtimes,tourtype등 특별용 추가.
          }
        }
      }
      console.log('=>>>>>default matchdate and special_tourlist data mereged:',default_match_dates, merged_match_dates);

      //merged_match_dates에서 제외할..제거할 것 
      var except_special_dates=[];
      var except_date_count=0;
      for(let j=0; j<special_tourlist_array.length; j++){
        if(special_tourlist_array[j]['tour_specifyday_except'] == 1){
          //제외하려는 특별날짜 리스트만 돌린다. 제외하려는 날짜들을 저장해놓는다.

          except_special_dates[except_date_count]= special_tourlist_array[j];//제외하려는 날짜

          except_date_count++;
        }
      }
      
      var result_use_datalist=[];//서버에서 가져온 각 date날짜에 대한 정보값들을 클라이언트에서 사용하기 위한 자료구조.

      for(let r=0; r<merged_match_dates.length; r++){
        let loca_result_dateData=merged_match_dates[r];
        console.log('.>>>>>loca result dataeData:',loca_result_dateData);
        let loca_result_getyoil=week[new Date(loca_result_dateData['tour_date']).getDay()];//요일반환
        let loca_result_getday=new Date(loca_result_dateData['tour_date']).getDate();//일자반환
        let loca_result_tourid=loca_result_dateData['tour_id'];
        let loca_result_tourtype=loca_result_dateData['tour_type'];

        console.log('result_total_dataItem date, setTimes, onlydate and yoil',loca_result_dateData['tour_date'],loca_result_dateData['setting_times'],loca_result_getyoil,loca_result_getday);

        result_use_datalist[r] = {};
        result_use_datalist[r]['date'] = loca_result_dateData['tour_date'];
        result_use_datalist[r]['setTimes'] = loca_result_dateData['setting_times'];
        result_use_datalist[r]['date_yoil'] = loca_result_getyoil;
        result_use_datalist[r]['date_day'] = loca_result_getday; 
        result_use_datalist[r]['tour_id']  = loca_result_tourid;
        result_use_datalist[r]['tour_type'] = loca_result_tourtype;
      }
      console.log('+>>>>>final result_use_datalist, except_speicaldates:',result_use_datalist,except_special_dates);

      function data_ascending(a,b){
          var left = new Date(a['date']).getTime();
          var right = new Date(b['date']).getTime();

          return left > right ? 1 : -1;//왼쪽요소가 더크면 true리턴, 왼쪽요소가 더클시에 왼쪽요소를 오른쪽으로 밀어내는듯.
      }

      result_use_datalist = result_use_datalist.sort(data_ascending);//노말 매치데이터들 정렬한것 새로 리턴.

      setExcept_datelist(except_special_dates);
      setResult_usedatalist(result_use_datalist);

    }else{

    }
    
  },[]);

  
    return (
        <Container>
          <SideSubTitle title={"물건 상세"} updatePageIndex={updatePageIndex}  historyInfo={historyInfo}/>{/*상단 타이틀은 subtitle폴더에 컴포넌트로 뺐습니다*/}
          <TopDetailImg>
              <SwiperBennerWrap className="detail_swiper">
                  <Swiper
                    slidesPerView={1}
                    loop={false}
                    autoplay={true}
                    navigation={{ clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                  <SwiperSlide>
                    <DetailImg>
                      <Img src={Detail}/>
                    </DetailImg>
                  </SwiperSlide>
                  <SwiperSlide>
                    <DetailImg>
                      <Img src={Detail}/>
                    </DetailImg>
                  </SwiperSlide>
                </Swiper>
            </SwiperBennerWrap>
          </TopDetailImg>
        {/*물건투어예약 , 실거래, 허위매물 신고 버튼*/}
          <TopButtons>
            <Button onClick={ () => { updateReserveModal(except_datelist,result_usedatalist); }}>
              <Link className="data_link"/>
              <IconImg src={Exit}/>
              <ButtonTitle>물건투어예약</ButtonTitle>
            </Button>
            <Button>
              <Link className="data_link"/>
              <IconImg src={Trade}/>
              <ButtonTitle>실거래</ButtonTitle>
            </Button>
            <Button>
              <Link onClick={() => {setReport(true)}} className="data_link"/>
              <IconImg src={Report}/>
              <ButtonTitle>허위매물신고</ButtonTitle>
            </Button>
          </TopButtons>

          <TopMainInfoBox>
            <LikeBox>
              <CheckBox type="checkbox" name="" id="Like"/>
              <CheckLabel for="Like"/>
            </LikeBox>
            <Number>등록번호 1234567889</Number>
            <ExclusiveBox>
              <Green>전속</Green>
              <WrapDate>
                <StartDate>20.00.00</StartDate>
                <Line>~</Line>
                <EndDate>20.00.00</EndDate>
              </WrapDate>
            </ExclusiveBox>
            <ItemInfo>
              <Name>
                <Kind>아파트</Kind>
                <Address>자이 109동</Address>
              </Name>
              <Price>전세 12억 5,000</Price>
              <Desc>매물특징 칸입니다. 작은 설명 칸입니다.</Desc>
            </ItemInfo>
          </TopMainInfoBox>
    <WrapAllInfos>
        {/*물건*/}
          <WrapItemInfo>
            <TitleBox onClick={()=>{setSlideUp(!slideUp)}}>
              <Title>물건</Title>
              <ArrowImg src={Arrow}/>
            </TitleBox>
            {
              slideUp ?
              <ItemInfoList>
                <Li>
                  <SubTitle>해당층/총층</SubTitle>
                  <SubDesc>4/20층</SubDesc>
                </Li>
                <Li>
                  <SubTitle>공급/전용면적</SubTitle>
                  <SubDesc>60/52.89m²
                  <Link>
                    <ChangeMImg src={ChangeM}/>
                  </Link>
                  </SubDesc>
                </Li>
                <Li>
                  <SubTitle>방/욕실 수</SubTitle>
                  <SubDesc>2/1개</SubDesc>
                </Li>
                <Li>
                  <SubTitle>방향</SubTitle>
                  <SubDesc>방향</SubDesc>
                </Li>
                <Li>
                  <SubTitle>현관구조</SubTitle>
                  <SubDesc>현관구조</SubDesc>
                </Li>
                <Li>
                  <SubTitle>난방</SubTitle>
                  <SubDesc>난방</SubDesc>
                </Li>
              </ItemInfoList>
              :
              null
            }



            <ToggleOpenClose>
              <Text>접기</Text>
            </ToggleOpenClose>
          </WrapItemInfo>
      {/*거래*/}
          <WrapTradeInfo>
            <TitleBox>
              <Title>거래</Title>
              <ArrowImg src={Arrow}/>
            </TitleBox>
            <ItemInfoList>
              <Li>
                <SubTitle>관리비</SubTitle>
                <SubDesc>5만원</SubDesc>
              </Li>
              <Li>
                <SubTitle>관리비 포함</SubTitle>
                <SubDesc>전기, 가스, 수도, 인터넷, 티비</SubDesc>
              </Li>
              <Li>
                <SubTitle>입주가능일</SubTitle>
                <SubDesc>2016.05.10 </SubDesc>
              </Li>
              <Li>
                <SubTitle>계약갱신청구권행사여부 확인</SubTitle>
                <SubDesc>확인</SubDesc>
              </Li>
              <Li>
                <SubTitle>융자금</SubTitle>
                <SubDesc>00원</SubDesc>
              </Li>
              <Li>
                <SubTitle>기보증금/월세</SubTitle>
                <SubDesc>-</SubDesc>
              </Li>
            </ItemInfoList>
            <ToggleOpenClose>
              <Text>접기</Text>
            </ToggleOpenClose>
          </WrapTradeInfo>

        {/*옵션*/}
            <WrapOptionInfo>
              <TitleBox>
                <Title>옵션</Title>
                <ArrowImg src={Arrow}/>
              </TitleBox>
              <ItemInfoList>
                <Li>
                  <SubTitle>공간</SubTitle>
                  <SubDesc>발코니</SubDesc>
                </Li>
              </ItemInfoList>
            </WrapOptionInfo>

          {/*매물설명*/}
            <WrapOptionInfo>
              <TitleBox>
                <Title>매물설명</Title>
                <ArrowImg src={Arrow}/>
              </TitleBox>
              <ItemInfoList>
                <Li>
                  <TextArea>
                  [ 위 치 / 교통 ]  <br/><br/>
                  ㅇ 논현동 서울세관 블럭에 위치한 신축 2룸입니다<br/><br/>
                  ㅇ 7호선 강남구청역 <br/><br/>
                  [ 인테리어/특징 ]  <br/><br/>
                  ㅇ 건물외관부터 내부관리상태 A급으로 유지중입니다^_^<br/><br/>
                  ㅇ 고급마감재사용 및 옵션으로 고풍스러운 실내분위기연출<br/><br/>
                  ㅇ 채광이 좋아 밝고 화사한 분위기로 아주 세련된 투룸입니다<br/><br/>
                  ㅇ 2룸구조에 침실과 드레스룸으로 꾸며져 있어 수납이 정말 좋습
                  니다<br/><br/>
                  </TextArea>
                </Li>
              </ItemInfoList>
              <ToggleOpenClose>
                <Text>접기</Text>
              </ToggleOpenClose>
            </WrapOptionInfo>

        {/*단지&건물*/}
            <WrapTradeInfo>
              <TitleBox>
                <Title>단지/건물</Title>
                <ArrowImg src={Arrow}/>
              </TitleBox>
              <ItemInfoList>
                <Li>
                  <SubTitle>사용승인일</SubTitle>
                  <SubDesc>2016.05.10 </SubDesc>
                </Li>
                <Li>
                  <SubTitle>총세대수</SubTitle>
                  <SubDesc>300 세대</SubDesc>
                </Li>
                <Li>
                  <SubTitle>총주차대수</SubTitle>
                  <SubDesc>21대 /  세대당 0.55대 협의주차</SubDesc>
                </Li>
              </ItemInfoList>
            </WrapTradeInfo>
        {/*위치*/}
            <WrapTradeInfo>
              <TitleBox>
                <Title>위치</Title>
                <ArrowImg src={Arrow}/>
              </TitleBox>
              <ItemInfoList>
                <Li>
                  <MapAddress>강남구 논현동 104-5</MapAddress>
                  <ChangeAddress>
                    <ChangeImg src={Change}/>
                    <ChangeTxt>도로명</ChangeTxt>
                  </ChangeAddress>
                </Li>
              </ItemInfoList>
              <MapArea>
                <KakaoMapSide />
              </MapArea>
            </WrapTradeInfo>
        </WrapAllInfos>
        {/*전문중개사 정보*/}
        <BrokerInfo>
            <TopBox>
              <Tag>아파트·현대아이리스</Tag>
              <Tag>상가</Tag>
              <Tag>사무실</Tag>
            </TopBox>
            <MiddleBox>
              <LeftContent>
                <BrokerInfoDetail>
                  <BrokerName>럭키 공인중개사</BrokerName>
                  <BrokerAddress>강남구 논현동 104-5</BrokerAddress>
                  <SellList>
                    <List>매매 <ColorOrange>2</ColorOrange></List>
                    <Part/>
                    <List>전세 <ColorOrange>7</ColorOrange></List>
                    <Part/>
                    <List>월세 <ColorOrange>9</ColorOrange></List>
                  </SellList>
                </BrokerInfoDetail>
              </LeftContent>
              <RightContent>
                <ItemImg src={Profile}/>
              </RightContent>
            </MiddleBox>
            <BottomBox>
              <ToCall>
                <Link className="data_link"/>
                <BottomImg src={Call}/>
                <BottomTxt>전화 상담</BottomTxt>
              </ToCall>
              <LongPart/>
              <ToChat>
                <Link className="data_link"/>
                <BottomImg src={Chat}/>
                <BottomTxt>채팅 상담</BottomTxt>
              </ToChat>
            </BottomBox>
        </BrokerInfo>
        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
const TopDetailImg = styled.div`
  width:100%;
`
const SwiperBennerWrap = styled.div`
  width:100%;
`
const DetailImg = styled.div`
  width:100%;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(428/428));
    object-fit:cover;
  }
`
const Img = styled.img`
  width:100%;
  object-fit:cover;
`
const TopButtons = styled.div`
  width:100%;
  margin:18px auto;
  display:flex;justify-content:center;align-items:center;
  @media ${(props) => props.theme.mobile} {
    margin:calc(100vw*(16/428)) auto;
  }
`
const Button = styled.div`
  position:relative;
  display:flex;justify-content:center;align-items:center;
  border:1px solid #e4e4e4;
  text-align:center;
  padding:17.5px 12.5px;
  margin-right:5px;
  &:last-child{margin-right:0;}
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(17.5/428)) calc(100vw*(15/428));
    margin-right:calc(100vw*(5/428));
  }
`
const IconImg = styled.img`
  display:inline-block;
  width:20px;height:20px;
  margin-right:6px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));height: calc(100vw*(20/428));
    margin-right:calc(100vw*(5/428));
  }
`
const ButtonTitle = styled.p`
  font-size:13px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
  }
`

const TopMainInfoBox = styled.div`
  position:relative;
  width:100%;
  margin:0 auto;
  border-top:1px solid #f2f2f2;
  padding:20px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(383/428));
    padding:calc(100vw*(20/428)) 0 calc(100vw*(20/428)) calc(100vw*(13/428));
  }
`
const LikeBox = styled.div`
  position:absolute;
  right:20px;top:15px;
  @media ${(props) => props.theme.mobile} {
    right:0;top:calc(100vw*(15/428));
  }
`
const CheckBox = styled.input`
  display:none;
  &:checked+label{background:url(${Checked}) no-repeat center center;background-size:26px 25px;}
  @media ${(props) => props.theme.mobile} {
    &:checked+label{background:url(${Checked}) no-repeat center center;background-size:calc(100vw*(22/428)) calc(100vw*(20/428));}
  }
`
const CheckLabel = styled.label`
  display:inline-block;
  width:40px;height:40px;
  border-radius: 3px;
  border: solid 1px #d0d0d0;
  background:url(${Check}) no-repeat center center;background-size:26px 25px;
  @media ${(props) => props.theme.mobile} {
    background-size:calc(100vw*(22/428)) calc(100vw*(20/428));
    width:calc(100vw*(40/428));height:calc(100vw*(40/428));
  }

`
const Number = styled.p`
  font-size:12px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
  }
`
const ExclusiveBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:175px;
  height:25px;
  padding: 6px 15px;
  border: solid 1px #2b664d;
  margin:8px 0 12px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(163/428));
    height:calc(100vw*(25/428));
    padding:calc(100vw*(6/428)) calc(100vw*(10/428));
  }
`
const Green = styled.div`
  font-size:12px;color:#2b664d;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(11/428));
  }
`
const WrapDate = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  margin-left:8px;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(8/428));
  }
`
const StartDate = styled(Green)`
  color:#707070;
`
const Line = styled(StartDate)`
`
const EndDate = styled(StartDate)`
`
const ItemInfo = styled.div`

`
const Name = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  margin-bottom:10px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(7/428));
  }
`
const Kind = styled(StartDate)`
`
const Address = styled.div`
  font-size:21px;font-weight:800;
  transform:skew(-0.1deg);
  color:#2b664d;margin-left:8px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(21/428));
    margin-left:calc(100vw*(8/428));
  }

`
const Price = styled.div`
font-size:26px;font-weight:800;
transform:skew(-0.1deg);
color:#4a4a4a;
@media ${(props) => props.theme.mobile} {
  font-size:calc(100vw*(26/428));
}
`
const Desc = styled.div`
  border-top:1px solid #f2f2f2;
  margin-top:20px;
  padding-top:22px;
  font-size:15px;color:#707070;font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(25/428));
    padding-top:calc(100vw*(22/428));
    font-size:calc(100vw*(15/428));
  }
`
const WrapAllInfos = styled.div`
  width:100%;
  border-top:8px solid #e4e4e4;
  border-bottom:8px solid #e4e4e4;
`

const WrapItemInfo = styled.div`
  width:100%;
`
const TitleBox = styled.div`
  width:100%;
  padding:20px 30px;
  display:flex;justify-content:space-between;align-items:center;
  border-top:1px solid #f2f2f2;border-bottom:1px solid #f2f2f2;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(20/428)) calc(100vw*(30/428));
  }
`
const Title = styled.h3`
  font-size:20px;color:#4a4a4a;font-weight:800;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(20/428));
  }
`
const ArrowImg = styled.img`
  width:10px;
  transform:rotate(270deg);
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(10/428));
  }
`
const ItemInfoList = styled.ul`
  width:100%;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(383/428));
  }
`
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
const ToggleOpenClose = styled.div`
  width:100%;
  padding:16px 0;
  background:#fbfbfb;
  text-align:center;
  cursor:pointer;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(16/428)) 0;
  }
`
const Text = styled.p`
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);

  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`

const WrapTradeInfo = styled(WrapItemInfo)`
  border-top:none;
`
const WrapOptionInfo = styled(WrapItemInfo)`
  border-top:none;
`
const TextArea = styled.div`
  font-size:15px;font-weight:600;
  transform:skew(-0.1deg);color:#4a4a4a;
  line-height:1.33;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const MapAddress = styled.div`
  font-size:15px;color:#4a4a4a;font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const ChangeAddress = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  cursor:pointer;
`
const ChangeImg = styled.img`
  display:inline-block;
  width:13px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(13/428));
  }
`
const ChangeMImg = styled.img`
  width:20px;margin-left:10px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    margin-left:calc(100vw*(10/428));
  }
`
const ChangeTxt = styled.p`
  font-size:10px;font-weight:800;transform:skew(-0.1deg);
  color:#979797;margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(10/428));
    margin-left:calc(100vw*(5/428));
  }
`

//  kakao map wrap
const MapArea = styled.div`
  width:100%;height:315px;
  background:#eee;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(312/428));
  }
`
const BrokerInfo = styled.div`
  width:100%;padding:0 16px;
  margin-top:43px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(40/428));
    padding:0 calc(100vw*(16/428));
  }
`
const TopBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  flex-wrap:wrap;
  width:100%;
  margin-bottom:14px;
  padding-left:30px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(14/428));
    padding-left:calc(100vw*(20/428));
  }
`
const Tag = styled.div`
  border-radius: 15px;
  border: solid 1px #e4e4e4;
  background-color: #f8f7f7;
  height:30px;
  padding:7px 16px;
  margin-right:5px;
  font-size:15px;color:#01684b;
  font-weight:600;transform:skew(-0.1deg);
  text-align:center;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    padding:calc(100vw*(6/428)) calc(100vw*(10/428));
    font-size:calc(100vw*(15/428));margin-right:calc(100vw*(5/428));
  }
`
const MiddleBox = styled.div`
  padding:0 30px;
  display:flex;justify-content:space-between;align-items:center;
  @media ${(props) => props.theme.mobile} {
    padding:0 calc(100vw*(20/428));
  }
`
const LeftContent = styled.div`
`
const BrokerInfoDetail = styled.div`
`
const BrokerName = styled.div`
  font-size:25px;font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(25/428));
    margin-bottom:calc(100vw*(13/428));
  }
`
const BrokerAddress = styled.div`
  display:inline-block;
  font-size:15px;color:#4a4a4a;
  font-weight:700;transform:skew(-0.1deg);
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(13/428));
  }
`

const ColorOrange = styled.span`
  display:inline-block;
  font-size:15px;color:#fe7a01;
  vertical-align:middle;
  margin-left:3px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-left:calc(100vw*(3/428));
  }
`
const SellList = styled.div`
  width:100%;display:flex;
  justify-content:flex-start;align-items:center;
`
const List = styled(ColorOrange)`
  color:#4a4a4a;
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(7/428));
  }
`
const Part = styled.div`
  display:inline-block;
  width:1px;height:12px;
  background:#4a4a4a;
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(7/428));
    height:calc(100vw*(10/428));
  }
`

const RightContent = styled.div`
  position:relative;
  width:95px;height:95px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(95/428));
    height:calc(100vw*(95/428));;
  }
`
const ItemImg = styled.img`
  width:100%;height:100%;
  border-radius:100%;
`
const BottomBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:100%;
  height: 84px;
  margin:60px 0 30px;
  border-radius: 20px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 3px #efefef;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(84/428));
    margin:calc(100vw*(60/428)) 0 calc(100vw*(30/428));
  }
`
const ToCall = styled.div`
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
`
const BottomImg = styled.img`
  width:20px;height:20px;
  display:inline-block;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));
  }
`
const BottomTxt = styled.p`
  font-size:18px;font-weight:600;
  transform:skew(-0.1deg);margin-left:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(18/428));
    margin-left:calc(100vw*(10/428));
  }
`
const ToChat = styled(ToCall)`
`
const LongPart = styled.p`
  width:1px;height:30px;background:#979797;
  margin:0 50px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    margin:0 calc(100vw*(20/428));
  }
`
