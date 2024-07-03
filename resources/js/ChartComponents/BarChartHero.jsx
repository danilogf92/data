import { BarChart } from "@tremor/react";

// const dataFormatter = (number) =>
//   Intl.NumberFormat("us").format(number).toString();

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()} m³`;

export const BarChartHero = ({ chartdata }) => (
  <BarChart
    data={chartdata}
    index="name"
    categories={["Consumption by month m³"]}
    colors={["blue"]}
    valueFormatter={dataFormatter}
    yAxisWidth={100}
    onValueChange={(v) => console.log(v)}
  />
);
