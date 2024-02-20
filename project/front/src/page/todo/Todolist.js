import DashBoard from '../../component/ui/DashBoard';
import Gird from '../../component/ui/Grid';
import styled from 'styled-components';
import BannerCommon from '../../component/ui/BannerCommon';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import Calendar from './component/Calendar';
import Schedule from './component/Schedule';
import alertThunk from '../../store/alertTrunk';
import FadeinComponent from '../../FadeinComponent';

import { useState , useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useSearchParams , useLocation, useNavigate } from 'react-router-dom';
import { scheduleFetch } from './ScheduleFetch';
import { TodaySeletor } from './component/TodaySeletor';

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
`

const CalendarStyle = styled(Calendar)`
    width: 50%;
`

export default function Todolist(){
    const [ selectDay , setSelectDay ] = useState();
    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();
    const { pathname } = useLocation();
    const [ param , setParam ] = useSearchParams(new URL(window.location).searchParams);
    const navigate = useNavigate();


    const getYear = param.get('year');
    console.log('getYear: ',getYear);
    
    // useEffect(()=>{
    //     console.log(param);
    //     if(!param.size){
    //         navigate(`${pathname}?year=${currentYear}&month=${currentMonth}`);
    //     }
        
    // },[currentMonth , navigate , pathname ,  currentYear]);

    
    //초기 Today 및 버튼 설정
    useEffect(()=>{
        const today = TodaySeletor();
        setSelectDay(today());
        if(!param.size){
            setCurrentYear(today().split('-')[0])
            setCurrentMonth(today().split('-')[1])
            return;
        }
        setCurrentYear(param.get('year'))
        setCurrentMonth(param.get('month'))
    },[setSelectDay]);


    //FetchData
    const [ listData , setListData ] = useState();    
    const dispatch = useDispatch();
    
    const { data } = useQuery(['Schedule' , currentMonth ], ()=>scheduleFetch(currentMonth , currentMonth),{
        refetchOnWindowFocus:false,
        onSuccess : (data) =>{
            setListData(data.restResponseData);
        },
        onError : (error) =>{
            dispatch(alertThunk(error.message , 0));
        }
    });

    const onParamHandler = () =>{
        setParam({year : '2025' , month : '2'});
    }

    return(
        <>
            <DashBoard page={'Calendar'}></DashBoard>
            <CalenaderGrid>

                {/* header */}
                <BannerCommon.BannerPoint>
                    <img src="img/calendar.png" alt="calendar" />
                    MY STUDY
                </BannerCommon.BannerPoint>

               <DashBoardTitle><b>MY STUDY</b></DashBoardTitle>
               <PageSubText>
                웹 퍼블리셔 4년차, 프로젝트 활동을 기록합니다. <br></br>더 넓은 지식을 위해 React, Node.js를 학습 중에 있습니다.<br></br>
                <p>*전 회사의 공개 가능한 프로젝트 / 개인 작업물만 공유합니다.</p>
                </PageSubText> 
                <FadeinComponent>
                    <ContentsWrap>
                        <button onClick={()=>onParamHandler()}>gasdgsagadg</button>
                        {/* body */}
                        <CalendarStyle 
                            setSelectDay={setSelectDay}
                            listData={listData}
                            selectDay={selectDay}
                            currentYear={currentYear}
                            setCurrentMonth={setCurrentMonth}
                            currentMonth={currentMonth}
                            setCurrentYear={setCurrentYear}    
                        />

                        {/* Schedule */}
                        <Schedule
                            selectDay={selectDay}
                            listData={listData}
                            setSelectDay={setSelectDay}
                            setCurrentMonth={setCurrentMonth}
                            setCurrentYear={setCurrentYear} 
                        />
                    </ContentsWrap>
                </FadeinComponent>
                
            </CalenaderGrid>
        </>
    )
}