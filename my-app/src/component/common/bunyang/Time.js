import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState , useEffect} from 'react'


function Time() {

    const [startDate, setStartDate] = useState(new Date());
    const [Stime, setStime] = useState(60); // 선택 간격 받기...
    
    const con = (date)=>{
        setStartDate(date)
    }

    const change =(e)=>{
      setStime(e.target.value)
    }

  return (
      <>
        <DatePicker
          selected={startDate}
          onChange={con}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={Stime}  // 분양 세팅 설정 = 간격
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
   </>
  );
}
export default Time;