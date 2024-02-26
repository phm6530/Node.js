import styled from 'styled-components';
import ReactDom from 'react-dom';

const LoadingWrap = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,0.7);
    align-items: center;
    justify-content: center;
    z-index: 9999;
    span{
        color : #ffffff;
    }
  .droplet_spinner {
    display: flex;
    justify-content: center;
    margin: 30px;
  }
  
  .droplet_spinner .droplet {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #ffffff;
    border-radius: 50%;
    transform-origin: center bottom;
    
    animation: bounce 1.2s cubic-bezier(0.3, 0.01, 0.4, 1) infinite;
  }
  
  .droplet_spinner .droplet:nth-child(1) {
    animation-delay: -0.4s;
  }
  
  .droplet_spinner .droplet:nth-child(2) {
    animation-delay: -0.2s;
  }
  
  .droplet_spinner .droplet:nth-child(3) {
    animation-delay: 0s;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`
const LoadingComponent = ({Message}) =>{
    return(
        <LoadingWrap>
        <span>
            {Message}
        </span>
        <div class="droplet_spinner">
            <div class="droplet"></div>
            <div class="droplet"></div>
            <div class="droplet"></div>
        </div>
    </LoadingWrap>
    )
}

export default function Loading({Message}) {

    return (
        ReactDom.createPortal(
            <LoadingComponent Message={Message}/> ,
            document.getElementById('alert-root')
        )
    )
    
}