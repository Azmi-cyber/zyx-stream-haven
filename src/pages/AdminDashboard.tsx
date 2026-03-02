import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  isAdminLoggedIn, getAnimeList, addAnime, deleteAnime,
  getEpisodes, addEpisode, deleteEpisode, type Anime
} from "@/lib/store";
import Navbar from "@/components/Navbar";
import { Plus, Trash2, Film, Upload, Eye } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [showAddAnime, setShowAddAnime] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<string | null>(null);
  const [animeName, setAnimeName] = useState("");
  const [animeDesc, setAnimeDesc] = useState("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [epName, setEpName] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isAdminLoggedIn()) { navigate("/admin"); return; }
    setAnimeList(getAnimeList());
  }, [navigate]);

  const handleAddAnime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!posterFile) return;
    const posterUrl = URL.createObjectURL(posterFile);
    addAnime({ name: animeName, description: animeDesc, posterUrl });
    setAnimeList(getAnimeList());
    setAnimeName("");
    setAnimeDesc("");
    setPosterFile(null);
    setShowAddAnime(false);
  };

  const handleDeleteAnime = (id: string) => {
    deleteAnime(id);
    setAnimeList(getAnimeList());
    if (selectedAnime === id) setSelectedAnime(null);
  };

  const handleAddEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !selectedAnime) return;
    const videoUrl = URL.createObjectURL(videoFile);
    addEpisode({ animeId: selectedAnime, name: epName, videoUrl });
    setEpName("");
    setVideoFile(null);
    // Force re-render
    setSelectedAnime((prev) => prev);
  };

  const handleDeleteEpisode = (epId: string) => {
    deleteEpisode(epId);
    setSelectedAnime((prev) => prev);
  };

  const selectedEpisodes = selectedAnime ? getEpisodes(selectedAnime) : [];
  const selectedAnimeData = animeList.find((a) => a.id === selectedAnime);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-gradient mb-6">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Anime List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-sm font-semibold text-foreground">Daftar Anime</h2>
              <button
                onClick={() => setShowAddAnime(!showAddAnime)}
                className="bg-gradient-primary text-primary-foreground text-xs font-display font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Tambah Anime
              </button>
            </div>

            <AnimatePresence>
              {showAddAnime && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddAnime}
                  className="glass rounded-lg p-4 mb-4 space-y-3 overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Nama Anime"
                    value={animeName}
                    onChange={(e) => setAnimeName(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    required
                  />
                  <textarea
                    placeholder="Deskripsi"
                    value={animeDesc}
                    onChange={(e) => setAnimeDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
                    required
                  />
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Poster (dari PC)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-muted-foreground file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-muted file:text-foreground file:cursor-pointer"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-gradient-primary text-primary-foreground text-sm font-display font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" /> Buat Anime
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              {animeList.map((anime) => (
                <motion.div
                  key={anime.id}
                  layout
                  className={`glass rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all ${
                    selectedAnime === anime.id ? "border-primary/50 glow-primary" : "glass-hover"
                  }`}
                  onClick={() => setSelectedAnime(anime.id)}
                >
                  <img src={anime.posterUrl} alt={anime.name} className="w-12 h-16 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{anime.name}</p>
                    <p className="text-xs text-muted-foreground">{getEpisodes(anime.id).length} episode</p>
                  </div>
                  <div className="flex gap-1">
                    <Link to={`/anime/${anime.id}`} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                      <Eye className="w-4 h-4 text-primary" />
                    </Link>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteAnime(anime.id); }} className="p-1.5 rounded-md hover:bg-destructive/20 transition-colors">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </motion.div>
              ))}
              {animeList.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">Belum ada anime</p>
              )}
            </div>
          </div>

          {/* Episodes Panel */}
          <div>
            {selectedAnime && selectedAnimeData ? (
              <>
                <h2 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Film className="w-4 h-4 text-primary" />
                  Episode — {selectedAnimeData.name}
                </h2>

                <form onSubmit={handleAddEpisode} className="glass rounded-lg p-4 mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Nama Episode (contoh: Episode 1)"
                    value={epName}
                    onChange={(e) => setEpName(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    required
                  />
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">File Video (dari PC)</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-muted-foreground file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-muted file:text-foreground file:cursor-pointer"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-gradient-primary text-primary-foreground text-sm font-display font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Tambah Episode
                  </button>
                </form>

                <div className="space-y-2">
                  {selectedEpisodes.map((ep) => (
                    <div key={ep.id} className="glass rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Film className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-foreground">{ep.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <Link to={`/watch/${ep.id}`} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Eye className="w-4 h-4 text-primary" />
                        </Link>
                        <button onClick={() => handleDeleteEpisode(ep.id)} className="p-1.5 rounded-md hover:bg-destructive/20 transition-colors">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {selectedEpisodes.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">Belum ada episode</p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">Pilih anime untuk mengelola episode</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
