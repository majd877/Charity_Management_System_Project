import { createSlice } from '@reduxjs/toolkit'
export interface PermisstionState {
 permisstion: object;
 accebtToken:string|null;
}
const allPermisstion={
 levelOne:{
  //for nurmal permisstion only he can see it 
},
levelTow:{
//for cacher permisstion
},
levelThree:{
//for master permisstion
},
levelFour:{
//for admin permisstion
}}
const initialState: PermisstionState = {
 permisstion: [],
 accebtToken:null
}

export const PermisstionSlice = createSlice({
  name: 'Permisstion',
  initialState,
  reducers: {
 setPermisstionAdmin:(state)=>{
  state.permisstion={...allPermisstion.levelTow,...allPermisstion.levelThree,...allPermisstion.levelFour};
 },
 setPermisstionMaster:(state)=>{
  state.permisstion={...allPermisstion.levelOne,...allPermisstion.levelTow,...allPermisstion.levelThree};
 },
 setPermisstionCashier:(state)=>{
  state.permisstion={...allPermisstion.levelOne,...allPermisstion.levelTow};
 }
  },
})

// Action creators are generated for each case reducer function
export const { setPermisstionAdmin, setPermisstionMaster, setPermisstionCashier} = PermisstionSlice.actions

export default PermisstionSlice.reducer