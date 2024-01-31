import { deleteFetch } from '../BoardFetch';
import useAlert from '../../../component/common/UseAlert';

import { useMutation, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object({
    password : Yup.string().required('비밀번호를 입력해주세요.')
})


export default function BoardReply({reply, selectIdx , setSelectIdx }){
    const { 
        user_name,  idx ,  contents ,  date,
        board_key // 식별 board key
    } = reply;

    const queryClient = useQueryClient();

    const { handleSubmit , formState : { errors } , reset , control } = useForm({
        resolver : yupResolver(schema),
        defaultValues : {
            password : ''
        }
    });

    const { mutateAsync  }  = useMutation((formData)=>deleteFetch(formData),{
        onSuccess : () =>{
            queryClient.invalidateQueries('board');
        }
    })

    const showAlert = useAlert();
    const onSubmitHandler = async(data) =>{
        const password = data.password;

        const formData ={
            reply_Idx : idx,
            reply_password : password,
            board_key : board_key,
            page : new URL(window.location.href).searchParams.get('page') || 1
        }

        try{
            await mutateAsync(formData)
            showAlert('삭제되었습니다.', 1);
        }
        catch(error){
            showAlert(error.message);
        }
    }

    return(
        <div className='BoardComment' key={idx}>
        <p>작성자 : {user_name}</p>
        <p>작성일 : {date}</p> 
        {contents}
        {!selectIdx && <button onClick={()=>setSelectIdx(idx)}>삭제</button>}
        {selectIdx && (
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Controller
                    name='password'
                    control={control}
                    render={({field})=>
                        <input 
                            autoComplete='off'
                            type='password'
                            {...field}
                        />
                    }
                />

                <button type='submit'>확인</button>

                <button type='button' onClick={()=>{
                    setSelectIdx(null);  
                    reset();
                    }}>취소</button>
            </form>
        )}
        {errors.password && errors.password.message}
        </div>    
    )
}