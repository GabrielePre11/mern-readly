import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

type RedirectAuthUserProps = {
  children: ReactNode;
};

export default function CheckUserRole({ children }: RedirectAuthUserProps) {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return;

  if (user?.role !== "admin") {
    toast.error("Forbidden. Admin only!");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
