import { ArrowDownWideNarrow, CircleSmall } from "lucide-react";

interface GenreOption {
  _id: string;
  label: string;
}

interface SortOption {
  id: string;
  label: string;
}

type FilterConfiguration =
  | {
      id: "genre";
      title: string;
      type: "checkbox";
      options: GenreOption[];
    }
  | {
      id: "sort";
      title: string;
      type: "radio";
      options: SortOption[];
    };

/*============= Filters Configuration =============*/
const filterConfig: FilterConfiguration[] = [
  {
    id: "genre",
    title: "Genres",
    type: "checkbox",
    options: [
      { _id: "68a240a1bd687d3d0e39a3b5", label: "Adventure" },
      { _id: "68a240a1bd687d3d0e39a3b6", label: "Biography" },
      { _id: "68a240a1bd687d3d0e39a3ba", label: "Children" },
      { _id: "68a240a1bd687d3d0e39a3bb", label: "Comics" },
      { _id: "68a240a1bd687d3d0e39a3b9", label: "Drama" },
      { _id: "68a240a0bd687d3d0e39a3ae", label: "Fantasy" },
      { _id: "68a240a0bd687d3d0e39a3b4", label: "Historical Fiction" },
      { _id: "68a240a0bd687d3d0e39a3b0", label: "Horror" },
      { _id: "68a240a0bd687d3d0e39a3b3", label: "Mystery" },
      { _id: "68a240a1bd687d3d0e39a3bc", label: "Philosophy" },
      { _id: "68a240a1bd687d3d0e39a3b8", label: "Poetry" },
      { _id: "68a240a0bd687d3d0e39a3b2", label: "Romance" },
      { _id: "68a240a0bd687d3d0e39a3af", label: "Science Fiction" },
      { _id: "68a240a0bd687d3d0e39a3b1", label: "Thriller" },
      { _id: "68a240a1bd687d3d0e39a3b7", label: "Young Adult" },
    ],
  },

  {
    id: "sort",
    title: "Sort by",
    type: "radio",
    options: [
      { id: "newest", label: "Newest" },
      { id: "oldest", label: "Oldest" },
      { id: "price-asc", label: "Price: Low to High" },
      { id: "price-desc", label: "Price: High to Low" },
    ],
  },
];

/*============= Filters Interface =============*/
interface Filters {
  genre: string[];
  sort?: "newest" | "oldest" | "price-asc" | "price-desc";
}

/*============= FiltersProps type =============*/
type FiltersProps = {
  filters: Filters;
  onFilterChange: (filterId: "genre" | "sort", optionId: string) => void;
};

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  return (
    <aside
      className="flex flex-col gap-8 md:border-r-2 border-primary-dark pr-5"
      aria-label="Filters"
    >
      {filterConfig.map((filter) => (
        <div key={filter.id} className="flex flex-col gap-1.5 text-lg">
          <div className="flex items-center justify-between">
            {/*============= Filter Title =============*/}
            <h4 className="flex items-center gap-1 text-xl lg:text-2xl font-medium">
              {filter.title}
            </h4>

            {/*============= Filter Icon =============*/}
            <span
              className="grid place-items-center p-1.5 rounded-sm bg-primary-light border border-primary-dark"
              aria-label={
                filter.title === "Genres" ? "Genre Icon" : "Sort by Icon"
              }
              aria-hidden={true}
            >
              {filter.title === "Genres" ? (
                <CircleSmall />
              ) : (
                <ArrowDownWideNarrow />
              )}
            </span>
          </div>

          {/*============= Checkbox (Genre) =============*/}
          {filter.type === "checkbox" &&
            filter.options.map((option) => {
              const inputId = `${filter.id}_${option._id}`;
              return (
                <label
                  key={option._id}
                  htmlFor={inputId}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="checkbox"
                    checked={filters.genre?.includes(option._id)}
                    onChange={() => onFilterChange("genre", option._id)}
                    className="size-4 accent-primary-dark"
                  />
                  {option.label}
                </label>
              );
            })}

          {/*============= Radio (Sort by) =============*/}
          {filter.type === "radio" &&
            filter.options.map((option) => {
              const inputId = `${filter.id}_${option.id}`;
              return (
                <label
                  key={option.id}
                  htmlFor={inputId}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="radio"
                    checked={filters.sort === option.id}
                    onChange={() => onFilterChange("sort", option.id)}
                    className="size-4 accent-primary-dark"
                  />
                  {option.label}
                </label>
              );
            })}
        </div>
      ))}
    </aside>
  );
}
