import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OffersGraph = () => {
  const [graphData, setGraphData] = useState(null);
  const [view, setView] = useState("lastWeek");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const fetchGraphData = async () => {
    try {
      let url;

      if (view === "lastWeek") {
        url = "http://localhost:5000/admin/offer-graph-last-week";
      } else if (view === "specificMonth" && month && year) {
        url = `http://localhost:5000/admin/offer-graph-specific-month/${month}/${year}`;
      } else {
        console.warn("Invalid view or missing month/year for specificMonth");
        return;
      }

      const response = await axios.get(url);
      const data = response.data.offerGraph;

      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format: Expected an array");
      }

      const labels = data.map((item) => {
        if (view === "lastWeek") {
          const date = new Date(item.day);
          return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(date);
        }
        return item.day; // Keep original for specificMonth
      });

      const counts = data.map((item) => item.count);

      setGraphData({
        labels,
        datasets: [
          {
            label: "Offers Per Day",
            data: counts,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            tension: 0.4, // Add smooth curves
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, [view, month, year]);

  if (!graphData) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div
      className="mx-auto p-6 bg-white shadow-lg rounded-lg rounded-lg mb-10"
      style={{ marginLeft: "50px", width: "580px" }}
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Offers Graph
      </h2>

      <div className="mb-6">
        <label
          htmlFor="viewSelect"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Choose Data:
        </label>
        <select
          id="viewSelect"
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="block w-full p-1.5 border border-gray-300 rounded-md shadow-sm text-sm outline-none hover:bg-gray-200 hover:border-gray-400"
        >
          <option value="lastWeek">Last Week</option>
          <option value="specificMonth">Specific Month</option>
        </select>
      </div>

      {view === "specificMonth" && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="monthInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Month:
            </label>
            <input
              id="monthInput"
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
              className="block w-full p-1.5 border border-gray-300 rounded-md shadow-sm text-sm outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="yearInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Year:
            </label>
            <input
              id="yearInput"
              type="number"
              min="2024"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
              className="block w-full p-1.5 border border-gray-300 rounded-md shadow-sm text-sm outline-none"
            />
          </div>
        </div>
      )}

      <div className="w-full h-96">
        <Line
          data={graphData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,
                  },
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default OffersGraph;
