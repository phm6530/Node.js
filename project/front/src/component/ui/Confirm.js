import styled from 'styled-components';
import { Button } from './Button';


const BtnStyle = styled.button`

`

const ConfirmStyle = styled.div`
    text-align: center;
    p{
        font-weight: bold;
        font-size: 1.0rem;
        padding: 20px 0;
    }
`

const ConfirmBtn = styled(Button.ConfirmButton)`
    width: 100%;
`



export default function Confirm({ message , confirm}){
    return(
        <ConfirmStyle>
            <p>{message}을/를 삭제하시겠습니까?</p>
            <ConfirmBtn 
                type={'Confirm'}
                onClick={confirm}
            >
                YES
            </ConfirmBtn>
            {/* <Button.ConfirmButton onClick={()=>ClosePopup()}>
                NO
            </Button.ConfirmButton> */}
        </ConfirmStyle>
    )
}