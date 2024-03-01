import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import alertThunk from '../../../../../store/alertTrunk';
import styled from 'styled-components';
import { Controller, useForm, useFormContext } from 'react-hook-form';

import { deleteFetch } from '../../../BoardFetch';
import { yupResolver } from '@hookform/resolvers/yup';

const FormStyle = styled.form`
    background:red;
    box-sizing: border-box;
    border: 2px solid red;
    border-radius: 5em;
    overflow: hidden;
    input{
        width: 80px;
    }
`

const ButtonSTyle = styled.button`
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    padding: 2px 5px;

`

export default function CommentDelete({setUserFetchData , board_key , setSelectIdx}){
    const dispatch = useDispatch();
    const { handleSubmit , reset } = useFormContext();

    const { mutateAsync}  = useMutation((formData)=>deleteFetch(formData),{
        onSuccess : (data) =>{
            dispatch(alertThunk('삭제되었습니다.', true));
            setUserFetchData(prev => {
                return prev.filter((e)=>{
                    return e.board_key !== data.isDeleted_key
                });
            });
        }
    })

    const onSubmitHandler = async(data) =>{
        console.log('data ::::',data);
        const password = data.password;
        const formData ={
            reply_password : password,
            board_key : board_key,
        }
        // console.log('formData :' , formData);
        try{
            await mutateAsync(formData);
        }
        catch(error){
            dispatch(alertThunk(error.message , false));
        }
    }


    return(
        <FormStyle onSubmit={handleSubmit(onSubmitHandler)}>
            <Controller
                name='password'
                render={({field})=>

                    <input 
                        autoComplete='off'
                        type='password'
                        {...field}
                    />
                }
            />
            <ButtonSTyle type='submit'>확인</ButtonSTyle>
            <ButtonSTyle type='button' onClick={()=>{
                setSelectIdx(null);  
                reset();
            }}>취소</ButtonSTyle>
            </FormStyle>
    )
}