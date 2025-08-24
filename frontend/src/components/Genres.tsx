import { useEffect, useRef } from "react";
import Container from "../layout/Container";
import { useGenreStore } from "../store/genreStore";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

import adventureImage from "../assets/genres/adventure.jpg";
import biographyImage from "../assets/genres/biography.jpg";
import childrenImage from "../assets/genres/children.avif";
import comicsImage from "../assets/genres/comics.jpg";
import dramaImage from "../assets/genres/drama.jpg";
import fantasyImage from "../assets/genres/fantasy.webp";
import historicalFictionImage from "../assets/genres/historical-fiction.jpg";
import horrorImage from "../assets/genres/horror.jpg";
import mysteryImage from "../assets/genres/mystery.jpg";
import philosophyImage from "../assets/genres/philosophy.jpg";
import poetryImage from "../assets/genres/poetry.jpg";
import romanceImage from "../assets/genres/romance.jpg";
import sciFiImage from "../assets/genres/sci-fi.jpg";
import thrillerImage from "../assets/genres/thriller.jpg";
import youngAdultImage from "../assets/genres/young-adult.webp";
import { Link } from "react-router-dom";

export const genreImageMap: Record<string, string> = {
  adventure: adventureImage,
  biography: biographyImage,
  children: childrenImage,
  comics: comicsImage,
  drama: dramaImage,
  fantasy: fantasyImage,
  "historical-fiction": historicalFictionImage,
  horror: horrorImage,
  mystery: mysteryImage,
  philosophy: philosophyImage,
  poetry: poetryImage,
  romance: romanceImage,
  "science-fiction": sciFiImage,
  thriller: thrillerImage,
  "young-adult": youngAdultImage,
};

export default function Genres() {
  const { getGenres, genres } = useGenreStore();
  const genresScrollRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    genresScrollRef.current?.scrollBy({ left: -210, behavior: "smooth" });
  };

  const scrollRight = () => {
    genresScrollRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  };

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  return (
    <section className="pt-24 overflow-hidden" aria-label="Genres Section">
      <Container>
        <div className="flex items-center justify-between">
          {/*============= Title =============*/}
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold">
            Explore Our Genres
          </h2>

          {/*============= Arrows =============*/}
          <div className="flex items-center gap-2">
            <button className="grid place-items-center p-1 bg-primary-dark text-bg rounded-full cursor-pointer transition-all duration-200 hover:bg-primary-dark/90 hover:scale-105">
              <ArrowBigLeft
                className="size-7 lg:size-8"
                aria-label="Scroll to left"
                onClick={scrollLeft}
              />
            </button>

            <button className="grid place-items-center p-1 bg-primary-dark text-bg rounded-full cursor-pointer transition-all duration-200 hover:bg-primary-dark/90 hover:scale-105">
              <ArrowBigRight
                className="size-7 lg:size-8"
                aria-label="Scroll to right"
                onClick={scrollRight}
              />
            </button>
          </div>
        </div>

        {/*============= Genres =============*/}
        <ul
          className="flex items-center mt-6 md:mt-8 lg:mt-12 overflow-x-auto space-x-20 xl:space-x-28 scrollbar-hidden"
          ref={genresScrollRef}
        >
          {genres?.map((genre) => (
            <li
              key={genre.slug}
              className="grid place-items-center gap-3 min-w-[150px]"
            >
              <Link to={`/genres/${genre.slug}`}>
                {/*============= Genre Image =============*/}
                <figure className="size-50 lg:size-52 xl:size-56 rounded-full overflow-hidden border border-border cursor-pointer">
                  <img
                    src={genreImageMap[genre.slug]}
                    alt={`${genre.name}'s Image`}
                    className="size-full object-cover object-center transition-transform duration-300 hover:scale-105 hover:brightness-105"
                  />
                </figure>
              </Link>

              {/*============= Genre Name =============*/}
              <h3 className="text-2xl">{genre.name}</h3>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
