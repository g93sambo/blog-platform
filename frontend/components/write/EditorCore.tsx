'use client';

interface EditorCoreProps {
  title: string;
  subtitle: string;
  content: string;
  onUpdate: (key: string, value: string) => void;
}

export const EditorCore = ({ title, subtitle, content, onUpdate }: EditorCoreProps) => {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm">
      
      {/* Title Field Element Input */}
      <input 
        type="text"
        value={title}
        onChange={(e) => onUpdate("title", e.target.value)}
        placeholder="Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules"
        className="w-full text-[#14141e] text-xl font-bold border-b border-gray-100 pb-2 focus:outline-none focus:border-[#378add] placeholder:text-gray-300 transition-colors"
      />

      {/* Subtitle Field Element Input */}
      <input 
        type="text"
        value={subtitle}
        onChange={(e) => onUpdate("subtitle", e.target.value)}
        placeholder="From Balogun to Brooklyn — the underground designers turning fabric markets into cultural movements..."
        className="w-full text-gray-500 text-sm font-normal border-b border-gray-100 pb-2 focus:outline-none focus:border-[#378add] placeholder:text-gray-300 transition-colors"
      />

      {/* Mock Editor Toolbar Layout */}
      <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-1.5 flex flex-wrap gap-1 text-gray-500 font-mono text-xs items-center select-none">
        {["B", "I", "U", "H1", "H2", "=", "“", "田", "<>", "↩", "↪"].map((tool) => (
          <button key={tool} type="button" className="h-7 w-8 hover:bg-gray-200 rounded text-center font-bold transition-colors">
            {tool}
          </button>
        ))}
      </div>

      {/* Main Text Area Content Body Box */}
      <textarea 
        value={content}
        onChange={(e) => onUpdate("content", e.target.value)}
        placeholder="Write your article content narratives here..."
        className="w-full h-[380px] text-gray-800 text-sm font-normal leading-relaxed resize-none focus:outline-none placeholder:text-gray-300"
      />

      {/* Metadata Document Counter Footer row */}
      <div className="w-full border-t border-gray-100 pt-3 flex justify-between items-center text-[11px] text-gray-400 font-medium">
        <span>{content.split(/\s+/).filter(Boolean).length} words · ~2 min read</span>
      </div>

    </div>
  );
};