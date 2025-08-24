import Hero from "../components/Hero";
import Genres from "../components/Genres";
import FeaturedBooks from "../components/FeaturedBooks";
import NewBooks from "../components/NewBooks";

export default function Home() {
  return (
    <>
      <Hero />
      <Genres />
      <FeaturedBooks />
      <NewBooks />
    </>
  );
}
