import { createSlice } from "@reduxjs/toolkit";
const initialState={
    name:'',
    image:'',
    items:[],

};
const userSlice=createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            const {name,image}=action.payload;
            state.name=name;
            state.image=image;
        },
        setItems:(state,action)=>{
            const {items}=action.payload;
            state.items=items;
        }
    }
});
export const {setUser,setItems} = userSlice.actions;
export default userSlice.reducer;