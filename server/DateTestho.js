let currenttime= new Date('2021-05-10');

console.log('origin currentTime date:',currenttime);

let i=0;
while(i<=100){
    currenttime= new Date(currenttime.setDate(currenttime.getDate() + 1));

    console.log('>>>currenttime 연산 now>>',currenttime,currenttime.getFullYear(),currenttime.getMonth()+1,currenttime.getDate(),currenttime.getDay());
    i++;
}