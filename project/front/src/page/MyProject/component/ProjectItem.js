import styled from 'styled-components'
import StackIcon from '../../../component/icon/StackIcon'
import Fadein from '../../../FadeinComponent';
import { CiCalendar } from "react-icons/ci";
import { useNavigate} from 'react-router-dom';
import { projectDelete } from '../ProjectFetch';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import {  useState } from 'react';
import alertTrunk from '../../../store/alertTrunk';
import Popup from '../../../component/popup/Popup';
import Confirm from '../../../component/ui/Confirm';
import { FaLink } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const SKILL_ICON = {
    Html : <StackIcon.Html label={'Html'}/>,
    Css : <StackIcon.Css label={'Css'}/>,
    JavaSciprt : <StackIcon.Js label={'JavaSciprt'}/>,
    Node : <StackIcon.Node label={'Node.js'}/>,
    React : <StackIcon.React label={'React'}/>,
    PHP : <StackIcon.Php label={'Php'}/>,
    jquery : <StackIcon.Jquery label={'jQuery'}/>,
    Scss : <StackIcon.Scss label={'Scss'}/>,
    MySql : <StackIcon.Mysql label={'Mysql'}/>,
    Next : <StackIcon.Next label={'Next'}/>
}

const ProjectEditWrap = styled.div`
    position: relative;
    button{
        position: absolute;
    }
    button:first-child{
        right: -20px;
    }
`

// 공통 CSS
const ProjectContentStyle = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
`

const ProjectFadeinStyle = styled(Fadein)`
    border-radius: 1em;
    margin-bottom: 20px;
    padding: 30px 40px;
    margin: .5%;
    box-shadow: -14px -14px 30px rgb(255 255 255 / 0%), 14px 14px 20px rgb(34 48 65 / 7%);
    background: #fff;
    background-size: 150%;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    &::after{
        position: absolute;
        content: "";
        width:60px;
        height: 60px;
        background: #ebebeb;
        left: -30px;
        top: -30px;
        transform: rotate(45deg);
    }
    &:hover{
        transform: rotateX('angle');
    }

`
const ProjectImg = styled.div`
    width: 50%;
`

const ProjectInfo = styled.div`

`

const ProjectSubTitle = styled.p`
    font-weight: bold;
    margin-top: 24px;
    font-size: 14px;
`

const ProjectTitle = styled.div`
    font-weight: bold;
    font-size: 16px;
    display: flex;
    letter-spacing: -.5px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    button{
        background: rgba(0,0,0,0.1);
        padding: 7px;
        border-radius: 100%;
    }

`
const ProjectCompany = styled.div`
    font-size: 12px;
    opacity: .5;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    margin-bottom: 20px;
`

const ProjectDescription = styled.div`
    font-size: 14px;
    white-space: pre-line;
    margin: 20px 0;
`

const ProjectControlBtnWrap = styled.div`
    button{
        font-size: 13px;
    }
`

const IconCustum = styled(HiOutlineDotsVertical)`
    cursor: pointer;
`




export default function ProjectItem(project){
    const navigate = useNavigate();
    const { login } = useSelector(state => state.authSlice);
    const [ modal , setModal] = useState(false);
    const [ confirm , setConfirm ] = useState(false);
    const [ edit , setEdit ] = useState(false);
    const dispatch = useDispatch();
    const AuthCheck = (text) => {
        if (!login) {
            dispatch(alertTrunk(`${text} 권한이 없습니다.`), 0);
            return false;
        }
        return true;
    };

    const projectView = (url) =>{
            window.open(url , '_blank');
    }

    const projectChange = (key) =>{
        if (!AuthCheck('수정')) {
            return; 
        }
        setModal(true);
        navigate(`/project/add?type=edit&key=${key}`);
    }

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation((deleteKey)=>projectDelete(deleteKey) ,  {
        onSuccess : () =>{
            queryClient.invalidateQueries('project');
            dispatch(alertTrunk('삭제되었습니다.',1))
        }
    });


    const projectMutation = async (deleteKey) => {
        //권한 확인
        if (!AuthCheck('삭제')) {
            return; 
        }
        setModal(true);
    };

    return(
        <>
            {modal && <Popup closePopup={()=>setModal(false)}>
            <Confirm confirm={()=>{
                    setConfirm(true)
                    mutateAsync(project.project_key);
                    }}/></Popup>}
            <ProjectFadeinStyle>
    
                <ProjectInfo>
                        <ProjectTitle>
                                {project.title}     <FaLink size={'14'} style={{marginRight: 'auto' , marginLeft:"10px"}}/>  
                                <ProjectEditWrap>
                                <IconCustum onClick={()=>setEdit(prev => !prev)}/>
                                {edit && (<>
                                    <button onClick={()=>projectChange(project.project_key)}><MdModeEdit/></button>
                                    <button onClick={()=>projectMutation(project.project_key)}><FaTrashAlt/></button>
                                </>)}
                                </ProjectEditWrap>
                             
                       
                        </ProjectTitle>
                        <ProjectCompany>{project.company}</ProjectCompany>
                        <div>

                        <ProjectSubTitle>기술스택</ProjectSubTitle>
                        {   
                            project.skill &&  project.skill.map((e, idx)=>{
                                //<StackIcon.Css/>   
                                return <span key={idx}>{SKILL_ICON[`${e}`] || e}</span>
                            })
                        }
                        </div>
                
                        <ProjectSubTitle>프로젝트 기간</ProjectSubTitle>
                        <ProjectContentStyle>
                            
                            <CiCalendar/>
                            {project.startProject} - {project.endProject}
                        </ProjectContentStyle>
                        <ProjectDescription>{project.description}</ProjectDescription>
                        {/* <ProjectViewStyle onClick={()=>projectView(project.project_url)}>자세히보기</ProjectViewStyle> */}
                </ProjectInfo>
            </ProjectFadeinStyle>
        </>
    )
}