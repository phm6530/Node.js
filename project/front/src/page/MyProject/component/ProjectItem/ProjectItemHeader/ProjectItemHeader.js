import styled from 'styled-components'
import { useState } from 'react';
import Confirm from '../../../../../component/ui/Confirm';
import Popup from '../../../../../component/popup/Popup';
import alertTrunk from '../../../../../store/alertTrunk';
import { projectDelete } from '../../../ProjectFetch';

// icon
import { FaLink } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

// component
const ProjectEditWrap = styled.div`
    position: relative;
    margin-left: auto;
    button{
        position: absolute;
        background: rgb(0 0 0 / 7%);
        padding: 7px;
        border-radius: 1em;
        border: 2px solid #fff;
        box-shadow: 0px 5px 15px rgb(0 0 0 / 28%);
        box-sizing: border-box;
        top: -6px;
        svg{
            font-size: 14px;
            color:rgba(0,0,0,0.7);
        }
        &:first-child{
            right: -50px;
            background: red;
        }
        &:nth-child(2){
            left: -60px;
        }
    }
`

const ProjectTitle = styled.div`
    font-weight: bold;
    font-size: 18px;
    display: flex;
    letter-spacing: -.5px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: linear-gradient(to right top, #2d3d61, #303a51, #466295);
    color: transparent;
    background-clip: text;
    button{
        background: rgba(0,0,0,0.1);
        padding: 7px;
        border-radius: 100%;
    }

`

const IconCustum = styled(HiOutlineDotsVertical)`
    cursor: pointer;
`
const ProjectItemHeaderStyle = styled.div`
    display: flex;
    align-items: center;
`



export default function ProjectItemHeader({project }){
        const [ edit , setEdit ] = useState(false);
        const [ modal , setModal] = useState(false);

        const navigate = useNavigate();
        const { login } = useSelector(state => state.authSlice);
        
        const dispatch = useDispatch();

        const queryClient = useQueryClient();
        const { mutateAsync } = useMutation((deleteKey)=>projectDelete(deleteKey) ,  {
            onSuccess : (data) =>{
                console.log(data);
                dispatch(alertTrunk('삭제되었습니다.',1))
                setModal(false)
                queryClient.invalidateQueries('project');
            }
        });

        const AuthCheck = (text) => {
            if (!login) {
                dispatch(alertTrunk(`${text} 권한이 없습니다.`), 0);
                return false;
            }
            return true;
        };

        

        const projectChange = (key) =>{
            if (!AuthCheck('수정')) {
                return; 
            }
            setModal(true);
            navigate(`/project/add?type=edit&key=${key}`);
        }
        
        const projectMutation = async (deleteKey) => {
            //권한 확인
            if (!AuthCheck('삭제')) {
                return; 
            }
            setModal(true);
        };

        return(

            <>
            {modal && (
                <Popup closePopup={()=>setModal(false)}>
                    <Confirm confirm={()=>{
                            mutateAsync(project.project_key);
                    }}/>
                </Popup>
            )}

            <ProjectItemHeaderStyle>
                    <ProjectTitle>
                            {project.title}<FaLink size={'14'} style={{marginRight: 'auto' , marginLeft:"10px"}}/>  
                    </ProjectTitle>

                    <ProjectEditWrap>
                            <IconCustum onClick={()=>setEdit(prev => !prev)}/>
                            {edit && (<>
                                <button onClick={()=>projectChange(project.project_key)}><MdModeEdit/></button>
                                <button onClick={()=>projectMutation(project.project_key)}><FaTrashAlt/></button>
                            </>)}
                    </ProjectEditWrap>
        </ProjectItemHeaderStyle>
        </>
    )

}