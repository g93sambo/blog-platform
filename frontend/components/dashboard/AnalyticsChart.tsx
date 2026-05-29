import { AnalyticsChart } from '@/types';

interface AnalyticsChartComponentProps {
  data: AnalyticsChart[];
}

export default function AnalyticsChartComponent({
  data,
}: AnalyticsChartComponentProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-[10px] border border-[#d2d2da] p-5 h-[300px] flex items-center justify-center">
        <p className="text-[#787882]">No data available</p>
      </div>
    );
  }

  // Find max value to scale bars
  const maxValue = Math.max(...data.map((d) => d.views));

  // Get every 6th label to avoid crowding
  const labelIndices = data
    .map((_, i) => i)
    .filter((i) => i % 6 === 0 || i === data.length - 1);

  return (
    <section className="bg-white rounded-[10px] border border-[#d2d2da] p-5">
      <h2 className="text-sm font-medium text-[#14141e] mb-8">Views over time</h2>

      {/* Chart Container */}
      <div className="relative h-[280px] flex items-flex-end justify-between gap-1 px-4 pb-12">
        {/* Bars */}
        {data.map((item, index) => {
          const height = (item.views / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center"
              title={`${item.date}: ${item.views} views`}
            >
              <div className="w-full flex justify-center">
                <div
                  className="w-6 bg-[#378add] rounded-sm transition-all hover:opacity-80"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                />
              </div>
            </div>
          );
        })}

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-[10px] text-[#787882]">
          {data.map((item, index) => {
            const isLabelIndex = labelIndices.includes(index);
            return (
              <div
                key={index}
                className="flex-1"
                style={{
                  textAlign: index === labelIndices[labelIndices.length - 1] ? 'right' : 'center',
                }}
              >
                {isLabelIndex && item.date}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
