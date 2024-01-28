import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findForBadword } from '../../filter/filterWording';
import { v4 as uuidv4 } from 'uuid';
import BoardReplyForm from './component/BoardReplyForm';
import BoardView from './component/BoardVIew';
import useAlert from '../../component/common/UseAlert';

import { fetchReply , fetchData } from './BoardFetch';

const replyInital = {
    userName : { value : '' , isValid : false , touched : false , errorMessage : '작성자는 필수항목입니다.'},
    contents : { value : '' , isValid : false , touched : false , errorMessage : '내용은 2글자 이상 입력해주세요.'},
    password : { value : '' , isValid : false , touched : false , errorMessage : 'password는 4글자 이상 입력해주세요.'}
}

export default function Board(){
    const [ reply , setReply ] = useState(replyInital);
    
    const showAlert = useAlert(); // 팝업 커스텀 훅
    const location = useLocation();


    // Board 데이터;
    const [ board , setBoard ] = useState({
        boardData : [],
        counter : null, 
        page : +new URLSearchParams(location.search).get('page') || +1
    });



    // 초기데이터 + 페이징 데이터 로드
    useEffect(() => {
        let isMounted = true;

        fetchData(board.page)
        .then(data => {
                if(isMounted){
                    setBoard(prev => (
                        {...prev , counter : data.counter , boardData : [...data.pageData] }
                    )); 
                }
            }
        ).catch(error => console.log(error.message));

        return () =>{
            isMounted = false; 
        }
    }, [board.page]); 


    
    // 폼 확인
    const validateCheck = () =>{
        const obj = Object.values(reply);
        return obj.reduce((isValids , item)=>{
                return isValids && item.isValid;
        }, true );   
    }

    // 전체 form touched 처리
    const touchedAll = () =>{
        
        setReply(prev => {
            const updateReply = {};
            for(let [key] of Object.entries(prev)){
                updateReply[key] = {...prev[key] , touched : true };
            }
            return updateReply;
        })
    }
    
    

    const dateFormating = (today) =>{
        const arrDay = ['일','월','화','수','목','금','토'];

        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const day = today.getDay();

        const hour = today.getHours();
        const minit = today.getMinutes();

        const dateFormating = [ year , month , date  ].join('-');
        const wirteDay = arrDay[day];
        const writeTime =  `${hour} : ${minit}`;

        return [ dateFormating  , wirteDay, writeTime ] ;
    }

    
    console.log(dateFormating(new Date()));

    
    

    // submit
    const onSubmitHandlr = async(e) =>{
        e.preventDefault();
        

        touchedAll(); //touched All

        if(!validateCheck()){
            return;
        }
        if(!findForBadword(reply.contents.value)){
            showAlert('비속어는 입력 불가합니다..' , false );
            return;
        }

        // 날짜  인스턴스 생성 
        // const today = new Date();
        // const wirteDate = dateFormating(today);

        // 24/1/21 댓글 
        try{
           const formData = {
                idx : uuidv4(),
                userName : reply.userName.value ,
                contents : reply.contents.value ,
                password : reply.password.value ,
                page : new URLSearchParams(location.search).get('page') || 1 ,
            }

            const data = await fetchReply(formData);
            console.log(data);
            setBoard(prev => (
                {...prev , counter : data.counter ,  boardData : [...data.resData] }
            )); 

            setReply(replyInital);
            showAlert('댓글이 등록되었습니다.' , 1);

        }catch(error){
            showAlert(`요청에 실패하였습니다 사유 : ${error.message}`);
            console.log(error.message);
        }
    }   

    // console.log(board.boardData);
    return(
        <>  
            {/* view or Page */}
            <BoardView
                board={board}
                setBoard={setBoard}
            /> 

            {/* Form */}
            <BoardReplyForm
                onSubmitHandlr={onSubmitHandlr}
                reply={reply}
                setReply={setReply}
            />
        </>
    )
}




