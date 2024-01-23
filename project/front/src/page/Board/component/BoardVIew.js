import { useMemo , useEffect, useState} from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import BoardReply from './BoardReply';

export default function BoardView({counter, board , setBoard , setCounter }){
    
    const navigate = useNavigate();
    const location = useLocation();


    const [ idxDelete , setIdxDelete ] = useState(null);
    const createPaging = (totalData , DataPerItem) =>{
        const page = Math.ceil(totalData / DataPerItem) ;
        return Array.from({length : page}, (_,idx) => idx + 1);
    }
    const paging = useMemo(() => {
        const limit = 10;
        return createPaging(counter, limit);
    }, [counter]);
    
    
    const changePage = async (page) =>{
        navigate(`/Board?page=${page}`);  
    }


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
    }, [location , setBoard , setCounter]); // location이 변경될 때마다 실행

    return(
        <>
            {board.length === 0 &&  <p> 등록된 게시물이 없습니다. </p>}
            {
                board && board.map((item)=> {
                    return <BoardReply 
                        key={item.idx} 
                        reply={item}
                        isIDX={item.idx === idxDelete}
                        setIdxDelete={setIdxDelete}
                        setBoard={setBoard}
                    />
                } )
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
        </>
    )
}