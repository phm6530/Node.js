import { useQuery , useMutation, useQueryClient } from 'react-query';
import { useLocation , useNavigate} from 'react-router-dom';
import { findForBadword } from '../../filter/filterWording';
import { v4 as uuidv4 } from 'uuid';
import { fetchReply , fetchData } from './BoardFetch';

import BoardReplyForm from './component/BoardReplyForm';
import BoardView from './component/BoardVIew';
import useAlert from '../../component/common/UseAlert';

import * as Yup from 'yup';
import styled from 'styled-components';


// import { dateFormating } from '../../component/common/DateFormat';

import { useForm , FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Yup + form hook 연동
import { useSelector } from 'react-redux';
import { useState } from 'react';

const BoardStyle = styled.div`
    display: flex;
    transform: translateY(-111px);
`

const BoardReplyStyle = styled.div`
    border: 3px solid #fff;
    width: 50%;
    border-radius: 1em;
    background:#e2e6ef;
    overflow: hidden;
`

const ReplyWrapHeader = styled.div`
     background: #2d2626;

     span{
        color: #fff;
        font-size:12px;
     }
     
`

const PageText = styled.div`
    width: 90%;
    word-break: keep-all;
    p:first-child{
        font-weight: bold;
    }
`

const PageTitleStyle = styled.div`
    color:#e2e6ef;
`

const BoardDashBoard = styled.div`
    width: 50%;
`

export default function Board(){
    const showAlert = useAlert(); // 팝업 커스텀 훅
    const location = useLocation();
    const { login } = useSelector(state => state.authSlice);
    // console.log('pageTouched: ',pageTouched);

    const schama = Yup.object({
        userIcon : Yup.string().required('필수항목 입니다.'),
        userName : Yup.string().required('필수항목 입니다.'),
        contents : Yup.string().required('필수항목 입니다.').min(10, '최소 10글자 이상 적어주세요'),
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
    const [ page, setPage ] = useState(1);
    const [ userData , setUserData] = useState([]);
    const [ moreData , setMoreData ] = useState(true);
    const [ total ,setTotal ] = useState(0);
    
    // userData.forEach((e)=>{
    //     console.count();
    //     console.log('board key : ',e.board_key); 
    // });
    console.log('page : ',page);

    const { isLoading , isError } = useQuery(
        ['board', page], () => fetchData(page), {
            refetchOnWindowFocus: false,
            onSuccess :(data) =>{
                if(data.pageData.length === 0 ){
                    setMoreData(false);
                }
                setTotal(data.counter);

                // 이건 맞음
                setUserData(prev => {
                    return [...prev , ...data.pageData]
                });
            },
            onError: (error) => {
                console.log('실행');
                showAlert(error.message, 0);
            }
        }
    ); 
    
    // QueryClient 연결
    const queryClient = useQueryClient();

    // Query 뮤테이션
    const mutation = useMutation(formData => fetchReply(formData), {
        onSuccess: (data) => {
            console.log('Myation reply data :',data);
            
            const newArr = [...data.resData , ...userData ];
            // console.log(newArr);
            // console.log(newArr);
            setUserData(newArr);
            // queryClient.invalidateQueries('board');
            showAlert('댓글이 등록되었습니다.' , 1);
            formMethod.reset();
        },
        onError : (error)=>{
            showAlert(error.message , 0);
        }
    });
    
    // submit
    const onSubmitHandlr = async(data) =>{
        // console.log(data);
        if(!findForBadword(data.contents)){
            showAlert('비속어는 입력 불가합니다..' , false );
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
        {/* formProvider */}

        
        <FormProvider {...formMethod}>

                <div className="pageDashBoard"></div>
                
                <BoardStyle className="wrap">
                    
                    <BoardDashBoard>
                    <PageTitleStyle className='pageTitle'>Guest Book</PageTitleStyle>
                    <PageText>
                        <p>남기고 싶은 말씀을 적어주세요!</p>
                        <p>Verfly으로 compare하는 형식으로 알고리즘으로 비밀번호를 변환하기에 제작자 또한 비밀번호를 알 수 없습니다.</p>
                    </PageText>
                      {/* Form */}
                        <BoardReplyForm  
                            onSubmitHandlr={onSubmitHandlr}
                        />
                    </BoardDashBoard>

                    <BoardReplyStyle>
                        <ReplyWrapHeader>
                            <span>Total {total}</span>
                        </ReplyWrapHeader>
                        {/* view or Page */}
                        {userData && <BoardView
                                    board={userData}
                                    // pageTouched={pageTouched}
                                    page={page}
                                    setPage={setPage}
                                    moreData={moreData}
                        /> }
                        {/* {isLoading && 'loading....'} */}
                        {(!isLoading && isError) && 'error'}
                    </BoardReplyStyle>
                    
                </BoardStyle>
        </FormProvider>

        </>
    )
}




