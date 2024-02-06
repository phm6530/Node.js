import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardReply from './BoardReply';
import Fadeup from '../../../FadeinComponent';

export default function BoardView({ board }){
    const { pageData , counter } = board;
    const [ selectIdx , setSelectIdx ] = useState(null);

    const navigate = useNavigate();
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
    };


    
    return(
        <>  
        <div className="BoardReplyWrap wrap">
            {pageData.length === 0 &&  <p> 등록된 게시물이 없습니다. </p>}
            {
                pageData && pageData.map((item, idx)=> {
                    return <Fadeup  key={item.board_key}>
                        <BoardReply 
                            reply={item}
                            selectIdx={selectIdx === item.idx}
                            setSelectIdx={setSelectIdx}
                        />
                    </Fadeup>
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
        </div>
        </>
    )
}