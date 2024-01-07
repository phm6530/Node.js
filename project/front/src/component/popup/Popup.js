import { useState } from 'react';
import classes from './Popup.module.css';
import ReactDOM from 'react-dom';

// style 컴포넌트
// import Boxstyle from '../ui/BoxStyle';

export default function Popup(props){

    const { popupClose } = props;

    const Backdrop = ({popupClose}) =>{
        return <div className={classes.backdrop} onClick={popupClose}></div>
    }

    const PopupContainer = ({popupClose}) =>{
        const [ loginData , setLoginData ] = useState(
            {   
                id : 
                { 
                    value : '' , 
                    touched : false
                },
                pw :
                { 
                    value : '' , 
                    touched : false
                }
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
                    아이콘
                    <input 
                        type="text" 
                        placeholder='아이디'
                        onChange={(e)=>onChangehandler('id' , e.target.value)}
                        onBlur={()=>onblurHandelr('id')}
                    />
                </label>

                <label>                    
                    아이콘
                    <input 
                        type="password" 
                        placeholder='password'
                        onChange={(e)=>onChangehandler('pw' , e.target.value)}
                        onBlur={()=>onblurHandelr('pw')}
                    />
                </label>
                <button>로그인</button>

                <button onClick={popupClose}>Close</button>
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