import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate , useLocation, useLoaderData } from 'react-router-dom';
import InputReply from './component/InputReply';

export default function Board(){
    const { boardData } = useLoaderData();
    const { login } = useSelector(state => state.authSlice);
    const [ FormValid , setFormValid ] = useState(false); //Form 확인
    const [ reply , setReply ] = useState(
        {
            userName : { value : '' ,  isValid : false ,  touched : false },
            contents : { value : '' , isValid : false , touched : false},
            password : { value : '' , isValid : false , touched : false }
        }
    );
    
    console.log(reply);

    const navigate = useNavigate();
    const location = useLocation();
    
    // Nav
    const NavBtn = ({path}) =>{
        const navHandler = (path) =>{
            navigate(location.pathname + path);    
        }
        return(
            <>
                <button onClick={()=>navHandler(path)}>글쓰기</button>
            </>
        )
    }

    const onSubmitHandlr = (e) =>{
        e.preventDefault();

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
        console.log('제출완료!');
    }   

    return(
        <>  
            { login && <NavBtn path={'/BoardWirte'} />}
            {
                boardData.map((Notice_name , idx)=>{
                    return (
                        <p className='BoardComment' key={idx}>
                                {Notice_name.idx}
                                {Notice_name.title}
                        </p>
                    )
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
        return result;
    }
    catch(error){
        console.log(error.message);
    }
}

