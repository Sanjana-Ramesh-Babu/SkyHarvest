import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Log the feedback data (in a real app, this would be saved to a database)
    console.log("Received feedback:", data)

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
    })
  } catch (error) {
    console.error("Error processing feedback:", error)
    return NextResponse.json({ success: false, message: "Failed to submit feedback" }, { status: 500 })
  }
}
