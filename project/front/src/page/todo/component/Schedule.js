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
import { useSearchParams } from 'react-router-dom';
import alertThunk from '../../../store/alertTrunk';
import Popup from '../../../component/popup/Popup';

// icon
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import Confirm from '../../../component/ui/Confirm';

const ScheduleWrap = styled.div`
    background: #fff;
    width: 50%;
    overflow: hidden;
`

const IsComplete = styled.div`
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-start;
    
    svg{
        opacity: .8;
    }
    transition: color .2s ease;
    ${props => {
        return props.$complete && 'color: rgba(0,0,0,0.4)';
    }}    
`

const FormStyle = styled.form`
    display: flex;
    flex-grow: 1;
    textarea{
        flex-grow: 1;
    }
`

const CompleteHandler = styled.button`
    width: 25px;
    border-radius: 5em;
    font-size: 14px;
    font-weight: bold;
`

const TextArea = styled.textarea`
    font-size: 14px;
`

const ListHandler = ({ idx ,selectWork , setSelectWork , ScheduleItem}) =>{
    const { register , handleSubmit , setValue } = useForm();
    const { clientAuthCheck } =  useAuthCheck();
    const [ modal , setModal ] = useState(false);
    const [ deleteKey , setDeleteKey ] = useState(null);
    const [ textAreaHeight , setTextArerHeight ] = useState(ScheduleItem.work.split(/\r\n|\r|\n/).length);
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
    // const onBlurHandler = () =>{
    //     setSelectWork(null);
    // }

    const deleteSchedule = (key) =>{
        setModal(true);
        setDeleteKey(key);
    }

    const onToggleHandler = (key) =>{
        if(!clientAuthCheck('변경 권한')) return;
        toggleMutation.mutate(key);
    }
    
    const closePopup = () =>{
        setModal(false)
    }

    return(
        <>
        {modal && (
            <Popup  closePopup={closePopup}>
                <Confirm confirm={()=>{
                     if(!clientAuthCheck('삭제')) return;
                    deleteMutation.mutate(deleteKey);
                }} />
            </Popup>
            )
        }

        <IsComplete
            $complete={complete}
        >  
            <CompleteHandler onClick={()=>onToggleHandler(schedule_key)}>{idx + 1}.</CompleteHandler>
            
            <FormStyle onSubmit={handleSubmit(onEditHandler)}>
            
                <TextArea 
                    rows={textAreaHeight}
                    {...register('work' , { required : '빈칸은 입력 불가합니다.' })} 
                    readOnly={ScheduleItem.schedule_key !== selectWork}
                    onChange={(e)=>setTextArerHeight(e.target.value.split(/\r\n|\r|\n/).length)}
                />

                {ScheduleItem.schedule_key === selectWork && <button type='submit'>확인</button>}
            </FormStyle>

            {/* 수정 */}
            <button onClick={()=>readOnlyHandler(ScheduleItem.schedule_key)}><MdModeEdit size={'17'}/></button>

            {/* 삭제 */}
            <button onClick={()=>deleteSchedule(ScheduleItem.schedule_key)}><FaTrashAlt size={'13'}/></button>
         </IsComplete>
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
            {filterArr.length === 0 && (
                 <FadeinComponent 
                    position={'right'} 
                    key={selectDay}>
                        {selectDay && selectDay.replaceAll('-','. ')}은 일정이 없습니다.
                </FadeinComponent>
            )}

            {filterArr.map((Schedule,idx)=>{
                return <FadeinComponent position={'right'} key={Schedule.schedule_key}>
                        <ListHandler
                            idx={idx}
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
}) {
    const [ , setSeachParam ]  = useSearchParams();
    const today = TodaySeletor();

    const todayButton = () =>{
        setSelectDay(today());
        setSeachParam({
            year : today().split('-')[0],
            month : today().split('-')[1]
        })
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