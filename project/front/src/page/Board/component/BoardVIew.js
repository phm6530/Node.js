import { useEffect, useRef, useState } from 'react';
import BoardReply from './BoardReply';
import Fadeup from '../../../FadeinComponent';
import styled from 'styled-components';

const BoardReplyWrap = styled.div`
    height: 813px;
  overflow-y: scroll;

   &::-webkit-scrollbar {
        width: 4px;  /* 스크롤바의 너비 */
    }
    &::-webkit-scrollbar-thumb {
        height: 20%; /* 스크롤바의 길이 */
        background: #355b75; /* 스크롤바의 색상 */
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;
    }

    &::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, .1); 
    }
`

export default function BoardView({ moreData , board ,setUserData, setLastPageIdx }){
    const [ selectIdx , setSelectIdx ] = useState(null);
    const refs = useRef([]);
    useEffect(()=>{
        if(!moreData) return ;
        
        const selectRefs = refs.current.slice(0, refs.current.length);
        console.log(selectRefs.length);
        const lastRef = selectRefs[board.length - 1];
        //디버깅용 색칠하기
        // if(lastRef){
        //     lastRef.style.backgroundColor = 'red';
        // }
        const io = new IntersectionObserver((entry)=>{
            if(entry[0].isIntersecting && moreData ) {
                setLastPageIdx(selectRefs.length);
            }
        } , { threshold : .1})
        if(lastRef){
            io.observe(lastRef);
        }
        return ()=>{
            io.disconnect();
        }
    },[board, setLastPageIdx,  moreData]);


    return(
        <>  
        <BoardReplyWrap>
            {board.length === 0 &&  <p> 등록된 게시물이 없습니다. </p>}
            {
                board && board.map((item, idx)=> {
                    return <Fadeup key={item.board_key} >
                        <BoardReply 
                    ref={(e) => {
                        if (e === null) {
                          refs.current = refs.current.slice(0, idx);
                        }else{
                            refs.current[idx] = e;
                        }
                      }}
                            reply={item}
                            idx={item.idx}
                            selectIdx={selectIdx === item.board_key}
                            setSelectIdx={setSelectIdx}
                            setUserData={setUserData}
                        />
                    </Fadeup>
                } )
            }
              
        </BoardReplyWrap>
        </>
    )
}