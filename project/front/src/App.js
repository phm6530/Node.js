import './App.css';
import { Provider } from 'react-redux';

// Rounter
import { createBrowserRouter , RouterProvider  } from 'react-router-dom';

import RootLayout from './component/common/RootLayout';

// context
import { Mode } from './context/DarkModeContext';
import { Auth } from './context/AuthContext';

// redux
import store from './store/appSlice';

// Home
import HomeComponent from './page/Home/HomeComponent';

// MyProject
import MyProject from './page/MyProject/MyProject';

// Notice
import Notice from './page/Notice/Notice';
import NoticeDetail from './page/Notice/component/NoticeDetail';


//Auth Util
import { tokenCheck } from './util/auth';



const router = createBrowserRouter([
  {
    path : '/',
    element : <RootLayout/>,
    id : 'auth',
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
                loader : tokenCheck,
              }
          ]
        }


    ]
  }
])



function App() {
  return (
    
      <Mode>
          {/* redux */}
          <Provider store={store}>
            <Auth>
              <RouterProvider router={router}/>
            </Auth>
          </Provider>
      </Mode>
    
  );
}

export default App;
