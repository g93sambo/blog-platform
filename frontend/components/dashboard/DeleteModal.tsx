import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  postTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ isOpen, postTitle, onCancel, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl border border-slate-100 flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
          <Trash2 className="w-6 h-6" />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-slate-900">Delete this post?</h3>
          <p className="text-sm text-gray-500 px-2">
            "{postTitle}" will be permanently deleted. This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-medium text-sm rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-xl shadow-sm transition-colors"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}