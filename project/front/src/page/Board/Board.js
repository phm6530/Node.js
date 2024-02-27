import { useQuery , useMutation } from 'react-query';
import { useLocation} from 'react-router-dom';
import { findForBadword } from '../../filter/filterWording';
import { v4 as uuidv4 } from 'uuid';
import { fetchReply , fetchData } from './BoardFetch';

import BoardReplyForm from './component/BoardReplyForm';
import BoardView from './component/BoardVIew';

import * as Yup from 'yup';
import styled, { keyframes } from 'styled-components';

import BannerCommon from '../../component/ui/BannerCommon';
// import { dateFormating } from '../../component/common/DateFormat';

import { useForm , FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Yup + form hook 연동
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Grid, { HeaderGird } from '../../component/ui/Grid';
import alertThunk from '../../store/alertTrunk';
// import { RiDoubleQuotesL } from "react-icons/ri";

import DashBoard from '../../component/ui/DashBoard';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import SubTitle   from '../../component/ui/Subtitle';



const FlexDelction = styled.div`
    
`

const animation = keyframes`
    from{
        transform: translateX(-50px);
        opacity: 0;
    }
    to{
        transform: translateX(-0px);
        opacity: 1;
    }
` 

const BoardReplyStyle = styled.div`
    position: relative;
    opacity: 0;
    border-radius: 1em;
    height: 100%;
    padding: 26px 0 0;
    width: 45%;
    box-shadow: 50px 80px 15px rgba(0,0,0,0.1);
    position: absolute;
    overflow: hidden;

    left: 0;
    animation: ${animation} .5s .3s cubic-bezier(0.1, 0.45, 0, 1.09) forwards;
`

const ReplyWrapHeader = styled.div`
    background: -webkit-linear-gradient(to right, #2c383f, #363232);
    background: linear-gradient(to right, #2c383f, #363232); 
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
    border-radius: 1em 1em 0 0;
    
    display: flex;
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
    word-break: keep-all;
    /* margin-top: 20px; */
    margin-bottom: 20px;
    margin-top: 10px;
    color: #222;
    font-size: 14px;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 45rem;
    margin: 0 auto;
    .tester{
        width: 15rem;
        border-radius: 1em;
        height: 350px;
        margin-right: 3rem;
        box-shadow: 3px 21px 17px rgb(0 0 0 / 25%);
    }
`

const BoardGrid = styled(Grid)`
    display: flex;
    padding-top: 80px;
    align-items: flex-start;
    justify-content: flex-end;
    margin-bottom: 7rem;
    padding-bottom: 9rem;
`

const RightWrap = styled.div`
    height: 100%;
    display: flex;
    width: 45%;
    transition: all .5s ease;
    /* box-shadow: 50px 80px 15px rgba(0,0,0,0.1); */
    flex-direction: column;
`


const ContentsWraps = styled.div`
    display: flex;
    flex-direction: column;
`

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
                // console.log('userQuery 실행');
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

    return(
        <>  
      
        {/* Header */}
        <DashBoard page={'board'}>
            <HeaderGird>
                <BannerCommon.BannerPoint>
                        <img src="img/board.png" alt="board" />MY Board
                </BannerCommon.BannerPoint>
                            
                <DashBoardTitle><b>Guest Book</b></DashBoardTitle>
            </HeaderGird>
        </DashBoard>

    
                            {/* formProvider */}
                                            
                        <BoardGrid>
                            {/* <CommonNav/> */}
                                
                                    
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
                            {(!isLoading && isError) && 'error'}
                            </BoardReplyStyle>


                    <RightWrap
                        id='parallex_form'
                    >                
                            <BoardDashBoard>
                                {/* <div className='tester'></div> */}
                                <FlexDelction>
                                    <SubTitle>
                                        {/* <img src="/img/board/talk.png" alt="dev_icon" className='dev_icon'/> */}
                                      
                                        <div className="subText">
                                            <div className="subTextPoint">
                                                My PortPolio Board
                                            </div>

                                            남기고 싶은 말씀을 적어주세요 !
                                        </div>
                                    </SubTitle>
                                    

                                  
                        

       
                                

                                        {/* Form Provider */}
                                            <FormProvider {...formMethod}>
                                                <BoardReplyForm  
                                                    onSubmitHandlr={onSubmitHandlr}
                                                />
                                            </FormProvider>
                                            <PageText>brycpt를 이용하여 암호화 저장하고 있으며 해싱된 비밀번호 이외 어떠한 정보도 수집하지 않습니다.</PageText>
                                    
                                </FlexDelction>
                   
                                
                            </BoardDashBoard>


                  



                    </RightWrap>
               
                  
                </BoardGrid>


        </>
    )
}




