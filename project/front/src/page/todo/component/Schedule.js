import styled from 'styled-components';
import AddSchedule from './AddSchedule';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMutation , useQueryClient} from 'react-query';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

// 커스텀훅 or 팝업창 or redux-Trunk
import FadeinComponent from '../../../FadeinComponent';
import alertThunk from '../../../store/alertTrunk';
import Popup from '../../../component/popup/Popup';
import Confirm from '../../../component/ui/Confirm';
import { fetchEditSchedule , fetchDeleteSchedule, fetchToggleComplete } from '../ScheduleFetch';
import { useAuthCheck } from '../../../component/common/AuthClientCheck';
import { Button } from '../../../component/ui/Button';
import { TodaySeletor , dayFormetting } from './TodaySeletor'; 


// icon
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";


const ScheduleWrap = styled.div`
    width: 50%;
    overflow: hidden;
`

const IsComplete = styled.div`
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-start;
    transition: color .2s ease;
    padding: .3rem 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    svg{
        opacity: .8;
    }
    ${props => {
        return props.$complete && 'color: rgba(0,0,0,0.4)';
    }}    
`

const FormStyle = styled.form`
    display: flex;
    flex-grow: 1;
    textarea{
        flex-grow: 1;
        background: transparent
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

const ButtonNavWrap = styled.div`
    border-radius: 1em;
    color: #fff;
`

const ImportantStyle = styled.span`
    font-size: 12px;
    margin-top: 2px;
    img{
        width: 17px;
        margin-right: 10px;
        filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.3));
    }
`

const DayStyle = styled.span`
    font-weight: bold;
    font-size: 30px;
    color:#fff;
`

const ListHandler = ({ idx ,selectWork , setSelectWork , ScheduleItem}) =>{
    const { register , handleSubmit , setValue } = useForm();
    const { clientAuthCheck } =  useAuthCheck();
    const [ modal , setModal ] = useState(false);
    const [ deleteKey , setDeleteKey ] = useState(null);
    const [ textAreaHeight , setTextArerHeight ] = useState(ScheduleItem.work.split(/\r\n|\r|\n/).length);
    const { schedule_key , complete ,important } = ScheduleItem;
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
            {important === 1 && <ImportantStyle>
                    <img src='/img/calendar/important.png' alt=''></img>
                </ImportantStyle>}
            <FormStyle onSubmit={handleSubmit(onEditHandler)}>
            
                <TextArea 
                    {...register('work' , { required : '빈칸은 입력 불가합니다.' })} 

                    rows={textAreaHeight}
                    readOnly={ScheduleItem.schedule_key !== selectWork}
                    onChange={(e)=>{setTextArerHeight(e.target.value.split(/\r\n|\r|\n/).length); console.log(e.target.value.length)}}
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

    // const test  = dayFormetting();
    // console.log('selectDay ::: ', listData && listData[test(selectDay)]);

    const filterArr = [];
    for(const date in listData){
        const formattedSelectDay = new Date(selectDay).toDateString();
        const formattedDate = new Date(date).toDateString();
        if(formattedSelectDay === formattedDate){
            filterArr.push(...listData[date]);
        }
    }

    const test = filterArr.sort((a,b) => {
        return b.important - a.important;
    });
    console.log(test);

    

    return(
        <>  
            {filterArr.length === 0 && (
                 <FadeinComponent 
                    position={'right'} 
                    key={selectDay}>
                        {selectDay && selectDay.replaceAll('-','. ')}은 일정이 없습니다.
                </FadeinComponent>
            )}

            {filterArr.map((Schedule ,idx)=>{
                
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
            <ButtonNavWrap>
                <Button.ForsquareBtn onClick={()=>todayButton()}>ToDay</Button.ForsquareBtn>
                <Button.ForsquareBtn onClick={()=>todayButton()}>D-day 설정</Button.ForsquareBtn>
                <Button.ForsquareBtn onClick={()=>todayButton()}>일정 변경</Button.ForsquareBtn>
            </ButtonNavWrap>

            <DayStyle>                
                {selectDay.replaceAll('-','. ')}
            </DayStyle>
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