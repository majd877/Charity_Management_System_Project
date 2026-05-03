import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface SearchState {
page:string|null;
is_desable:boolean;
images:Array<any>
oldImages:Array<number>
copy:Array<any>
reloadSideBar:boolean
currentPage:string
}
export interface ImageType {
  type: string;
  toShow: boolean;
}
const initialState: SearchState = {
  page:"",
  currentPage:"",
  is_desable:true,
  images:[],
  oldImages:[],
  copy:[],
  reloadSideBar:false
}

export const SearchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    clearOldImage(state){
      state.oldImages=[];
    },
    addOldImage(state,action){
     state.oldImages.push(action.payload);
    },
    reloadSideBarAction(state){
       state.reloadSideBar=!state.reloadSideBar
    },
    clearAllImages(state){
      state.images=[];
    },
    changeCopy(state,action){
      state.copy=action.payload;
    },
    changeCurrentPage(state,action){
      state.currentPage=action.payload;
    },
    addImage: (state, action) => {
      const exists = state.images.findIndex((d) => {
        return (
          (action.payload.type === "delete" && d?.toShow === action.payload.toShow) ||
          (action.payload.type === "add" && d.toShow === action.payload.toShow)
        );
      });
    
      // Only add if no matching item is found
      if (exists === -1) {
        state.images.push(action.payload);
      }
    },
    removeImage: (state, action: PayloadAction<ImageType>) => {
      console.log(action);
      
      state.images = state.images.filter(
        (d) => d.type !== action.payload.type || d.toShow !== action.payload.toShow
      );
    },
    changeSearch: (state,actions) => {
      state.page=actions.payload;
    },
    changeDisableSearch:(state,actions)=>{
     state.is_desable=actions.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeSearch,changeDisableSearch,changeCurrentPage,addImage,removeImage,clearAllImages,clearOldImage ,addOldImage,reloadSideBarAction,changeCopy} = SearchSlice.actions

export default SearchSlice.reducer