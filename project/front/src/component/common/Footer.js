import styled from 'styled-components'
import Grid from '../ui/Grid';
import { FaGit } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { TbPhoneCall } from "react-icons/tb";

const FooterStyle = styled.div`
    /* background: rgb(0 0 0 / 4%); */
    padding: 50px 0px;
    display: flex;
    span{
        font-size: 12px;
        opacity: .9;
        color: #000;
    }
`
const FooterIconAlign = styled.div`
    display: flex;
    margin-bottom: 20px;
`

const CustumGrid = styled(Grid)`
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: center;

`
const FooterIcon = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    color: #000;
    /* background: #fff; */
    margin-right: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    img{
        width: 15px;
    }
`

const FooterList = styled.div`
    display: flex;
    align-items: center;
    svg{
        margin-right: 5px;
        opacity: .5;
    }
    span{
        margin-left: 10px;
        padding-left: 10px;
        position: relative;
        
        &::after{
            content: "";
            border-left: 1px solid rgba(0,0,0,.5);
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            height: 10px;
            transform: translate(-50%, -50%);
        }
    }

    
`


const Link = (url) =>{
    window.open(url, '_blank'); 
}

export default function Footer(){

    return(
        <FooterStyle>
                <CustumGrid>
                    <FooterIconAlign>
                        <FooterIcon onClick={()=>Link('https:/naver.com')}>
                            <FaGit size={'15'}/>
                        </FooterIcon>

                        <FooterIcon onClick={()=>Link('https://squirrel-story.tistory.com/')}>
                            <img src="/img/footer/footerTstory.png" alt="" />
                        </FooterIcon>

                    </FooterIconAlign>
                    <FooterList><TfiEmail size={'14'}/> <span> squirrel309@naver.com</span></FooterList>
                    <FooterList><TbPhoneCall size={'14'}/> <span> 010-0000-0000</span></FooterList>
                    
                    <span style={{marginTop : '20px' , opacity: '.5'}}>CopyRight ⓒ p. Hyun</span>
                </CustumGrid>
        </FooterStyle>
    )
}