import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Anime } from "@/lib/store";

interface AnimeCardProps {
  anime: Anime;
  index: number;
}

const AnimeCard = ({ anime, index }: AnimeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/anime/${anime.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg border border-border/50 bg-card transition-all duration-300 group-hover:glow-primary group-hover:border-primary/30">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={anime.posterUrl}
              alt={anime.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2">
              {anime.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {anime.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;
