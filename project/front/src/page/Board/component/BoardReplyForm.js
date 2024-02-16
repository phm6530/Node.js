import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputReply from './InputReply'
import styled, { keyframes } from 'styled-components';
import { DarkMode } from '../../../context/DarkModeContext';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { QuestionMark } from '../../../component/icon/Icon';

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
    border-radius: 2em;
    margin-top: 40px;
    width: 90%;
    background: #e2e6ef;
    padding: 30px;
    box-shadow: 14px 14px 15px rgb(36 ,36 ,36, .2);
`
const FormStyle = styled.form`
    .radioWrap{
        display: flex;
    }
`

const RadioStyle = styled.label`
    position: relative;
    box-sizing: border-box;
    transition: transform .2s ease;
    input{
        display: none;
    }
    &:hover{
        transform: scale(1.1);
        
    }
    img{
        border-radius: 7em;
    }
    border: 7px solid transparent;
    
    &.checked{
        border: 7px solid #fff;
        border-radius: 7em;
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
const RadioWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 1em;
    margin-bottom: 19px;
    background: #ffffff3d;
    border: 3px solid #ffffff4f;
    box-sizing: border-box;
`

const Label = styled.span`
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 20px;
    span{
        position: relative;
        svg{
            margin-left: 5px;
            cursor: pointer;
        }
        &::after{
            content: "댓글에 입력될 캐릭터에요";
            position: absolute;
            display: none;
            background: #fff;
            font-size: 12px;
            width: 140px;
            top: -30px;
            left: 20px;
            border-radius: 13px;
            padding: 5px;
            text-align: center;
        }
        &::before{
            position: absolute;
            content: "";
            display: block;
            width: 10px;
            height: 10px;
            bottom: 18px;
            z-index: 0;
            left: 24px;
            background: #fff;
            transform: rotate(60deg);
            display: none;
        }

        &:hover::after, &:hover::before {
            display: block;
        }
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
                            <Label>Crecter <span><QuestionMark color={'#0000005e'} size={'20'}/></span></Label>
                            <RadioWrap>
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
                    
                            </RadioWrap>
                            {/* {console.log(field)} */}
                        </>
                    }
                />

                <Controller
                    name='userName'
                    control={control}
                    render={({field})=>
                        <InputReply 
                            {...field}
                            label='글쓴이'
                            isAuth={login}
                            placeholder={'이름을 입력해주세요.'}
                            type={'text'}
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
                                    type={'password'}
                                    placeholder={'4자 이상의 비밀번호를 입력해주세요.'}
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
                            type={'textarea'}
                            placeholder={'남기실 댓글 내용을 입력해주세요!'}
                            error={errors[{...field}.name]}
                        />
                    }
                />

                <Button type='submit' className='btnStyle_Type_1'>Add</Button>
                </FormStyle>
        </BoardReplyStyle>
    )
}