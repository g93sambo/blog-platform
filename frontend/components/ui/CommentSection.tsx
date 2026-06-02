'use client';

import { useId, useState } from "react";
import { Button } from "./Button";

interface CommentItem {
  id: number;
  initials: string;
  avatarBg: string;
  initialsColor: string;
  name: string;
  time: string;
  content: string;
}

export const CommentSection = () => {
  const commentFieldId = useId();
  const [commentText, setCommentText] = useState("");
  
  // Initialize state with mock comments for modifying the list dynamically
  const [commentList, setCommentList] = useState<CommentItem[]>([
    {
      id: 1,
      initials: "TN",
      avatarBg: "bg-[#e6f1fb]",
      initialsColor: "text-[#0c447c]",
      name: "Tolu N.",
      time: "2h ago",
      content: "This piece is everything. The Balogun reference hit different.",
    },
    {
      id: 2,
      initials: "JL",
      avatarBg: "bg-[#eeedfe]",
      initialsColor: "text-[#3c3489]",
      name: "Josh Levi",
      time: "4h ago",
      content: "Finally someone writing about this. The credit issue needs more coverage.",
    },
  ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentText.trim()) return;

    // Constructing mock data payload
    const newComment: CommentItem = {
      id: Date.now(),
      initials: "AK", // Adongo Kelvin
      avatarBg: "bg-[#e6f1fb]",
      initialsColor: "text-[#0c447c]",
      name: "Adongo K. (You)",
      time: "Just now",
      content: commentText.trim(),
    };

    // Update for state to render the comment immediately
    setCommentList((prev) => [...prev, newComment]);
    setCommentText("");
  };

  return (
    <section aria-labelledby="comments-heading" className="w-full flex flex-col gap-6 text-left">
      {/* Header Count Tracker */}
      <h2 id="comments-heading" className="text-[#14141e] text-base font-bold">
        Comments ({commentList.length})
      </h2>

      {/* Natural Liquid List Thread */}
      <ul className="m-0 p-0 list-none flex flex-col gap-6">
        {commentList.map((item) => (
          <li key={item.id} className="flex gap-3 items-start">
            
            {/* Structural Avatar Circle Atom */}
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[10px] ${item.avatarBg} ${item.initialsColor}`}
              aria-hidden="true"
            >
              {item.initials}
            </div>

            {/* Content Core Block */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2">
                <span className="text-[#14141e] text-sm font-medium">{item.name}</span>
                <time className="text-[#787882] text-xs font-normal">{item.time}</time>
              </div>
              <p className="text-[#787882] text-sm font-normal leading-relaxed text-justify max-w-4xl">
                {item.content}
              </p>
            </div>

          </li>
        ))}
      </ul>

      {/* Interactive Input Form Terminal */}
      <form onSubmit={handleSubmit} className="flex gap-3 items-center w-full mt-2">
        <label htmlFor={commentFieldId} className="sr-only">Write a comment</label>
        <div className="flex-grow max-w-4xl">
          <input
            id={commentFieldId}
            name="comment"
            type="text"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Write a comment..."
            className="w-full h-10 bg-[#f9f9fb] rounded-lg border border-solid border-[#d2d2da] px-4 text-[#14141e] text-sm font-normal focus:outline-none focus:border-[#378add] transition-colors"
          />
        </div>
        
        {/* For reuse of atomic button component */}
        <Button 
          label="Post" 
          variant="primary" 
          className="!px-6 !py-2 h-10 text-sm" 
        />
      </form>
    </section>
  );
};