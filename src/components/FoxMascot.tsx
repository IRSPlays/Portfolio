"use client";

import CypherMascot from "@/components/CypherMascot";
import type { CypherEmotionId } from "@/data/content";

export type FoxMood = "idle" | "happy" | "suspicious" | "sleepy" | CypherEmotionId;

const moodMap: Record<string, CypherEmotionId> = {
  idle: "base",
  happy: "happy",
  suspicious: "uneasy",
  sleepy: "exhausted",
};

export default function FoxMascot({
  mood = "idle",
  size = 300,
  className = "",
}: {
  mood?: FoxMood;
  size?: number;
  className?: string;
}) {
  const emotion: CypherEmotionId = moodMap[mood] ?? (mood as CypherEmotionId) ?? "base";

  return <CypherMascot emotion={emotion} size={size} className={className} />;
}
