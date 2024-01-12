import { useEffect } from 'react';
import { Link , useParams  ,  useLoaderData , useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NoticeDetail(){
    const param = useParams();
    const navigate = useNavigate();

    const isAuth = useSelector(state => state.authSlice.login);
    const { Auth } = useLoaderData();
    
    
    useEffect(()=>{
        if(Auth === false || isAuth  === false){
            navigate('/notice', { 
                state: { 
                    noAuth: true 
                } 
            });
        }
    },[navigate , Auth , isAuth ]);  //서버 , 클라이언트에서 모두 체킹
    
    return(
        <>
            {param.num} -  NoticeDetail
            <button>
                <Link to='/notice'>목록</Link>
            </button>
        </>
    )
}

