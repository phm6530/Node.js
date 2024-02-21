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
const RenderCell = ({ paramYear, paramMonth , selectDay, listData ,  onClickSelector}) => {

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
    const RenderPrevDate = getPrevDayofElement(paramYear, paramMonth);
    const RenderDate = getLastDayOfMonth(paramYear, paramMonth);
    const RenderLastDate = getNextDayofElement(paramYear, paramMonth);

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
                    const confirmDay = `${paramYear}-${paramMonth}-${day}`;
                    return (
                        <CalendarDay  
                            className={selectDay === confirmDay && 'active'} 
                            onClick={()=>onClickSelector(`${paramYear}-${paramMonth}-${day}`)} 
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
   paramMonth, paramYear
}) =>{
    const navigate =useNavigate();
    const {pathname} =useLocation();

    // 월 변경 핸들러
    const handleMonthChange = (type) => {
        
        if (type === 'next') {
            if (+paramMonth === 12) {
                navigate(`${pathname}?year=${+paramYear + 1}&month=${1}`);
            } else {
                navigate(`${pathname}?year=${+paramYear}&month=${+paramMonth + 1}`);
            }
        } else {
            if (+paramMonth === 1) {
                navigate(`${pathname}?year=${+paramYear - 1}&month=${12}`);
            } else {
                navigate(`${pathname}?year=${+paramYear}&month=${+paramMonth - 1}`);
            }
        }
       
    };

    return(
        <>
               {paramYear}년
                <button onClick={() => handleMonthChange('prev')}>prev</button>
                <button onClick={() => handleMonthChange('next')}>next</button>
            <h1>{paramMonth}월</h1>
        </>
    )
}

export default function Calendar({
    className , 
    selectDay , 
    listData , 
    setSelectDay,
    paramYear,
    paramMonth
}) {

    const onClickSelector = (day) =>{
        setSelectDay(day);
    }


    return (
            <CalendarWrap className={className}>

                {/* Clanedar Nav */}
                <RenderNav
                    paramMonth={paramMonth}
                    paramYear={paramYear}
                />

                {/* Calenader Header */}
                <RenderHeader
                    selectDay={selectDay}
                />

                {/* Calenader Body */}
                <RenderCell
                    onClickSelector={onClickSelector}
                    selectDay={selectDay}
                    listData={listData}
                    paramYear={paramYear}
                    paramMonth={paramMonth}
                />
             
                
            </CalendarWrap>
      
    );
}
