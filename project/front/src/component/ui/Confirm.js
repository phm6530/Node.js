
export default function Confirm({confirm , ClosePopup}){
    console.log(confirm);
    return(
        <>
            <p>삭제하시겠습니까?</p>
            <button onClick={confirm}>YES</button>
            <button onClick={()=>ClosePopup()}>NO</button>
        </>
    )
}