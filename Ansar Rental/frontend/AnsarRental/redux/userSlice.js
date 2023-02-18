import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      state = action.payload
      return state
    },
    removeUser: state => {
      state = null
      return state
    },
  }
})


export const { setUser, removeUser } = userSlice.actions

export function selectCurrentUser(state) {
  return state.user
}

export default userSlice.reducer
