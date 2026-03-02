import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginAdmin, isAdminLoggedIn } from "@/lib/store";
import logo from "@/assets/logo.png";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

type Step = "verify1" | "verify2" | "login";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("verify1");
  const [answer, setAnswer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdminLoggedIn()) {
    navigate("/admin/dashboard");
    return null;
  }

  const handleVerify1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() === "2026") {
      setStep("verify2");
      setAnswer("");
      setError("");
    } else {
      setError("Jawaban salah!");
    }
  };

  const handleVerify2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === "azmisuriadi@gmail.com") {
      setStep("login");
      setAnswer("");
      setError("");
    } else {
      setError("Jawaban salah!");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "200714") {
      loginAdmin();
      navigate("/admin/dashboard");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* BG Effects */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/40 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 w-full max-w-sm relative z-10 glow-primary"
      >
        <div className="text-center mb-6">
          <img src={logo} alt="Zyx-Nime" className="w-16 h-16 mx-auto mb-3" />
          <h1 className="font-display text-xl font-bold text-gradient">Admin Panel</h1>
          <div className="flex items-center justify-center gap-1 mt-1">
            <ShieldCheck className="w-3 h-3 text-primary" />
            <span className="text-xs text-muted-foreground">Verifikasi Keamanan</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "verify1" && (
            <motion.form key="v1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleVerify1} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Pertanyaan 1/2</label>
                <p className="text-sm font-medium text-foreground mb-3">Kapan Zyx-Nime dibuat?</p>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => { setAnswer(e.target.value); setError(""); }}
                  placeholder="Jawaban..."
                  className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground font-display text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Lanjut <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}

          {step === "verify2" && (
            <motion.form key="v2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleVerify2} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Pertanyaan 2/2</label>
                <p className="text-sm font-medium text-foreground mb-3">Apa gmail Zyx-Nime?</p>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => { setAnswer(e.target.value); setError(""); }}
                  placeholder="Jawaban..."
                  className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground font-display text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Lanjut <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}

          {step === "login" && (
            <motion.form key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); }}
                  className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button type="submit" className="w-full bg-gradient-primary text-primary-foreground font-display text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Masuk
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
