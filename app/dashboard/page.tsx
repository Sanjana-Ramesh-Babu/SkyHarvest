"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { DashboardNav } from "@/components/dashboard-nav"
import { Cloud, Droplets, BarChart3, Calendar, ArrowUpRight, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Types for our API response
interface ForecastData {
  bestTime: string
  confidence: number
  rainForecast: {
    date: string
    chance: number
    amount: number
  }[]
  irrigationSchedule: {
    day: string
    duration: string
    amount: number
  }[]
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)

  useEffect(() => {
    // Fetch data from our API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch("/api/forecast")
        const data = await response.json()
        setForecastData(data)
      } catch (error) {
        console.error("Error fetching forecast data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div variants={item}>
              <Card className="h-full border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-semibold">AI Prediction</CardTitle>
                  <Cloud className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Best seeding time:</div>
                        <div className="text-2xl font-bold text-primary">{forecastData?.bestTime}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence</span>
                          <span className="font-medium">{forecastData?.confidence}%</span>
                        </div>
                        <Progress value={forecastData?.confidence} className="h-2" />
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-semibold">Rain Calendar</CardTitle>
                  <Calendar className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-sm font-medium text-muted-foreground pb-2">Date</th>
                          <th className="text-left text-sm font-medium text-muted-foreground pb-2">Chance</th>
                          <th className="text-left text-sm font-medium text-muted-foreground pb-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-center">
                              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                            </td>
                          </tr>
                        ) : (
                          forecastData?.rainForecast.map((day, i) => (
                            <tr key={i} className="border-t border-border">
                              <td className="py-3 text-sm">{day.date}</td>
                              <td className="py-3 text-sm">
                                <div className="flex items-center">
                                  <span className="mr-2">{day.chance}%</span>
                                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary rounded-full"
                                      style={{ width: `${day.chance}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 text-sm">{day.amount} mm</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-semibold">Irrigation Schedule</CardTitle>
                  <Droplets className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-sm font-medium text-muted-foreground pb-2">Day</th>
                          <th className="text-left text-sm font-medium text-muted-foreground pb-2">Duration</th>
                          <th className="text-left text-sm font-medium text-muted-foreground pb-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-center">
                              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                            </td>
                          </tr>
                        ) : (
                          forecastData?.irrigationSchedule.map((day, i) => (
                            <tr key={i} className="border-t border-border">
                              <td className="py-3 text-sm">{day.day}</td>
                              <td className="py-3 text-sm">{day.duration}</td>
                              <td className="py-3 text-sm">{day.amount} mm</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Adjust Schedule
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="lg:col-span-3">
              <Card className="border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-semibold">Performance Metrics</CardTitle>
                  <BarChart3 className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="water">
                    <TabsList className="mb-4">
                      <TabsTrigger value="water">Water Usage</TabsTrigger>
                      <TabsTrigger value="yield">Yield Forecast</TabsTrigger>
                      <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                    </TabsList>

                    <TabsContent value="water" className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">Water usage chart would be displayed here</div>
                    </TabsContent>

                    <TabsContent value="yield" className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        Yield forecast chart would be displayed here
                      </div>
                    </TabsContent>

                    <TabsContent value="efficiency" className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        Efficiency metrics would be displayed here
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
