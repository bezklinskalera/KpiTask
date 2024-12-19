// slices/answerSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAnswer: null, // Це зберігає вибраний курс
};

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setSelectedAnswer: (state, action) => {
      state.selectedAnswer = action.payload;
    },
    clearSelectedAnswer: (state) => {
      state.selectedAnswer = null;
    },
  },
});

export const { setSelectedAnswer, clearSelectedAnswer } = answerSlice.actions;
export default answerSlice.reducer;
