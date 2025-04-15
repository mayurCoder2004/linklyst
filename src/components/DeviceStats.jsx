import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Define your colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function App({ stats }) {
  // Normalize and count devices
  const deviceCount = stats.reduce((acc, item) => {
    const normalizedDevice = item.device.trim().toLowerCase();
    if (!acc[normalizedDevice]) {
      acc[normalizedDevice] = 0;
    }
    acc[normalizedDevice]++;
    return acc;
  }, {});

  // Convert to chart-ready format with proper capitalization
  const result = Object.keys(deviceCount).map((device) => ({
    device: device.charAt(0).toUpperCase() + device.slice(1),
    count: deviceCount[device],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={result}
            labelLine={false}
            label={({ device, percent }) =>
              `${device}: ${(percent * 100).toFixed(0)}%`
            }
            dataKey="count"
          >
            {result.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
