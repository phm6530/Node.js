import { useDispatch } from 'react-redux'
import { modalAction } from '../../store/appSlice'; 
import { useCallback  } from 'react';
export default function Confirm({ClosePopup}){

    return(
        <>
            <p>삭제하시겠습니까?</p>
            <button onClick={()=>{return true}}>YES</button>
            <button onClick={()=>ClosePopup()}>NO</button>
        </>
    )
}