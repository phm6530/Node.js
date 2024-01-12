import { createSlice , configureStore } from '@reduxjs/toolkit';


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
        alertSlice : alertSlice.reducer
    }
})

export const alertAction = alertSlice.actions;
export default store;