import { createSlice , configureStore } from '@reduxjs/toolkit';


// 로그인 상태 Slice 생성
const authSlice = createSlice({
    name : 'auth',
    initialState : { 
        login : Boolean(localStorage.getItem('token'))
    },
    reducers : {
        login(state){
            state.login = true;
        },
        logOut(state){
            state.login = false;
        }
    }
})

// Alert Slice 생성
const alertSlice = createSlice({
    name : 'alert',
    initialState : { 
        view : false ,
        message : 'null'
    },
    reducers : {
        alertViewOn(state , action){
            state.view = true;
            state.message = action.payload;
        },
        alertViewOff(state){
            state.view =  false;
        }
    }
})


const store = configureStore({
    reducer : {
        alertSlice : alertSlice.reducer,
        authSlice : authSlice.reducer
    }
})

export const authAction = authSlice.actions;
export const alertAction = alertSlice.actions;
export default store;