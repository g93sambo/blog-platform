interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function ToggleSwitch({
  id,
  label,
  checked,
  onChange,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#d2d2da] last:border-b-0">
      <label htmlFor={id} className="text-[13px] font-normal text-[#14141e] cursor-pointer">
        {label}
      </label>
      <button
        id={id}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-block w-10 h-[22px] rounded-full transition-colors ${
          checked ? 'bg-[#378add]' : 'bg-[#c8c8d2]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] bg-white rounded-full transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
