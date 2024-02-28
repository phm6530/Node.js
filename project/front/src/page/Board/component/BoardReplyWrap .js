import styled from 'styled-components'
import BoardView from './BoardVIew'

const BoardWrap = styled.div`
    position: relative;
    padding-top: 1rem;
    /* box-shadow: 50px 50px 25px rgba(0,0,0,0.3); */
`

const ReplyWrapHeader = styled.div`
    background: -webkit-linear-gradient(to right, #2c383f, #363232);
    background: linear-gradient(to right, #2c383f, #363232); 
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
    border-radius: 1em 1em 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
     span{
        color: #fff;
        font-size: 12px;
        /* border: 1px solid #fff6; */
        border-radius: 19px;
        padding: 2px 12px;
        margin-right: 20px;
        background: #1e1e1e87;
        margin: 5px;
        margin-right: 20px;

        
     }
     
`

const ReplyHeaderPoint = styled.div`

    margin-left: 20px;
    div{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 1em;
        margin-right: 5px;
    }
    div:first-child{
        background: #28c840;
    }
    div:nth-child(2){
        background: #febc2e;
    }
    div:nth-child(3){
        background: #ff5f57;
    }
`



export default function BoardReplyWrap({
    userData , 
    moreData ,
    total,
    setUserData,
    setLastPageIdx

}){

    return(
        <>
        <BoardWrap>
            {/* <ReplyWrapHeader>
                <ReplyHeaderPoint>
                    <div></div>
                    <div></div>
                    <div></div>
                </ReplyHeaderPoint>

                <span>Total {total}</span>
            </ReplyWrapHeader> */}

            {/* view or Page */}
                <BoardView
                    board={userData}
                    moreData={moreData}
                    setUserData={setUserData}
                    setLastPageIdx={setLastPageIdx}
                /> 
        </BoardWrap>
        </>
    )
}