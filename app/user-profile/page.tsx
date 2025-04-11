"use client"

import { UserProfile } from "@clerk/nextjs"
import { DashboardNav } from "@/components/dashboard-nav"

export default function UserProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />

      <main className="flex-1 py-8 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-4xl">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-xl border-2 rounded-lg bg-background",
                navbar: "bg-background text-foreground",
                navbarButton: "text-foreground",
                navbarButtonActive: "text-primary border-primary",
                pageScrollBox: "bg-background",
              },
            }}
            path="/user-profile"
          />
        </div>
      </main>
    </div>
  )
}
