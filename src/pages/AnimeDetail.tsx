import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAnime, getEpisodes } from "@/lib/store";
import Navbar from "@/components/Navbar";
import { Play, ArrowLeft } from "lucide-react";

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const anime = getAnime(id || "");
  const episodes = getEpisodes(id || "");

  if (!anime) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Anime tidak ditemukan</p>
          <Link to="/" className="text-primary text-sm mt-4 inline-block hover:underline">
            ← Kembali
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={anime.posterUrl} alt={anime.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-20">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 flex-shrink-0"
          >
            <img
              src={anime.posterUrl}
              alt={anime.name}
              className="w-full rounded-lg border border-border/50 glow-primary"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <h1 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-3">
              {anime.name}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {anime.description}
            </p>

            {/* Episodes */}
            <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
              <Play className="w-4 h-4 text-primary" />
              Episode ({episodes.length})
            </h2>

            {episodes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {episodes.map((ep, i) => (
                  <motion.div
                    key={ep.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/watch/${ep.id}`}
                      className="block glass glass-hover rounded-lg p-3 text-center transition-all"
                    >
                      <Play className="w-6 h-6 text-primary mx-auto mb-2" />
                      <span className="text-xs font-medium text-foreground">{ep.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada episode.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
