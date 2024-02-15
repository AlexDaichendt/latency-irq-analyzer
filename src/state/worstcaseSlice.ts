import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorstcaseSliceState {
  data: Array<{ latency: number; prets: number; postts: number }>;
  fileName?: string;
  fileSize: number;
}

const initialState: WorstcaseSliceState = {
  data: [],
  fileName: "",
  fileSize: 0,
};

export const worstcaseSlice = createSlice({
  name: "worstcase",
  initialState,
  reducers: {
    setFileSize: (state, action: PayloadAction<number>) => {
      state.fileSize = action.payload;
    },
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
    replace: (state, action: PayloadAction<string>) => {
      const csv = action.payload;

      const lines = csv.split("\n");
      const data = lines
        .slice(1)
        .map((line) => line.split(",").map((value) => parseFloat(value)))
        .map(([latency, prets, postts]) => ({ latency, prets, postts }))
        // sort by prets
        .sort((a, b) => a.prets - b.prets);

      state.data = data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { replace, setFileName, setFileSize } = worstcaseSlice.actions;

export default worstcaseSlice.reducer;
