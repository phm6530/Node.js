import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const BackGroundVideo = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  video{
      width: 100%;
  }
`

function VideoCanvas() {
  return (
    <BackGroundVideo>
      <video autoPlay loop muted>
      <source src = 'img/board/bg_video.mp4' type = 'video/mp4' />
      </video>
    </BackGroundVideo>
  );
}

export default VideoCanvas;