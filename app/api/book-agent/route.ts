import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Log the booking data (in a real app, this would be saved to a database)
    console.log("Received booking:", data)

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Agent booked successfully",
      bookingId: `BOOK-${Math.floor(Math.random() * 10000)}`,
    })
  } catch (error) {
    console.error("Error processing booking:", error)
    return NextResponse.json({ success: false, message: "Failed to book agent" }, { status: 500 })
  }
}
