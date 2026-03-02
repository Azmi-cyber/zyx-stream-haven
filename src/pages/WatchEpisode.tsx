import { useParams, Link } from "react-router-dom";
import { getAllEpisodes, getAnime } from "@/lib/store";
import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";
import { ArrowLeft } from "lucide-react";

const WatchEpisode = () => {
  const { id } = useParams<{ id: string }>();
  const episodes = getAllEpisodes();
  const episode = episodes.find((e) => e.id === id);
  const anime = episode ? getAnime(episode.animeId) : undefined;

  if (!episode) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Episode tidak ditemukan</p>
          <Link to="/" className="text-primary text-sm mt-4 inline-block hover:underline">← Kembali</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Link
          to={`/anime/${episode.animeId}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke {anime?.name}
        </Link>

        <h1 className="font-display text-xl font-bold text-gradient mb-4">
          {anime?.name} — {episode.name}
        </h1>

        {/* Video Player */}
        <div className="rounded-lg overflow-hidden border border-border/50 glow-primary bg-card">
          <video
            src={episode.videoUrl}
            controls
            className="w-full aspect-video bg-background"
            controlsList="nodownload"
          >
            Browser kamu tidak mendukung video.
          </video>
        </div>

        {/* Comments */}
        <CommentSection episodeId={episode.id} />
      </div>
    </div>
  );
};

export default WatchEpisode;
