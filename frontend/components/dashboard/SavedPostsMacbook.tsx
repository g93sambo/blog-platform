import { NavigationSidebarSection } from "./NavigationSidebarSection";
import { SavedPostsSection } from "./SavedPostsSection";

export default function SavedPostsMacbook() {
  return (
    <main className="bg-[#f7f7f9] w-full min-h-screen flex">
      <NavigationSidebarSection />
      <SavedPostsSection />
    </main>
  );
}