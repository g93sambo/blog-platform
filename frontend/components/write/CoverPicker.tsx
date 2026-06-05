'use client';

interface CoverPickerProps {
  leftColor: string;
  rightColor: string;
  onChangeColors: (left: string, right: string) => void;
}

export const CoverPicker = ({ leftColor, rightColor, onChangeColors }: CoverPickerProps) => {
  
  // Quick function to mock rolling random color blocks
  const randomizeColors = () => {
    const pallete = ["#f5c4d1", "#bc4773", "#c3d2f8", "#4c6ef5", "#c0dd97", "#2e7d32"];
    const randomLeft = pallete[Math.floor(Math.random() * pallete.length)];
    const randomRight = pallete[Math.floor(Math.random() * pallete.length)];
    onChangeColors(randomLeft, randomRight);
  };

  return (
    <div className="w-full h-48 rounded-xl overflow-hidden relative group border border-gray-200">
      <div className="w-full h-full flex">
        <div className="w-1/2 h-full transition-colors duration-300" style={{ backgroundColor: leftColor }} />
        <div className="w-1/2 h-full transition-colors duration-300" style={{ backgroundColor: rightColor }} />
      </div>
      
      {/* Dynamic Action Trigger Overlay */}
      <button 
        type="button"
        onClick={randomizeColors}
        className="absolute inset-0 m-auto w-fit h-fit px-4 py-2 bg-black/60 hover:bg-black/80 text-white font-medium text-xs rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 shadow-lg"
      >
        🔄 Change cover
      </button>
    </div>
  );
};