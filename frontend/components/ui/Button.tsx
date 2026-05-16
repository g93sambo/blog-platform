interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export const Button = ({ label, variant = 'primary', onClick, className = '' }: ButtonProps) => {
  const baseStyles = "px-8 py-3 rounded-lg font-medium transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-[#378add] text-white hover:bg-[#2d74ba] shadow-sm",
    secondary: "bg-white border border-[#d2d2da] text-[#14141e] hover:bg-gray-50"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};