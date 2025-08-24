import type { AxiosError } from "axios";

type ErrorProps = {
  errorState: AxiosError | string | null;
  className?: string;
};

export default function Error({ errorState, className = "" }: ErrorProps) {
  return (
    <p
      className={`block text-sm text-primary-dark font-semibold transition-opacity duration-200 ${className} ${
        errorState ? "opacity-100" : "opacity-0"
      }`}
    >
      {typeof errorState === "string" ? errorState : errorState?.message}
    </p>
  );
}
