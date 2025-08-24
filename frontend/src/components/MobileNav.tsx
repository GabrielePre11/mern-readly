import { BookCopy, Heart, House, Search } from "lucide-react";
import Container from "../layout/Container";
import { Link, useLocation } from "react-router-dom";
import MobileSearch from "./MobileSearch";
import { useState } from "react";

export default function MobileNav() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const currentPath = useLocation();

  const navLinks = [
    { label: "Home", linkTo: "/", icon: <House /> },
    { label: "Books", linkTo: "/books", icon: <BookCopy /> },
    { label: "Wishlist", linkTo: "/wishlist", icon: <Heart /> },
    {
      label: "Search",
      linkTo: "",
      icon: <Search />,
      onclick: () => {
        setIsSearchOpen((prev) => !prev);
      },
    },
  ];

  return (
    <nav className="fixed md:hidden left-0 bottom-0 z-50 w-full bg-primary-dark text-white">
      <Container>
        <ul className="flex items-center justify-around py-2">
          {navLinks.map((link) => (
            <li key={link.label} onClick={link.onclick}>
              <Link
                to={link.linkTo}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className={`grid place-items-center p-1.5 rounded-full transition-all duration-200 hover:bg-bg hover:text-primary-dark ${
                    currentPath.pathname === link.linkTo
                      ? "bg-bg text-primary-dark"
                      : ""
                  } ${
                    link.label === "Search" && isSearchOpen
                      ? "bg-bg text-primary-dark -rotate-45"
                      : ""
                  }`}
                  aria-label={`${link.label}'s Icon`}
                  aria-hidden={true}
                >
                  {link.icon}
                </span>
                <h4 className="text-sm">{link.label}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/*============= Mobile Searchbar =============*/}
      <MobileSearch
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    </nav>
  );
}
