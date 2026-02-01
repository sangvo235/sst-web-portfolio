export const TOPICS = {
  all: "All",
  career: "Career",
  education: "Education",
  "food-drink": "Food & Drink",
  "health-wellness": "Health & Wellness",
  lifestyle: "Lifestyle",
  technology: "Technology",
  travel: "Travel",
  other: "Other",
} as const;

export type TopicKey = keyof typeof TOPICS;
