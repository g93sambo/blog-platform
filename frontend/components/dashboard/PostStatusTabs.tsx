'use client';

interface PostStatusTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  counts: Record<string, number>;
}

export const PostStatusTabs = ({ activeTab, setActiveTab, counts }: PostStatusTabsProps) => {
  const tabs = ["All", "Published", "Draft", "Under Review"] as const;

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-2 select-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive 
                ? 'bg-[#e6f1fb] text-[#0c447c]' 
                : 'text-gray-400 hover:text-gray-700 bg-transparent'
            }`}
          >
            {tab} <span className="text-[10px] opacity-70">({counts[tab]})</span>
          </button>
        );
      })}
    </div>
  );
};