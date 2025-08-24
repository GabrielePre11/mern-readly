import { Autoplay, Pagination } from "swiper/modules";
import Container from "../layout/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import NewBookCard from "../shared/NewBookCard";
import NewBookCardSkeleton from "../shared/NewBookCardSkeleton";

export default function NewBooks() {
  const { newBooks, getNewBooks, loadingState } = useBookStore();

  useEffect(() => {
    getNewBooks({ page: 1, limit: 30, sort: "newest" });
  }, [getNewBooks]);

  return (
    <section className="pt-20 lg:pt-24" aria-label="New Books Section">
      <Container>
        {/*============= Title =============*/}
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold">
          New Books
        </h2>

        {/*============= New Books =============*/}
        <Swiper
          loop={newBooks?.length! >= 4}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mt-8"
        >
          {loadingState
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <SwiperSlide key={index}>
                    <NewBookCardSkeleton />
                  </SwiperSlide>
                ))
            : newBooks?.map((book) => (
                <SwiperSlide key={book._id}>
                  <NewBookCard book={book} />
                </SwiperSlide>
              ))}
        </Swiper>

        {/*============= New Books (Reverse) =============*/}
        <Swiper
          loop={newBooks?.length! >= 4}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            reverseDirection: true,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mt-8"
        >
          {loadingState
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <SwiperSlide key={index}>
                    <NewBookCardSkeleton />
                  </SwiperSlide>
                ))
            : newBooks?.map((book) => (
                <SwiperSlide key={book._id}>
                  <NewBookCard book={book} />
                </SwiperSlide>
              ))}
        </Swiper>
      </Container>
    </section>
  );
}
