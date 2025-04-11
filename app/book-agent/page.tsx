"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DashboardNav } from "@/components/dashboard-nav"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, Loader2, MapPin } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data
const agents = [
  {
    id: "john",
    name: "John Smith",
    region: "Northern Region",
    availability: "Mon-Fri",
    specialties: ["Cloud Seeding", "Weather Monitoring"],
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "sarah",
    name: "Sarah Johnson",
    region: "Southern Region",
    availability: "Wed-Sun",
    specialties: ["Irrigation Systems", "Soil Analysis"],
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mike",
    name: "Mike Wilson",
    region: "Eastern Region",
    availability: "Tue-Sat",
    specialties: ["Crop Management", "Pest Control"],
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function BookAgentPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isBooking, setIsBooking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)

  const handleBook = async () => {
    if (!selectedAgent || !date) return

    setIsBooking(true)

    try {
      const agent = agents.find((a) => a.id === selectedAgent)

      const response = await fetch("/api/book-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentId: selectedAgent,
          agentName: agent?.name,
          date: date.toISOString(),
          region: agent?.region,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setBookingId(data.bookingId)
        setIsSuccess(true)

        // Reset after showing success message
        setTimeout(() => {
          setIsSuccess(false)
          setIsDialogOpen(false)
          setSelectedAgent(null)
          setDate(undefined)
          setBookingId(null)
        }, 3000)
      } else {
        throw new Error(data.message || "Failed to book agent")
      }
    } catch (error) {
      console.error("Error booking agent:", error)
      toast({
        title: "Error",
        description: "Failed to book agent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 py-8 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <motion.h1
              className="text-3xl font-bold mb-2 text-gradient"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Available Cloud-Seeding Agents
            </motion.h1>
            <motion.div
              className="h-1 w-20 bg-primary mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {agents.map((agent) => (
              <motion.div key={agent.id} variants={item}>
                <Card className="h-full border-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      ★ {agent.rating}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                        <img
                          src={agent.image || "/placeholder.svg"}
                          alt={agent.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{agent.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {agent.region}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="text-sm mb-3">
                      <span className="font-medium">Available:</span> {agent.availability}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="font-normal">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Dialog
                      open={isDialogOpen && selectedAgent === agent.id}
                      onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) setSelectedAgent(null)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button className="w-full" onClick={() => setSelectedAgent(agent.id)}>
                          Book Consultation
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        {isSuccess ? (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center justify-center py-8 text-center"
                          >
                            <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
                            <p className="text-muted-foreground mb-2">
                              Your appointment with {agent.name} has been scheduled.
                            </p>
                            {bookingId && (
                              <p className="text-sm font-medium bg-muted px-3 py-1 rounded-full">
                                Booking ID: {bookingId}
                              </p>
                            )}
                          </motion.div>
                        ) : (
                          <>
                            <DialogHeader>
                              <DialogTitle>Book a Consultation</DialogTitle>
                              <DialogDescription>
                                Select a date to schedule your consultation with {agent.name}.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="flex items-center gap-4 py-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                                <img
                                  src={agent.image || "/placeholder.svg"}
                                  alt={agent.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{agent.name}</div>
                                <div className="text-sm text-muted-foreground">{agent.region}</div>
                              </div>
                            </div>

                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label>Select Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {date ? format(date, "PPP") : "Pick a date"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={date}
                                      onSelect={setDate}
                                      initialFocus
                                      disabled={(date) =>
                                        date < new Date() ||
                                        date > new Date(new Date().setMonth(new Date().getMonth() + 1))
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>

                            <DialogFooter>
                              <Button onClick={handleBook} disabled={!date || isBooking} className="w-full sm:w-auto">
                                {isBooking ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Booking...
                                  </>
                                ) : (
                                  "Confirm Booking"
                                )}
                              </Button>
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
