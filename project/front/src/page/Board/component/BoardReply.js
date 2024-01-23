import useAlert from '../../../component/common/UseAlert';
export default function BoardReply({reply, setIdxDelete, isIDX , setBoard}){
    const showAlert = useAlert();
    const { userName, idx , contents } = reply;
    // const deleteReply = (idx) =>{   
    //     console.log(idx);
    // }

    //댓글 삭제로직
    const deleteFetch = async(formData) =>{
        const response = await fetch('http://localhost:8080/board/reply/delete',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(formData)
        })
        
        const result = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        return result;
    }

    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        const form = new FormData(e.target);
        const password = form.get('password');

        const formData ={
            reply_Idx : idx,
            reply_password : password,
            page : new URL(window.location.href).searchParams.get('page') || 1
        }
        try{
            const resultData = await deleteFetch(formData);
            console.log('리턴데이터임 : ',resultData);
            setBoard(resultData.resData);
            showAlert('삭제되었습니다.');
        }
        catch(error){
            console.log(error);
            showAlert(error.message);
        }
    }

    return(
        <div className='BoardComment' key={idx}>
        {userName}
        {contents}
        {!isIDX && <button onClick={()=>setIdxDelete(idx)}>삭제</button>}
        {isIDX && (
            
            <form onSubmit={onSubmitHandler}>
                <input type="password" 
                    name='password'
                    autoComplete='off'
                />
                <button type='submit'>확인</button>
            </form>
            
        )}
        </div>    
    )
}