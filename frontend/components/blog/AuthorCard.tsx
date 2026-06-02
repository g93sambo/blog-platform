'use client';

import { useState } from "react";
import { Button } from "../ui/Button";

interface AuthorCardProps {
  label?: string;
  initials: string;
  name: string;
  bio: string;
}

export const AuthorCard = ({
  label = "ABOUT THE AUTHOR",
  initials,
  name,
  bio
}: AuthorCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <article className="w-full bg-[#f5f5f7] rounded-xl border border-solid border-[#d2d2da] p-4 flex flex-col items-center text-center gap-3">
      {/* Meta Context Header -  Left Aligned */}
      <h2 className="w-full text-left text-[#787882] text-[10px] font-medium tracking-wider uppercase">
        {label}
      </h2>

      {/* Centered Avatar */}
      <div 
        className="w-12 h-12 bg-[#e6f1fb] rounded-full flex items-center justify-center font-bold text-[#0c447c] text-sm tracking-wide mt-1"
        aria-hidden="true"
      >
        {initials}
      </div>

      {/* Text Content Core Wrapper */}
      <div className="flex flex-col gap-1 w-full">
        <p className="text-[#14141e] text-sm font-semibold leading-none">
          {name}
        </p>
        <p className="text-[#787882] text-xs font-normal leading-normal px-2">
          {bio}
        </p>
      </div>

      {/* Call-To-Action Button */}
      <Button
        label={isFollowing ? "Following" : "Follow"}
        variant={isFollowing ? "secondary" : "primary"}
        onClick={() => setIsFollowing(!isFollowing)}
        className="w-full !py-2 text-xs h-[34px] mt-1 transition-all"
        aria-label={`${isFollowing ? "Unfollow" : "Follow"} ${name}`}
      />
    </article>
  );
};

export default AuthorCard;