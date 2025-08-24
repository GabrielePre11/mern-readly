import { Library, Tags, Users, UserStar } from "lucide-react";
import { useEffect } from "react";
import { useGenreStore } from "../store/genreStore";
import { useBookStore } from "../store/bookStore";
import { useAuthStore } from "../store/authStore";

export default function DashBoxes() {
  const { getTotalUsers, getTotalAdmins, totalUsers, totalAdmins } =
    useAuthStore();
  const { totalBooks, getAllBooks } = useBookStore();
  const { genres, getGenres } = useGenreStore();

  const boxes = [
    {
      title: "Books",
      icon: <Library />,
      count: totalBooks ?? 0,
      color: "#c1121f",
    },

    {
      title: "Genres",
      icon: <Tags />,
      count: genres?.length ?? 0,
      color: "#003049",
    },

    {
      title: "Users",
      icon: <Users />,
      count: totalUsers ?? 0,
      color: "#3a5a40",
    },

    {
      title: "Admins",
      icon: <UserStar />,
      count: totalAdmins ?? 0,
      color: "#fca311",
    },
  ];

  useEffect(() => {
    getAllBooks();
    getGenres();
    getTotalUsers();
    getTotalAdmins();
  }, [getAllBooks, getGenres, getTotalUsers, getTotalAdmins]);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-3 mt-6">
      {boxes.map((box) => (
        <li
          key={box.title}
          style={{ backgroundColor: box.color }}
          className="flex flex-col gap-2 p-5 lg:p-10 text-2xl lg:text-3xl text-primary-light font-semibold rounded-sm shadow-sm shadow-zinc-500"
        >
          <span className="grid place-items-center w-max rounded-sm">
            {box.icon}
          </span>
          <div className="flex items-center justify-between">
            <h3>{box.title}</h3>
            <span>{box.count}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
