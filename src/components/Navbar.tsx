import { Link } from "react-router-dom";
import { isAdminLoggedIn, logoutAdmin } from "@/lib/store";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const isAdmin = isAdminLoggedIn();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Zyx-Nime" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform" />
          <span className="font-display text-xl font-bold text-gradient">Zyx-Nime</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          {isAdmin && (
            <>
              <Link to="/admin/dashboard" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Dashboard
              </Link>
              <button
                onClick={() => { logoutAdmin(); window.location.href = "/"; }}
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
