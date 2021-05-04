
console.log('현재 날짜값:',new Date().getFullYear(),new Date().getMonth(),new Date().getDate());

let year=new Date().getFullYear();
let month=new Date().getMonth()+1;//5월:4 12월:11
let day=new Date().getDate();
//현재 년,월,일 구한다. 그 현재 년월일을 구하낟.

let i=0;
var nowtime=new Date();
while(i<20){

    console.log('nowtime::',nowtime.getFullYear()+' '+(nowtime.getMonth()+1)+' '+nowtime.getDate()+' '+nowtime.getDay());

    switch(nowtime.getDay()){
        case 0:
            console.log('일요일');
        break;
        case 1:
            console.log('월요일');
        break;
        case 2:
            console.log('화요일');
        break;
        case 3:
            console.log('수요일');
        break;
        case 4:
            console.log('목요일');
        break;
        case 5:
            console.log('금요일');
        break;
        case 6:
            console.log('토요일');
        break;
    }
    nowtime = new Date(nowtime.setDate(nowtime.getDate() + 1));

    console.log('20210429요일>>>:',new Date('2021-04-29').getDay());
    i++;
}

