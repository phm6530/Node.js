import './App.css';
import { Provider } from 'react-redux';

// Rounter
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

import RootLayout from './component/common/RootLayout';

// context
import { Mode } from './context/DarkModeContext';

// redux
import store from './store/appSlice';

// Home
import HomeComponent from './page/Home/HomeComponent';
// import { projectChangeLoader } from './page/MyProject/ProjectFetch'; //add Loader

// MyProject
import MyProject from './page/MyProject/MyProject';
import AddProject from './page/MyProject/component/AddProject/AddProject';


// Notice
import Board from './page/Board/Board';
// import BoardDetail from './page/Board/component/BoardDetail';
// import BoardWirte from './page/Board/BoardWIrte';
// import { boardList } from './page/Board/Board';

// admin
import Admin from './page/admin/Admin';

import ProjectDetail from './page/MyProject/component/ProjectList/ProjectDetail';

//Auth Util 권한 Check
import { tokenCheck } from './util/auth';
import Todolist from './page/todo/Todolist';
import AuthComponent from './component/common/AuthComponent';


import Test from './test';
import ErrorRoot from './component/Errorpage/ErrorRoot';
import Contact from './page/contact/Contact';
import ProjectLayout from './page/MyProject/component/ProjectLayout';
import ProjectList from './page/MyProject/component/ProjectList/ProjectList';



const router = createBrowserRouter([
  {
    path : '/',
    element : <RootLayout/>,
    errorElement : <ErrorRoot/>,
    id : 'auth',
    children : [
        { index : true , element : <HomeComponent/> },

        // ProjectLayOut Outlet
        {
          path : '/project',
          element :<ProjectLayout/>,
          children : [
            {
              // index : true,
              element : <MyProject/>,
              children : [
                  {
                    index : true,
                    element : <ProjectList/>,
                  },
                  {
                    path : ':key',
                    element : <ProjectDetail/> ,   
                    // loader : ProjectDetailLoader
                  }

              ]
            },
            {
              path : 'add',
              element : <AuthComponent Component={AddProject} redirectPath={'/project'}/> ,   
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
              }
              // ,
              // {
              //   path: ':num',
              //   element : <BoardDetail/>,
              //   loader : tokenCheck,
              // },
              // { 
              //   path : 'wirte',
              //   element : <BoardWirte/>,
              //   loader : tokenCheck,
              // }
          ]
        },
        { 
          path : 'todoCalnder',
          element : <Todolist/>,
        }
        // 관리자페이지
        ,{
          path : '/admin',
          element : <AuthComponent Component={Admin} redirectPath={'/'}/> ,   
          loader : tokenCheck
        }
        ,{
          path : '/test',
          element : <Test/> ,   
          
        }  ,{
          path : '/contact',
          element : <Contact/>
        }
    ]
  }
])



function App() {


  return (
      // darkMode - Context Api 
      <Mode>
          {/* redux */}
          <Provider store={store}>
              <RouterProvider router={router}/>
          </Provider>
      </Mode>
    
  );
}

export default App;
