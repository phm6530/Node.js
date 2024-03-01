import { useEffect, useRef, useState } from 'react';
import CommentItem from './Detail/CommentItem';
import Fadeup from '../../../../FadeinComponent';
import styled from 'styled-components';
import CommentState from './Detail/CommentState';

const FirstDayStyle = styled.div`
    font-size: 1rem;
    letter-spacing: -.1rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;

    ${props => props.$first && 'margin-top: 0;'}
    &:after{
        content: "";
        flex-grow: 1;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        width: 50%;
        margin-left: 2rem;
    }
`

const BoardReplyWrap = styled.div`
    height: 100%;
    /* background: #9bbbd4; */
    padding: 20px;
   &::-webkit-scrollbar {
        width: 4px;  /* 스크롤바의 너비 */
    }
    &::-webkit-scrollbar-thumb {
        height: 20%; /* 스크롤바의 길이 */
        background: rgba(0,0,0,0.3); /* 스크롤바의 색상 */
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;;
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, .1); 
    }
    
`


export default function BoardCommentList({ 
    userFetchData , 
    moreFetchData  , 
    total , 
    setUserFetchData, 
    setLastPageIdx 
}){
    const [ selectIdx , setSelectIdx ] = useState(null);
    const refs = useRef([]);
    useEffect(()=>{
        if(!moreFetchData) return ;
        
        const selectRefs = refs.current.slice(0, refs.current.length);
        // console.log(selectRefs.length);
        const lastRef = selectRefs[userFetchData.length - 1];

        //디버깅용 색칠하기
        // if(lastRef){
        //     lastRef.style.backgroundColor = 'red';
        // }
        const io = new IntersectionObserver((entry)=>{
            if(entry[0].isIntersecting && moreFetchData ) {
                setLastPageIdx(selectRefs.length);
            }
        } , { threshold : .1})
        if(lastRef){
            io.observe(lastRef);
        }
        return ()=>{
            io.disconnect();
        }
    },[userFetchData, setLastPageIdx,  moreFetchData]);


    return(
        <BoardReplyWrap>
            {userFetchData.length === 0 &&  <p> 등록된 게시물이 없습니다. </p>}
            
            <CommentState total={total}/>
            {   
                
                userFetchData && (()=>{
                    const arr = [];
                    return userFetchData.map((item, idx)=> {
                        const date = item.date.split(' ')[0];
                        
                        let isFirstDay = false;
                        let firstDiv = false;
                        
                        if(!arr.includes(date)){
                            isFirstDay = true;
                            arr.push(date);
                        }
                        
                        if(arr.length === 1){
                            firstDiv = true;
                        }

                        return (
                            <div key={item.board_key}>
                                {isFirstDay && (
                                    <Fadeup key={`date-${item.board_key}`}>
                                        <FirstDayStyle $first={firstDiv}>{date}</FirstDayStyle>
                                    </Fadeup>
                                )} 

                                <Fadeup key={item.board_key} >
                                    <CommentItem 
                                        ref={(dom) => refs.current[idx] = dom}
                                        item={item}
                                        role={item.role}
                                        selectIdx={selectIdx === item.board_key}
                                        setSelectIdx={setSelectIdx}
                                        setUserFetchData={setUserFetchData}
                                    />
                                </Fadeup>
                            </div>
                        )
                    })
                })()
            }
              
        </BoardReplyWrap>
 
    )
}