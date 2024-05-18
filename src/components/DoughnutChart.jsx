import { ArcElement, CategoryScale, Chart, Legend, Tooltip } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useUser } from "../Context/UserContext";

Chart.register(ArcElement, Legend, Tooltip, CategoryScale);

export const DoughnutChart = () => {
  const { transactions, transType } = useUser();
  let data = [];
  let label = [];
  let customBackgroundColor = [];

  switch (transType) {
    case "expenses":
      label = ["Expenses"];
      data = [
        transactions
          .filter((trans) => trans.type === "expenses")
          .reduce((acc, curr) => acc + curr.amount, 0),
      ];
      customBackgroundColor = [
        "rgba(255, 99, 132, 0.8)", // Magenta
      ];
      break;

    case "income":
      label = ["Income"];
      data = [
        transactions
          .filter((trans) => trans.type === "income")
          .reduce((acc, curr) => acc + curr.amount, 0),
      ];
      customBackgroundColor = [
        "rgba(54, 162, 235, 0.8)", // Green
      ];
      break;

    default:
      label = ["Income", "Expenses"];
      data = [
        transactions
          .filter((trans) => trans.type === "income")
          .reduce((acc, curr) => acc + curr.amount, 0),
        transactions
          .filter((trans) => trans.type === "expenses")
          .reduce((acc, curr) => acc + curr.amount, 0),
      ];
      customBackgroundColor = [
        "rgba(54, 162, 235, 0.8)", // Green
        "rgba(255, 99, 132, 0.8)", // Magenta
      ];
      break;
  }

  const chartData = {
    labels: label,
    datasets: [
      {
        label: ["Transactions"],
        data: data,

        backgroundColor: customBackgroundColor,
        borderColour: [" rgba(75, 192, 192, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Transactions",
      },
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  return (
    <div className="w-50">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};
