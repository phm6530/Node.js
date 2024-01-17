import { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';

const DUMMY_PROJECT = [
    {
        idx : 1,
        title : '강원랜드 직원 모바일',
        contents : '퍼블리싱',
    },
    {
        idx : 2,
        title : '대웅제약 직원 모바일',
        contents : '퍼블리싱',
    },
]


export default function MyProject(){
    const [ project, setProject ] = useState(DUMMY_PROJECT);
    const [ input , setInput ] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const seachProejct = (e) =>{
        e.preventDefault();
        
        if(input.trim() === ''){
            setProject(DUMMY_PROJECT);
        }
        setProject(prev => ( 
            prev.filter((project)=>{
                return project.title.includes(input);
            }
        )));
    }

    const nav = (path) =>{
        navigate(location.pathname + path);
    }
    
    return(
        <>  
            {project.length === 0 && '검색 결과 없습니다.'}
            {
                
                project.map((project, idx)=>{                    
                    return (
                        <div key={idx}>
                            <div>{project.idx}</div>
                            <div>{project.title}</div>
                            <div>{project.contents}</div>
                        </div>
                    )
                })
            }
                 <form onSubmit={seachProejct}>
                <input type="text" onChange={(e)=>setInput(e.target.value)}/>
                <button type='submit'>검색</button>
            </form>
            
            <button onClick={()=>nav('/add')}>add</button>
            

        </>
    )
};