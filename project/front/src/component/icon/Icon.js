// import { RiAdminFill } from "react-icons/ri";

//login Icon
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";




const LoginUser = ({size}) =>{
    console.log(size);
    return <IoPersonCircleSharp size={size || 10}/>
}

const LoginPassword = ({size})=>{
    return <RiLockPasswordFill size={size || 10}/>
}

export { 
    LoginUser ,
    LoginPassword
};