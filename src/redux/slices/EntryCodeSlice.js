// src/redux/codeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch the code from the server
export const fetchCode = createAsyncThunk("code/fetchCode", async () => {
  const response = await axios.get("/api/v1/entry-code");
  let data = response.data;
  let code = data.secretCode;

  return code;
});

const codeSlice = createSlice({
  name: "code",
  initialState: {
    entryCode: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entryCode = action.payload;
      })
      .addCase(fetchCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default codeSlice.reducer;
