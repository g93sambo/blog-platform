interface AnalyticsSummaryCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function AnalyticsSummaryCard({
  title,
  value,
  change,
  isPositive,
}: AnalyticsSummaryCardProps) {
  return (
    <article className="bg-white rounded-[10px] border border-[#d2d2da] p-4 w-72 h-[100px]">
      <p className="text-[#787882] text-xs font-normal mb-2">{title}</p>
      <p className="text-[#14141e] text-[28px] font-bold mb-4">{value}</p>
      <div
        className={`inline-block px-3 py-1.5 rounded-md text-[11px] font-normal ${
          isPositive
            ? 'bg-[#eaf8f0] text-[#27a064]'
            : 'bg-[#fbeaf0] text-[#993556]'
        }`}
      >
        {change}
      </div>
    </article>
  );
}
