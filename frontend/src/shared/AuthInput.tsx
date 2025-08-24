import type { InputHTMLAttributes, ReactNode } from "react";

type AuthInputProps = {
  labelName: string;
  inputId: string;
} & InputHTMLAttributes<HTMLInputElement> &
  Partial<{
    className: string;
    icon: ReactNode;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  }>;

export default function AuthInput({
  labelName,
  inputId,
  className = "",
  icon,
  showPassword,
  setShowPassword,
  ...props
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {/*============= Label =============*/}
      <label htmlFor={inputId} className="text-sm font-semibold">
        {labelName}
      </label>

      <div className="flex items-center relative">
        {/*============= Input =============*/}
        <input
          id={inputId}
          className={`flex items-center py-3 pl-2 ${
            inputId === "passwordField" ? "pr-12" : ""
          } w-full rounded-md border-2 border-primary bg-bg text-lg outline-0 hover:shadow-lg hover:shadow-black/20 transition-all duration-100 focus:ring-2 focus:ring-primary-dark ${className}`}
          {...props}
        />

        {/*============= Icon =============*/}
        {icon && (
          <button
            type="button"
            role="toggle"
            aria-label="icon"
            className={`absolute right-3 cursor-pointer transition-all duration-300 text-primary-dark ${
              showPassword ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setShowPassword && setShowPassword((prev) => !prev)}
          >
            {icon}
          </button>
        )}
      </div>
    </div>
  );
}
