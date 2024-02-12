import { useState  } from 'react';
import ProjectSeach from './component/ProjectSeach'; // 검색 컴포넌트


import { projectFetch } from './ProjectFetch';
import { useQuery } from 'react-query';
import ProjectItem from './component/ProjectItem';
import DashBoard from '../../component/ui/DashBoard';
import styled from 'styled-components';
import Grid from '../../component/ui/Grid';

import DashBoardTitle from '../../component/ui/DashBoardTitle';

const Loading = styled.div`
    width:100px;
    height: 1200px;
    background: red;
`

const ProjectGrid = styled(Grid)`
    transform: translateY(-120px);
`

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
        <DashBoard page={'project'}>
            <Grid>
                
            </Grid>
        </DashBoard>
        <ProjectGrid>
        <DashBoardTitle>PROJECT</DashBoardTitle>
            {isLoading && <Loading></Loading>}
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
        </ProjectGrid>
        </>
    )
};