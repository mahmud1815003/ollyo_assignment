import { createSlice } from "@reduxjs/toolkit";
import data from "../data";

const initialState = {
  mode: "light",
  data: data,
  counter: 0,
  selected: [],
  showAll: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = state.mode == "dark" ? "light" : "dark";
    },
    changeIndex: (state, action) => {
      const i = action.payload.a;
      const j = action.payload.b;
      [state.data[i], state.data[j]] = [state.data[j], state.data[i]];
    },
    setSelected: (state, action) => {
      if (state.selected.indexOf(action.payload) == -1) {
        state.selected.push(action.payload);
        state.counter+=1;
      }
    },
    clearSelected: (state, action) => {
      state.selected = state.selected.filter((data) => {
        return data !== action.payload;
      });
      state.counter-=1;
    },
    deleteSelected: (state, action) => {
      state.data = state.data.filter((data) => {
        const idx = state.selected.indexOf(data);
        if (idx !== -1) {
          delete state.selected[idx];
          return false;
        } else {
          return true;
        }
      });
      state.selected = state.selected.filter(data => data);
      state.counter = state?.selected?.length || 0;
    },
    setShow: (state, action) => {
      state.showAll = state.showAll == false ? true : false;
    },
  },
});

export default globalSlice;
export const {
  setMode,
  changeIndex,
  setSelected,
  clearSelected,
  deleteSelected,
  setShow,
} = globalSlice.actions;
