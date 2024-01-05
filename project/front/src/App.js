// 라우터
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

import RootLayout from './component/common/RootLayout';

// Home
import HomeComponent from './page/Home/HomeComponent';

// MyProject
import MyProject from './page/MyProject/MyProject';

// Notice
import Notice from './page/Notice/Notice';

// 다크모드
import { Mode } from './context/Context';

import './App.css';
import NoticeDetail from './page/Notice/component/NoticeDetail';


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
                element : <NoticeDetail/>
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
