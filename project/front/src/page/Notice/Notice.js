import { useEffect } from 'react';
import { Link , useLoaderData, useLocation} from 'react-router-dom'


export default function Notice(){
    const data = useLoaderData();
    const location = useLocation();
    console.log('location :' , location);

    useEffect(()=>{
        if(location.state?.noAuth){
            alert('권한이 없거나 서버에 문제가 있습니다.');
        }
    },[location]);
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