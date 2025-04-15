import { Card } from "@tremor/react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  LineChart, Line 
} from "recharts";

// 图表数据类型定义
export interface ChartData {
  type: string;
  data: any[];
  title: string;
  xAxis?: string;
  yAxis?: string;
}

interface ChartComponentProps {
  chart: ChartData;
  index: number;
}

// 图表组件 - 根据类型渲染不同的图表
export const ChartComponent = ({ chart, index }: ChartComponentProps) => {
  // 根据图表类型渲染不同的图表组件
  switch(chart.type) {
    case 'bar':
      return (
        <Card key={`chart-${index}`} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">{chart.title || '数据图表'}</h2>
          <div className="h-[400px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                  }}
                  itemStyle={{
                    color: "white",
                    fontWeight: "500"
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" name={chart.yAxis || '数值'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      );
      
    case 'pie':
      return (
        <Card key={`chart-${index}`} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">{chart.title || '饼图数据'}</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chart.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chart.data.map((_: any, i: number) => (
                    <Cell key={`cell-${i}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][i % 5]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                  itemStyle={{ color: "#F3F4F6" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      );
      
    case 'line':
      return (
        <Card key={`chart-${index}`} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">{chart.title || '线图数据'}</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chart.data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                  itemStyle={{ color: "#F3F4F6" }}
                />
                <Legend />
                <Line type="monotone" dataKey="energy" stroke="#3B82F6" name="能耗" />
                <Line type="monotone" dataKey="temp_high" stroke="#F59E0B" name="温度" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      );
      
    case 'radar':
      return (
        <Card key={`chart-${index}`} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">{chart.title || '雷达图数据'}</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chart.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" stroke="#9CA3AF" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" />
                <Radar name="数值" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                  itemStyle={{ color: "#F3F4F6" }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      );
      
    default:
      return (
        <Card key={`chart-${index}`} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">{chart.title || '数据图表'}</h2>
          <div className="h-[400px] flex items-center justify-center">
            <p className="text-gray-400">未知图表类型: {chart.type}</p>
          </div>
        </Card>
      );
  }
};

// 默认图表组件 - 当没有图表数据时显示
interface DefaultChartsProps {
  dashboardData: any[];
}

export const DefaultCharts = ({ dashboardData }: DefaultChartsProps) => {
  return (
    <>
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">月度数据</h2>
        <div className="h-[400px] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}
                itemStyle={{
                  color: "white",
                  fontWeight: "500"
                }}
              />
              <Legend />
              <Bar dataKey="candidates" fill="#3B82F6" name="候选人数量" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">职位分布</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={Object.entries(dashboardData[0].positions).map(([name, value]) => ({ name, value }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.keys(dashboardData[0].positions).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                itemStyle={{ color: "#F3F4F6" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
};

// 图表网格组件
interface ChartGridProps {
  chartData: ChartData[];
}

export const ChartGrid = ({ chartData }: ChartGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {chartData.length > 0 ? (
        chartData.map((chart, index) => (
          <ChartComponent key={index} chart={chart} index={index} />
        ))
      ) : null
      }
    </div>
  );
};
