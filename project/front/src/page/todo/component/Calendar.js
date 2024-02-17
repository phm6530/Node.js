import { useState } from 'react';
import styled from 'styled-components';

const CalendarWrap = styled.div`
    display: flex;
`

const CalendarHeader =styled.div`
    display: flex;
`

const CalendarBody = styled.div`

`

const CalendarDay = styled.div`

`

export default function Calendar(){
    const date = new Date();
    const [ Month , setMonth  ] = useState(date.getMonth() + 1);    
    const [ Year , setYear ] = useState(date.getFullYear());

    // 2월 때문에 넣은 윤년.. 계산법모름 그냥 붙여넣음
    // function FebruaryLastDay(year) {
    //     return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    // }

    // 일
    const DAYS = ['Sun','Mon','Tue','Web','Thu','Fri','Sat'];

    function getLastDayOfMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    //일자 갯수구하기
    const MonthArr = [...Array(getLastDayOfMonth(Year, Month)).keys()];
    console.log(MonthArr);


    // Click Handler 
    const MonthHandler = (type) => {
        if (type === 'next') {
            if (Month === 12) {
                setYear(Year + 1);
                setMonth(1);
            } else {
                setMonth(Month + 1);
            }
        } else {
            if (Month === 1) {
                setYear(Year - 1);
                setMonth(12);
            } else {
                setMonth(Month - 1);
            }
        }
    }

    return(
        <>
        {/* header */}
        <CalendarWrap>
            {/* 월별 */}
            <CalendarHeader>
                {Year}년
                <button onClick={()=>MonthHandler('prev')}>prev</button>
                <button onClick={()=>MonthHandler('next')}>next</button>
                <h1>{Month}월</h1>
                {DAYS.map((day, idx)=> <div key={idx}>{day}</div>)}
            </CalendarHeader>
            
            <CalendarBody>
                {
                    MonthArr.map((_ , idx)=>{
                        return <CalendarDay key={idx}>{idx}일</CalendarDay>
                    })
                }
            </CalendarBody>
        </CalendarWrap>
            
        </>
    )
}