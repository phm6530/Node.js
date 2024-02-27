import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputReply from './InputReply'
import styled, { keyframes } from 'styled-components';
import { DarkMode } from '../../../context/DarkModeContext';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QuestionMark } from '../../../component/icon/Icon';
import { Button } from '../../../component/ui/Button';


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
border-radius: 1em;
    display: flex;
    position: relative;
    /* margin-bottom: 50px; */
    background: #fafafa;
    padding: 20px 20px;
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
        background: linear-gradient(to left, #a35d5d, #6a5f86, #f84f9e);
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
    background: #ffffff3d;
    z-index: 10;
    left: 0;
    top: -4em;
    border: 3px solid #ffffff4f;
    background: #f2f2f2;
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
        border-right: 1px solid #dddddd;
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

const CurruntReplyState = styled.div`
        display: flex;
        margin-bottom: 1rem;
        .currentReply{
            font-size: .8rem;
            margin-left: 1rem;
            font-weight: bold;
            border-radius: 4em;
            margin-right: 10px;
            background: #e6e6e6;
            color: #fff;
            background: linear-gradient(to left, #a35d5d, #6a5f86, #5262a8);
            color: transparent;
            background-clip: text;
            position: relative;
            margin-right: 2rem;
            &:after{
                position: absolute;
                content: "";
                left: -1rem;
                top:50%;
                transform: translateY(-50%);
                width: 6px;
                height: 6px;
                border-radius: 3em;
                background: #606095;
            }
            span{
                color: transparent;
                display: inline-block;
                margin-left: 10px;
            }
        }
`



export default function BoardReplyForm({
    onSubmitHandlr,
    control
}){
    const { darkMode } = useContext(DarkMode);
    const { handleSubmit ,  watch , formState : { errors } } = useFormContext();//useForm 트리
    const { login } = useSelector(state => state.authSlice);
    const [ changeCrector , setChangeCrector ] = useState(true);
    
    const selectIcon = `/img/board/${watch('userIcon')}.png`;
    return(
        <BoardReplyStyle $darkMode={darkMode}>
            
  

            <FormStyle  method='POST' onSubmit={handleSubmit(onSubmitHandlr)}>
                {changeCrector && 
                     <Controller
                     name='userIcon'
                     control={control}
                     defaultValue="person_1"
                     render={({field})=>
                         <> 
              
                
                             <Label>Crecter <span><QuestionMark color={'#0000005e'} size={'20'}/></span></Label>
                                                          
                                  
                             <CurruntReplyState>
                                    <div className="currentReply">오늘 작성된 댓글 1</div>
                                    <div className="currentReply">전체 댓글 1</div>
                                </CurruntReplyState>
                             <RadioWrap>
                                <UserIconViewer>
                                    <div className="ImgArea">
                                        <img src={selectIcon} alt="Pictureasa"/>
                                    </div>
                                    <button onClick={()=>setChangeCrector(true)}>You</button>
                                </UserIconViewer>
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
                 <Button.Submit style={{marginLeft: 'auto'}}>댓글 등록하기</Button.Submit>
                </div>
       
                </FormStyle>
        </BoardReplyStyle>
    )
}