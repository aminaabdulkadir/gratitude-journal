import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        //LOGIN
        loginStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
        //LOGOUT
        logoutStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        logoutSuccess: (state)=>{
            state.isFetching = false;
            state.currentUser = null;
        },
        logoutFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    loginStart, loginSuccess, loginFailure, 
    logoutStart, logoutSuccess, logoutFailure
} = userSlice.actions;

export default userSlice.reducer;