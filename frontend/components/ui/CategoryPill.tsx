interface CategoryPillProps {
  label: string;
  isActive?: boolean;
}

export const CategoryPill = ({ label, isActive = false }: CategoryPillProps) => {
  return (
    <button
      className={`px-6 py-1.5 rounded-full border text-sm font-medium transition-colors
        ${isActive 
          ? "bg-[#378add] text-white border-[#378add]" 
          : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
        }`}
    >
      {label}
    </button>
  );
};