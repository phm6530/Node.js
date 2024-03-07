import styled from 'styled-components';
import SKILL_ICON from '../../../../component/icon/StackIcon';
import Fadein from '../../../../FadeinComponent';


// icon
import { CiCalendar } from "react-icons/ci";

import { Button } from '../../../../component/ui/Button';
import ProjectItemHeader from './ProjectItemHeader/ProjectItemHeader';
import { useNavigate } from 'react-router-dom';



const ProjectDuration = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
`

const ProjectFadeinStyle = styled(Fadein)`
    margin-bottom: 1rem;
    padding: 0 1rem;
    padding-bottom: 1rem;
    overflow: hidden;
    display: flex;
    align-items: start;
    border-bottom: 1px solid rgba(0,0,0,0.04);
`
 
const ProjectImgArea = styled.div`
    /* border-radius: 2em; */
    /* overflow: hidden; */
    width: 35%;
    position: relative;
    overflow: hidden;
    border-radius: 0.2rem;
    .cateGory{
        background: red;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        padding: 0.2rem 0.7rem;
        color: #fff;
        background: linear-gradient(to right, #bf4beb, #b36cd6, #c530afde);
    }
`
const ProjectSkillWrap = styled.div`
    display: flex;
    background: linear-gradient(to top, #0000008a, #00000069, #ffffff00);
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0.5rem;
        span{
        text-shadow: 2px 5px 5px black;
    }
`


// const ProjectSubTitle = styled.p`
//     font-weight: bold;
//     margin-top: 24px;
//     font-size: 14px;
// `

const ProjectCompany = styled.div`
    font-size: 12px;

    margin-bottom: 16px;
    color: rgba(113 113 122);
`

const ProjectDescription = styled.div`
    font-size: 14px;
    white-space: pre-line;
    padding-bottom: 20px;
    color:#3d4757;
    /* border-bottom: 1px solid rgba(0,0,0,0.12); */
`



const ContentsWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-items: flex-start;
    padding:1rem .5rem .5rem 1.5rem;
    width: 65%;
    flex-grow: 1;
`

const ProjectButtonWrap = styled.div`

`

export default function ProjectItem(project){
    // console.log('project : ',project);
    const projectView = (url) =>{
            window.open(url , '_blank');
    }

    const navigate =  useNavigate();

    return(
        <>
      
            <ProjectFadeinStyle>

              
                        <ProjectImgArea>
                            <img src="/img/project/jkl1.jpg" alt="jkl" />
                            <div className="cateGory">참여율 100%</div>
                            <ProjectSkillWrap>
                                    {       
                                        project.skill &&  project.skill.map((e, idx)=>{
                                            const SkillCmponent = SKILL_ICON[e];
                                            return SkillCmponent ? <SkillCmponent key={`skill--${e}`} label={e}/> : <span key={idx}>{SKILL_ICON[e] || e}</span>
                                        })
                                    }
                                    </ProjectSkillWrap>
                        </ProjectImgArea>

              
                        <ContentsWrap>
                                {/* Header */}
                                <ProjectItemHeader
                                    project={project}
                                />

                                {/* Company */}
                                <ProjectCompany>{project.company}</ProjectCompany>
                                <div>
                                    <ProjectDescription>{project.description}</ProjectDescription>
                                    {/* <ProjectSubTitle>기술스택</ProjectSubTitle> */}
                              
                                </div>


{/*                             
                                <ProjectSubTitle>프로젝트 기간</ProjectSubTitle>

                                <ProjectDuration>
                                    <CiCalendar/>
                                    {project.startProject} - {project.endProject}
                                </ProjectDuration> */}

                                <ProjectButtonWrap>
                                    <Button.Type onClick={()=>projectView(project.project_url)}>VIEW</Button.Type>
                                    <Button.Type onClick={()=>navigate(`${project.project_key}`)}>자세히보기</Button.Type>
                                </ProjectButtonWrap>
                        </ContentsWrap>
            </ProjectFadeinStyle>
        </>
    )
}