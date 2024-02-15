import { Box } from "@mui/material";
import Highcharts, {
  Options,
  SeriesLineOptions,
  SeriesOptionsType,
} from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function IRQPlot() {
  const cpu = useSelector((state: RootState) => state.controls.currentCPU);
  const irqs = useSelector((state: RootState) => {
    return state.irq.irqData;
  });
  const normalize = useSelector((state: RootState) => state.controls.normalize);

  if (irqs.length === 0) {
    return null;
  }
  if (irqs[cpu] === undefined) {
    return null;
  }

  let series: SeriesLineOptions[] = Object.entries(irqs[cpu])
    .filter(([key]) => !key.includes("timestamp_us"))
    // only display series that have rising values
    .filter(([_, value]) => value.some((v) => v > value[0]))
    .map(([key, value]) => ({
      type: "line",
      name: key.replace(/_CPU\d+/, ""),
      data: value,
    }));
  if (normalize) {
    series = series.map((serie) => {
      const max = Math.max(...(serie.data as number[]));
      return {
        ...serie,
        data: (serie.data as number[]).map((value) => value / max),
      };
    });
  }

  const options: Options = {
    title: {
      text: "IRQ Plot",
    },
    series,
    chart: {
      height: 1000,
      allowMutatingData: false,
    },
    yAxis: {
      max: normalize ? 1 : undefined,
      title: {
        text: normalize ? "IRQ count normalized" : "IRQ count",
      },
    },
  };

  return (
    <Box sx={{ minWidth: "100vh", height: "100vh" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
