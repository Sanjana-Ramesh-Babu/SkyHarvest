"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Loader2, MapPin } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    address: "",
    latitude: "",
    longitude: "",
    cropType: "",
    growthStage: "",
    irrigationMethod: "",
    waterRequirement: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const getCoordinates = () => {
    if (!formData.address) return

    setIsGettingLocation(true)

    // Simulate geolocation API
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        latitude: "40.7128",
        longitude: "-74.0060",
      }))
      setIsGettingLocation(false)
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/farm-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/dashboard")
      } else {
        throw new Error(data.message || "Failed to complete farm setup")
      }
    } catch (error) {
      console.error("Error setting up farm:", error)
      toast({
        title: "Error",
        description: "Failed to complete farm setup. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 bg-gradient-to-b from-background to-muted">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-3xl"
        >
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gradient">Set Up Your Farm</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Farm Address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your farm's address"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getCoordinates}
                        disabled={isGettingLocation || !formData.address}
                      >
                        {isGettingLocation ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-2" />
                        )}
                        Get Location
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="e.g., 40.7128"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="e.g., -74.0060"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select onValueChange={(value) => handleSelectChange("cropType", value)} value={formData.cropType}>
                      <SelectTrigger id="cropType">
                        <SelectValue placeholder="Select your crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="soybean">Soybean</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="growthStage">Growth Stage</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("growthStage", value)}
                      value={formData.growthStage}
                    >
                      <SelectTrigger id="growthStage">
                        <SelectValue placeholder="Select current growth stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seeding">Seeding</SelectItem>
                        <SelectItem value="vegetative">Vegetative</SelectItem>
                        <SelectItem value="flowering">Flowering</SelectItem>
                        <SelectItem value="ripening">Ripening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="irrigationMethod">Irrigation Method</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("irrigationMethod", value)}
                      value={formData.irrigationMethod}
                    >
                      <SelectTrigger id="irrigationMethod">
                        <SelectValue placeholder="Select irrigation method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drip">Drip Irrigation</SelectItem>
                        <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                        <SelectItem value="flood">Flood Irrigation</SelectItem>
                        <SelectItem value="center-pivot">Center Pivot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waterRequirement">Weekly Water Requirement (mm)</Label>
                    <Input
                      id="waterRequirement"
                      type="number"
                      min="0"
                      value={formData.waterRequirement}
                      onChange={handleChange}
                      placeholder="e.g., 25"
                      required
                    />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <span className="ml-2">→</span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
