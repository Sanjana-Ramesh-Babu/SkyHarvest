"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { Leaf, LayoutDashboard, UserRound, MessageSquare, LogOut, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useClerk, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function DashboardNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { signOut } = useClerk()
  const { user } = useUser()
  const router = useRouter()

  const handleSignOut = () => {
    signOut(() => router.push("/"))
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { href: "/book-agent", label: "Book Agent", icon: <UserRound className="h-4 w-4 mr-2" /> },
    { href: "/feedback", label: "Feedback", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  ]

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user) return "U"
    const firstName = user.firstName || ""
    const lastName = user.lastName || ""
    return (
      `${firstName.charAt(0)}${lastName.charAt(0)}` ||
      user.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase() ||
      "U"
    )
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">SkyHarvest</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Button key={item.href} variant={pathname === item.href ? "default" : "ghost"} size="sm" asChild>
              <Link href={item.href} className="flex items-center">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user-profile" className="cursor-pointer">
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl text-primary">SkyHarvest</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      variant={pathname === item.href ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => setIsOpen(false)}
                      asChild
                    >
                      <Link href={item.href} className="flex items-center">
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                  <Button
                    variant={pathname === "/profile" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <Link href="/profile" className="flex items-center">
                      <UserRound className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                </div>

                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsOpen(false)
                      handleSignOut()
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}
