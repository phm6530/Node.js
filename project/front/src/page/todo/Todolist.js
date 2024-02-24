import DashBoard from '../../component/ui/DashBoard';
import Gird from '../../component/ui/Grid';
import styled from 'styled-components';
import BannerCommon from '../../component/ui/BannerCommon';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import Calendar from './component/Calendar';
import Schedule from './component/Schedule';
import alertThunk from '../../store/alertTrunk';
import FadeinComponent from '../../FadeinComponent';

import { useEffect, useState  } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { scheduleFetch } from './ScheduleFetch';
import { TodaySeletor } from './component/TodaySeletor';

//그래프
import ReactChat from 'react-apexcharts';

const CalenaderGrid = styled(Gird)`
    padding-top: 150px;
`

const PageSubText = styled.div`
    color:#fff;
    font-size: 20px;
    margin-bottom: 70px;
    text-shadow: 0px 5px 5px rgba(0,0,0,.4);
    p{
        font-size: 14px;
        color: #fff;
        opacity: .7;
        padding-top: 20px;
    }
`
const ContentsWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const CalendarStyle = styled(Calendar)`
    width: 30%;
`
const SummeryStyle = styled.div`
    background: #fff;
    border-radius: 1em;
    flex-grow: 1;
    margin: 0 20px;
`

const DdayList = styled.div`

`

const DdayItemStyle = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 15px;
    border-radius: .5em;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1);
    p{
        font-size:14px;
        padding-bottom: 6px;
    }
    span{
        font-weight: bold;
        margin-left: auto;
    }
`

const DdayItem = () =>{

    return(
        <DdayItemStyle>
            <p>정보처리기사 실기시험</p>
            <span>D-day</span>
        </DdayItemStyle>
    )
}
             


const ScheduleSummary = () =>{
    return(
        <SummeryStyle>
            <DdayItem/>
            <DdayItem/>
            <DdayItem/>
        </SummeryStyle>
    )
}


const StopWatch = styled.div`
    .time{
        color: #fff;
        font-weight: bold;;
        font-size: 50px;
    }
    width: 100%;
    display: flex;
    align-items: flex-end;
`

const StudyTimer = () =>{
    const [ timer , setTimer ] = useState({
        Hour: 0,
        minit : 0,
        second: 0
    })
    const [ id , setId ] = useState();
    
    console.log(timer);
    
    //Timer Func
    const TimerFunc = () =>{
        const timer = setInterval(()=>{
            setTimer(prev => { 
                let NextSeond = prev.second + 1;
                let NextMinit = prev.minit;
                let NextHour = prev.Hour;

                if(NextSeond === 60){
                    NextMinit++;
                    NextSeond = 0;
                }

                if(NextMinit === 60){
                    NextHour ++;
                    NextMinit = 0;
                }
     

                return {...prev , Hour : NextHour , minit : NextMinit , second : NextSeond}
            });
        },1000);
        setId(timer);
        return timer;
    }

    //setting Timer
    useEffect(()=>{
        const timer = TimerFunc();
        return () => clearInterval(timer)
    },[]);

    // Start Timer
    const startTimer = () =>{
        const timer = TimerFunc();
        setId(timer)
    }

    // End Timer
    const endTimer = () =>{
        clearInterval(id);
    }

    const TimerFormetting = (target) =>{
        return String(target).padStart(2,0);
    }
    
    return(
        <>
            <StopWatch>
                <div className="time">
                    {TimerFormetting(timer.Hour)} : {TimerFormetting(timer.minit)} : {TimerFormetting(timer.second)}
                </div>
                <button onClick={()=>startTimer()}>START</button>
                <button onClick={()=>endTimer()}>STOP</button>
            </StopWatch>

        </>
    )
}

export default function Todolist(){
    const today = TodaySeletor();//오늘날짜 계산
    const [ selectDay , setSelectDay ] = useState(today());
    const [ param ] = useSearchParams(new URL(window.location).searchParams);


    
    const getYear = param.get('year') || today().split('-')[0];
    const getMonth = param.get('month') || today().split('-')[1];
    // const getDay = param.get('Day') || today().split('-')[2];
    


    //FetchData
    const [ listData , setListData ] = useState();    
    const dispatch = useDispatch();

    console.log(listData);

    useQuery(['Schedule' , getMonth ], ()=>scheduleFetch(getYear , getMonth),{
        refetchOnWindowFocus:false,
        onSuccess : (data) =>{
            setListData(data.restResponseData);
        },
        onError : (error) =>{
            dispatch(alertThunk(error.message , 0));
        }
    });

    return(
        <>
            <DashBoard page={'Calendar'}></DashBoard>
            <CalenaderGrid>

                {/* header */}
                <BannerCommon.BannerPoint>
                    <img src="img/calendar.png" alt="calendar" />
                    MY STUDY
                </BannerCommon.BannerPoint>

               <DashBoardTitle><b>MY SCHEDULE</b></DashBoardTitle>
               <PageSubText>
                웹 퍼블리셔 4년차, 프로젝트 활동을 기록합니다. <br></br>더 넓은 지식을 위해 React, Node.js를 학습 중에 있습니다.<br></br>
                <p>*전 회사의 공개 가능한 프로젝트 / 개인 작업물만 공유합니다.</p>
                </PageSubText> 
                <FadeinComponent>
                    <ContentsWrap>

                        <StudyTimer/>
                        {/* body */}
                        <CalendarStyle 
                            setSelectDay={setSelectDay}
                            listData={listData}
                            selectDay={selectDay}
                            paramYear={getYear}
                            paramMonth={getMonth}
                        />
                        <ScheduleSummary/>
               
                        
                        {/* Schedule */}
                        <Schedule
                            selectDay={selectDay}
                            listData={listData}
                            setSelectDay={setSelectDay}
                        />
                        
                    

                    </ContentsWrap>
                </FadeinComponent>
                
            </CalenaderGrid>
        </>
    )
}