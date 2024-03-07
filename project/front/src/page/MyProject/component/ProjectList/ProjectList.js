import styled from 'styled-components';
import FadeinComponent from '../../../../FadeinComponent';
import ProjectSeach from '../ProjectSeach';
import ProjectItem from '../ProjectItem/ProjectItem';

import { useQuery } from 'react-query'; 
import { useLocation , useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { projectFetch } from '../../ProjectFetch';
import { ProjectWrapStyle } from './Styled/ProjectListStyled';


const NoSeachingData = styled(FadeinComponent)`
    text-align: center;
    height: 300px;
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
`

export default function ProjectList() {
    const location = useLocation();
    const isProjectIndex = location.pathname === '/project' || location.pathname === '/project/';
    const { isLoading ,  isError  } = useQuery('project' , projectFetch,{
        enabled: isProjectIndex,
        refetchOnWindowFocus: false,
        keepPreviousData : true,
        onSuccess : (data)=>{
            const responseData = data?.resData || [];        
            setProject(responseData);
        }
    }); 
  
    const [ param ] = useSearchParams();
    const [ project , setProject ] = useState([]);
   
    
    const SeachValue = param.get('seach');
  
    const SeachArr = project.filter((e)=>{
        return e.title.includes(SeachValue);
    });
    const ProjectArr = SeachValue ? SeachArr : project;

    return(
        <>

           <ProjectWrapStyle>
            <ProjectSeach />
                {isLoading && <NoSeachingData>Loading...</NoSeachingData>}
                {(!isLoading && isError) && 'error'}
                {(SeachValue && SeachArr.length === 0) && <NoSeachingData>검색과 일치하는 항목이 없음</NoSeachingData>}
                {(!isLoading && !isError )&& (
                    <>
                        {project.length === 0 && '등록된 프로젝트가 없습니다..'}
                        {
                            ProjectArr.map((project)=> <ProjectItem {...project} key={project.project_key + SeachValue}/> )                        
                        }
                    </>
                )}
            </ProjectWrapStyle>

        </>
    )
}
