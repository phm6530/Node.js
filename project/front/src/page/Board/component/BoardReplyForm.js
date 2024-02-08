import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputReply from './InputReply'
import styled, { keyframes } from 'styled-components';
import { DarkMode } from '../../../context/DarkModeContext';
import { useContext , useEffect } from 'react';
import { useSelector } from 'react-redux';

const Button = styled.button`
    margin-left: auto;
`

const checkAnimtaion = keyframes`
    from{
        opacity: 0;
        transform: scale(.5);
    }
    to{
        opacity: 1;
        transform: scale(1);
    }
`

const BoardReplyStyle = styled.div`
    padding: 40px 30px;
    border-radius: 2em;
    margin-top: 50px;
    box-shadow: -4px -4px 15px rgba(255, 255, 255, 0.7), 4px 4px 15px rgba(36, 36, 36, 0.15);
    width: 90%;
`
const FormStyle = styled.form`
    .radioWrap{
        display: flex;
    }
`

const RadioStyle = styled.label`
    position: relative;
    input{
        display: none;
    }
    &.checked{
        img{
            filter: none;
        }
        &::after{
            position: absolute;
            content: "";
            width: 17px;
            height: 17px;
            border-radius: 2em;
            top: -7px;
            background:#52bea6;
            border: 2px solid #fff;
            animation: ${checkAnimtaion} .5s ease;
        }
    }
    img{
        width: 50px;
        cursor: pointer;
        filter: grayscale(1);
    }
`


export default function BoardReplyForm({
    onSubmitHandlr,
    control
}){
    const { darkMode } = useContext(DarkMode);
    const { handleSubmit ,  formState : { errors } } = useFormContext();//useForm 트리
    const { login } = useSelector(state => state.authSlice);
    // console.log(errors);

    // useEffect(() => {
    //     setValue('userIcon', 'person_1', { shouldValidate: true });
    // }, [setValue]);

    return(
        <BoardReplyStyle $darkMode={darkMode}>
            <FormStyle  method='POST' onSubmit={handleSubmit(onSubmitHandlr)}>
                <Controller
                    name='userIcon'
                    control={control}
                    defaultValue="person_1"
                    render={({field})=>
                        <>
                        <div className="radioWrap">
                            
                            {   
                                [...Array(6)].map((_,idx)=> {
                                    const icon = `person_${idx + 1}`;
                                    return <RadioStyle key={icon} className={
                                        icon === field.value ? 'checked' : undefined
                                    }>
                                        <img src={`/img/board/${icon}.png`} alt="" />
                                        <input 
                                            type="radio"
                                            value={icon}
                                            onChange={()=>field.onChange(icon)}
                                            name={field.name}
                                            checked={field.value  === icon}
                                         />
                                    </RadioStyle>
                                } )
                            }   
                   
                        </div>
                        {/* {console.log(field)} */}
                        </>
                    }
                />
                
                {

                    
                }

                    <Controller
                        name='userName'
                        control={control}
                        render={({field})=>
                            <InputReply 
                                {...field}
                                label='글쓴이'
                                isAuth={login}
                                error={errors[{...field}.name]}
                            />
                        }
                    />
                
               
                { !login && 
                        <Controller
                            name='password'
                            control={control}
                            render={({field})=>
                                <InputReply 
                                    {...field}
                                    label='password'
                                    error={errors[{...field}.name]}
                                />
                            }
                        />
                }
                <Controller
                    name='contents'
                    control={control}
                    render={({field})=>
                        <InputReply 
                            {...field}
                            label='댓글'
                            error={errors[{...field}.name]}
                        />
                    }
                />

                <Button type='submit' className='btnStyle_Type_1'>reply</Button>
                </FormStyle>
        </BoardReplyStyle>
    )
}