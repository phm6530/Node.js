//login Icon
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

// icon
import { BsFillMoonFill } from "react-icons/bs";

const LoginUser = ({size , color}) =>{
    return <IoPersonCircleSharp size={size || 10} color={color || "black"}/>
}

const LoginPassword = ({size , color})=>{
    return <RiLockPasswordFill size={size || 10}  color={color || "black"}/>
}

const Moon = ({size , color})=>{
    return <BsFillMoonFill size={size}/>
}

const Sun = ({size , color})=>{
    return <BsFillMoonFill size={size}/>
}





export { 
    // Login 
    LoginUser ,
    LoginPassword,

    // moon
    Moon,
    Sun
};