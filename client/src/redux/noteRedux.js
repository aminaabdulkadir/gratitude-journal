import { createSlice} from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        notes: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL NOTES
        getNoteStart : (state)=>{
            state.isFetching = true;
            state.error= false;
        },
        getNoteSuccess : (state, action)=> {
            state.isFetching = false;
            state.notes = action.payload;
          
            
        },
        getNoteFailure: (state) =>{
            state.isFetching = false;
            state.error = true;
        },
        //DELETE A NOTE
        deleteNoteStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        deleteNoteSuccess: (state, action)=>{
            state.isFetching = false;
            state.notes.splice(
                state.notes.findIndex((item)=> item._id === action.payload),
                 1
          );
        },
        deleteNoteFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE A NOTE
        updateNoteStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        updateNoteSuccess: (state, action)=>{
            state.isFetching = false;
            state.notes [
                state.notes.findIndex((item)=> item._id === action.payload.id)
            ] = action.payload.note;
            

        },
        updateNoteFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
        //ADD A NOTE 
        addNoteStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        addNoteSuccess: (state, action)=>{
            state.isFetching = false;
           state.notes.push(action.payload);
           
        },
        addNoteFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getNoteStart, getNoteSuccess, getNoteFailure,
    deleteNoteStart, deleteNoteSuccess, deleteNoteFailure,
    updateNoteStart, updateNoteSuccess, updateNoteFailure,
    addNoteStart, addNoteSuccess, addNoteFailure,
} = noteSlice.actions;

export default noteSlice.reducer;