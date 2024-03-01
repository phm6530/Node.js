import { useQuery } from 'react-query';
import {  fetchData } from './BoardFetch';

import BoardCommentForm from './component/BoardCommentForm/BoardCommentForm';


import styled from 'styled-components';

import BannerCommon from '../../component/ui/BannerCommon';


import { useDispatch} from 'react-redux';
import { useState } from 'react';
import Grid from '../../component/ui/Grid';
import alertThunk from '../../store/alertTrunk';

import DashBoard from '../../component/ui/DashBoard';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import SubTitle   from '../../component/ui/Subtitle';
import ProfileComponent from './component/ProfileComponent';
import BoardCommentList from './component/BoardCommentList/BoardCommentList';


const PageText = styled.div`
    word-break: keep-all;
    margin-top: 10px;
    color: #222;
    font-size: 14px;
    padding-bottom: 20px;
`

const BoardDashBoard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    .tester{
        width: 15rem;
        border-radius: 1em;
        height: 350px;
        margin-right: 3rem;
        box-shadow: 3px 21px 17px rgb(0 0 0 / 25%);
    }
`

const BoardGrid = styled(Grid)`
    padding-top: 25rem;
    display: flex;
    justify-content: space-between;
`

const RightWrap = styled.div`
    height: 100%;
    display: flex;
    width: 100%;
    transition: all .5s ease;
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    /* box-shadow: 50px 80px 15px rgba(0,0,0,0.1); */
    flex-direction: column;
`

export default function Board(){
    console.log('board:::::::::::::::')
    // 초기데이터 + 페이징 데이터 로드
    const [ userFetchData , setUserFetchData] = useState([]);
    const [ moreFetchData , setFetchMoreData ] = useState(true);
    const [ total ,setTotal ] = useState(0);
    const [ lastPageIdx , setLastPageIdx ] = useState(null);
    const dispatch = useDispatch();
    
    const { isLoading , isError } = useQuery(
        ['board', lastPageIdx], () => fetchData(lastPageIdx), {
            refetchOnWindowFocus: false,
            onSuccess :(data) =>{
                if(data.pageData.length === 0 ){
                    setFetchMoreData(false);
                }
                setTotal(data.counter);
                // console.log('userQuery 실행');
                // 이건 맞음
                setUserFetchData(prev => {
                    return [...prev , ...data.pageData]
                });
            },
            onError: (error) => {
                console.log('실행');
                dispatch(alertThunk(error.message, 0));
            } 
        }
    ); 

    return(
        <>  
      
                {/* Header */}
                <DashBoard page={'board'}>
                    <BannerCommon.BannerPoint>
                            <img src="img/board.png" alt="board" />MY Board
                    </BannerCommon.BannerPoint>
                    <DashBoardTitle><b>MY PORTPOLIO, BOARD</b></DashBoardTitle>
                </DashBoard>

                {/* Body */}
                <BoardGrid>    

                    {/* Prifile */}
                    <ProfileComponent/>

               
                    <RightWrap id='parallex_form'>                
                        <BoardDashBoard>
                            <SubTitle>
                                <div className="subText">GUEST BOARD</div>
                            </SubTitle>
                            <PageText>brycpt를 이용하여 암호화 저장하고 있으며 해싱된 비밀번호 이외 어떠한 정보도 수집하지 않습니다.</PageText>
                        </BoardDashBoard>

            
                        <BoardCommentForm 
                            setTotal={setTotal}
                            setUserFetchData={setUserFetchData}
                        />

                        {/* BoardComment */}
                        {(!isLoading && isError) && 'error'}
                        {userFetchData && <BoardCommentList
                                userFetchData = {userFetchData}
                                moreFetchData = {moreFetchData}
                                total= {total}
                                setUserFetchData= {setUserFetchData}
                                setLastPageIdx = {setLastPageIdx}
                        />}
                    </RightWrap>
            </BoardGrid>
        </>
    )
}




