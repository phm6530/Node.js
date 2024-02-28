import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useAuthCheck } from '../../../component/common/AuthClientCheck';
import { useQueryClient , useMutation } from 'react-query';
import { fetchAddSchedule } from '../ScheduleFetch';
import alertThunk from '../../../store/alertTrunk';
import styled from 'styled-components';
import { TextAreaStyle } from '../../../component/ui/TextArea';
import { Button } from '../../../component/ui/Button';


const AddScheduleFormStyle = styled.form`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    button{
        color: #fff;
        margin-top: 10px;
        word-break: keep-all;
        padding: 0px 10px;
        /* border-radius: 1em; */
    }
    textarea{
        width: 100%;
        font-size: 14px;
    }
`

const ErrorStyle = styled.div`
    color: red;
`

const AddSchedule = ({selectDay}) =>{
    const {  register,  handleSubmit , reset, formState : { errors } } = useForm({
        defaultValues : {
            Schedule_title : '',
            Schedule_important : false
        }
    });
    // console.log('errors : ',errors);
    const { clientAuthCheck }= useAuthCheck();
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
        console.log('formData:',   formData);
        const rquestData = {
            schedule_date : selectDay,
            work: formData.Schedule_title,
            important: formData.Schedule_important,
            schedule_key : uuidv4(),

        }
        if(!clientAuthCheck('입력')) return;
        
        mutation.mutate(rquestData);
    }



    // 카테고리
    const ScheduleCategory = [
        '일반',
        'React',
        '자격증'
    ];


    return(
        <>
            <AddScheduleFormStyle onSubmit={handleSubmit(AddScheduleHandler)}>

                <label>
                    <input 
                        {...register('Schedule_important')}
                        type="checkbox" 
                    />중요!
                </label>
                
                
                <TextAreaStyle {...register('Schedule_title' , {
                        required : '추가하실 일정을 입력해주세요!',
                        maxLength : {
                            value : 250,
                            message : '250자를 초과해서 등록 할 수 없습니다.'
                        }
                    })}/>
                <Button.Submit>입력하기</Button.Submit>
            </AddScheduleFormStyle>
            {errors.Schedule_Category && <ErrorStyle>{errors.Schedule_Category.message}</ErrorStyle>}
            {errors.Schedule_title && <ErrorStyle>{errors.Schedule_title.message}</ErrorStyle>}
        </>
    )
}

export default AddSchedule;