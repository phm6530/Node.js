import styled, { keyframes } from 'styled-components'
import { fetchData } from './page/Board/BoardFetch';
import { useQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';

const Wrap = styled.div`
  padding-top: 50px;
  width: 1200px;
  margin: 0 auto;
  div {
    width: 100%;
    height: 100px;
    background-color: #ffbcbc;
    margin-bottom: 10px;
  }
`;

export default function InfiniteScrollTest() {
  const arr = [...Array(10)].map((_,idx)=> idx);
  const [ infinityScroll , setInfinityScroll ] =  useState(arr);
  const refs = useRef([]);
  
  useEffect(()=>{
      
      const lastSelector = refs.current[refs.current.length - 1];
      const io = new IntersectionObserver((entry)=>{
          entry[0].isIntersecting && setInfinityScroll(prev => [...prev , arr.length + 1]);
      }, {threshold : .5});

      if(lastSelector){
        io.observe(lastSelector);
        lastSelector.style.backgroundColor = 'red';
      }
      return() =>{
        io.disconnect(lastSelector);
      }
  },[infinityScroll]);
  
  return (
    <Wrap>
      {infinityScroll.map((e,idx)=>{
          return <div key={idx} ref={element => refs.current[idx] = element }>{e}</div>
      })}
    </Wrap>
  );
}