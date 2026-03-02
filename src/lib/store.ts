export interface Anime {
  id: string;
  name: string;
  description: string;
  posterUrl: string;
  createdAt: number;
}

export interface Episode {
  id: string;
  animeId: string;
  name: string;
  videoUrl: string;
  createdAt: number;
}

export interface Comment {
  id: string;
  episodeId: string;
  name: string;
  text: string;
  isAdmin: boolean;
  createdAt: number;
}

const ANIME_KEY = "zyxnime_anime";
const EPISODES_KEY = "zyxnime_episodes";
const COMMENTS_KEY = "zyxnime_comments";
const ADMIN_KEY = "zyxnime_admin";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Anime
export function getAnimeList(): Anime[] {
  const data = localStorage.getItem(ANIME_KEY);
  return data ? JSON.parse(data) : [];
}

export function getAnime(id: string): Anime | undefined {
  return getAnimeList().find((a) => a.id === id);
}

export function addAnime(anime: Omit<Anime, "id" | "createdAt">): Anime {
  const list = getAnimeList();
  const newAnime: Anime = { ...anime, id: generateId(), createdAt: Date.now() };
  list.push(newAnime);
  localStorage.setItem(ANIME_KEY, JSON.stringify(list));
  return newAnime;
}

export function deleteAnime(id: string): void {
  const list = getAnimeList().filter((a) => a.id !== id);
  localStorage.setItem(ANIME_KEY, JSON.stringify(list));
  // Also delete episodes and comments
  const episodes = getEpisodes(id);
  episodes.forEach((ep) => deleteEpisode(ep.id));
}

// Episodes
export function getAllEpisodes(): Episode[] {
  const data = localStorage.getItem(EPISODES_KEY);
  return data ? JSON.parse(data) : [];
}

export function getEpisodes(animeId: string): Episode[] {
  return getAllEpisodes().filter((e) => e.animeId === animeId);
}

export function addEpisode(episode: Omit<Episode, "id" | "createdAt">): Episode {
  const list = getAllEpisodes();
  const newEp: Episode = { ...episode, id: generateId(), createdAt: Date.now() };
  list.push(newEp);
  localStorage.setItem(EPISODES_KEY, JSON.stringify(list));
  return newEp;
}

export function deleteEpisode(id: string): void {
  const list = getAllEpisodes().filter((e) => e.id !== id);
  localStorage.setItem(EPISODES_KEY, JSON.stringify(list));
  const comments = getAllComments().filter((c) => c.episodeId !== id);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

// Comments
export function getAllComments(): Comment[] {
  const data = localStorage.getItem(COMMENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getComments(episodeId: string): Comment[] {
  return getAllComments().filter((c) => c.episodeId === episodeId);
}

export function addComment(comment: Omit<Comment, "id" | "createdAt">): Comment {
  const list = getAllComments();
  const newComment: Comment = { ...comment, id: generateId(), createdAt: Date.now() };
  list.push(newComment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(list));
  return newComment;
}

// Admin
export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_KEY) === "true";
}

export function loginAdmin(): void {
  localStorage.setItem(ADMIN_KEY, "true");
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_KEY);
}

// Blob URL store (session-only for uploaded files)
const blobStore = new Map<string, string>();

export function storeBlobUrl(key: string, file: File): string {
  const url = URL.createObjectURL(file);
  blobStore.set(key, url);
  return url;
}

export function getBlobUrl(key: string): string | undefined {
  return blobStore.get(key);
}
