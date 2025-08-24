import { Badge, BadgeCheck } from "lucide-react";

export default function validatePassword(password: string) {
  const validPassword = [
    { label: "At least 8 characters.", match: password.length >= 8 },
    { label: "At least an uppercase letter.", match: /[A-Z]/.test(password) },
    { label: "At least a number.", match: /\d/.test(password) },
    {
      label: "At least a special character (ex. ?@!).",
      match: /[!@#$%^&*]/.test(password),
    },
  ];

  return (
    <ul className="grid grid-cols-1 space-y-0.5 pt-2">
      {validPassword.map((item) => (
        <li
          key={item.label}
          className="inline-flex items-center gap-1.5 font-medium text-sm"
        >
          <span
            className={`transition-transform duration-300 ${
              item.match ? "rotate-360" : "rotate-0"
            }`}
          >
            {item.match ? (
              <BadgeCheck className="size-6 fill-primary" />
            ) : (
              <Badge className="size-6" />
            )}
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
