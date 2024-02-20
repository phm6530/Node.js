import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const CalendarWrap = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
`;

const CalendarHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const RenderCellWrap = styled.div`
    background: #fff;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const CalendarDay = styled.div`
    flex: 1 1 14.28%; 
    box-sizing: border-box;
    text-align: center; 
    padding: 10px; 
    border: 1px solid #ddd; 
    &.active{
      background: rgba(0,0,0,0.2);
    }
`;

const RenderPrevStyle = styled(CalendarDay)`
    opacity: .2;
`


// cell 뿌리기
const RenderCell = ({ currentYear, currentMonth , selectDay, listData ,  onClickSelector}) => {

    //이번달 Div 구하기
    const getLastDayOfMonth =(year, month)=> {    
        const ThisMonthDate = new Date(year, month, 0).getDate();
        const getDayArr = Array.from({length : ThisMonthDate}, (_, idx) => `${idx + 1}`);
        return getDayArr.sort((a,b)=> a - b);
    }

    // 전월 Div 구하기
    const getPrevDayofElement = (year, month) =>{
        const firstDayOfWeek = new Date(year, month - 1  , 1).getDay();
        const prevLastDate = new Date(year, month - 1, 0);
        const LastDate = firstDayOfWeek !== 0 ? Array.from({length: firstDayOfWeek}, (_, idx)=> prevLastDate.getDate() - idx) : null ;
        return LastDate;
    }

    //다음달 DIv 구하기
    const getNextDayofElement = (year, month) =>{
        const LastDay = new Date(year,month, 0).getDay();
        
        if(LastDay === 6){
            return null;
        }
        return Array.from({length : 6 - LastDay}, (_,idx)=> idx + 1);
    }

    // 랜더
    const RenderPrevDate = getPrevDayofElement(currentYear, currentMonth);
    const RenderDate = getLastDayOfMonth(currentYear, currentMonth);
    const RenderLastDate = getNextDayofElement(currentYear, currentMonth);

    const ListKeys = listData && Object.keys(listData);

    const Dateformetting = (date) =>{
        const formetting = new Date(date).toDateString();
        return formetting;
    }

    // 일자 갯수 구하기
    return (
        <RenderCellWrap>
            {RenderPrevDate && RenderPrevDate.map(day => <RenderPrevStyle  key={`prev-${day}`}> {day}일</RenderPrevStyle>)}
            {RenderDate.map(day => 
                {
                    const confirmDay = `${currentYear}-${currentMonth}-${day}`;
                    return (
                        <CalendarDay  
                            className={selectDay === confirmDay && 'active'} 
                            onClick={()=>onClickSelector(`${currentYear}-${currentMonth}-${day}`)} 
                            key={`this-${day}`}>
                                <span>{day}일</span>
                                {
                                    ListKeys && ListKeys.map((e)=>{
                                        return  Dateformetting(e) ===  Dateformetting(confirmDay) ? 'c' : null
                                    })
                                }
                        </CalendarDay>
                    )
                }
            )}
            {RenderLastDate && RenderLastDate.map(day => <RenderPrevStyle key={`next-${day}`}> {day}일</RenderPrevStyle>)}
        </RenderCellWrap>  
    );
};

// Header 컴포넌트
const RenderHeader = () =>{
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return(
          <CalendarHeader>
                {DAYS.map((day, idx) => <CalendarDay key={idx}>{day}</CalendarDay>)}
        </CalendarHeader>
    )
}

const RenderNav = ({
   currentMonth, setCurrentMonth,
    currentYear, setCurrentYear 
}) =>{
    const navigate =useNavigate();
    const {pathname} =useLocation();

    // 월 변경 핸들러
    const handleMonthChange = (type) => {

        if (type === 'next') {
            if (currentMonth === 12) {
                setCurrentYear(+currentYear + 1);
                setCurrentMonth(1);
                navigate(`${pathname}?year=${+currentYear + 1}&month=${1}`);
            } else {
                navigate(`${pathname}?year=${+currentYear}&month=${+currentMonth + 1}`);
                setCurrentMonth(+currentMonth + 1);
            }
        } else {
            if (currentMonth === 1) {
                setCurrentYear(+currentYear - 1);
                setCurrentMonth(12);
                navigate(`${pathname}?year=${+currentYear - 1}&month=${12}`);
            } else {
                setCurrentMonth(+currentMonth - 1);
                navigate(`${pathname}?year=${+currentYear}&month=${+currentMonth - 1}`);
            }
        }
       
    };

    return(
        <>
               {currentYear}년
                <button onClick={() => handleMonthChange('prev')}>prev</button>
                <button onClick={() => handleMonthChange('next')}>next</button>
            <h1>{currentMonth}월</h1>
        </>
    )
}

export default function Calendar({
    className , 
    selectDay , 
    listData , 
    setSelectDay,
    currentYear,
    setCurrentMonth,
    currentMonth,
    setCurrentYear
}) {



    const onClickSelector = (day) =>{
        setSelectDay(day);
    }


    return (
            <CalendarWrap className={className}>

                {/* Clanedar Nav */}
                <RenderNav
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    currentYear={currentYear}
                    setCurrentYear={setCurrentYear}
                />

                {/* Calenader Header */}
                <RenderHeader
                    selectDay={selectDay}
                />

                {/* Calenader Body */}
                <RenderCell
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    onClickSelector={onClickSelector}
                    selectDay={selectDay}
                    listData={listData}
                />
             
                
            </CalendarWrap>
      
    );
}
