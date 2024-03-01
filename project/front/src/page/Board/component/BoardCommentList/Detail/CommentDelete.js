import { useDispatch} from 'react-redux';
import alertThunk from '../../../../../store/alertTrunk';
import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';

const FormStyle = styled.form`
    box-sizing: border-box;
    border: 2px solid red;
    border-radius: 5em;
    overflow: hidden;

    input{
        width: 80px;
    }

`

const ButtonSTyle = styled.button`
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    padding: 2px 5px;
`

export default function CommentDelete({mutate, board_key , setSelectIdx}){    
    const { handleSubmit , reset } = useFormContext();
    const dispatch = useDispatch();

    const onSubmitHandler = (data) =>{
        const password = data.password;
        const formData ={
            reply_password : password,
            board_key : board_key,
        }
        try{
            mutate(formData);
        }
        catch(error){
            dispatch(alertThunk(error.message , false));
        }
    }

    return(
        <>
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
                <ButtonSTyle 
                    type='button' 
                    onClick={()=>{
                        setSelectIdx(null);  
                        reset();
                    }}
                >취소</ButtonSTyle>
            </FormStyle>
        </>
    )

}