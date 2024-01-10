import { useEffect } from 'react';
import { Link , useParams , useLoaderData , useNavigate} from 'react-router-dom';


export default function NoticeDetail(){
    const param = useParams();
    const data = useLoaderData();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!data.auth){
            console.log(data);
            navigate('/notice', { state: { noAuth: true } });
        }
    },[data , navigate]);
    
    return(
        <>
            {param.num} -  NoticeDetail
            <button>
                <Link to='/notice'>목록</Link>
            </button>
        </>
    )
}

