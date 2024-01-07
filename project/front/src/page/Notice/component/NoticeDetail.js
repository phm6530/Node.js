import { Link , useParams , useLoaderData } from 'react-router-dom';


export default function NoticeDetail(){
    const param = useParams();
    const data = useLoaderData();
    console.log(data);
    
    return(
        <>
            {param.num} -  NoticeDetail
            <button>
                <Link to='/notice'>목록</Link>
            </button>
        </>
    )
}

export function loaderParam({params}){
    const noticeId = params.num;
    return noticeId;
}