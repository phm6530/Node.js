import { useSelector } from 'react-redux';
import { Link, useNavigate ,  useLocation } from 'react-router-dom';

export default function Board(){
    const { login } = useSelector(state => state.authSlice);
    // const loading = useSelector(state => state.authSlice);
    const navigate = useNavigate();
    const location = useLocation();



    const NavBtn = ({path}) =>{

        const navHandler = (path) =>{
            navigate(location.pathname + path);    
        }
    
        
        return(
            <>
                <button onClick={()=>navHandler(path)}>글쓰기</button>
            </>
        )
    }
    
    const DUMMY_DATA = [
        {  
            idx : 1 ,
            title : '타이틀 네임',
            date : '2024-01-05'
        },
        {  
            idx : 2 ,
            title : '타이틀 네임',
            date : '2024-01-05'
        },
        {  
            idx : 3 ,
            title : '타이틀 네임',
            date : '2024-01-05'
        },
    ]

    return(
        <>  
            { login && <NavBtn path={'/BoardWirte'} />}
            {
                DUMMY_DATA.map((Notice_name , idx)=>{
                    return (
                        <p key={idx}>
                            <Link 
                                to={`${Notice_name.idx}`}>
                                {Notice_name.idx}
                                {Notice_name.title}
                            </Link>
                        </p>
                    )
                })
            }
        </>
    )
}