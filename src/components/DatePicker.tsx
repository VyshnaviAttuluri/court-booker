import { format, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DatePicker = ({ selectedDate, onDateSelect }: DatePickerProps) => {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {dates.map((date, index) => {
        const isSelected = isSameDay(date, selectedDate);
        const isToday = isSameDay(date, today);

        return (
          <button
            key={date.toISOString()}
            onClick={() => onDateSelect(date)}
            className={cn(
              "flex min-w-[72px] flex-col items-center rounded-xl px-4 py-3 transition-all duration-200",
              "opacity-0 animate-fade-in-up",
              isSelected
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-foreground hover:bg-secondary card-shadow"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-xs font-medium uppercase opacity-70">
              {isToday ? "Today" : format(date, "EEE")}
            </span>
            <span className="mt-1 font-display text-2xl">
              {format(date, "d")}
            </span>
            <span className="text-xs opacity-70">{format(date, "MMM")}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DatePicker;
