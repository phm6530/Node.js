import { useQuery , useMutation } from 'react-query';
import { useLocation} from 'react-router-dom';
import { findForBadword } from '../../filter/filterWording';
import { v4 as uuidv4 } from 'uuid';
import { fetchReply , fetchData } from './BoardFetch';

import BoardReplyForm from './component/BoardReplyForm';
import BoardView from './component/BoardVIew';

import * as Yup from 'yup';
import styled from 'styled-components';


// import { dateFormating } from '../../component/common/DateFormat';

import { useForm , FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Yup + form hook 연동
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Gird from '../../component/ui/Grid';
import alertThunk from '../../store/alertTrunk';
import { RiDoubleQuotesL } from "react-icons/ri";

import StackIcon from '../../component/icon/StackIcon';
import DashBoard from '../../component/ui/DashBoard';
import DashBoardTitle from '../../component/ui/DashBoardTitle';

const BoardStyle = styled.div`
    display: flex;
    /* padding-top: 200px; */
    /* transform: translateY(-120px); */
`

const BoardReplyStyle = styled.div`
/* border: 3px solid #fff; */
    width: 50%;
    border-radius: 1em;
    background: #e2e6ef;
    overflow: hidden;
    position: relative;
    padding: 40px 0 0;
    box-shadow: 0px 5px 20px rgb(67 27 16 / 18%);
`

const ReplyWrapHeader = styled.div`
    background: -webkit-linear-gradient(to right, #000000, #2d3f60);
    
    background: linear-gradient(to right, #000000, #2d3f60);
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
    box-shadow: 0px 5px 20px rgb(67 27 16 / 18%);
    display: flex;
    border-bottom: 2px solid #fff;
    justify-content: space-between;
    align-items: center;
    
     span{
        color: #fff;
        font-size: 12px;
        /* border: 1px solid #fff6; */
        border-radius: 19px;
        padding: 2px 12px;
        margin-right: 20px;
        background: #1e1e1e87;
        margin: 5px;
        margin-right: 20px;

     }
     
`

const PageText = styled.div`
    width: 90%;
    word-break: keep-all;
    margin-top: 20px;
    margin-bottom: 50px;

    p{
        line-height: 1.7em;
        color:#fff;
    }
    p:first-child{
        font-size: 20px;
        letter-spacing: -.5px;
        margin-bottom: 10px;
        /* font-weight: bold; */
        color: #cfdaf3;
        text-shadow: 0px 5px 5px rgba(0,0,0,.9);
    }
    p:nth-child(2){
        font-size: 14px;
        line-height: 1.9em;
        margin-left: 25px;
        text-shadow: 0px 5px 5px rgba(0,0,0,.4);
        color: #dae5ff;
    }
`

const ReplyHeaderPoint = styled.div`
    margin-left: 20px;
    div{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 1em;
        margin-right: 5px;
    }
    div:first-child{
        background: #28c840;
    }
    div:nth-child(2){
        background: #febc2e;
    }
    div:nth-child(3){
        background: #ff5f57;
    }
`

const BoardDashBoard = styled.div`
    width: 50%;
`

// const SubTitle = styled.div`
//     width: 200px;
//     height: 30px;
//     background: red;
//     border-radius: 5px;
// `

export default function Board(){
    const location = useLocation();
    const { login } = useSelector(state => state.authSlice);

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

    // 아이콘 들어갈 배열 만듬 
    const personIcon = [...Array(6)].map((_,idx)=> `person_${idx + 1}`);    
    const randomUserIcon = personIcon[Math.floor(Math.random() * personIcon.length)];

    // React-hook-form
    const formMethod = useForm({
        resolver : yupResolver(schama) ,
        defaultValues : {
            userIcon : randomUserIcon,
            userName : '',
            contents : '',
            password : ''
        }
    });


    // 초기데이터 + 페이징 데이터 로드
    const [ userData , setUserData] = useState([]);
    const [ moreData , setMoreData ] = useState(true);
    const [ total ,setTotal ] = useState(0);
    const [ lastPageIdx , setLastPageIdx ] = useState(null);
    const dispatch = useDispatch();
    // console.log(userData);
    // console.log('startIdx : ', lastPageIdx);
    
    const { isLoading , isError } = useQuery(
        ['board', lastPageIdx], () => fetchData(lastPageIdx), {
            refetchOnWindowFocus: false,
            onSuccess :(data) =>{
                if(data.pageData.length === 0 ){
                    setMoreData(false);
                }
                setTotal(data.counter);
                console.log('userQuery 실행');
                // 이건 맞음
                setUserData(prev => {
                    return [...prev , ...data.pageData]
                });
            },
            onError: (error) => {
                console.log('실행');
                dispatch(alertThunk(error.message, 0));
            } 
        }
    ); 

    // console.log('Board / userData : ',userData);
    

    // Query 뮤테이션
    const mutation = useMutation(formData => fetchReply(formData), {
        onSuccess: (data) => {
            setUserData(prev => [...data.resData , ...prev]);
            setTotal(data.counter);
            console.log('userMutation 실행');
            dispatch(alertThunk('댓글 등록되었습니다.', true))
            formMethod.reset();
        },
        onError: (error) => {
            dispatch(alertThunk(error.message, 0));
        }
    });
    
    // submit
    const onSubmitHandlr = async(data) =>{
        // console.log(data);
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
    const BoardGrid = styled(Gird)`
        padding-top: 150px;
    `
    return(
        <>  
        {/* formProvider */}

        
       
                <DashBoard page={'board'}/>
                <BoardGrid>
                    <BoardStyle>
                        <BoardDashBoard>
                        <DashBoardTitle>Guest Book</DashBoardTitle>
                        <PageText>
                            <p style={{display:'flex'}}><RiDoubleQuotesL style={{marginRight:'5px' , opacity:'.5'}}/> 남기고 싶은 말씀을 적어주세요 !</p>
                            <p>
                                <b>IntersectionObserver</b>로 구현한 <b>'Infinity Scroll'</b> 형식의 방명록입니다.<br></br>
                               
                                입력하시는 비밀번호는 단순 삭제용도의 비밀번호이며  <StackIcon.Node style={{backgroundColor: "#fff"}} label={'Node.js'}/>의 <b>brycpt</b>를 이용하여 암호화 저장하고 있으며 해싱된 비밀번호 이외 어떠한 정보도 수집하지 않습니다.
                            </p>
                        </PageText>
                        
                        {/* Form */}
                        <FormProvider {...formMethod}>
                            <BoardReplyForm  
                                onSubmitHandlr={onSubmitHandlr}
                            />
                        </FormProvider>
                        </BoardDashBoard>

                        <BoardReplyStyle>

                            <ReplyWrapHeader>
                                <ReplyHeaderPoint>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </ReplyHeaderPoint>
                 
                                <span>Total {total}</span>
                            </ReplyWrapHeader>

                            {/* view or Page */}
                                {userData && 
                                    <BoardView
                                        board={userData}
                                        moreData={moreData}
                                        setUserData={setUserData}
                                        setLastPageIdx={setLastPageIdx}
                                    /> }
                            {/* {isLoading && 'loading....'} */}
                            {(!isLoading && isError) && 'error'}
                            {/* <ReplyWrapHeader>
                                <span>Total {total}</span>
                            </ReplyWrapHeader> */}
                        </BoardReplyStyle>
                    </BoardStyle>
                </BoardGrid>


        </>
    )
}




