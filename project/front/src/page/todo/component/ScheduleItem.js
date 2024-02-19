import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

const schema = Yup.object({
    title : Yup.string().required('필수로 입력해주세요.'),
})

export default function ScheduleItem({props , ScheduleCheckHandler}){
    const { key, title , complete } = props;
    const { register, handleSubmit , reset , formState : { errors }} = useForm({
        resolver : yupResolver(schema),
        defaultValues : {
            title: ''
        }
    });
    console.log('complete:', complete);

    useEffect(()=>{
        reset({ title ,key})
    },[reset, title,  key]);

    const EditHandelr = (data) =>{  
        console.log('수정할 데이터', data);
    }

    return(
        <form onSubmit={handleSubmit(EditHandelr)} onClick={()=>ScheduleCheckHandler(key)}>  
            <input {...register('title')}/>
            <button>삭제</button>
            <button type='submit'>수정</button>
        </form>
    )
}