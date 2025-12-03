import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import CourtCard from "@/components/CourtCard";
import { SPORTS, COURTS } from "@/lib/constants";

const CourtSelection = () => {
  const { sport } = useParams<{ sport: string }>();

  const sportData = SPORTS.find((s) => s.id === sport);
  const courts = sport ? COURTS[sport] : null;

  if (!sportData || !courts) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 text-5xl">{sportData.icon}</div>
          <h1 className="mb-2 font-display text-4xl tracking-wide text-foreground md:text-5xl">
            {sportData.name.toUpperCase()} <span className="text-accent">COURTS</span>
          </h1>
          <p className="text-muted-foreground">Select a court to view available time slots</p>
        </div>

        {/* Courts Grid */}
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {courts.map((court, index) => (
            <CourtCard
              key={court.id}
              sport={sport!}
              courtId={court.id}
              name={court.name}
              description={court.description}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourtSelection;
