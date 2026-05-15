import { CategoryPill } from "../ui/CategoryPill";

const categories = ["All", "Culture", "Tech", "Gaming", "Music", "Fashion", "Opinion", "Lifestyle"];

export default function CategoryBar() {
  return (
    <div className="flex gap-3 py-6 overflow-x-auto no-scrollbar">
      {categories.map((cat) => (
        <CategoryPill 
          key={cat} 
          label={cat} 
          isActive={cat === "All"} // To set "All" as active by default
        />
      ))}
    </div>
  );
}