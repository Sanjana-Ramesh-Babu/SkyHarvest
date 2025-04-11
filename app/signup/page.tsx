"use client"

import { SignUp } from "@clerk/nextjs"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-muted">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-xl border-2 rounded-lg",
                formButtonPrimary: "normal-case",
              },
            }}
            path="/signup"
            signInUrl="/login"
            redirectUrl="/setup"
          />
        </motion.div>
      </main>
    </div>
  )
}
