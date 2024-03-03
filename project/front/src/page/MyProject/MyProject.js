import { useState  } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';


import Grid from '../../component/ui/Grid';
import DashBoard from '../../component/ui/DashBoard';
import ProjectItem from './component/ProjectItem/ProjectItem';
import ProjectSeach from './component/ProjectSeach';
import { projectFetch } from './ProjectFetch';

import DashBoardTitle from '../../component/ui/DashBoardTitle';
import FadeinComponent from '../../FadeinComponent';
import BannerCommon from '../../component/ui/BannerCommon';
import ProfileComponent from '../Board/component/ProfileComponent';

const ProjectGrid = styled(Grid)`
   padding-top: 25rem;
`

const ProjectItemWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 1em;
    width: 100%;
    /* margin-top: 3rem; */
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
            <DashBoard page={'project'}>
                <BannerCommon.BannerPoint>
                    <img src="img/developer.png" alt="developer" />My Project
                </BannerCommon.BannerPoint>
                <DashBoardTitle><b>PROJECT</b></DashBoardTitle>
            </DashBoard>
            
            <ProjectGrid>
                

                {/* <PageSubText>    
                    웹 퍼블리셔 4년차, 프로젝트 활동을 기록합니다. <br></br>
                    더 넓은 지식을 위해 React, Node.js를 학습 중에 있습니다.<br></br>
                    <p>*전 회사의 공개 가능한 프로젝트 / 개인 작업물만 공유합니다.</p>
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


            </ProjectGrid>
        </>
    )
};