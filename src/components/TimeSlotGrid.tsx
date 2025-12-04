import { cn } from "@/lib/utils";
import { TIME_SLOTS } from "@/lib/constants";

interface TimeSlotGridProps {
  bookedSlots: string[];
  selectedSlot: string | null;
  onSlotSelect: (slot: string) => void;
  isLoading: boolean;
}

const TimeSlotGrid = ({ bookedSlots, selectedSlot, onSlotSelect, isLoading }: TimeSlotGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TIME_SLOTS.map((slot) => (
          <div
            key={slot}
            className="h-20 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {TIME_SLOTS.map((slot, index) => {
        const isBooked = bookedSlots.includes(slot);
        const isSelected = selectedSlot === slot;

        return (
          <button
            key={slot}
            onClick={() => !isBooked && onSlotSelect(slot)}
            disabled={isBooked}
            className={cn(
              "relative rounded-lg px-4 py-5 text-sm font-medium transition-all duration-200",
              "opacity-0 animate-scale-in",
              isBooked
                ? "cursor-not-allowed bg-booked text-booked-text"
                : isSelected
                ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-background button-shadow"
                : "bg-available text-accent-foreground hover:bg-available-hover button-shadow hover:scale-105"
            )}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <span className="block font-display text-base">{slot}</span>
            {isBooked && (
              <span className="mt-1 block text-xs opacity-70">Booked</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TimeSlotGrid;
