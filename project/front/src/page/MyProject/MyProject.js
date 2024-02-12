import { useState  } from 'react';
import ProjectSeach from './component/ProjectSeach'; // 검색 컴포넌트


import { projectFetch } from './ProjectFetch';
import { useQuery } from 'react-query';
import ProjectItem from './component/ProjectItem';
import DashBoard from '../../component/ui/DashBoard';
import styled from 'styled-components';
import Grid from '../../component/ui/Grid';

import DashBoardTitle from '../../component/ui/DashBoardTitle';
import { useSearchParams } from 'react-router-dom';

const Loading = styled.div`
    width:100px;
    height: 1200px;
    background: red;
`

const ProjectGrid = styled(Grid)`
    transform: translateY(-120px);
`

const ProjectItemWrap = styled.div`
    /* display: flex; */
`

export default function MyProject(){
    const [ param ] = useSearchParams();
    const [ project , setProject ] = useState([]);
    const { data , isLoading , isFetching , isError } = useQuery('project' , projectFetch,{
        onSuccess : (data)=>{
            const responseData = data?.resData || [];        
            setProject(responseData);
        },
        refetchOnWindowFocus: false
    });
    
    const SeachValue = param.get('seach');
    const SeachArr = project.filter((e)=>{
        return e.title.includes(SeachValue);
    });
    
    const test = SeachValue ? SeachArr : project;
    return(
        <>  

        <DashBoard page={'project'}>
            <Grid></Grid>
        </DashBoard>

        <ProjectGrid>
            <DashBoardTitle>PROJECT</DashBoardTitle>
                <ProjectItemWrap>
                {isLoading && <Loading></Loading>}
                {(!isLoading && isError) && 'error'}
                {(SeachValue && SeachArr.length === 0) && '검색과 일치하는 항목이 없음'}
                {(!isLoading && !isFetching && !isError )&& (
                    <>
                        {project.length === 0 && '등록된 프로젝트가 없습니다..'}
                        {
                            test.map((project)=> <ProjectItem {...project} key={project.project_key + SeachValue}/> )                        
                        }
                        {/* 검색창 */}
                        <ProjectSeach />

                    </>
                )}
                </ProjectItemWrap>
        </ProjectGrid>
        </>
    )
};