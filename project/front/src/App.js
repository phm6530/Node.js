// 라우터
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

import RootLayout from './component/common/RootLayout';

// Home
import HomeComponent from './page/Home/HomeComponent';

// MyProject
import MyProject from './page/MyProject/MyProject';

import './App.css';

const router = createBrowserRouter([
  {
    path : '/',
    element : <RootLayout/>,
    children : [
        { index : true , element : <HomeComponent/> },

        {
          path : '/project',
          element : <MyProject/>

        }


    ]
  }
])



function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
