import { useEffect, useRef, useState } from 'react';
import BoardReply from './BoardReply';
import Fadeup from '../../../FadeinComponent';
import styled from 'styled-components';
import { useQuery } from 'react-query';

const BoardReplyWrap = styled.div`
  height: 700px;
  overflow-y: scroll;

   &::-webkit-scrollbar {
        width: 4px;  /* 스크롤바의 너비 */
    }
    &::-webkit-scrollbar-thumb {
        height: 20%; /* 스크롤바의 길이 */
        background: rgb(120, 158, 228); /* 스크롤바의 색상 */
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;
    }

    &::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, .1); 
        
    }
`

export default function BoardView({ moreData , board ,setPage }){
    const [ selectIdx , setSelectIdx ] = useState(null);
    // const { data } = useQuery();
    const ref = useRef();
    console.log(board);
    
    useEffect(()=>{
        const lastRef = ref.current;
        const io = new IntersectionObserver((entry)=>{
            // console.log('랜더링');
            if(entry[0].isIntersecting && moreData ) setPage(prev => prev + 1);
        } , { threshold : .5})
        if(lastRef){
            io.observe(lastRef);
        }
        return ()=>{
            io.disconnect(lastRef);
        }
    },[board ,setPage , moreData]);


    return(
        <>  
        <BoardReplyWrap>
            {board.length === 0 &&  <p> 등록된 게시물이 없습니다. </p>}
            {
                board && board.map((item, idx)=> {
                    return <Fadeup key={item.board_key}>
                        <BoardReply 
                            ref={ref}
                            reply={item}
                            idx={item.idx}
                            selectIdx={selectIdx === item.idx}
                            setSelectIdx={setSelectIdx}
                        />
                    </Fadeup>
                } )
            }
              
        </BoardReplyWrap>
        </>
    )
}