import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    data: [],
    isLoggedIn : false,
  },

 

  reducers: {
    authSuccess: (state, action) => {
      if (action.payload) {
        state.data = action.payload
      } else {
        state.data = []
      }
    },
    setLoggedIn : (state , action)=>{
      if (action.payload) {
        state.isLoggedIn = action.payload
      } else {
        state.isLoggedIn =false
      }
    }
  },
})

//This is Selectlang actions.

export const { authSuccess,setLoggedIn } = userSlice.actions
export default userSlice.reducer
