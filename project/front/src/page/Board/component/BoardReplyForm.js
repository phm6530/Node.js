import InputReply from './InputReply'

export default function BoardReplyForm({
    onSubmitHandlr,
    reply,
    setReply
}){
    return(
        <div className='BoardComment'>
            <form method='POST' onSubmit={onSubmitHandlr}>
                    <InputReply 
                        inputTitle={'작성자'}
                        type="text" 
                        inputName='userName'
                        reply={reply}
                        setReply={setReply}
                    />
                    <InputReply 
                        inputTitle={'password'}
                        type="password" 
                        inputName='password'
                        reply={reply}
                        setReply={setReply}
                    />
                    <InputReply 
                        inputTitle={'내용'}
                        type="text" 
                        inputName='contents'
                        reply={reply}
                        setReply={setReply}
                    />
                    

                    <button type='submit'>reply</button>
                </form>
        </div>
    )
}