import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isLoading } = useAuth();
  const isHome = location.pathname === "/";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="font-display text-2xl tracking-wider text-foreground">
            COURTBOOKER
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {!isHome && (
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium",
                "text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">Back to Sports</span>
            </Link>
          )}

          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link
                    to="/my-bookings"
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-medium",
                      location.pathname === "/my-bookings"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-all button-shadow hover:bg-available-hover"
                >
                  Login / Sign Up
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;