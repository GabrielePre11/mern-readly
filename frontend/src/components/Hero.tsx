import Container from "../layout/Container";
import heroBook from "../assets/home-book.jpg";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="pt-28" aria-label="Homepage Section">
      <Container className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] items-center gap-16">
        {/*============= Content =============*/}
        <div className="flex flex-col gap-3 sm:text-center md:text-left">
          {/*============= Subtitle =============*/}
          <p className="uppercase text-sm sm:text-lg lg:text-xl font-semibold text-primary">
            Let's make the best investment
          </p>

          {/*============= Title =============*/}
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Read More And Make Success The Result of Perfection.
          </h3>

          {/*============= Description =============*/}
          <p className="text-muted text-[0.959rem] font-medium sm:text-balance sm:text-lg lg:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            obcaecati temporibus nesciunt eum, dolorem ad.
          </p>

          {/*============= Button =============*/}
          <button className="inline-block items-center rounded-sm px-3 py-2 md:px-4 md:py-3 bg-primary-dark border border-border text-lg sm:text-xl text-primary-light w-max font-secondary mt-2 cursor-pointer transition-colors duration-200 hover:bg-primary-dark/90 sm:place-self-center md:place-self-start">
            <Link to="/books">Explore Books</Link>
          </button>
        </div>

        {/*============= Figure =============*/}
        <figure className="relative rounded-tl-lg rounded-br-lg rounded-tr-4xl rounded-bl-4xl max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] xl:max-w-[350px] place-self-center before:content-[''] before:absolute before:bg-primary before:inset-0 before:-translate-x-6 before:translate-y-6 before:-z-10 before:rounded-lg">
          <img
            src={heroBook}
            alt="Hero Book"
            className="rounded-tl-lg rounded-br-lg rounded-tr-4xl rounded-bl-4xl object-cover object-center"
          />

          {/*============= Play Button =============*/}
          <div
            id="play-btn"
            className="grid absolute top-1/2 left-1/2 -translate-1/2 place-items-center size-28 bg-bg rounded-full border border-border group cursor-pointer"
          >
            <Play className="text-primary-dark size-10 cursor-pointer transform transition-transform duration-200 group-hover:scale-105" />
          </div>
        </figure>
      </Container>
    </section>
  );
}
