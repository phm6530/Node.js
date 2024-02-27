import { useEffect, useRef, useState } from 'react';
import BoardReply from './BoardReply';
import Fadeup from '../../../FadeinComponent';
import styled from 'styled-components';

const BoardReplyWrap = styled.div`
  /* overflow-y: scroll; */
  padding-top: 40px;
    height: 100%;
    border: 4px solid rgba(0,0,0,0.05);
    box-shadow: 50px 50px 55px rgba(0,0,0,0.2);
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

const FirstDayStyle = styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:after{
        /* content: ""; */
    /* width: 95%; */
    z-index: 55;
    font-size: 11px;
    padding: 6px 18px;
    color: white;
    /* font-weight: bold; */
    margin: 0 auto;
    background: #2c3197;
    left: -67px;
    background: linear-gradient(to right, #e7e7e7, #cfcfcf);
    border-radius: 1em 1em 0 0em;
    transform: rotate(270deg);
    top: 46px;

    }
`

export default function BoardView({ moreData , board ,setUserData, setLastPageIdx }){
    const [ selectIdx , setSelectIdx ] = useState(null);
    const refs = useRef([]);
    useEffect(()=>{
        if(!moreData) return ;
        
        const selectRefs = refs.current.slice(0, refs.current.length);
        // console.log(selectRefs.length);
        const lastRef = selectRefs[board.length - 1];

        //디버깅용 색칠하기
        if(lastRef){
            lastRef.style.backgroundColor = 'red';
        }
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
    let arr = [];
    return(
        <>  
        <BoardReplyWrap>
            {board.length === 0 &&  <p> 등록된 게시물이 없습니다. </p>}
            {   
                
                board && (()=>{
                    const arr = [];
                    return board.map((item, idx)=> {
                        const date = item.date.split(' ')[0];

                        let isFirstDay = false;
                        if(!arr.includes(date)){
                            isFirstDay = true;
                            arr.push(date);
                        }
                        
                        return <Fadeup key={item.board_key} >
                            {isFirstDay && <FirstDayStyle>{date}</FirstDayStyle>}
                            <BoardReply 
                                ref={(dom) => refs.current[idx] = dom}
                                reply={item}
                                idx={item.idx}
                                selectIdx={selectIdx === item.board_key}
                                setSelectIdx={setSelectIdx}
                                setUserData={setUserData}
                            />
                        </Fadeup>
                    })
                })()
            }
              
        </BoardReplyWrap>
        </>
    )
}