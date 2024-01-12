import { useContext, useEffect } from 'react';
import { Link , useParams  , useNavigate, useLoaderData} from 'react-router-dom';
import { UserAuth  } from '../../../context/AuthContext';

export default function NoticeDetail(){
    const param = useParams();
    // const navigate = useNavigate();
    const { Auth } = useLoaderData();
    console.log(Auth);
    // const { user } = useContext(UserAuth);
    
    // useEffect(()=>{
    //     if(user.login === false){
    //         navigate('/notice', { 
    //             state: { 
    //                 noAuth: true 
    //             } 
    //         });
    //     }
    // },[user, navigate , Auth]);
    
    return(
        <>
            {param.num} -  NoticeDetail
            <button>
                <Link to='/notice'>목록</Link>
            </button>
        </>
    )
}

