import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , useLocation } from 'react-router-dom';
import alertThunk from '../../../store/alertTrunk';
import styled from 'styled-components';

const SeachArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    input{
        border-radius: 2em 0 0 2em;
        padding: 5px 10px 8px;
        background: transparent;
        border: 1px solid rgba(255,255,255,0.1);
        box-sizing: border-box;
        color: #000;
        text-indent: .7em;
        background: rgba(0,0,0,0.2);
        &:focus{
            background: rgba(0,0,0,0.3);
        }
    }
    .seachbtn{
        color: #000;
        background: rgba(255,255,255,0.1);
        padding: 10px;
        border-radius: 0 1em 1em 0;  
        font-size: 12px;
        &:hover{
            background: rgba(255,255,255,0.2);
        }
    }
    button{
        color: #000;
    }
    .addProjectBtn{
        margin-right: auto;
        font-size: 12px;
    }
`

const PreViewButtonStyle = styled.button`
    border: 1px solid rgba(0,0,0,0.2);
    padding: 3px 15px;
    font-size: 12px;
    border-radius: 5em;
    margin-right: 10px;
    
    &:hover{
        border: 1px solid rgba(0,0,0,0.6);
    }
`


const Seach = styled.div`
    display: inline-block;
    border: 1px solid #000;
    border-radius: 1em;
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
            console.log('안됨');
            return;
        }
        navigate(location.pathname + path);
    }

    const PreViewButton = ({children , seachContent}) =>{
        
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
        <button onClick={()=>nav('/add')}className="addProjectBtn">+ Add Project</button>
          <form onSubmit={seachProejct}>
            <PreViewButton>ALL</PreViewButton>
                <PreViewButton
                    seachContent='100%'
                >React</PreViewButton>
                <PreViewButton
                    seachContent='디자인'
                >JavaSciprt</PreViewButton>
                <PreViewButton
                    seachContent='개발'
                >참여율 100%</PreViewButton>
                <Seach>
                    <input type="text" placeholder='검색어를 적어주세요.' onChange={(e)=>setInput(e.target.value)}/>
                    <button type='submit' className='seachbtn'>Seach</button>
                </Seach>
            </form>
            
          
        </SeachArea>
    )
}