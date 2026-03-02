import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAnimeList } from "@/lib/store";
import AnimeCard from "@/components/AnimeCard";
import Navbar from "@/components/Navbar";
import logo from "@/assets/logo.png";
import { Search, Play } from "lucide-react";

const Index = () => {
  const [animeList, setAnimeList] = useState(getAnimeList());
  const [search, setSearch] = useState("");

  useEffect(() => {
    setAnimeList(getAnimeList());
  }, []);

  const filtered = animeList.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={logo} alt="Zyx-Nime" className="w-24 h-24 mx-auto mb-6 animate-float" />
            <h1 className="font-display text-4xl md:text-6xl font-black text-gradient mb-4">
              Zyx-Nime
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-2">
              Nonton anime favorit kamu secara gratis!
            </p>
            <div className="flex items-center gap-1 justify-center text-sm text-primary/70">
              <Play className="w-3 h-3" />
              <span>100% Free Streaming</span>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari anime..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-primary transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anime Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((anime, i) => (
              <AnimeCard key={anime.id} anime={anime} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              {search ? "Anime tidak ditemukan" : "Belum ada anime. Stay tuned!"}
            </p>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 <span className="text-gradient font-display font-semibold">Zyx-Nime</span>. All rights reserved. 100% Free.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
