export default function NewBookCardSkeleton() {
  return (
    <article className="relative flex items-center gap-5 justify-between bg-zinc-200 rounded-xs border border-zinc-300 p-4.5 lg:p-6 group shadow-lg shadow-black/40 min-h-[200px] max-h-[200px] animate-pulse">
      <div className="flex content-center w-24 h-36 bg-zinc-400"></div>

      <div className="flex flex-col items-center gap-3">
        <span className="w-[180px] h-8 bg-zinc-500"></span>

        <span className="w-[130px] h-8 bg-zinc-400"></span>
      </div>

      {/*============= Add To Wishlist =============*/}
      <span className="absolute top-2.5 right-3 bg-zinc-400 size-9"></span>
    </article>
  );
}
