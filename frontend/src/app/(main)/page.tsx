"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Client-side'da çalışacak
    if (typeof window !== "undefined") {
      const userData = window.localStorage.getItem("user")
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Error parsing user data:", error)
          setUser(null)
        }
      }
      else{
        router.push("/login")
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black pt-24">
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl font-bold">
          {user ? JSON.stringify(user.username) : "No user data"}
        </span>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button variant="destructive">Button</Button>
        </div>
      </div>
    </div>
  );  
}
