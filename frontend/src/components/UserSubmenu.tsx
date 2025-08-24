import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

type UserSubmenuProps = {
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserSubmenu({
  isUserMenuOpen,
  setIsUserMenuOpen,
}: UserSubmenuProps) {
  const { user, isAuthenticated, logout } = useAuthStore();

  //============= useNavigate =============//
  const navigate = useNavigate();

  //============= Logout Function =============//
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out.");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("There was an error while logging out.");
      throw Error;
    }
  };

  //============= Close the User Submenu on scroll =============//
  useEffect(() => {
    const closeSubMenuOnScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50 && isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener("scroll", closeSubMenuOnScroll);
    return () => window.removeEventListener("scroll", closeSubMenuOnScroll);
  }, [isUserMenuOpen]);

  return (
    <ul
      className={`absolute transform ${
        isUserMenuOpen && isAuthenticated
          ? "opacity-100 translate-y-24 visible"
          : "pointer-events-none -translate-y-24"
      } p-2 right-0 flex flex-col space-y-2 rounded-lg bg-primary-light border border-border text-primary-dark transition-transform duration-300 ease-in-out origin-top-right`}
    >
      {/*============= Logout =============*/}
      <li
        className="flex items-center gap-2 text-lg cursor-pointer px-3 rounded-lg py-1.5 transition-all duration-100 hover:bg-primary-dark hover:text-primary-light"
        onClick={handleLogout}
        role="button"
      >
        <span aria-label="Logout" aria-hidden={true}>
          <LogOut />
        </span>
        Logout
      </li>

      {/*============= Dashboard =============*/}
      {user?.role === "admin" && (
        <Link to={"/admin"}>
          <li
            className="flex items-center gap-2 text-lg cursor-pointer px-3 rounded-lg py-1.5 transition-all duration-100 hover:bg-primary-dark hover:text-primary-light"
            role="button"
          >
            <span aria-label="Settings" aria-hidden={true}>
              <LayoutDashboard />
            </span>
            Dashboard
          </li>
        </Link>
      )}
    </ul>
  );
}
