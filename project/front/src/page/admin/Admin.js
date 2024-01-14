import { useLoaderData } from 'react-router-dom';
export default function Admin(){
    const data = useLoaderData();
    console.log(data);

    return(
        <>
            
            Admin 관리자 페이지
        </>
    )
}