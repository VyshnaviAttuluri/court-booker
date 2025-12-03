import SportCard from "@/components/SportCard";
import Header from "@/components/Header";
import { SPORTS } from "@/lib/constants";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-display text-5xl tracking-wide text-foreground md:text-7xl">
            BOOK YOUR <span className="text-accent">COURT</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Reserve your favorite sports court in seconds. Real-time availability, instant confirmation.
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {SPORTS.map((sport, index) => (
            <SportCard
              key={sport.id}
              {...sport}
              index={index}
            />
          ))}
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Instant Booking",
              description: "Book your slot in just a few clicks",
            },
            {
              icon: "🔄",
              title: "Real-Time Updates",
              description: "See availability update live",
            },
            {
              icon: "📱",
              title: "Mobile Friendly",
              description: "Book from any device, anywhere",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="mb-3 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 font-display text-xl text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
