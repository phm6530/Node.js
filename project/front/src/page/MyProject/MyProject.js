import { useState } from 'react';
import ProjectSeach from './component/ProjectSeach'; // 검색 컴포넌트
import { DUMMY_PROJECT } from './DUMMY_DATA';



export default function MyProject(){
    const [ project, setProject ] = useState(DUMMY_PROJECT);

    return(
        <>  
            {project.length === 0 && '검색 결과 없습니다.'}
            {
                
                project.map((project, idx)=>{                    
                    return (
                        <div key={idx}>
                            <div>{project.idx}</div>
                            <div>{project.title}</div>
                            {
                               project.skill &&  project.skill.map((e)=>{
                                    return <div>{e}</div>
                                })
                            }
                            <div>{project.contents}</div>
                        </div>
                    )
                })
            }
            <ProjectSeach 
                data = ''
                DUMMY_PROJECT={DUMMY_PROJECT}
                setProject = {setProject}
            />
        </>
    )
};