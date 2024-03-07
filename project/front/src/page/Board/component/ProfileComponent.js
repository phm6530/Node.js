import styled from 'styled-components'
import { RiMapPin2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';


const ProfileCard = styled.div`
    border-radius: 1em;
    box-shadow: 50px 50px 55px rgba(0,0,0,0.1);
    margin-bottom: 3rem;
    background: #fff;
    margin-right: 2rem;
    height: 70vh;
    padding: 2rem;
    width: 17rem;
    flex-shrink: 0; 
    position: sticky;
    top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`
const ProfilePicture = styled.div`
    width: 4rem;
    border-radius: 100%;
    
    border: 5px solid #fff;
    box-shadow: 10px 10px 20px rgba(0,0,0,0.2);
    img{
        width: 100%;
        border-radius: 100%;
    }
    span{
        color: red;
    }
    position: relative;
    &:after{
        content: "";
        position: absolute;
        left: 0rem;
        border: 3px solid #fff;
        top: 0rem;
        width: 1rem;
        height: 1rem;
         
        border-radius: 5em;
        
        background: ${props => props.$isOnline ? 'rgb(51 156 73)' : 'rgb(127 127 127)'};
    }
`
const ProfileInfo = styled.div`

`
const JobTitle = styled.div`
    font-size: .8rem;

    color: red;
    color: #7f8fae;
`

const ProfileName = styled.div`
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    letter-spacing: -1px;
    
`

const ProfileLocation = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 10px;
    justify-content: center;
    margin-bottom: 2rem;
    svg{
        margin-right: 10px;
    }
`
const OnLine = styled.div`
    font-size: 14px;
    background: #fff;
    border-radius: 1rem;
`
export default function ProfileComponent(){
        const { login } = useSelector(state => state.authSlice);
        // console.log(login);
        
        return(
            <ProfileCard>
                <ProfilePicture  $isOnline={login}>
                    <img src="/img/me.jpg" alt="IT'S ME" />
                </ProfilePicture>

                
                <ProfileInfo>
                    <ProfileName>Park, Hyun Min</ProfileName>
                    <ProfileLocation><RiMapPin2Fill/> 경기도 하남시 거주</ProfileLocation>
                    <JobTitle>Web Publisher</JobTitle>
                    <JobTitle>Front Developer</JobTitle>
                </ProfileInfo>
            </ProfileCard>
        )
}