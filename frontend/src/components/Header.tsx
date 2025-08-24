import { User } from "lucide-react";
import Container from "../layout/Container";
import { useAuthStore } from "../store/authStore";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import UserSubmenu from "./UserSubmenu";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", linkTo: "/" },
  { label: "Books", linkTo: "/books" },
  { label: "Wishlist", linkTo: "/wishlist" },
];

export default function Header() {
  //============= useAuthStore =============//
  const { isAuthenticated, user } = useAuthStore();

  //============= useLocation =============//
  const currentPath = useLocation();

  const [isHeaderActive, setIsHeaderActive] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  //============= Header on Scroll =============//
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50 && !isHeaderActive) {
        setIsHeaderActive(true);
      } else if (scrollY <= 50 && isHeaderActive) {
        setIsHeaderActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeaderActive]);

  return (
    <header
      id="header"
      className={`bg-primary-dark z-50 transform transition-all duration-200 ease-in-out ${
        isHeaderActive
          ? "fixed top-0 left-0 w-full drop-shadow-lg drop-shadow-blue-300"
          : "absolute top-2.5 left-2.5 right-2.5 lg:max-w-[1260px] lg:mx-auto animate-[headerSlideIn_0.4s_ease-out_forwards] rounded-xs"
      }`}
    >
      <Container
        className={`flex items-center justify-between ${
          isHeaderActive ? "py-4 lg:py-6" : "py-2 lg:py-3"
        }`}
      >
        {/*============= Logo & Navigation =============*/}
        <div className="flex items-center gap-10">
          <Logo className="text-3xl"></Logo>

          {/*============= Desktop Navigation =============*/}
          <ul className="hidden md:flex items-center space-x-5 text-primary-light text-lg xl:text-xl font-secondary">
            {navLinks.map((desktopLink) => (
              <li
                key={desktopLink.label}
                className={`${
                  currentPath.pathname === desktopLink.linkTo
                    ? "text-primary"
                    : ""
                }`}
              >
                <Link
                  to={desktopLink.linkTo}
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {desktopLink.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*============= Searchbar & Header Actions =============*/}
        <div className="flex items-center gap-3.5">
          {/*============= Searchbar =============*/}
          <Searchbar />

          {/*============= Login =============*/}
          {!isAuthenticated && (
            <button
              className="grid place-items-center text-primary-light  size-8 p-1 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-bg hover:text-primary-dark"
              aria-label="Sign Up"
            >
              <Link to={"/login"}>
                <span className="transform transition-transform duration-300">
                  <User />
                </span>
              </Link>
            </button>
          )}

          {/*============= User Profile Button =============*/}
          {isAuthenticated && (
            <button
              className={`relative grid place-items-center size-9 rounded-full border border-slate-500 cursor-pointer transition-colors duration-200 hover:bg-bg hover:text-primary-dark ${
                isUserMenuOpen
                  ? "bg-bg text-primary-dark"
                  : "text-primary-light"
              }`}
              aria-label="User's Profile"
              aria-live="polite"
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
            >
              <span className="text-xl">
                {user?.name.charAt(0).toUpperCase()}
              </span>

              {/*============= User Submenu =============*/}
              <UserSubmenu
                isUserMenuOpen={isUserMenuOpen}
                setIsUserMenuOpen={setIsUserMenuOpen}
              />
            </button>
          )}
        </div>
      </Container>
    </header>
  );
}
