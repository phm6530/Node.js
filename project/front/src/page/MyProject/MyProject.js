import { useState } from 'react';
import ProjectSeach from './component/ProjectSeach'; // 검색 컴포넌트
import { DUMMY_PROJECT } from './DUMMY_DATA'; // 테스트 더미 

import { projectFetch } from './ProjectFetch';
import { useQuery } from 'react-query';




export default function MyProject(){
    // const [ project, setProject ] = useState(DUMMY_PROJECT);/
    const { data , isLoading , error } = useQuery('project' , ()=> projectFetch(),{
            onSuccess : (data)=>{
                console.log(data);
            },
            onError : (error) =>{
                console.log(error);
            }
    });
    const project = data?.resData || [];

    return(
        <>  
            {project.length === 0 && '검색 결과 없습니다.'}
            {
                project.map((project)=>{                    
                    return (
                        <div key={project.project_key}>
                            <div>{project.id}</div>
                            <div>{project.title}</div>
                            <div>
                            {
                               project.skill &&  project.skill.map((e, idx)=>{
                                    return <span key={idx}>{e}</span>
                                })
                            }
                            </div>
                            <div>
                                {project.startProject} - {project.endProject}
                            </div>
                            <div>{project.description}</div>
                        </div>
                    )
                })
            }
            <ProjectSeach 
                data = ''
                DUMMY_PROJECT={DUMMY_PROJECT}
                // setProject = {setProject}
            />
        </>
    )
};