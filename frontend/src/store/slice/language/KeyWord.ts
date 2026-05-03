import { createSlice } from '@reduxjs/toolkit'
export interface KeyWordState {
  ar: object;
  en:object,
  language:Array<String>
}

const initialState: KeyWordState = {
  ar: {},
  en:{},
  language:[]
}

export const KeyWordSlice = createSlice({
  name: 'KeyWord',
  initialState,
  reducers: {
    addLanguages:(state, action)=>{
      state.language=action.payload
    },
    arLanguage: () => {
      localStorage.setItem("language","ar");
      window.location.reload()
    },
    enLanguage: () => {
     localStorage.setItem("language","en");
     window.location.reload()
      
    },
 
  },
})

// Action creators are generated for each case reducer function
export const { enLanguage, arLanguage,addLanguages } = KeyWordSlice.actions

export default KeyWordSlice.reducer