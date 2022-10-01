import {  loginStart, loginSuccess,loginFailure, 
    logoutStart, logoutSuccess, logoutFailure} from "./userRedux";
import {
    getNoteStart, getNoteSuccess, getNoteFailure,
    deleteNoteStart, deleteNoteSuccess, deleteNoteFailure,
    updateNoteStart, updateNoteSuccess, updateNoteFailure,
    addNoteStart, addNoteSuccess, addNoteFailure
} from "./noteRedux";
import{
    deleteClientsStart, deleteClientsSuccess, deleteClientsFailure,
    updateClientsStart, updateClientsSuccess, updateClientsFailure,
    addClientsStart, addClientsSuccess, addClientsFailure
} from "./clientRedux";
import { publicRequest, userRequest } from "../requestMethods";


export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data));

    }catch(err){
        dispatch(loginFailure())
    }
};

export const logout = async (dispatch)=>{
    dispatch(logoutStart());
    try{
    dispatch(logoutSuccess())
    }catch(err){
        dispatch(logoutFailure())
    }
};

export const addNote = async( dispatch, note)=>{
    dispatch(addNoteStart());
    try{
        const res = await userRequest.post("/journals", note)
        dispatch(addNoteSuccess(res.data));
    }catch(err){
        dispatch(addNoteFailure())
    }
};

export const getNotes = async( dispatch, userId, notes)=>{
    dispatch(getNoteStart());
    try{
        const res = await userRequest.get(`/journals/${userId}`, notes);
        dispatch(getNoteSuccess(res.data));
    }catch(err){
        dispatch(getNoteFailure());
    }
};

export const updateNote = async( dispatch, id, note)=>{
    dispatch(updateNoteStart());
    try{
        const res = await userRequest.put(`/journals/${id}`, note)
        dispatch(updateNoteSuccess(res.data))
    }catch(err){
        dispatch(updateNoteFailure())
    }
};

export const deleteNote = async(dispatch, id)=>{
    dispatch(deleteNoteStart());
    try{
        const res = await userRequest.delete(`/journals/${id}`)
        dispatch(deleteNoteSuccess(res.data))
    }catch(err){
        dispatch(deleteNoteFailure())
    }
};

export const deleteClient = async (dispatch, id)=>{
    dispatch(deleteClientsStart());
    try{
        const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteClientsSuccess(id))
    }catch(err){
        dispatch(deleteNoteFailure())
    }
};

export const updateClient = async (dispatch, id, client)=>{
    dispatch(updateClientsStart());
    try{
        const res= await userRequest.put(`/users/${id}`, client);
        dispatch(updateClientsSuccess(res.data))
    }catch(err){
        dispatch(updateNoteFailure())
    }
};

export const addClient = async (dispatch, client)=>{
    dispatch(addClientsStart());
    try{
        const res = await publicRequest.post("/auth/register", client);
        dispatch(addClientsSuccess(res.data))
    }catch(err){
        dispatch(addNoteFailure())
    }
};