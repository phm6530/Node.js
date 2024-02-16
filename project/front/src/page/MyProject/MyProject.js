import { useState  } from 'react';
import ProjectSeach from './component/ProjectSeach'; // 검색 컴포넌트
import StackIcon from '../../component/icon/StackIcon';


import { projectFetch } from './ProjectFetch';
import { useQuery } from 'react-query';
import ProjectItem from './component/ProjectItem';
import DashBoard from '../../component/ui/DashBoard';
import styled from 'styled-components';
import Grid from '../../component/ui/Grid';

import DashBoardTitle from '../../component/ui/DashBoardTitle';
import { useSearchParams } from 'react-router-dom';
import FadeinComponent from '../../FadeinComponent';
// const Loading = styled.div`
//     width:100px;
//     height: 1200px;
//     background: red;
// `

const ProjectGrid = styled(Grid)`
    /* transform: translateY(-120px); */
    padding-top: 150px;
`

const ProjectItemWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 1em;
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
const Tester = styled.div`
    width: 100px;
    height: 50px;
    background: #fff;
    border-radius:1em;
`

const PageSubText = styled.div`
    color:#fff;
    font-size: 20px;
    margin-bottom: 70px;
    text-shadow: 0px 5px 5px rgba(0,0,0,.4);
    p{
        font-size: 15px;
        color: #fff;
        opacity: .7;
    }
`

const PagePoint = styled.div`
    background: rgba(0,0,0,0.2);
    display: flex;
    align-content: center;
    padding: 10px 10px;
    align-items: center;
    width: 150px;
    border-radius: 1em;
    color: #fff;
    img{
        width: 30px;
        margin-right: 10px;
    }
`
export default function MyProject(){
    const [ param ] = useSearchParams();
    const [ project , setProject ] = useState([]);
    const { isLoading , isFetching , isError } = useQuery('project' , projectFetch,{
        onSuccess : (data)=>{
            const responseData = data?.resData || [];        
            setProject(responseData);
        },
        refetchOnWindowFocus: false
    }); 

    console.log(project);
    
    const SeachValue = param.get('seach');
    const SeachArr = project.filter((e)=>{
        return e.title.includes(SeachValue);
    });
    const ProjectArr = SeachValue ? SeachArr : project;
    return(
        <>  
        <DashBoard page={'project'}>
            <Grid></Grid>
        </DashBoard>

        <ProjectGrid>
            
            <PagePoint>
                <img src="img/developer.png" alt="developer" />
                My Project
            </PagePoint>

            <DashBoardTitle><b>PROJECT</b></DashBoardTitle>
            <PageSubText>
                
            웹 퍼블리셔 4년차, 프로젝트 활동을 기록합니다. <br></br>더 넓은 지식을 위해 React, Node.js를 학습 중에 있습니다.<br></br>
            <p>*전 회사의 공개 가능한 프로젝트 / 개인 작업물만 공유합니다.</p>
            </PageSubText>
                <ProjectItemWrap>
                {/* 검색창 */}

                <ProjectSeach />
         
                {/* {isLoading && <Loading></Loading>} */}
                {(!isLoading && isError) && 'error'}
                {(SeachValue && SeachArr.length === 0) && <NoSeachingData>검색과 일치하는 항목이 없음</NoSeachingData>}
                {(!isLoading && !isFetching && !isError )&& (
                    <>
                        {project.length === 0 && '등록된 프로젝트가 없습니다..'}
                        {
                            ProjectArr.map((project)=> <ProjectItem {...project} key={project.project_key + SeachValue}/> )                        
                        }
                     

                    </>
                )}
                </ProjectItemWrap>
        </ProjectGrid>
        </>
    )
};