"use client"

import type React from "react"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export function ClerkProviderWithTheme({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <ClerkProvider
      appearance={{
        baseTheme: isDarkMode ? dark : undefined,
        variables: {
          colorPrimary: "hsl(var(--primary))",
          colorTextOnPrimaryBackground: "white",
        },
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary-dark text-primary-foreground shadow-sm",
          socialButtonsIconButton: "border-border shadow-sm",
          card: "bg-background border-border shadow-sm",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          dividerText: "text-muted-foreground",
          formFieldLabel: "text-foreground",
          formFieldInput: "bg-background border-border text-foreground",
          footerActionLink: "text-primary hover:text-primary-dark",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
