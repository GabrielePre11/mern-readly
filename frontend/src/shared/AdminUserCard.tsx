import { BadgeCheck, UserStar } from "lucide-react";

interface User {
  email: string;
  name: string;
  role: "admin" | "user";
  isVerified: boolean;
}

interface AdminUserCardProps {
  user: User;
}

export default function AdminUserCard({ user }: AdminUserCardProps) {
  return (
    <li className="inline-flex items-center justify-between gap-2.5 px-3 py-1 bg-primary-light font-medium rounded-xs w-full border border-border">
      <p className="text-lg truncate">{user.email}</p>

      <div className="flex items-center gap-3.5">
        <span className="flex items-center gap-1.5 bg-primary-dark px-3 py-1 rounded-sm text-primary-light">
          <UserStar className="text-yellow-400" />
          {user.role}
        </span>

        {user.isVerified && (
          <div className="flex items-center gap-1.5 bg-primary-dark px-3 py-1 rounded-sm text-primary-light">
            <BadgeCheck className="text-green-500" />
            <span>Verified</span>
          </div>
        )}
      </div>
    </li>
  );
}
