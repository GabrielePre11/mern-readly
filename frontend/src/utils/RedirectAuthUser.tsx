import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

type RedirectAuthUserProps = {
  children: ReactNode;
};

export default function RedirectAuthUser({ children }: RedirectAuthUserProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
