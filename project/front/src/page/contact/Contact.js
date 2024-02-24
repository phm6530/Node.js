import DashBoard from '../../component/ui/DashBoard';
import Gird from '../../component/ui/Grid';
import BannerCommon from '../../component/ui/BannerCommon';
import styled from 'styled-components';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import alertThunk from '../../store/alertTrunk';
const ContactGrid = styled(Gird)`
    padding-top: 150px;
`
const PageSubText = styled.div`
    color:#fff;
    font-size: 20px;
    margin-bottom: 70px;
    text-shadow: 0px 5px 5px rgba(0,0,0,.4);
    p{
        font-size: 14px;
        color: #fff;
        opacity: .7;
        padding-top: 20px;
    }
`

const ContactContents = styled.div`
    width: 100%;
    min-height: 300px;
    background: #fff;
    input , textarea{
        border: 1px solid red;
    }
`


export default function Contact(){
    const { handleSubmit , register , formState : { errors } , reset } = useForm();
    const [ rows, setRows ] = useState(6);
    const dispatch = useDispatch();

    
    const fetchMailHandler = async(mailData) =>{
        console.log(mailData);
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
        
    }
    const changeHandler = (e)=>{
        const LineCalculate = e.split(/\r\n|\r|\n/).length < 6 ? 6  : e.split(/\r\n|\r|\n/).length;
        setRows(LineCalculate);
    }
    
    console.log(errors);
    return(
        <>
            <DashBoard page={'Contact'}></DashBoard>
            <ContactGrid>
                <BannerCommon.BannerPoint>
                    <img src="img/developer.png" alt="developer" />Contact Me 
                </BannerCommon.BannerPoint>
                <DashBoardTitle>CONTACT</DashBoardTitle>
                <PageSubText>

                    웹 퍼블리셔 4년차, 프로젝트 활동을 기록합니다. <br></br>
                    더 넓은 지식을 위해 React, Node.js를 학습 중에 있습니다.<br></br>
                    <p>*전 회사의 공개 가능한 프로젝트 / 개인 작업물만 공유합니다.</p>
                </PageSubText>
                <ContactContents>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <label>보내는 분</label>
                        <input type="text"  {...register('name' , {
                              required : '추가하실 일정을 입력해주세요!',
                        })}/> 

                        <label>보내는 분</label>
                        <input type="text"  {...register('who' , {
                            required : '회신 받으실 연락처를 적어주세요'
                        })}/> 

                        <label>내용</label>
                        <textarea 
                            {...register('description' , {
                                required : '내용을 적어주세요',
                                })
                            }
                            rows={rows}
                            onChange={(e) => changeHandler(e.target.value)}
                        />

                        <button>Submit</button>
                    </form>
                </ContactContents>
                
            </ContactGrid> 
        </>
    )
}