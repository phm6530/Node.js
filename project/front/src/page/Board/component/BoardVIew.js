import { useMemo , useState} from 'react';
import { useNavigate } from 'react-router-dom';
import BoardReply from './BoardReply';

export default function BoardView({ board , setBoard }){
    const { boardData , counter} = board;
    console.log(boardData);
    const navigate = useNavigate();
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
        setBoard(prev => ({...prev , page}))
    };

    return(
        <>
            {boardData.length === 0 &&  <p> 등록된 게시물이 없습니다. </p>}
            {
                boardData && boardData.map((item)=> {
                    // console.log('item :' , item)
                    return <BoardReply 
                        key={item.board_key} 
                        reply={item}
                        isIdx={item.idx === idxDelete}
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
                })}    
        
        </>
    )
}