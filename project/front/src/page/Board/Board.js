import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { findForBadword } from '../../filter/filterWording';
import { v4 as uuidv4 } from 'uuid';
import BoardReplyForm from './component/BoardReplyForm';
import BoardView from './component/BoardVIew';
import useAlert from '../../component/common/UseAlert';

const formInital = {
    userName : { value : '' , isValid : false , touched : false },
    contents : { value : '' , isValid : false , touched : false},
    password : { value : '' , isValid : false , touched : false }
}

export default function Board(){
    const [ board , setBoard ] = useState('');
    const [ counter , setCounter ] = useState();
    const [ reply , setReply ] = useState(formInital);
    const location = useLocation();
    const showAlert = useAlert();
    
    // 폼 확인
    const validateCheck = () =>{
        const obj = Object.values(reply);
        return obj.reduce((isValids , item)=>{
                return isValids && item.isValid;
        }, true );   
    }

    const touchedAll = () =>{
        // 전체 form touched 버리기
        setReply(prev => {
            const updateReply = {};
            for(let [key] of Object.entries(prev)){
                updateReply[key] = {...prev[key] , touched : true };
            }
            return updateReply;
        })
    }

    const fetchReply = async(formData) =>{
        console.log(formData);
        const response = await fetch('http://localhost:8080/Board/reply', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log(result);
        if(!response.ok){
            throw new Error(result.message);
        }
        return result;
    }

    const onSubmitHandlr = async(e) =>{
        e.preventDefault();
        
        touchedAll(); //touched All
        if(!validateCheck()){
            return;
        }
        if(!findForBadword(reply.contents.value)){
            return
        }
        // 24/1/21 댓글 
        try{
           const formData = {
                idx : uuidv4(),
                userName : reply.userName.value ,
                contents : reply.contents.value ,
                password : reply.password.value ,
                page : new URLSearchParams(location.search).get('page') || 1
            }
            console.log(formData);
            const result = await fetchReply(formData);
            console.log(result);
            setBoard(result.resData);
            setCounter(result.counter);
            setReply(formInital);
            showAlert('댓글이 등록되었습니다.');

        }catch(error){
            console.log(error.message);
        }
    }   

    return(
        <>  
            {/* view or Page */}
            <BoardView
                counter={counter}
                board={board}
                setBoard={setBoard}
                setCounter={setCounter}
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




