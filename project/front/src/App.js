import './App.css';


// Rounter
import { createBrowserRouter , RouterProvider  } from 'react-router-dom';

import RootLayout from './component/common/RootLayout';

// Home
import HomeComponent from './page/Home/HomeComponent';

// MyProject
import MyProject from './page/MyProject/MyProject';

// Notice
import Notice from './page/Notice/Notice';
import NoticeDetail, { loaderParam } from './page/Notice/component/NoticeDetail';


// 다크모드
import {  Mode } from './context/Context';


const router = createBrowserRouter([
  {
    path : '/',
    element : <RootLayout/>,
    children : [
        { index : true , element : <HomeComponent/> },

        // Project
        {
          path : '/project',
          element : <MyProject/>,
        },

        // Notice
        {
          path : '/notice',
          children : [
              { index : true, element : <Notice/> },
              {
                path: ':num',
                element : <NoticeDetail/>,
                loader : loaderParam
              }
          ]
        }

    ]
  }
])



function App() {
  return (
    <Mode>
        <RouterProvider router={router}/>
    </Mode>
  );
}

export default App;
