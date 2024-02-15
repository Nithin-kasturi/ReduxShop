import { createSlice } from "@reduxjs/toolkit";
const initialState={
    items:[],
    totalItems:0,
    totalCost:0,
};
const basketSlice=createSlice({
    name:'basketSlice',
    initialState,
    reducers:{
        increment:(state,action)=>{
            const {item,cost}=action.payload;
            state.items.push(item);
            state.totalItems+=1;
            state.totalCost+=cost;
        },
        decrement:(state,action)=>{
            const {item,cost}=action.payload;
            if(state.items.find((i)=>i==item)){
                state.totalItems-=1;
                state.totalCost-=cost;
                const indexToRemove = state.items.indexOf(item);
                if (indexToRemove !== -1) {
                    state.items.splice(indexToRemove, 1);
                }
            }
        }
    }
});
export const {increment,decrement}=basketSlice.actions;
export default basketSlice.reducer;