import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const CalendarWrap = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 20px;
    border-radius: 1rem;
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
    padding: 1.0rem 0rem;
    font-size: 14px;
    cursor: pointer;
    &.hasSchedule{
        span{
            position: relative;
            &::after{
                background: red;
                position: absolute;
                display: block;
                content: "";
                width: 3px;
                height: 3px;
                border-radius: 1em;
                left: 50%;
                transform: translate(-50%);
            }
        }
     
    }
    &.active{
        background: rgba(0,0,0,0.02);
        border-radius: 5em;
        font-weight: bold;
    }
`;

const CalendarDate = styled.div`
    flex: 1 1 14.28%;
    box-sizing: border-box;
    text-align: center;
    
    font-size: 14px;
    ${props => {
            switch(props.$headeridx){
                case 0 :
                    return 'color: #dd8a8a' 
                case 6 :
                    return 'color: #6a9dff' 
                default : 
                    return null;
            }
    } }

`

const CalendarDateWrap = styled.div`
        box-shadow: 0px 15px 65px rgba(0,0,0,0.04);
        border-radius: 1em;
`

const RenderPrevStyle = styled(CalendarDay)`
    opacity: .2;
`

const CalendarNavWarp = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    .ThisMonthWrap{
        padding-bottom: 30px;
        p{
            opacity: .5;
            text-align: center;
        }
    }

    button svg{
        font-size: 30px;
    }
`

const MonthNav = styled.div`
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        font-size: 16px;
        opacity: .5;
    }
    
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
            {RenderPrevDate && RenderPrevDate.map(day => <RenderPrevStyle  key={`prev-${day}`}> {day}</RenderPrevStyle>)}
            {RenderDate.map(day => 
                {
                    const confirmDay = `${paramYear}-${paramMonth}-${day}`;
                    const hasSchedule = (confirmDay) =>{
                        //Some은 element index array로 매개변수로 순회하며 하나라도 있으면 true false 반환
                        return ListKeys?.some((e)=> Dateformetting(e) === Dateformetting(confirmDay))
                    }
                    return (
                        <CalendarDay  
                            className={`${selectDay === confirmDay && 'active'} ${hasSchedule(confirmDay) && 'hasSchedule'}`} 
                            onClick={()=>onClickSelector(`${paramYear}-${paramMonth}-${day}`)} 
                            key={`this-${day}`}>
                                <span>{day}</span>
                                {
                                   
                                }
                        </CalendarDay>
                    )
                }
            )}
            {RenderLastDate && RenderLastDate.map(day => <RenderPrevStyle key={`next-${day}`}> {day}</RenderPrevStyle>)}
        </RenderCellWrap>  
    );
};


// Header 컴포넌트
const RenderHeader = () =>{
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return(
          <CalendarHeader>
                {DAYS.map((day, idx) => <CalendarDate key={idx} $headeridx={idx}>{day}</CalendarDate>)}
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

    // 월
    const monthArr = ['January' , 'February', 'March' , 'April' , 'May' ,'June', 'July' , 'August' ,'September' ,'October' , 'November' ,'December'];
    return(
                <CalendarNavWarp>
                        <button onClick={() => handleMonthChange('prev')}>
                            <MdOutlineKeyboardArrowLeft/></button>

                    <MonthNav>
                        <span>{monthArr[+paramMonth - 1]}</span>
                        <p>{paramYear}</p>
                    </MonthNav>

                        <button onClick={() => handleMonthChange('next')}><MdOutlineKeyboardArrowRight/></button>
                  
                    
                    
                </CalendarNavWarp>
                
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
                
                <CalendarDateWrap>
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
                </CalendarDateWrap>
                
            </CalendarWrap>
      
    );
}
