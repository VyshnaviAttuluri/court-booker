import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Header from "@/components/Header";
import DatePicker from "@/components/DatePicker";
import TimeSlotGrid from "@/components/TimeSlotGrid";
import { SPORTS, COURTS } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const TimeSlotSelection = () => {
  const { sport, courtId } = useParams<{ sport: string; courtId: string }>();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  const sportData = SPORTS.find((s) => s.id === sport);
  const courts = sport ? COURTS[sport] : null;
  const courtData = courts?.find((c) => c.id === courtId);

  // Fetch booked slots (only CONFIRMED)
  const fetchBookedSlots = async () => {
    if (!sport || !courtId) return;

    setIsLoading(true);
    const dateStr = format(selectedDate, "yyyy-MM-dd");

    const { data, error } = await supabase
      .from("bookings")
      .select("time_slot")
      .eq("sport_name", sportData?.name)
      .eq("court_name", courtData?.name)
      .eq("date", dateStr)
      .eq("status", "CONFIRMED");

    if (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load availability. Please try again.",
        variant: "destructive",
      });
    } else {
      setBookedSlots(data?.map((b) => b.time_slot) || []);
    }
    setIsLoading(false);
  };

  // Subscribe to real-time updates
  useEffect(() => {
    if (!sportData || !courtData) return;

    const channel = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        (payload) => {
          // Refetch on any change to handle both inserts and cancellations
          fetchBookedSlots();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sportData, courtData, selectedDate]);

  useEffect(() => {
    fetchBookedSlots();
    setSelectedSlot(null);
  }, [selectedDate, sport, courtId]);

  const handleBooking = async () => {
    if (!selectedSlot || !sportData || !courtData) return;

    // Require authentication
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book a court.",
      });
      navigate("/auth");
      return;
    }

    setIsBooking(true);
    const dateStr = format(selectedDate, "yyyy-MM-dd");

    const { error } = await supabase.from("bookings").insert({
      sport_name: sportData.name,
      court_name: courtData.name,
      date: dateStr,
      time_slot: selectedSlot,
      user_id: user.id,
      status: "CONFIRMED",
    });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Slot Already Booked",
          description: "This time slot was just booked by someone else. Please select another.",
          variant: "destructive",
        });
        fetchBookedSlots();
      } else {
        console.error("Booking error:", error);
        toast({
          title: "Booking Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Booking Confirmed!",
        description: `${courtData.name} booked for ${selectedSlot} on ${format(selectedDate, "MMMM d, yyyy")}`,
      });
      setSelectedSlot(null);
    }

    setIsBooking(false);
  };

  if (!sportData || !courtData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{sportData.icon}</span>
            <span>{sportData.name}</span>
            <span>→</span>
            <span className="text-foreground">{courtData.name}</span>
          </div>
          <h1 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
            SELECT <span className="text-accent">DATE & TIME</span>
          </h1>
        </div>

        {/* Login prompt for unauthenticated users */}
        {!authLoading && !user && (
          <div className="mb-6 rounded-lg border border-accent/50 bg-accent/10 p-4">
            <p className="text-sm text-foreground">
              <span className="font-medium">Note:</span> You'll need to{" "}
              <button 
                onClick={() => navigate("/auth")} 
                className="font-medium text-accent underline hover:no-underline"
              >
                login or sign up
              </button>{" "}
              to complete your booking.
            </p>
          </div>
        )}

        {/* Date Picker */}
        <div className="mb-8">
          <h2 className="mb-4 font-medium text-foreground">Select Date</h2>
          <DatePicker selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </div>

        {/* Time Slots */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-foreground">Available Time Slots</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-available" />
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-booked" />
                <span className="text-muted-foreground">Booked</span>
              </div>
            </div>
          </div>
          <TimeSlotGrid
            bookedSlots={bookedSlots}
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
            isLoading={isLoading}
          />
        </div>

        {/* Booking Button */}
        {selectedSlot && (
          <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 p-4 backdrop-blur-lg animate-fade-in-up">
            <div className="container mx-auto flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Selected</p>
                <p className="font-display text-xl text-foreground">
                  {selectedSlot} • {format(selectedDate, "MMM d")}
                </p>
              </div>
              <button
                onClick={handleBooking}
                disabled={isBooking}
                className="rounded-xl bg-accent px-8 py-3 font-medium text-accent-foreground transition-all button-shadow hover:bg-available-hover disabled:opacity-50"
              >
                {isBooking ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TimeSlotSelection;
