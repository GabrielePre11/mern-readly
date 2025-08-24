import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

type RedirectAuthUserProps = {
  children: ReactNode;
};

export default function UserNotLogged({ children }: RedirectAuthUserProps) {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be authenticated to do this!");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
