import './App.css';
import { Provider } from 'react-redux';

// Rounter
import { createBrowserRouter , RouterProvider  } from 'react-router-dom';

import RootLayout from './component/common/RootLayout';

// context
import { Mode } from './context/DarkModeContext';

// redux
import store from './store/appSlice';

// Home
import HomeComponent from './page/Home/HomeComponent';

// MyProject
import MyProject from './page/MyProject/MyProject';
import ProjectAdd from './page/MyProject/addProject';

// Notice
import Board from './page/Board/Board';
import BoardDetail from './page/Board/component/BoardDetail';
import BoardWirte from './page/Board/BoardWIrte';
// import { boardList } from './page/Board/Board';

// admin
import Admin from './page/admin/Admin';



//Auth Util 권한 Check
import { tokenCheck } from './util/auth';
import Todolist from './page/todo/Todolist';




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
          
          children : [
            {
              index : true,
              element : <MyProject/>,
            },
            {
              path : 'add',
              element : <ProjectAdd/>,
              loader : tokenCheck
            }
          ]
        },

        // Board
        {
          path : '/Board',
          children : [
              { index : true, element : <Board/> , 
                // loader : boardList,
                // action : replyAction
              },
              {
                path: ':num',
                element : <BoardDetail/>,
                loader : tokenCheck,
              },
              { 
                path : 'wirte',
                element : <BoardWirte/>,
                loader : tokenCheck,
              }
          ]
        },
        { 
          path : 'todoCalnder',
          element : <Todolist/>,
        }
        // 관리자페이지
        ,{
          path : '/admin',
          element : <Admin/>,
          loader : tokenCheck,
        }


    ]
  }
])



function App() {
  return (
    
      <Mode>
          {/* redux */}
          <Provider store={store}>
            
              <RouterProvider router={router}/>
            
          </Provider>
      </Mode>
    
  );
}

export default App;
