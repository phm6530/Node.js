import { useForm } from 'react-hook-form'
import {  useQueryClient , useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { fetchAddSchedule } from '../ScheduleFetch';
import { v4 as uuidv4 } from 'uuid';
import alertThunk from '../../../store/alertTrunk';

import styled from 'styled-components';

const AddScheduleFormStyle = styled.form`
    padding: 10px;
    background: #000;
    button{
        color: #fff;
    }
`

const ErrorStyle = styled.div`
    color: red;
`

const AddSchedule = ({selectDay}) =>{
    const { register,  handleSubmit , reset, formState : {errors}} = useForm({
        defaultValues : {
            Schedule_title : ''
        }
    });

    const dispatch = useDispatch();
    const queryclient = useQueryClient();
    const mutation = useMutation((data)=>fetchAddSchedule(data),{
        onSuccess : () =>{
            dispatch(alertThunk('일정이 등록 되었습니다.' , 1));
            queryclient.invalidateQueries('Schedule')
            reset();
        },
        onError : (error) =>{
            console.log(error);
        }
    });

    const AddScheduleHandler = async(formData) => {
        const rquestData = {
            schedule_date : selectDay,
            work: formData.Schedule_title,
            schedule_key : uuidv4()
        }
        console.log(rquestData);
        mutation.mutate(rquestData);
    }

    return(
        <AddScheduleFormStyle onSubmit={handleSubmit(AddScheduleHandler)}>
            <input {...register('Schedule_title' , {
                    required : '필수',
                    maxLength : {
                        value : 250,
                        message : '250자를 초과해서 등록 할 수 없습니다.'
                    }
                })}/>
            <button>입력하기</button>
            {errors.Schedule_title && <ErrorStyle>{errors.Schedule_title.message}</ErrorStyle>}
        </AddScheduleFormStyle>
    )
}

export default AddSchedule;