import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "../types/interfaces";

export const fetchSeminars = createAsyncThunk(
  'seminars/fetchSeminars',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch("http://localhost:5000/seminars");
      if (!response.ok) {
        throw new Error("ERROR")
      }
      const data = await response.json();
      return data;
    }
    catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const seminarsSlice = createSlice({
  name: 'seminars',
  initialState: {
    seminars: [],
    error: null,
    status: null
  },
  reducers: {},
  extraReducers: (builder) => {
    return builder.addCase(fetchSeminars.pending, (state: IInitialState) => {
      state.status = "pending";
      state.error = null;
    }),
      builder.addCase(fetchSeminars.fulfilled, (state: IInitialState, { payload }: { payload: any }) => {
        console.log("Ответ от сервера:", payload);
        state.status = "fulfilled";
        state.seminars = payload;
      }),
      builder.addCase(fetchSeminars.rejected, (state: IInitialState, { payload }: { payload: any }) => {
        state.status = "rejected";
        state.error = payload;
      })
  }
})

export default seminarsSlice.reducer;