import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputReply from './InputReply'
import styled from 'styled-components';
import { DarkMode } from '../../../context/DarkModeContext';
import { useContext } from 'react';

const Button = styled.button`
    margin-left: auto;
`

const BoardReplyStyle = styled.div`
    padding: 40px 30px;
    margin-top: 50px;
    box-shadow: -4px -4px 15px rgba(255, 255, 255, 0.7), 4px 4px 15px rgba(36, 36, 36, 0.15);
    
    /* background: linear-gradient(to right, #e2e6ef, #c5cde0); */
    
    /* ${props => props.$darkMode || 'background:#e2e6ef '} */
`

export default function BoardReplyForm({
    onSubmitHandlr,
    control
}){
    const { darkMode } = useContext(DarkMode);
    const { handleSubmit ,  formState : { errors } } = useFormContext();//useForm 트리
    
    return(
        <BoardReplyStyle $darkMode={darkMode} className='BoardReplyForm wrap'>
            <form method='POST' onSubmit={handleSubmit(onSubmitHandlr)}>

                <Controller
                    name='userName'
                    control={control}
                    render={({field})=>
                        <InputReply 
                            {...field}
                            label='글쓴이'
                            error={errors[{...field}.name]}
                        />
                    }
                />
                
                <Controller
                    name='password'
                    control={control}
                    render={({field})=>
                        <InputReply 
                            {...field}
                            label='password'
                            error={errors[{...field}.name]}
                        />
                    }
                />

                <Controller
                    name='contents'
                    control={control}
                    render={({field})=>
                        <InputReply 
                            {...field}
                            label='댓글'
                            error={errors[{...field}.name]}
                        />
                    }
                />

                <Button type='submit' className='btnStyle_Type_1'>reply</Button>
                </form>
        </BoardReplyStyle>
    )
}