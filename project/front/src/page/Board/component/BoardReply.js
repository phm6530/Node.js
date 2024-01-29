import { useEffect, useState , useMemo } from 'react';
import { deleteFetch } from '../BoardFetch';
import useAlert from '../../../component/common/UseAlert';


export default function BoardReply({reply, setIdxDelete, isIdx , setBoard}){

    const showAlert = useAlert();

    const { 
        user_name, 
        idx , 
        contents , 
        date,
        board_key // 식별 board key
    } = reply;

    const initalReply = useMemo(()=>({
        value : '' , 
        touched : false
    }), [] )
    
    const [ replyValid , setReplyValid ] = useState(initalReply);


    useEffect(()=>{
        if(!isIdx){
            setReplyValid(initalReply);
        }
    },[isIdx , setReplyValid , initalReply]);


    const onChangeHandler = (value) =>{
        setReplyValid(prev => ({...prev , value}));
    }


    const isReplyValidate = !replyValid.value && replyValid.touched;


    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        setReplyValid(prev => ({...prev, touched:true}))

        if(replyValid.value.trim() === ''){
            return; 
        }

        const form = new FormData(e.target);
        const password = form.get('password');
        const formData ={
            reply_Idx : idx,
            reply_password : password,
            board_key : board_key,
            page : new URL(window.location.href).searchParams.get('page') || 1
        }
        try{
            const {resData , counter  } = await deleteFetch(formData);
            
            setBoard(prev => ({...prev , boardData : resData , counter }));
            showAlert('삭제되었습니다.', 1);
        }
        catch(error){
            console.log(error.message);
            showAlert(error.message);
        }
    }

    return(
        <div className='BoardComment' key={idx}>
        <p>작성자 : {user_name}</p>
        <p>작성일 : {date}</p> 
        {contents}
        {!isIdx && <button onClick={()=>setIdxDelete(idx)}>삭제</button>}
        {isIdx && (
            
            <form onSubmit={onSubmitHandler}>
                <input type="password" 
                    name='password'
                    autoComplete='off'
                    onChange={(e)=>onChangeHandler(e.target.value)}
                    onBlur={()=>setReplyValid(prev => ({...prev , touched : true}))}
                />
                <button type='submit'>확인</button>
                <button type='button' onClick={()=>setIdxDelete(null)}>취소</button>
            </form>
        )}
        {isReplyValidate && '에러'}
        </div>    
    )
}