import styled from 'styled-components';
import FadeinComponent from '../../../FadeinComponent';
import AddSchedule from './AddSchedule';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMutation , useQueryClient} from 'react-query';
import { fetchEditSchedule , fetchDeleteSchedul, fetchDeleteSchedule } from '../ScheduleFetch';
import { useDispatch } from 'react-redux';
import alertThunk from '../../../store/alertTrunk';

const ScheduleWrap = styled.div`
    background: #fff;
    width: 50%;
`

const ListHandler = ({selectWork , setSelectWork , ScheduleItem}) =>{
    const { register , handleSubmit , setValue } = useForm();

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    
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
            dispatch(alertThunk('수정되었습니다.', 1));
        },
        onError : (error) =>{
            dispatch(alertThunk(error.message, 0));
        }
    });

    useEffect(()=>{
        setValue('work' , ScheduleItem.work);
    },[ScheduleItem ,setValue]);

    const onEditHandler = async(data) =>{
        const requstData = {
            work : data.work,
            schedule_key : ScheduleItem.schedule_key
        }
        mutation.mutate(requstData);
        // setSelectWork(null);
    }   

    const readOnlyHandler = (idx) =>{
        setSelectWork(idx);
    }
    const onBlurHandler = () =>{
        setSelectWork(null);
    }

    const deleteSchedule = (key) =>{
        console.log(key);
        deleteMutation.mutate(key);
    }

    return(
        <>
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
         </>
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
            {filterArr.length === 0 && <FadeinComponent key={selectDay}>{selectDay && selectDay.replaceAll('-','. ')}은 일정이 없습니다.</FadeinComponent>}

            {filterArr.map((Schedule)=>{
                return <FadeinComponent key={Schedule.schedule_key}>
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

export default function Schedule({ selectDay , listData }) {
    return (
        <ScheduleWrap>
            <ScheduleList
                listData={listData}
                selectDay={selectDay}
            />
            <AddSchedule 
                selectDay={selectDay} //업로드해야할 날짜
            />
        </ScheduleWrap>
    );
}