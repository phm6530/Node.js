import { useState } from 'react';
import classes from './Popup.module.css';
import ReactDOM from 'react-dom';


import { LoginUser , LoginPassword } from '../icon/Icon';

// import { RiAdminFill } from "react-icons/ri";
// import { IoPersonCircleSharp } from "react-icons/io5";
// import { RiLockPasswordFill } from "react-icons/ri";

// style 컴포넌트
// import Boxstyle from '../ui/BoxStyle';

export default function Popup(props){
    const { popupClose } = props;

    // background
    const Backdrop = ({popupClose}) =>{
        return <div className={classes.backdrop} onClick={popupClose}></div>
    }

    //로그인팝업
    const PopupContainer = ({popupClose}) =>{
        const [ loginData , setLoginData ] = useState(
            {   
                id : { value : '' , touched : false },
                pw : { value : '' ,  touched : false }
            }    
        );  


        const onChangehandler = (type , value ) =>{
            setLoginData(prev => ({
                ...prev ,
                [type] : {
                    ...prev[type], value , touched : true
                }
            }));
        }

        const onblurHandelr = (type) =>{
            setLoginData(prev => ({
                ...prev ,
                [type] : {
                    ...prev[type], touched : true
                }
            }));
        }

        console.log(loginData);
        
        


        return (
            <div className={classes.popupContainer}>

                
                <label>
                <LoginUser size={30}/>
                    <input 
                        type="text" 
                        placeholder='아이디'
                        onChange={(e)=>onChangehandler('id' , e.target.value)}
                        onBlur={()=>onblurHandelr('id')}
                    />
                </label>

                <label>                    
                    <LoginPassword size={30}/>
                    <input 
                        type="password" 
                        placeholder='password'
                        onChange={(e)=>onChangehandler('pw' , e.target.value)}
                        onBlur={()=>onblurHandelr('pw')}
                    />
                </label>
                <button>로그인</button>

                <button onClick={popupClose}>닫기</button>
            </div>
        )
    }

    return(
        <>
            {
                ReactDOM.createPortal(
                    <Backdrop 
                        popupClose={popupClose}
                    />,
                    document.getElementById('backdrop-root')
                )
            }

            {
                ReactDOM.createPortal(
                    <PopupContainer
                        popupClose={popupClose}
                    />,
                    document.getElementById('modal-root')
                )
            }
        </>
    )
}