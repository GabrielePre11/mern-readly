export default function BookCardSkeleton() {
  return (
    <article className="relative flex flex-col bg-zinc-200 rounded-xs items-center gap-2 p-10 border border-zinc-300 group shadow-2xl shadow-black/40 min-h-[400px] animate-pulse">
      <div className="flex content-center w-36 h-56 bg-zinc-400"></div>

      {/*============= Book's Name =============*/}
      <div className="flex flex-col items-center gap-3 mt-auto">
        <span className="w-[200px] h-8 bg-zinc-500"></span>

        <span className="w-[160px] h-8 bg-zinc-400"></span>
      </div>

      {/*============= Add To Wishlist =============*/}
      <span className="absolute top-2.5 right-3 bg-zinc-400 size-10"></span>

      {/*============= Book's Original Language =============*/}
      <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 -rotate-90 bg-zinc-400 w-20 h-8"></span>
    </article>
  );
}
