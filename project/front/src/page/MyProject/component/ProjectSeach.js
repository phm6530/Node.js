import { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';

export default function ProjectSeach({
    DUMMY_PROJECT : projectArr,
    setProject
}){
    const [ input , setInput ] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    
    const seachProejct = (e) =>{
        e.preventDefault();
        
        if(input.trim() === ''){
            setProject(projectArr);
        }
        setProject(
            projectArr.filter((project)=>{
                return project.title.includes(input);
            }
        ));
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