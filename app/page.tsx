"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useInView } from "react-intersection-observer"
import { useAuth } from "@clerk/nextjs"

export default function Home() {
  const { ref: stepsRef, inView: stepsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { isSignedIn } = useAuth()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="hero relative flex items-center min-h-[calc(100vh-4rem)] hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/farm-background.jpg')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
              Transform Your Farm with Smart Technology
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Harness the power of AI and weather intelligence for precision agriculture. Optimize your yields while
              conserving resources.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="group">
                <Link href={isSignedIn ? "/dashboard" : "/signup"}>
                  {isSignedIn ? "Go to Dashboard" : "Get Started"}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute right-0 bottom-0 w-1/3 h-1/3 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="w-full h-full bg-[url('/images/plant-illustration.svg')] bg-contain bg-no-repeat bg-right-bottom opacity-30 dark:opacity-20 animate-float"></div>
        </motion.div>
      </section>

      <section ref={stepsRef} className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
              initial={{ opacity: 0 }}
              animate={stepsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-primary mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={stepsInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📍",
                title: "Set Up Your Farm",
                description: "Input your location and crop details for personalized recommendations",
                delay: 0.2,
              },
              {
                icon: "🌧️",
                title: "Smart Predictions",
                description: "Get AI-powered weather forecasts and optimal seeding times",
                delay: 0.4,
              },
              {
                icon: "💧",
                title: "Water Management",
                description: "Optimize irrigation with precision scheduling and monitoring",
                delay: 0.6,
              },
              {
                icon: "📈",
                title: "Track Progress",
                description: "Monitor your farm's performance and improve yields over time",
                delay: 0.8,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: step.delay }}
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20 dark:hover:border-primary/30">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Revolutionize Your Farming?
            </motion.h2>
            <motion.p
              className="text-lg mb-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join thousands of farmers who are already using SkyHarvest to increase yields and reduce resource usage.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="group">
                <Link href={isSignedIn ? "/dashboard" : "/signup"}>
                  {isSignedIn ? "Go to Dashboard" : "Get Started Today"}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl mr-2">🌱</span>
              <span className="font-bold text-xl text-primary">SkyHarvest</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SkyHarvest. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
