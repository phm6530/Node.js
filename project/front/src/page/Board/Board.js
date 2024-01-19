import { useEffect, useState } from 'react';
import { useLoaderData , useLocation} from 'react-router-dom';
import { validateWord } from '../../filter/filterWording';

import InputReply from './component/InputReply';

export default function Board(){
    const { boardData ,  counter } = useLoaderData(); // 초기 데이터 세팅
    const [ board , setBoard ] = useState(boardData);
    
    // const { login } = useSelector(state => state.authSlice);

    const [ FormValid , setFormValid ] = useState(false); //Form 확인
    const [ paging , setPaging ] = useState();
    const location = useLocation()
    
    
    
    const createPaging = (totalData , DataPerItem) =>{
        const page = Math.ceil(totalData / DataPerItem) ;
        return Array.from({length : page}, (_,idx) => idx + 1);
    }

    useEffect(()=>{
        const limit = 10;    
        const arr = createPaging( counter , limit )
        setPaging(arr);
    },[counter]);
    
    

    // console.log('board Data : ', board);
    const [ reply , setReply ] = useState(
        {
            userName : { value : '' , isValid : false , touched : false },
            contents : { value : '' , isValid : false , touched : false},
            password : { value : '' , isValid : false , touched : false }
        }
    );

    // isValid 로직
    useEffect(()=>{
        const obj = Object.values(reply);
        const tester = obj.reduce((isValids , item)=>{
                return isValids && item.isValid;
        }, true );   
        setFormValid(tester);
    },[reply]);


    const onSubmitHandlr = async(e) =>{
        e.preventDefault();
        const { isValidate , badword } = validateWord(reply.contents.value);

        // touched 해버리기
        setReply(prev => {
            const updateReply = {};
            for(let [key] of Object.entries(prev)){
                updateReply[key] = {...prev[key] , touched : true };
            }
            return updateReply;
        })

        if(!FormValid){
            console.log('에러임');
            return;
        }
        if(isValidate){
            console.log(`${badword}개의 욕설이 감지되었습니다.`);
            return;
        }
        
        // const formData ={
        //     userName : reply.userName.value ,
        //     contents : filterWording(reply.contents.value),
        //     password : reply.password.value ,
        // }

        try{
            const response = await fetch('http://localhost:8080/Board/reply', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    userName : reply.userName.value ,
                    contents : reply.contents.value ,
                    password : reply.password.value ,
                })
            });
            if(!response.ok){
                throw new Error('전송오류')
            }
            const result = await response.json();
            console.log(result);
            // setBoard(prev => ([...prev, result.data]));
            
        }catch(error){
            console.log(error.message);
        }
    }   

    const changePage = async (page) =>{
        try{
            const response = await fetch(`http://localhost:8080/Board/${page}`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    limit : 10
                })
            });
            const result = await response.json();
            if(!response.ok){ //200 번대 요청만 받음
                throw new Error(result.message);
            }
            console.log(result);
        }
        catch(error){
            console.error(error);
        }        
    }

    
    return(
        <>  

            {board.length === 0 &&  <p> 등록된 게시물이 없습니다. </p>}
            {
                board && board.map((item , idx)=>{
                    return (
                        <p className='BoardComment' key={idx}>
                                {item.userName}
                                {item.contents}
                        </p>
                    )
                })
            }


            {/* 페이징 */}
            {
                paging && paging.map((page , idx)=>{
                  return <button 
                  onClick={()=>changePage(idx+1)} 
                  key={idx} 
                  to={`${location.pathname}/${idx+1}`} 
                  >
                    {page}
                  </button>
                })
            }

            <div className='BoardComment'>
                <form method='POST' onSubmit={onSubmitHandlr}>
                    <InputReply 
                        inputTitle={'작성자'}
                        type="text" 
                        inputName='userName'
                        reply={reply}
                        setReply={setReply}
                    />
                    <InputReply 
                        inputTitle={'내용'}
                        type="text" 
                        inputName='contents'
                        reply={reply}
                        setReply={setReply}
                    />
                    <InputReply 
                        inputTitle={'password'}
                        type="password" 
                        inputName='password'
                        reply={reply}
                        setReply={setReply}
                    />
                    <button type='submit'>reply</button>
                </form>
            </div>
        </>
    )
}


// loader로 쓰는중
export const boardList = async () =>{
    try{
        const response = await fetch('http://localhost:8080/Board');
        if(!response.ok){
            throw new Error('connect Error');
        }
        const result = await response.json();
        console.log(result);
        return result;
    }
    catch(error){
        console.log(error.message);
    }
}

