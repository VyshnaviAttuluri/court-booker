import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CourtCardProps {
  sport: string;
  courtId: string;
  name: string;
  description: string;
  index: number;
}

const CourtCard = ({ sport, courtId, name, description, index }: CourtCardProps) => {
  return (
    <Link
      to={`/book/${sport}/${courtId}`}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card p-6 transition-all duration-300",
        "card-shadow hover:card-shadow-hover hover:-translate-y-1",
        "border border-border/50 hover:border-accent/30",
        "opacity-0 animate-fade-in-up",
        index === 0 && "stagger-1",
        index === 1 && "stagger-2",
        index === 2 && "stagger-3"
      )}
    >
      {/* Court indicator */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>

      {/* Content */}
      <h3 className="mb-1 font-display text-2xl text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>

      {/* Select indicator */}
      <div className="mt-4 flex items-center gap-2 text-sm text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="font-medium">Select Court</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default CourtCard;
