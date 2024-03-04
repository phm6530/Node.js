import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , useLocation } from 'react-router-dom';
import alertThunk from '../../../store/alertTrunk';
import styled from 'styled-components';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

const Seach = styled.div`
    display: inline-flex;
    /* border: 1px solid #000; */
    border-radius: 2em;
    position: relative;
    background: rgba(0,0,0,0.05);
    font-size: 14px;
    width: 250px;

    input{
        border: 1px solid rgba(255,255,255,0.1);
        box-sizing: border-box;
        color: #000;
        background: transparent;
        text-indent: .7em;
        flex-grow: 1;
    }
    button{
        border-radius: 5rem;
        background: #fff;
        padding: .5rem;
        margin: .2rem;
    }
`

const SeachArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: .5rem 1.5rem;
    border-bottom: 1px solid rgb(0 0 0 / 6%);
    margin-bottom: 1rem;
    button{
        color: #222;
        font-weight: 600;
    }
    .addProjectBtn{
        margin-right: auto;
        font-size: 12px;
    }
`

const PreViewButtonStyle = styled.button`
    /* border: 1px solid rgba(0,0,0,0.2); */
    padding: 3px 15px;
    font-size: 12px;
    border-left: 1px solid rgba(0,0,0,0.5);

`

export default function ProjectSeach(){
    const [ input , setInput ] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {login}  = useSelector(state => state.authSlice);
    
    const seachProejct = (e) =>{
        e.preventDefault();

        if(input.trim() === ''){
            navigate('/project');
            return;
        }
        navigate(`${location.pathname}?seach=${input}`)
    }
    const AuthCheck = (text) =>{
        if(!login){
            dispatch(alertThunk(`${text} 권한이 없습니다.`),0);
            return false;
        }
        return true;
    }

    const nav = (path) =>{
        if(!AuthCheck('생성')) {
            return;
        }
        navigate(location.pathname + path);
    }

    const PreViewButton = ({children , last ,  seachContent}) =>{
        
        return(
            <PreViewButtonStyle
                
                type='button'
                onClick={()=>navigate(
                    !seachContent ? '/project' : `${location.pathname}?seach=${seachContent}`)}
            >   
            {children}
            </PreViewButtonStyle>
        )
    }

    return(
        <SeachArea>
        <button onClick={()=>nav(`/add?key=${uuidv4()}`)}className="addProjectBtn">+ Add Project</button>
          <form onSubmit={seachProejct}>
            <PreViewButton>ALL</PreViewButton>
                {/* <PreViewButton
                    seachContent='100%'
                >뉴스레터</PreViewButton>
              <PreViewButton
                    seachContent='100%'
                >웹진</PreViewButton> */}
                <PreViewButton
                    last={true}
                    seachContent='개발'
                >참여율 100%</PreViewButton>
                <Seach>
                    <input type="text" placeholder='검색어를 적어주세요...' onChange={(e)=>setInput(e.target.value)}/>
                    <button type='submit'><FaMagnifyingGlass/></button>
                </Seach>
            </form>
            
          
        </SeachArea>
    )
}