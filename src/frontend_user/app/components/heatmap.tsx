import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const HeatmapCalendar = () => {
  const chartRef = useRef(null);

  const getVirtualData = (year, month) => {
    const start = +echarts.time.parse(`${year}-${month}-01`);
    const end = +echarts.time.parse(`${year}-${month + 1}-01`);
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = start; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
        Math.floor(Math.random() * 1000),
      ]);
    }
    return data;
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        position: "top",
        formatter: (p) => {
          const format = echarts.time.format(
            p.data[0],
            "{yyyy}-{MM}-{dd}",
            false
          );
          return format + ": " + p.data[1];
        },
      },
      visualMap: {
        min: 0,
        max: 1000,
        orient: "vertical",
        left: "670",
        top: "center",
        inRange: {
          color: ["#FFFFFF", "#5DAC7F"],
        },
      },
      calendar: [
        {
          left: "center",
          cellSize: [40, 30],
          top: 70,
          bottom: 10,
          orient: "vertical",
          range: ["2025-05", "2025-08"],
          dayLabel: { margin: 5 },
        },
      ],
      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          data: [
            ...getVirtualData(2025, 5),
            ...getVirtualData(2025, 6),
            ...getVirtualData(2025, 7),
          ],
        },
      ],
    };

    chartInstance.setOption(option);

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
    resizeObserver.observe(chartRef.current.parentElement);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "40vh" }} />;
};

export default HeatmapCalendar;
