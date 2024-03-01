import { Controller , useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchReply } from '../../BoardFetch';

import styled, { keyframes } from 'styled-components';

import { DarkMode } from '../../../../context/DarkModeContext';
import CommentInput from './Detail/CommentInput';
import { findForBadword } from '../../../../filter/filterWording';
import alertThunk from '../../../../store/alertTrunk';

import { QuestionMark } from '../../../../component/icon/Icon';
import { Button } from '../../../../component/ui/Button';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; // Yup + form hook 연동
import { useForm } from 'react-hook-form';

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
    border-radius: 1em 1em 0 0;
    display: flex;
    position: relative;
    /* padding: 1.5rem; */
        .InputWrap{
            flex-grow: 1;
            width: 100%;
        }
    `

const FormStyle = styled.form`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        flex-grow: 1;
        align-items: flex-start;
        color: transparent;
        background-clip: text;
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
            background:#994ed2;
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
    align-items: center;
    padding: 10px 20px;
    border-radius: 1em;
    margin-bottom: 19px;
    z-index: 10;
    left: 0;
    top: -4em;
    border: 3px solid #ffffff4f;
    box-sizing: border-box;
`

const Label = styled.span`
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 10px;
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

const UserIconViewer = styled.div`
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-right: 1rem;
        button{
            background: rgba(0,0,0,0.1);
            font-size: 12px;
            padding: 3px 17px;
            margin-top: 10px;
            border-radius: 3em;
            color: #222;
        }
        .ImgArea{
            width: 70px;
            height: 70px;
            border-radius: 100%;
            overflow: hidden;
            border: 7px solid #fff;
            box-shadow: 5px 5px 13px rgba(0,0,0,0.1);
            img{
                width: 100%;
            }
        }
`

export default function BoardCommentForm({setTotal , setUserFetchData}){
    const { darkMode } = useContext(DarkMode);
    const { login } = useSelector(state => state.authSlice);

    const [ changeCrector , setChangeCrector ] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();


    const schama = Yup.object({
        userIcon : Yup.string().required('필수항목 입니다.'),
        userName : Yup.string().required('필수항목 입니다.').min(2, '최소 2글자 이상 적어주세요..').max(20,'최대 20글자 이하로 적어주세요'),
        contents : Yup.string().required('필수항목 입니다.').min(4, '최소 4글자 이상 적어주세요..'),
        password : Yup.string().when([],()=>{
            return login
                ? Yup.string().notRequired()
                : Yup.string().required('필수항목 입니다.').min(4, '최소 4글자의 비밀번호를 기재해주세요')
        })
    })

    const personIcon = [...Array(6)].map((_,idx)=> `person_${idx + 1}`);    
    const randomUserIcon = login ? 'adminPicture' :personIcon[Math.floor(Math.random() * personIcon.length)];
    
    // React-hook-form
    const { reset , watch , handleSubmit , control , formState : { errors } , getValues} = useForm({
        resolver : yupResolver(schama) ,
        defaultValues : {
            userIcon : randomUserIcon,
            userName : login ? 'Admin' : '',
            contents : '',
            password : ''
        }
    });

    // const currentValue = watch(); //현재 hook form에 등록된 값임
    
    useEffect(()=>{
        reset({
            ...getValues(),
            userName : login ? 'Admin' : '',
            userIcon : randomUserIcon
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[login]);

        // Query 뮤테이션
        const mutation = useMutation(formData => fetchReply(formData), {
            onSuccess: (data) => {
                setUserFetchData(prev => [...data.resData , ...prev]);
                setTotal(data.counter);
                console.log('userMutation 실행');
                dispatch(alertThunk('댓글 등록되었습니다.', true))
                reset({
                    ...getValues(),
                    userName: login ? 'Admin' : '',
                    contents: '',
                    password: ''
              });
            },
            onError: (error) => {
                dispatch(alertThunk(error.message, 0));
            }

        });
        
        // submit
        const onSubmitHandlr = async(data) =>{

            if(!findForBadword(data.contents)){
                dispatch(alertThunk('비속어는 입력 불가합니다...', false));
                return;
            }
    
            const formData = {
                idx : uuidv4(),
                ...data ,
                page : new URLSearchParams(location.search).get('page') || 1 ,
            }
            mutation.mutate(formData); 
        }   
        
    const selectIcon = `/img/board/${login ? 'adminPicture.jpg' : `${watch('userIcon')}.jpg`}`;

    useEffect(()=>{
        setChangeCrector(false);
    },[login]);


    return(
        <BoardReplyStyle 
            $darkMode={darkMode}
        >
            
            <UserIconViewer>
                <div className="ImgArea">
                    <img src={selectIcon} alt="Pictureasa"/>
                </div>
                {login || <button onClick={()=>setChangeCrector(true)}>You</button>}
                
            </UserIconViewer>

            <FormStyle  method='POST' onSubmit={handleSubmit(onSubmitHandlr)}>
                {changeCrector && 
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
                                                 onChange={()=>{
                                                    field.onChange(icon)
                                                }}
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
                }
           

                <div className="InputWrap">

                    <Controller
                        name='userName'
                        control={control}
                        render={({field})=>
                            <CommentInput 
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
                                    <CommentInput 
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
                        <CommentInput 
                            {...field}
                            label='댓글'
                            type={'textarea'}
                            placeholder={'남기실 댓글 내용을 입력해주세요!'}
                            error={errors[{...field}.name]}
                        />
                    }
                />
                 <Button.Submit style={{marginLeft: 'auto'}}>Submit</Button.Submit>
                </div>
       
                </FormStyle>
        </BoardReplyStyle>
    )
}