"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Save, User, MapPin, Mail, Phone, Building, Shield, Lock } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 py-8 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gradient">My Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
          </motion.div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid grid-cols-3 md:w-[400px] mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="farm">Farm Details</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="border-2 shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col items-center mb-6">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                          <AvatarFallback className="text-2xl">JD</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="border-2 shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Preferences</CardTitle>
                      <CardDescription>Customize your experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Notifications</h3>
                        <div className="space-y-3">
                          {[
                            { id: "email-notif", label: "Email Notifications" },
                            { id: "weather-alerts", label: "Weather Alerts" },
                            { id: "irrigation-reminders", label: "Irrigation Reminders" },
                          ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                              <Label htmlFor={item.id} className="cursor-pointer">
                                {item.label}
                              </Label>
                              <Switch id={item.id} defaultChecked={true} />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          defaultValue="Passionate farmer focused on sustainable agriculture practices."
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="farm">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Farm Details</CardTitle>
                    <CardDescription>Information about your farm</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="farmName">Farm Name</Label>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input id="farmName" defaultValue="Green Valley Farm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="farmAddress">Farm Address</Label>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input id="farmAddress" defaultValue="123 Rural Road, Farmville, CA 95432" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmSize">Farm Size (acres)</Label>
                        <Input id="farmSize" type="number" defaultValue="150" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmType">Farm Type</Label>
                        <select
                          id="farmType"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          defaultValue="mixed"
                        >
                          <option value="crop">Crop Farm</option>
                          <option value="livestock">Livestock Farm</option>
                          <option value="mixed">Mixed Farm</option>
                          <option value="orchard">Orchard</option>
                        </select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Primary Crops</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["Corn", "Wheat", "Soybeans"].map((crop, index) => (
                          <div key={index} className="space-y-2">
                            <Label htmlFor={`crop-${index}`}>{`Crop ${index + 1}`}</Label>
                            <Input id={`crop-${index}`} defaultValue={crop} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="security">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="flex items-center">
                            <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <Input id="currentPassword" type="password" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch id="2fa" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Connected Accounts</h3>
                      <div className="space-y-3">
                        {[
                          { name: "Google", connected: true },
                          { name: "GitHub", connected: false },
                        ].map((account, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{account.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {account.connected ? "Connected" : "Not connected"}
                              </p>
                            </div>
                            <Button variant={account.connected ? "outline" : "default"} size="sm">
                              {account.connected ? "Disconnect" : "Connect"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} disabled={isLoading || isSaved} className="min-w-[120px]">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isSaved ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
