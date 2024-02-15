import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IRQSliceState {
  irqData: Array<Record<string, number[]>>;
  fileName?: string;
  fileSize: number;
}

const initialState: IRQSliceState = {
  irqData: [],
  fileName: "",
  fileSize: 0,
};

export const irqSlice = createSlice({
  name: "irq",
  initialState,
  reducers: {
    setFileSize: (state, action: PayloadAction<number>) => {
      state.fileSize = action.payload;
    },
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
    replace: (state, action: PayloadAction<string>) => {
      const split = action.payload.split("\n");
      const data: Record<string, number[]> = {};

      // first line contains the IRQ names
      const irqNames = split[0].split(";");

      irqNames.forEach((irqName) => {
        data[irqName] = [];
      });

      const startValues = split[1]
        .split(";")
        .map((value) => parseInt(value, 10));

      // the rest of the lines contain the IRQ data
      split.slice(1).forEach((line) => {
        const values = line.split(";").map((value) => parseInt(value, 10));
        values.forEach((value, index) => {
          data[irqNames[index]].push(value - startValues[index]);
        });
      });

      let highestCpuNumber = -1;
      // extract cpu number from irq name, e.g. 450_IR-PCI-MSI_49807389-edge_nvme1q29_CPU2;
      irqNames.forEach((irqName) => {
        const cpuNumber = irqName.match(/CPU(\d+)/) || ["", "0"];
        highestCpuNumber = Math.max(
          highestCpuNumber,
          parseInt(cpuNumber[1], 10)
        );
      });

      state.irqData = new Array(highestCpuNumber + 1).fill(0).map(() => ({}));

      irqNames.forEach((irqName) => {
        const cpuNumber = irqName.match(/CPU(\d+)/) || ["", "0"];
        const cpu = parseInt(cpuNumber[1], 10);
        state.irqData[cpu][irqName] = data[irqName];
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { replace, setFileName, setFileSize } = irqSlice.actions;

export default irqSlice.reducer;
