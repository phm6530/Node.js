import { Outlet } from 'react-router-dom';

export default function BoardLayout(){

    return(
        <> 
            {/* 읽기 */}
            <Outlet/>
        </>
    )
}