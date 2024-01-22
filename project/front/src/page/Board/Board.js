import { useEffect, useState , useMemo} from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { validateWord } from '../../filter/filterWording';

import InputReply from './component/InputReply';

export default function Board(){
    // const { pageData ,  counter } = useLoaderData(); // 초기 데이터 세팅
    // console.log(pageData);
    const [ board , setBoard ] = useState('');
    const navigate = useNavigate();

    // const { login } = useSelector(state => state.authSlice);
    const location = useLocation();
    const [ FormValid , setFormValid ] = useState(false); //Form inValid 확인
    const [ counter , setCounter ] = useState();
    
    const createPaging = (totalData , DataPerItem) =>{
        const page = Math.ceil(totalData / DataPerItem) ;
        return Array.from({length : page}, (_,idx) => idx + 1);
    }


    const formInital = {
        userName : { value : '' , isValid : false , touched : false },
        contents : { value : '' , isValid : false , touched : false},
        password : { value : '' , isValid : false , touched : false }
    }

    // console.log('board Data : ', board);
    const [ reply , setReply ] = useState(formInital);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // useLocation 훅을 사용하여 현재 페이지 번호를 가져옵니다.
                const searchParams = new URLSearchParams(location.search);
                const page = searchParams.get('page') || 1;
    
                const response = await fetch(`http://localhost:8080/Board/${page}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ limit: 10 })
                });
                
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }
    
                setCounter(result.counter);
                setBoard(result.pageData); // 새로운 페이지 데이터로 상태 업데이트
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    
        fetchData();
    }, [location]); // location이 변경될 때마다 실행


    const paging = useMemo(() => {
        const limit = 10;
        return createPaging(counter, limit);
    }, [counter]);
    


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
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page') || 1;
        console.log(page);
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
        

        // 24/1/21 댓글 
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
                    page
                    
                })
            });
            const result = await response.json();
            if(!response.ok){
                throw new Error(result.message);
            }
            setBoard(result.resData);
            setCounter(result.counter);
            // setReply(formInital);
            
        }catch(error){
            console.log(error.message);
        }
    }   

    const changePage = async (page) =>{
        navigate(`/Board?page=${page}`);  
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




