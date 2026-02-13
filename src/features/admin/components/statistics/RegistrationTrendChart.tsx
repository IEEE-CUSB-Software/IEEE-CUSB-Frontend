import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useThemeColors } from '@/shared/hooks/useThemeColors';
import { useTheme } from '@/shared/hooks/useTheme';

const RegistrationTrendChart: React.FC = () => {
  const colors = useThemeColors();
  const { isDark } = useTheme();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const counts = [120, 132, 101, 134, 90, 230, 210];

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: days,
      axisLine: { lineStyle: { color: isDark ? '#374151' : '#e5e7eb' } },
      axisLabel: { color: isDark ? '#9ca3af' : '#6b7280' },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: { type: 'dashed', color: isDark ? '#374151' : '#f3f4f6' },
      },
      axisLabel: { color: isDark ? '#9ca3af' : '#6b7280' },
    },
    series: [
      {
        name: 'Registrations',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: colors.primary,
          width: 3,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: colors.primary },
              { offset: 1, color: 'rgba(255, 255, 255, 0)' },
            ],
          },
          opacity: 0.3,
        },
        itemStyle: {
          color: colors.primary,
          borderWidth: 2,
          borderColor: isDark ? '#111827' : '#fff',
        },
        data: counts,
      },
    ],
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 shadow-sm h-full flex flex-col ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        Registration Trends (Last 7 Days)
      </h3>
      <div className="flex-1 min-h-[300px]">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default RegistrationTrendChart;
