import { Link , useParams } from 'react-router-dom';

export default function BoardDetail(){
    const param = useParams();

    
    const request = async () =>{
        const response = await fetch('http://localhost:8080/Board');
        const result = await response.json();
        console.log(result);
    }
    
    request();


    return(
        <>
            {param.num} -  NoticeDetail
            <button>
                <Link to='/Board'>목록</Link>
            </button>
        </>
    )
}

