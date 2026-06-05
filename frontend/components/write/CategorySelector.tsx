'use client';

// exact props contract for the category dropdown
interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm text-xs">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</h3>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 font-medium outline-none focus:border-[#378add]"
      >
        {["Fashion", "Tech", "Gaming", "Culture", "Music", "Lifestyle"].map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};