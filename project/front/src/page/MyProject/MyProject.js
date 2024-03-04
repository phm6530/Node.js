import { useState  } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import ProjectItem from './component/ProjectItem/ProjectItem';
import ProjectSeach from './component/ProjectSeach';
import { projectFetch } from './ProjectFetch';


import FadeinComponent from '../../FadeinComponent';
import ProfileComponent from '../Board/component/ProfileComponent';


const ProjectItemWrap = styled.div`
    display: flex;
    flex-direction:column;
    flex-wrap: wrap;
    border-radius: 1em;
    width: 100%;
    background: #fff;
`

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


const PageSubText = styled.div`
    font-size: 20px;
    margin-bottom: 70px;
    background: #fff;
    padding: 2rem;
    p{
        font-size: 14px;
        color: #fff;
        opacity: .7;
        padding-top: 20px;
    }
`


const ProjectWrap = styled.div`
    display: flex;

`



export default function MyProject(){
    const [ param ] = useSearchParams();
    const [ project , setProject ] = useState([]);
    
    const { isLoading ,  isError } = useQuery('project' , projectFetch,{
        refetchOnWindowFocus: false,
        keepPreviousData : true,
        onSuccess : (data)=>{
            const responseData = data?.resData || [];        
            setProject(responseData);
        }
    }); 

    
    const SeachValue = param.get('seach');
    const SeachArr = project.filter((e)=>{
        return e.title.includes(SeachValue);
    });

    const ProjectArr = SeachValue ? SeachArr : project;

    return(
        <>  
                {/* <PageSubText>    
                    웹 퍼블리셔 4년차, 프로젝트 활동을 기록합니다. <br></br>
                    더 넓은 지식을 위해 React, Node.js를 학습 중에 있습니다.<br></br>
             
                </PageSubText>  */}

           

                    {/* Wrap */}
                    <ProjectWrap>
                        <ProfileComponent/>
                        <ProjectItemWrap>
                                     {/* 검색창 */}
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
                        </ProjectItemWrap>
                    </ProjectWrap>


        </>
    )
};