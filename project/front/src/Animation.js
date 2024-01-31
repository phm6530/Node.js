import { useQuery } from 'react-query';
import { fetchData } from './page/Board/BoardFetch';

import {  useEffect, useRef, useState } from 'react';
import Fadeup from './FadeinComponent';

// React 는 JSX를 랜더링하며 훅들은 호출함 이후 마운트 되고 useEffect를 실행하여 요서설정

const Animation = ()=>{
    const {data , isLoading} = useQuery('test', ()=>fetchData(1));

    //threshold - 교차 
    return(
        <>  
             {(!isLoading && data.pageData) && data.pageData.map((e, idx) => {
                return <Fadeup key={idx} position={'right'}> {JSON.stringify(e)} </Fadeup>
                }
            )}     
        </>
    )
}

export default Animation