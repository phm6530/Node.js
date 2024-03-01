import styled from 'styled-components'

const CurruntReplyState = styled.div`
        display: flex;
        margin-bottom: 1rem;
        .currentReply{
            font-size: .8rem;
            font-weight: bold;
            margin-right: 10px;
            background: #e6e6e6;
            color: #fff;
            background: linear-gradient(to left, #a35d5d, #6a5f86, #5262a8);
            color: transparent;
            background-clip: text;
            position: relative;
            margin-right: 2rem;
            span{
                background: rgba(0,0,0,0.05);
                padding: 0rem 1.5rem;
                margin-left: .5rem;
                border-radius: 2em;
                display: inline-block;
                text-align: center;
            }
        }
`


export default function CommentState({total}){

    return(
        <CurruntReplyState>
            <div className="currentReply">오늘 작성된 댓글 <span>1</span></div>
            <div className="currentReply">전체 댓글 <span>{total}</span></div>
        </CurruntReplyState>
    )
}