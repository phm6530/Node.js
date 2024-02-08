import { useState  } from 'react';
import ProjectSeach from './component/ProjectSeach'; // 검색 컴포넌트


import { projectFetch } from './ProjectFetch';
import { useQuery } from 'react-query';
import ProjectItem from '../Board/component/ProjectItem';


export default function MyProject(){

    const [ project , setProject ] = useState([]);
    const { data , isLoading , isFetching , isError } = useQuery('project' , projectFetch,{
        onSuccess : (data)=>{
            const responseData = data?.resData || [];        
            setProject(responseData);
        },
        refetchOnWindowFocus: false
    });

    return(
        <>  
        {/* {isLoading && 'loading....'} */}
        {(!isLoading && isError) && 'error'}
        {(!isLoading && !isFetching && !isError )&& (
            <>
                {project.length === 0 && '검색 결과 없습니다.'}
                {

                    project.map((project)=>
                        <ProjectItem        
                            {...project}
                            key={project.project_key}
                        /> 
                    )
                    
                }

                <ProjectSeach 
                    realData={data}
                    setProject = {setProject}
                />

            </>
        )}
          
        </>
    )
};