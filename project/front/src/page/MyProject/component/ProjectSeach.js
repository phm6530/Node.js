import { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';

export default function ProjectSeach(){
    const [ input , setInput ] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const seachProejct = (e) =>{
        e.preventDefault();

        if(input.trim() === ''){
            navigate('/project');
            return;
        }
        navigate(`${location.pathname}?seach=${input}`)
    }
    
    const nav = (path) =>{
        navigate(location.pathname + path);
    }

    return(
        <>
          <form onSubmit={seachProejct}>
                <input type="text" onChange={(e)=>setInput(e.target.value)}/>
                <button type='submit'>검색</button>
            </form>
            
            <button onClick={()=>nav('/add')}>add</button>
        </>
    )
}