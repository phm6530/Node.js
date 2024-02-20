import styled from 'styled-components';
import FadeinComponent from '../../../FadeinComponent';
import AddSchedule from './AddSchedule';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMutation , useQueryClient} from 'react-query';
import { fetchEditSchedule , fetchDeleteSchedule, fetchToggleComplete } from '../ScheduleFetch';
import { useDispatch } from 'react-redux';
import { useAuthCheck } from '../../../component/common/AuthClientCheck';
import { TodaySeletor } from './TodaySeletor'; 
import alertThunk from '../../../store/alertTrunk';

const ScheduleWrap = styled.div`
    background: #fff;
    width: 50%;
`

const IsComplete = styled.div`
    display: flex;
    ${props => {
        return props.$complete && 'color:red';

    }}
    
`

const ListHandler = ({selectWork , setSelectWork , ScheduleItem}) =>{
    const { register , handleSubmit , setValue } = useForm();
    const { clientAuthCheck } =  useAuthCheck();
    const { schedule_key , complete } = ScheduleItem;

    const dispatch = useDispatch();
    const queryClient = useQueryClient();


    // Inline Edit 가능하도록 setValue 설정함 
    useEffect(()=>{
        setValue('work' , ScheduleItem.work);
    },[ScheduleItem ,setValue]);


    // Edit
    const mutation = useMutation((formData)=>fetchEditSchedule(formData) , {
        onSuccess : () =>{
            queryClient.invalidateQueries('Schedule');
            dispatch(alertThunk('수정되었습니다.', 1));
            setSelectWork(null);
        },
        onError : (error) =>{  
            dispatch(alertThunk(error.message, 0));
        }
    });

    // Delete
    const deleteMutation = useMutation((data)=>fetchDeleteSchedule(data),{
        onSuccess : () =>{
            queryClient.invalidateQueries('Schedule');
            dispatch(alertThunk('삭제되었습니다.', 1));
        },
        onError : (error) =>{
            dispatch(alertThunk(error.message, 0));
        }
    });

    
    // ToggleComplete
    const toggleMutation = useMutation((data)=>fetchToggleComplete(data),{
        onSuccess : (data) =>{
            queryClient.invalidateQueries('Schedule');
        },
        onError : (error) =>{
            dispatch(alertThunk(error.message, 0));
        }
    });



    const onEditHandler = async(data) =>{
        const requstData = {
            work : data.work,
            schedule_key : ScheduleItem.schedule_key
        }
        mutation.mutate(requstData);
    }   

    const readOnlyHandler = (idx) =>{
        if(!clientAuthCheck('수정')) return;
        setSelectWork(idx);
    }
    const onBlurHandler = () =>{
        setSelectWork(null);
    }

    const deleteSchedule = (key) =>{
        if(!clientAuthCheck('삭제')) return;
        deleteMutation.mutate(key);
    }

    const onToggleHandler = (key) =>{
        if(!clientAuthCheck('변경 권한')) return;
        toggleMutation.mutate(key);
    }
    return(
        <IsComplete
            $complete={complete}
        >  
            <button onClick={()=>onToggleHandler(schedule_key)}>tTEST</button>

            <form onSubmit={handleSubmit(onEditHandler)}>
                <input 
                    {...register('work' , 
                        { required : '빈칸은 입력 불가합니다.' })
                    } 
                    readOnly={ScheduleItem.schedule_key !== selectWork}
                    autoFocus={ScheduleItem.schedule_key === selectWork}
                    onBlur={()=>onBlurHandler()}
                />
                {ScheduleItem.schedule_key === selectWork && <button type='submit'>확인</button>}
            </form>

            <button onClick={()=>readOnlyHandler(ScheduleItem.schedule_key)}>수정</button>
            <button onClick={()=>deleteSchedule(ScheduleItem.schedule_key)}>삭제</button>
         </IsComplete>
    )
}

const ScheduleList = ({selectDay , listData}) =>{
   
    const [ selectWork , setSelectWork ] = useState(null);

    const filterArr = [];
    for(const date in listData){
        const formattedSelectDay = new Date(selectDay).toDateString();
        const formattedDate = new Date(date).toDateString();
        if(formattedSelectDay === formattedDate){
            filterArr.push(...listData[date]);
        }
    }


    return(
        <>  
            {filterArr.length === 0 && <FadeinComponent position={'right'} key={selectDay}>{selectDay && selectDay.replaceAll('-','. ')}은 일정이 없습니다.</FadeinComponent>}

            {filterArr.map((Schedule)=>{
                return <FadeinComponent position={'right'} key={Schedule.schedule_key}>
                        <ListHandler
                            ScheduleItem={Schedule}
                            setSelectWork={setSelectWork}
                            selectWork={selectWork}
                        />
                    </FadeinComponent>
            })}
        </>
    )
}

export default function Schedule({ 
    selectDay , 
    listData , 
    setSelectDay ,
    setCurrentMonth , 
    setCurrentYear 
}) {

    const todayButton = () =>{
        const today = TodaySeletor();
        setSelectDay(today());
        setCurrentMonth(today().split("-")[1])
        setCurrentYear(today().split("-")[0])
    }

    return (
        <ScheduleWrap>
            <button onClick={()=>todayButton()}>Today</button>
            <ScheduleList
                listData={listData}
                selectDay={selectDay} //업로드해야할 날짜
            />
            <AddSchedule 
                selectDay={selectDay} //업로드해야할 날짜
            />
        </ScheduleWrap>
    );
}