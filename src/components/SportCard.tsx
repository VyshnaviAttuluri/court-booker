import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SportCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  gradient: string;
  index: number;
}

const SportCard = ({ id, name, icon, description, gradient, index }: SportCardProps) => {
  return (
    <Link
      to={`/book/${id}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card p-8 transition-all duration-300",
        "card-shadow hover:card-shadow-hover hover:-translate-y-2",
        "opacity-0 animate-fade-in-up",
        index === 0 && "stagger-1",
        index === 1 && "stagger-2",
        index === 2 && "stagger-3"
      )}
    >
      {/* Gradient overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10",
          gradient
        )}
      />

      {/* Icon */}
      <div className="mb-6 text-6xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Content */}
      <h3 className="mb-2 font-display text-3xl text-foreground">{name} Court</h3>
      <p className="text-muted-foreground">{description}</p>

      {/* Arrow indicator */}
      <div className="mt-6 flex items-center gap-2 text-accent transition-all duration-300 group-hover:gap-3">
        <span className="font-medium">Book Now</span>
        <svg
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
};

export default SportCard;
