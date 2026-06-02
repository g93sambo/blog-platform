'use client';

interface Paragraph {
  id: string;
  text: string;
}

interface BlogBodyProps {
  paragraphs: Paragraph[];
  quote: string;
}

export const BlogBody = ({ paragraphs, quote }: BlogBodyProps) => {
  // Find the introductory paragraph and separate the remaining text blocks
  const introParagraph = paragraphs.find((p) => p.id === "intro");
  const subsequentParagraphs = paragraphs.filter((p) => p.id !== "intro");

  return (
    <article className="w-full flex flex-col gap-6 text-left" aria-label="Blog article body">
      
      {/* Introduction Block */}
      {introParagraph && (
        <p className="text-[#14141e] text-base leading-relaxed font-normal text-justify">
          {introParagraph.text}
        </p>
      )}

      {/* Structured Dynamic Blockquote Accent */}
      {quote && (
        <blockquote 
          className="w-full rounded-lg bg-[#e6f1fb] border-l-4 border-[#378add] p-5 my-2"
          aria-label="Highlighted quote"
        >
          <p className="m-0 text-[#0c447c] text-sm md:text-base font-normal italic leading-relaxed">
            {quote}
          </p>
        </blockquote>
      )}
      
      {/* Sequential Body Paragraphs Map */}
      <div className="flex flex-col gap-4">
        {subsequentParagraphs.map((paragraph) => (
          <p 
            key={paragraph.id} 
            className="text-[#14141e] text-base leading-relaxed font-normal text-justify"
          >
            {paragraph.text}
          </p>
        ))}
      </div>

      {/* Horizontal Divider Separator */}
      <hr className="w-full h-px border-0 bg-[#d2d2da] mt-4" aria-hidden="true" />
    </article>
  );
};

export default BlogBody;