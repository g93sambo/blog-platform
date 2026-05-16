import { Button } from "../ui/Button";

export const Hero = () => {
  return (
    <section className="bg-[#ebf3fc] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-[#14141e] mb-4">
          Where <span className="text-[#378add]">Ideas</span> Go Live.
        </h1>
        
        <p className="text-[#787882] text-lg md:text-xl max-w-xl mb-8">
          Fresh ideas, real stories, and the latest trends — all in one place.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button 
            label="Start writing →" 
            variant="primary" 
            onClick={() => console.log("Navigate to editor")} 
          />
          <Button 
            label="Read latest →" 
            variant="secondary" 
            onClick={() => console.log("Scroll to feed")} 
          />
        </div>
      </div>
    </section>
  );
};