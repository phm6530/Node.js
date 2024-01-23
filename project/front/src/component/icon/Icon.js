// import { RiAdminFill } from "react-icons/ri";

//login Icon
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";


const LoginUser = ({size , color}) =>{
    return <IoPersonCircleSharp size={size || 10} color={color || "black"}/>
}

const LoginPassword = ({size , color})=>{
    return <RiLockPasswordFill size={size || 10}  color={color || "black"}/>
}

export { 
    LoginUser ,
    LoginPassword
};