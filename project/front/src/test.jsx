import styled, { keyframes } from 'styled-components'
import { fetchData } from './page/Board/BoardFetch';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

const effect = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`

const Wrap = styled.div`
  padding-top: 50px;
  width: 1200px;
  margin: 0 auto;
  div {
    width: 100%;
    height: 100px;
    background-color: red;
    margin-bottom: 10px;
    animation: ${effect} .5s .3s ease;
  }
`;

export default function InfiniteScrollTest() {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i)); // 초기 아이템들
  console.log(items);
  useEffect(() => {
    if(items.length > 20){
        return;
    }
    const observer = new IntersectionObserver((entries) => {
      // 마지막 요소가 뷰포트에 보일 때 새 아이템 추가
      if (entries[0].isIntersecting) {
        setItems((prevItems) => [...prevItems, prevItems.length]);
      }
    }, { threshold: 0.5 });

    // 현재 마지막 요소를 관찰 대상으로 설정
    const lastItem = document.querySelector('.item:last-child');
    if (lastItem) {
      observer.observe(lastItem);
    }

    // 클린업 함수
    return () => {
      if (lastItem) {
        observer.unobserve(lastItem);
      }
    };
  }, [items]); // 아이템 목록이 변경될 때마다 useEffect 재실행

  return (
    <Wrap>
      {items.map((item, index) => (
        <div key={index} className="item">Item {item}</div>
      ))}
    </Wrap>
  );
}