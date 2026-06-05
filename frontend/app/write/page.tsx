'use client';

import { useState } from "react";
import { EditorHeader } from "@/components/write/EditorHeader";
import { CoverPicker } from "@/components/write/CoverPicker";
import { EditorCore } from "@/components/write/EditorCore";
import { PostSettings } from "@/components/write/PostSettings";
import { CategorySelector } from "@/components/write/CategorySelector";
import { TagManager } from "@/components/write/TagManager";
import { SeoPreview } from "@/components/write/SeoPreview";

export default function WritePostPage() {
  // Centralized form state for database/API submission
  const [postData, setPostData] = useState({
    title: "",
    subtitle: "",
    content: "",
    coverLeft: "#f5c4d1",
    coverRight: "#bc4773",
    status: "Draft",
    visibility: "Public",
    author: "Ngige N.",
    readingTime: "~2 min",
    category: "Fashion",
    tags: ["Lagos", "Fashion", "Culture", "Africa"]
  });

  const handleUpdate = (key: string, value: any) => {
    setPostData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePublish = async () => {
    console.log("Submitting payload to backend API route:", postData);
    // axios/fetch post requests:
    // await fetch('/api/posts', { method: 'POST', body: JSON.stringify(postData) }) goes here
  };

  return (
    <main className="min-h-screen bg-[#f4f5f6] pb-16">
      {/* Top Navbar Action Header */}
      <EditorHeader onPublish={handlePublish} />

      {/* Main Framework Content Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Rich Document Content Composer Workspace */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <CoverPicker 
            leftColor={postData.coverLeft} 
            rightColor={postData.coverRight}
            onChangeColors={(left, right) => {
              handleUpdate("coverLeft", left);
              handleUpdate("coverRight", right);
            }}
          />
          <EditorCore 
            title={postData.title}
            subtitle={postData.subtitle}
            content={postData.content}
            onUpdate={handleUpdate}
          />
        </div>

        {/* Right Side: Post Metadata Settings Configuration Dashboards */}
        <div className="flex flex-col gap-4">
          <PostSettings 
            status={postData.status}
            visibility={postData.visibility}
            author={postData.author}
            readingTime={postData.readingTime}
          />
          <CategorySelector 
            value={postData.category}
            onChange={(val) => handleUpdate("category", val)}
          />
          <TagManager 
            tags={postData.tags}
            onChange={(val) => handleUpdate("tags", val)}
          />
          <SeoPreview 
            title={postData.title}
            subtitle={postData.subtitle}
          />
        </div>

      </div>
    </main>
  );
}