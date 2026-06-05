import React from 'react';
import { CheckCircle2, Copy, Share2, ArrowRight } from 'lucide-react';

interface PublishSuccessProps {
  postTitle: string;
  postUrl: string;
  onViewPost: () => void;
  onGoToDashboard: () => void;
}

export default function PublishSuccess({ 
  postTitle, 
  postUrl, 
  onViewPost, 
  onGoToDashboard 
}: PublishSuccessProps) {
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center text-center gap-6 animate-fade-in">
      {/* Success Celebration Header */}
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 border border-green-100">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Your post is officially live!</h2>
        <p className="text-sm text-gray-500 px-4">
          Great job! "{postTitle}" has been successfully published to the Blogify feed for everyone to read.
        </p>
      </div>

      {/* Share Link Box */}
      <div className="w-full bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-slate-500 truncate pl-1">
          {postUrl}
        </span>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors shrink-0"
        >
          <Copy className="w-3.5 h-3.5" />
          Copy
        </button>
      </div>

      {/* Social Promotion Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button className="flex-1 py-2.5 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </button>
        <button className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
          <Share2 className="w-4 h-4" />
          Other Platforms
        </button>
      </div>

      {/* Navigation Shortcuts */}
      <div className="flex flex-col gap-3 w-full border-t border-slate-50 pt-4 mt-2">
        <button 
          onClick={onViewPost}
          className="w-full py-2.5 text-blue-600 hover:bg-blue-50/50 font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          View live post
          <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          onClick={onGoToDashboard}
          className="w-full py-2 text-gray-500 hover:text-slate-800 text-xs font-medium transition-colors"
        >
          Back to management hub
        </button>
      </div>
    </div>
  );
}