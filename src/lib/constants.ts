export const SPORTS = [
  {
    id: "cricket",
    name: "Cricket",
    icon: "🏏",
    description: "Play on world-class cricket pitches",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    icon: "🏐",
    description: "Indoor & outdoor volleyball courts",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: "shuttle",
    name: "Shuttle",
    icon: "🏸",
    description: "Professional badminton facilities",
    gradient: "from-blue-500 to-indigo-600",
  },
] as const;

export const COURTS: Record<string, Array<{ id: string; name: string; description: string }>> = {
  cricket: [
    { id: "cricket-a", name: "The Willow Ground", description: "Premium pitch with floodlights" },
    { id: "cricket-b", name: "Boundary Line Arena", description: "Grass pitch with pavilion" },
    { id: "cricket-c", name: "Pitch Perfect", description: "Indoor practice nets" },
  ],
  volleyball: [
    { id: "volleyball-a", name: "Spike Central", description: "Indoor hardwood court" },
    { id: "volleyball-b", name: "Beach Blaze", description: "Sand court outdoor" },
    { id: "volleyball-c", name: "Net Masters", description: "Training court" },
  ],
  shuttle: [
    { id: "shuttle-a", name: "Smash Point", description: "BWF certified court" },
    { id: "shuttle-b", name: "Feather Flight", description: "Wooden flooring" },
    { id: "shuttle-c", name: "Rally Zone", description: "Multi-purpose court" },
  ],
};

// 3-hour time slots covering the full 24-hour day
export const TIME_SLOTS = [
  "00:00 - 03:00",
  "03:00 - 06:00",
  "06:00 - 09:00",
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
  "21:00 - 00:00",
];
