import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type MobileSearchProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileSearch({
  isSearchOpen,
  setIsSearchOpen,
}: MobileSearchProps) {
  const [userQuery, setUserQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (!userQuery.trim().toLowerCase()) return;
      navigate(`/books/search?q=${encodeURIComponent(userQuery.trim())}`);
      setUserQuery("");
      setIsSearchOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("There was an error while searching books.");
        throw error;
      }
    }
  };

  //============= Close MobileSearch on scroll =============//
  useEffect(() => {
    const closeMobileSearchOnScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50 && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("scroll", closeMobileSearchOnScroll);
    return () =>
      window.removeEventListener("scroll", closeMobileSearchOnScroll);
  }, [isSearchOpen]);

  return (
    <form
      method="dialog"
      className={`fixed md:hidden p-2 transform transition-all duration-300 ${
        isSearchOpen
          ? "-translate-y-36 opacity-100"
          : "translate-y-36 opacity-0 pointer-events-none"
      } w-full bg-primary-dark text-primary-light rounded-t-lg`}
    >
      <div className="flex items-center">
        <input
          type="text"
          inputMode="text"
          placeholder="Search books..."
          className="w-full py-3.5 px-3 outline-0 text-lg"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />

        <span
          className="inline-flex text-primary-dark bg-primary-light rounded-lg px-3 py-1 mr-2 transition-colors duration-200 hover:bg-primary-light/90 cursor-pointer font-medium"
          aria-label="Clean Input Field"
          onClick={() => {
            setUserQuery("");
          }}
        >
          Canc
        </span>
      </div>
    </form>
  );
}
