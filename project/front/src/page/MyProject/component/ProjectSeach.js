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
        color: #fff;
        &:focus{
            background: rgba(0,0,0,0.3);
        }
    }
    .seachbtn{
        color: #fff;
        background: rgba(255,255,255,0.1);
        padding: 10px;
        border-radius: 0 1em 1em 0;  
        font-size: 12px;
        &:hover{
            background: rgba(255,255,255,0.2);
        }
    }
    button{
        color: #fff;
    }
    .addProjectBtn{
        margin-right: auto;
        font-size: 12px;
    }
`

const PreButton = styled.button`
    border: 1px solid rgba(255,255,255,0.2);
    padding: 3px 15px;
    font-size: 12px;
    border-radius: 5em;
    margin-right: 10px;
    &:hover{
        border: 1px solid rgba(255,255,255,0.6);
    }
`

export default function ProjectSeach(){
    const [ input , setInput ] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {login}  = useSelector(state => state.authSlice);
    console.log('login : ',login);
    
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

    return(
        <SeachArea>
        <button onClick={()=>nav('/add')}className="addProjectBtn">+ Add Project</button>
          <form onSubmit={seachProejct}>
                <PreButton>참여 100%</PreButton>
                <PreButton>디자인</PreButton>
                <PreButton>개발</PreButton>
                <PreButton>웹진</PreButton>
                <input type="text" placeholder='검색어를 적어주세요.' onChange={(e)=>setInput(e.target.value)}/>
                <button type='submit' className='seachbtn'>Seach</button>
            </form>
            
          
        </SeachArea>
    )
}