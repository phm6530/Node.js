import styled, { keyframes } from 'styled-components';
import { InputStyle , TextAreaStyle } from '../../../component/ui/TextArea';
import { useForm , Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


import alertThunk from '../../../store/alertTrunk';
import Loading from '../../../component/common/animation/Loading';
import ErrorBubble from '../../../component/ui/ErrorBubble';
import SubTitle from '../../../component/ui/Subtitle';
import { Button } from '../../../component/ui/Button';
import { FaCheck } from "react-icons/fa";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;

    input , textarea{
        width: 100%;
    }
    input[type=radio]{
        width: auto;
        visibility: hidden;
        display: none;
    }
    label{
        color:#222;
        font-size: 18px;
        margin-bottom: 10px;
    }
`

const FieldLabel = styled.div`
    font-weight: bold;
    margin-bottom: .5rem;
      span{
            font-size: 12px;
            opacity: .5;
            font-weight: normal;
        }
`

const ani = keyframes`
    from{
        transform: translateX(40px);
        opacity: 0;
    }
    to{
        transform: translateX(0px);
        opacity: 1;
    }
`

const ContactContents = styled.div`
    opacity: 0;
    flex-grow: 1;
    background: #fff;
    padding: 2rem;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    animation: ${ani} .5s .2s ease forwards;
`


const InputMargin = styled.div`
    margin-bottom: 20px;
    position: relative;
    width: 100%;
`

const RadioLabel = styled.label`
    display: inline-flex;
    padding: 7px 15px;
    border-radius: 2em;
    margin-right: 10px;
    align-items: center;
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    svg{
            opacity: .3
    }
    span{
        margin-left: 20px;
        font-size: 14px;
        ${props => props.$check && 'color : #fff;'}
            
    }
    ${({ $check }) => $check && `
        background: #000;
        svg{opacity: 1;color: #fff;}` 
    };
`

const RadioWrap = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 2.5rem;

`




export default function MailComponent(){
    const { control , handleSubmit , register , formState : { errors } , reset } = useForm();
    const dispatch = useDispatch();
    const [ mailSubmit , setMailSubmit ] = useState(false);
    const [ radioIdx , setRadioIdx ] = useState();

    useEffect(()=>{
        reset({
            radioOption : '일반 문의'
        });
        setRadioIdx(0)
    },[reset]);

    const Radio = ['일반 문의','뉴스레터' , '유지보수' , '홍보 페이지 제작' , '기타']

    const fetchMailHandler = async(mailData) =>{
        setMailSubmit(true);
        try{
            const response = await fetch('http://localhost:8080/mailModule' , {
                method:'POST',
                headers : {
                    'ConTent-Type' : 'application/json'
                },
                body : JSON.stringify(mailData)    
            });
            if(!response.ok){   
                throw new Error('ㅇㅇㅇ');
            }
        }catch(error){
            throw new Error(error.message);
        }
    }
    
    const onSubmitHandler = async(data) =>{
        try{
            await fetchMailHandler(data);
            dispatch(alertThunk('메일 전송에 성공하셨습니다.' , 1));
            
            reset();
        }catch(error){
            console.log('실패');
            dispatch(alertThunk('메일 전송에 실패하였습니다.' , 0));
        }
        setMailSubmit(false);
    }

    return(
        <>
         {mailSubmit && <Loading Message={'메일 전송중...'}/>}
                <ContactContents>

             
                    <FormStyle onSubmit={handleSubmit(onSubmitHandler)}>
                        <SubTitle>
                            {/* <img src="/img/contact/dev_person_1.png" alt="dev_icon" className='dev_icon'/> */}
                            <span className='subText'>HI! PHM, DEVELOPER</span>
                        </SubTitle>
                        <RadioWrap>
            
                            <FieldLabel>문의내용 * <span>해당 문의사항은 메일로 전달됩니다.</span></FieldLabel>
                            <Controller
                                name='radioOption'
                                control={control}
                                rules={
                                    {required : '문의 내용을 선택해주세요'}
                                }
                                render={({field})=>
                                    {return Radio.map((e , idx)=>{
                                        return(
                                            <RadioLabel $check={radioIdx === idx} key={`radio_${idx}`} >
                                                <input 
                                                    type="radio" 
                                                    {...field}
                                                    onChange={()=>{
                                                        setRadioIdx(idx);
                                                        field.onChange(e);
                                                    }}
                                                /><FaCheck size={'14'}/>
                                                <span>{e}</span>
                                            </RadioLabel>
                                        )
                                    })}
                                }
                            />    
                            {errors.radioOption &&  <ErrorBubble>{errors.radioOption.message}</ErrorBubble> }
                        </RadioWrap>


                        <InputMargin>
                            <FieldLabel>보내는 분 *</FieldLabel>
                            <InputStyle 
                                $type={'contact'}
                                placeholder='보내시는 분'
                                type="text"  
                                {...register('who' , {
                                required : '성함이나 회사명을 입력해주세요.'
                                })}
                                $error={errors.who}
                            /> 
                            {errors.who &&  <ErrorBubble>{errors.who.message}</ErrorBubble> }
                        </InputMargin>

                        <InputMargin>
                            <FieldLabel>회신 받으실 연락처*</FieldLabel>
                            <InputStyle 
                                $type={'contact'}
                                placeholder='보내시는 분'
                                type="text"  
                                {...register('yourContact' , {
                                required : '회신 받으실 연락처를 적어주세요~'
                                })}
                                $error={errors.yourContact}
                            /> 
                            {errors.yourContact &&  <ErrorBubble>{errors.yourContact.message}</ErrorBubble> }
                        </InputMargin>



                        <InputMargin>
                        <FieldLabel>내용 *</FieldLabel>
                        <TextAreaStyle 
                            $type={'contact'}
                            placeholder='내용을 넣어주세요'
                            {...register('description' , {
                                required : '내용을 적어주세요',
                                minLength : {
                                    value : 10,
                                    message : '10글자 이상 기재 부탁드립니다.'
                                }
                                })
                            }
                            $error={errors.description}
                            rows='7'
                            // onChange={(e) => changeHandler(e.target.value)}
                        />
                        {errors.description &&  <ErrorBubble>{errors.description.message}</ErrorBubble> }
                        </InputMargin>
                        <Button.Submit
                            style={{marginLeft: 'auto'}}
                            page='contact'
                            disabled={mailSubmit}
                        >문의 메일 보내기</Button.Submit>
                    </FormStyle>
                </ContactContents>
        </>
    )
}