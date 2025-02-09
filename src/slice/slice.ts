import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState, ISeminar } from "../types/interfaces";

// Запрос для получения списка семинаров
export const fetchSeminars = createAsyncThunk(
  'seminars/fetchSeminars',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch("http://localhost:5000/seminars");
      if (!response.ok) {
        throw new Error("Ошибка при запросе на сервер")
      }
      const data = await response.json();
      return data; // Возвращаем данные
    }
    catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
)

// Запрос для удаления семинара по id
export const deleteSeminar = createAsyncThunk(
  "seminars/deleteSeminar",
  async (seminarId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/seminars/${seminarId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка при удалении семинара");
      }
      return seminarId; // Возвращаем id удаленного семинара, чтобы обновить состояние
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Запрос для редактирования семинара по id
export const editSeminar = createAsyncThunk(
  "seminars/editSeminar",
  async (updatedSeminar: ISeminar, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/seminars/${updatedSeminar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSeminar), // Отправляем обновленные данные семинара
      });

      if (!response.ok) {
        throw new Error("Ошибка при редактировании семинара");
      }

      return await response.json(); // Возвращаем обновленный объект семинара
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

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
        state.status = "fulfilled";
        state.seminars = payload;
      }),
      builder.addCase(fetchSeminars.rejected, (state: IInitialState, { payload }: { payload: any }) => {
        state.status = "rejected";
        state.error = payload;
      }),
      builder.addCase(deleteSeminar.pending, (state: IInitialState) => {
        state.status = "pending";
        state.error = null;
      }),
      builder.addCase(deleteSeminar.fulfilled, (state: IInitialState, action: any) => {
        state.status = "fulfilled";
        state.seminars = state.seminars.filter((seminar) => seminar.id !== action.payload);
      }),
      builder.addCase(deleteSeminar.rejected, (state: IInitialState, action: any) => {
        state.status = "rejected";
        state.error = action.payload;
      }),
      builder.addCase(editSeminar.pending, (state: IInitialState) => {
        state.status = "pending";
        state.error = null;
      }),
      builder.addCase(editSeminar.fulfilled, (state: IInitialState, action: any) => {
        state.seminars = state.seminars.map((seminar) =>
          seminar.id === action.payload.id ? action.payload : seminar
        );
      }),
      builder.addCase(editSeminar.rejected, (state: IInitialState, action: any) => {
        state.error = action.payload;
      });
  }
})

export default seminarsSlice.reducer;