import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [userQuery, setUserQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (!userQuery.trim().toLowerCase()) return;
      navigate(`/books/search?q=${encodeURIComponent(userQuery.trim())}`);
      setUserQuery("");
    } catch (error) {
      if (error instanceof Error) {
        console.error("There was an error while searching books.");
        throw error;
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="hidden sm:flex relative group">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="What are you reading today?"
            inputMode="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            className="relative lg:w-[300px] xl:w-[350px] rounded-md outline-0 bg-bg px-2 pr-9 py-1"
          />
          <Search
            className="absolute top-1/2 right-2 -translate-y-1/2 text-primary-dark"
            aria-label="Search"
            aria-hidden={true}
          />
        </div>
        <div className="absolute rounded-md inset-0 -z-10 transition-transform duration-300 ease-in-out bg-primary translate-1 group-hover:translate-0"></div>
      </div>
    </form>
  );
}
