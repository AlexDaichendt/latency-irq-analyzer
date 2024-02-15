import { Box } from "@mui/material";
import Highcharts, {
  Options,
  SeriesLineOptions,
  SeriesOptionsType,
  SeriesScatterOptions,
} from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function IRQPlot() {
  const cpu = useSelector((state: RootState) => state.controls.currentCPU);
  const irqs = useSelector((state: RootState) => state.irq.irqData);
  const normalize = useSelector((state: RootState) => state.controls.normalize);

  const worstcase = useSelector((state: RootState) => state.worstcase.data);
  const showWorstCase = useSelector(
    (state: RootState) => state.controls.showWorstCase
  );

  if (irqs.length === 0) {
    return null;
  }
  if (irqs[cpu] === undefined) {
    return null;
  }

  let series: SeriesOptionsType[] = Object.entries(irqs[cpu])
    .filter(([key]) => !key.includes("timestamp_us"))
    // only display series that have rising values
    .filter(([_, value]) => value.some((v) => v > value[0]))
    .map(([key, value]) => ({
      type: "line",
      name: key.replace(/_CPU\d+/, ""),
      data: value,
    }));
  if (normalize) {
    // @ts-expect-error somehow, this is not accepted by tsc
    series = series.map((serie) => {
      const castedSerie = serie as SeriesLineOptions;

      const max = Math.max(...(castedSerie.data as number[]));
      return {
        ...serie,
        data: (castedSerie.data as number[]).map((value) => value / max),
      };
    });
  }

  if (worstcase.length > 0 && showWorstCase) {
    const worstcaseSeries: SeriesScatterOptions = {
      type: "scatter",
      name: "Worst case",
      marker: {
        symbol: "circle",
      },
      data: worstcase.map((entry) => [entry.prets / 1000000000, entry.latency]),
    };

    if (normalize && worstcaseSeries.data !== undefined) {
      const max = Math.max(...worstcase.map((entry) => entry.latency));
      worstcaseSeries.data = worstcase.map((entry) => [
        entry.prets / 1000000000,
        entry.latency / max,
      ]);
    }

    series.push(worstcaseSeries);
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
    accessibility: {
      enabled: false,
    },
  };

  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
