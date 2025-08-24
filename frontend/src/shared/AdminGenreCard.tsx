interface Genre {
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface AdminGenreCardProps {
  genre: Genre;
}

export default function AdminGenreCard({ genre }: AdminGenreCardProps) {
  return (
    <article className="inline-flex items-center justify-between gap-2.5 px-3 py-1 bg-primary-light rounded-xs w-full border border-border">
      {/*============= Genre's Name =============*/}
      <h3 className="font-default text-lg truncate">{genre.name}</h3>
    </article>
  );
}
