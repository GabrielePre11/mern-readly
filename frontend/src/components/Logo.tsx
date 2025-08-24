import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link to={"/"}>
      <h1 className={`font-medium text-primary font-secondary ${className}`}>
        readly.
      </h1>
    </Link>
  );
}
