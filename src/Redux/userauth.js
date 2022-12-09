import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    data: [],
  },

 

  reducers: {
    authSuccess: (state, action) => {
      if (action.payload) {
        state.data = action.payload
      } else {
        state.data = []
      }
    },
  },
})

//This is Selectlang actions.

export const { authSuccess } = userSlice.actions
export default userSlice.reducer
