import styled from 'styled-components';
import { useEffect , useState} from 'react';

const TimerStyle = styled.div`
    position: absolute;
    z-index: 1;
    font-size: 30px;
    color: #fff;
    top: 100px;
    right: 0;
`

export default function Timer(){

    const [ time , setTime ] = useState(new Date());
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setTime(new Date());
        },1000);    

        return()=> clearTimeout(timer);
    },[time]);   

    return(
        <>
            <TimerStyle>{time.toLocaleTimeString().replace('오전', 'AM').replace('오후', 'PM')}</TimerStyle>
        </>
    )
}