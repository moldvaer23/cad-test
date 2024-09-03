import { apiPostTriangulate } from "src/utils/api";
import { TParametersFigure, TTheme, TVertices } from "src/types";
import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";

type TInitialState = {
  theme: TTheme;
  vertices: TVertices | null;
  verticesReq: boolean;
  verticesReqError: SerializedError | null;
};

const initialState: TInitialState = {
  theme: (localStorage.getItem("theme") as TTheme) || "light",
  vertices: null,
  verticesReq: false,
  verticesReqError: null,
};

export const postTriangulateThunk = createAsyncThunk(
  "global/triangulate",
  async (parameters: TParametersFigure) => await apiPostTriangulate(parameters)
);

const globalSlice = createSlice({
  initialState: initialState,
  name: "global",
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
  selectors: {
    getTheme: (store) => store.theme,
    getVertices: (store) => store.vertices,
    getVerticesReq: (store) => store.verticesReq,
    getVerticesReqError: (store) => store.verticesReqError,
  },
  extraReducers: (build) => {
    build
      .addCase(postTriangulateThunk.pending, (state) => {
        state.verticesReq = true;
        state.verticesReqError = null;
      })
      .addCase(postTriangulateThunk.rejected, (state, action) => {
        state.verticesReq = false;
        state.verticesReqError = action.error;
      })
      .addCase(postTriangulateThunk.fulfilled, (state, action) => {
        state.verticesReq = false;
        state.vertices = action.payload.vertices;
      });
  },
});

export const { getTheme, getVertices, getVerticesReq, getVerticesReqError } =
  globalSlice.selectors;
export const { toggleTheme } = globalSlice.actions;

export default globalSlice.reducer;
