import { NextResponse } from "next/server"

// Mock data for the forecast API
export async function GET() {
  // Simulate API processing delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return mock forecast data
  return NextResponse.json({
    bestTime: "April 15, 2024",
    confidence: 85,
    rainForecast: [
      { date: "Apr 12", chance: 85, amount: 12 },
      { date: "Apr 13", chance: 60, amount: 8 },
      { date: "Apr 14", chance: 30, amount: 3 },
      { date: "Apr 15", chance: 10, amount: 0 },
      { date: "Apr 16", chance: 5, amount: 0 },
      { date: "Apr 17", chance: 40, amount: 5 },
      { date: "Apr 18", chance: 70, amount: 10 },
    ],
    irrigationSchedule: [
      { day: "Monday", duration: "45 min", amount: 8 },
      { day: "Wednesday", duration: "30 min", amount: 5 },
      { day: "Friday", duration: "60 min", amount: 10 },
    ],
  })
}
