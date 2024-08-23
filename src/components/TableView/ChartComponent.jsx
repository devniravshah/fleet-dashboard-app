import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  const chartData = useMemo(() => {
    const entityTypes = data.reduce((acc, item) => {
      acc[item.entity_type] = (acc[item.entity_type] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(entityTypes),
      datasets: [
        {
          label: "Count of Entities by Type",
          data: Object.values(entityTypes),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Entity Type Distribution",
      },
    },
  };

  return (
    <Box marginTop={4}>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default ChartComponent;
