'use client';

export const PostSettings = ({ status, visibility, author, readingTime }: any) => (
  <div className="w-full bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm text-xs">
    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Post Settings</h3>
    <div className="flex justify-between py-1 border-b border-gray-50">
      <span className="text-gray-500">Status</span>
      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-bold rounded text-[10px] uppercase">{status}</span>
    </div>
    <div className="flex justify-between py-1 border-b border-gray-50">
      <span className="text-gray-500">Visibility</span>
      <span className="font-semibold text-gray-900">{visibility}</span>
    </div>
    <div className="flex justify-between py-1 border-b border-gray-50">
      <span className="text-gray-500">Author</span>
      <span className="font-semibold text-gray-900">{author}</span>
    </div>
    <div className="flex justify-between py-1">
      <span className="text-gray-500">Reading time</span>
      <span className="text-gray-400">{readingTime}</span>
    </div>
  </div>
);