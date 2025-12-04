import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  sport_name: string;
  court_name: string;
  date: string;
  time_slot: string;
  status: string;
  booked_at: string;
}

const MyBookings = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load your bookings.",
        variant: "destructive",
      });
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  };

  const handleCancel = async (bookingId: string) => {
    setCancellingId(bookingId);
    
    const { error } = await supabase
      .from("bookings")
      .update({ status: "CANCELLED" })
      .eq("id", bookingId)
      .eq("user_id", user?.id);

    if (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: "CANCELLED" } : b)
      );
    }
    
    setCancellingId(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-display text-3xl tracking-wide text-foreground md:text-4xl">
          MY <span className="text-accent">BOOKINGS</span>
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-lg text-muted-foreground">You haven't made any bookings yet.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 rounded-xl bg-accent px-6 py-3 font-medium text-accent-foreground transition-all button-shadow hover:bg-available-hover"
            >
              Book a Court
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      booking.status === "CONFIRMED" 
                        ? "bg-available text-accent-foreground" 
                        : "bg-booked text-booked-text"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-foreground">
                    {booking.court_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {booking.sport_name}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    <span className="text-foreground">
                      {format(new Date(booking.date), "MMMM d, yyyy")}
                    </span>
                    <span className="text-accent">{booking.time_slot}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Booked: {format(new Date(booking.booked_at), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                
                {booking.status === "CONFIRMED" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    disabled={cancellingId === booking.id}
                    className="rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
                  >
                    {cancellingId === booking.id ? "Cancelling..." : "Cancel Booking"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;
