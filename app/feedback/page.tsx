"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { DashboardNav } from "@/components/dashboard-nav"
import { useRouter } from "next/navigation"
import { Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function FeedbackPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    didRain: "",
    followedPlan: "",
    notes: "",
  })

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, notes: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        // Redirect after showing success message
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        throw new Error(data.message || "Failed to submit feedback")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 py-12 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-gradient">Provide Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your feedback has been submitted successfully. Redirecting to dashboard...
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>Did it rain as predicted?</Label>
                        <RadioGroup
                          onValueChange={(value) => handleRadioChange("didRain", value)}
                          value={formData.didRain}
                          className="flex space-x-8"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="rain-yes" />
                            <Label htmlFor="rain-yes" className="cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="rain-no" />
                            <Label htmlFor="rain-no" className="cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label>Did you follow the irrigation plan?</Label>
                        <RadioGroup
                          onValueChange={(value) => handleRadioChange("followedPlan", value)}
                          value={formData.followedPlan}
                          className="flex space-x-8"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="plan-yes" />
                            <Label htmlFor="plan-yes" className="cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="plan-no" />
                            <Label htmlFor="plan-no" className="cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={handleTextareaChange}
                          placeholder="Share any additional observations or feedback..."
                          rows={4}
                        />
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || !formData.didRain || !formData.followedPlan}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Feedback"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
