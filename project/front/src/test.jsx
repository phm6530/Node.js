import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker'; 
import { useForm , Controller } from 'react-hook-form'; 
import * as Yup from 'yup';


//Yup을 이용한 Validation
const schema = Yup.object({
    start_Date : Yup.date().required('시작일자를 정해주세요'),
    end_Date : Yup.date().min(Yup.ref('start_Date'), '종료일이 시작일자보다 빠릅니다.').required('종료일자를 정해주세요'),
})



export default function Test(){
    const { control ,handleSubmit , formState : { errors }} = useForm({
        resolver : yupResolver(schema) // yupResolver를 이용해서 Yup 스키마 유효성 연동
    });

    console.log(errors);


    //SubmitHandler
    const onSubmitHandler = (data) =>{
        console.log(data);
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Controller
                name = 'start_Date'
                control={control}
                render={({field : { onChange , value }})=> 
                    <DatePicker
                        onChange={(startDate)=>onChange(startDate)}
                        selected={value}
                        dateFormat={'yyyy-MM-dd'}
                    />
                }
            />
            {errors['start_Date'] && errors['start_Date'].message}
           <button type='submit'>등록</button>
        </form>    
        </>
        
    )
}