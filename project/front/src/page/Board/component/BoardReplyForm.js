import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputReply from './InputReply'
// import ReplyInput from './ReplyInput';

export default function BoardReplyForm({
    onSubmitHandlr,
    control
}){

    const { handleSubmit ,  formState : { errors } } = useFormContext();//useForm 트리
    
    return(
        <div className='BoardComment'>
            <form method='POST' onSubmit={handleSubmit(onSubmitHandlr)}>

                <Controller
                    name='userName'
                    control={control}
                    render={({field})=>
                        <InputReply 
                            {...field}
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
                            error={errors[{...field}.name]}
                        />
                    }
                />

                    <button type='submit'>reply</button>
                </form>
        </div>
    )
}