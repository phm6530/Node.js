import { useLoaderData } from 'react-router-dom';
import DynamicTabs from './test';
export default function Admin(){
    const data = useLoaderData();
    console.log(data);

    return(
        <>
            <DynamicTabs/>
            Admin 관리자 페이지
        </>
    )
}