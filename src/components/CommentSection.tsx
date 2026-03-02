import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getComments, addComment, isAdminLoggedIn } from "@/lib/store";
import { MessageCircle, Send } from "lucide-react";

interface CommentSectionProps {
  episodeId: string;
}

const CommentSection = ({ episodeId }: CommentSectionProps) => {
  const [comments, setComments] = useState(getComments(episodeId));
  const [name, setName] = useState(isAdminLoggedIn() ? "Admin" : "");
  const [text, setText] = useState("");
  const isAdmin = isAdminLoggedIn();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment = addComment({
      episodeId,
      name: name.trim(),
      text: text.trim(),
      isAdmin,
    });
    setComments([...comments, newComment]);
    setText("");
    if (!isAdmin) setName("");
  };

  return (
    <div className="mt-8">
      <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-primary" />
        Komentar ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="glass rounded-lg p-4 mb-6 space-y-3">
        {!isAdmin && (
          <input
            type="text"
            placeholder="Nama kamu..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            maxLength={50}
            required
          />
        )}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tulis komentar..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-muted/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            maxLength={500}
            required
          />
          <button
            type="submit"
            className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm font-semibold ${comment.isAdmin ? "text-gradient" : "text-foreground"}`}>
                  {comment.name}
                </span>
                {comment.isAdmin && (
                  <span className="text-[10px] bg-gradient-primary text-primary-foreground px-2 py-0.5 rounded-full font-display">
                    ADMIN
                  </span>
                )}
                <span className="text-xs text-muted-foreground ml-auto">
                  {new Date(comment.createdAt).toLocaleDateString("id-ID")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{comment.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">Belum ada komentar. Jadilah yang pertama!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
