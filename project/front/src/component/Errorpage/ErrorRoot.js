import { useNavigate  } from 'react-router-dom';

export default function ErrorRoot() {
    const navigate = useNavigate();
    const onClickHandler = () =>{
        navigate('/');
    }

    return(
        <>

            
            <h1>404 Error Page</h1>
            <button onClick={onClickHandler}>Home</button>
        </>
    )
}